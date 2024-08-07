//@ts-ignore
import { currentAnimation, currentTimer, updateAnimation, updateTimer } from "./api.js";
import { MODULE_NAME } from "./settings.js";
export class SettingsAwareEntity {
    constructor(id) {
        this.id = id;
    }
    get settings() {
        return [];
    }
    getSetting(settingId) {
        try {
            if (this.type == "submenu") {
                return game.settings.get(MODULE_NAME, `${settingId}`);
            }
            return game.settings.get(MODULE_NAME, `${this.type}.${this.id}.setting.${settingId}`);
        }
        catch (e) {
            if (this.settings.some(setting => setting.id === settingId)) {
                throw e;
            }
            throw new Error(`Combat Ready | "${settingId}" is not a registered setting for "${this.id}". If you're the module/system developer, please add it to the return values of your "get settings()" function.`);
        }
    }
}
export function enumerateSettings(settingEntity) {
    const settings = [];
    for (const setting of settingEntity.settings) {
        try {
            if (setting.setting.scope === "world" && !game.user?.isGM)
                continue;
            let s = duplicate(setting.setting);
            s.isSeparator = (setting.setting.type === "Separator");
            if (!s.isSeparator) {
                s.id = `${settingEntity.id}.setting.${setting.id}`;
                s.value = settingEntity.getSetting(setting.id);
                s.type = setting.setting.type instanceof Function ? setting.setting.type.name : "String";
                s.isCheckbox = setting.setting.type === Boolean;
                s.isSelect = setting.setting.choices !== undefined;
                s.isRange = (setting.setting.type === Number) && setting.setting.range;
                s.isColor = (setting.setting.type === "Color");
                s.isMultiline = (setting.setting.multiline);
                s.isFilePicker = (setting.setting.filePicker !== undefined);
            }
            s.name = game.i18n.localize(setting.setting.name);
            s.hint = game.i18n.localize(setting.setting.hint);
            settings.push(s);
        }
        catch (e) {
            console.warn(`CombatReady | The following error occured while rendering setting "${setting.id}" of module/system "${this.id}. It won't be displayed.`);
            console.error(e);
        }
    }
    return settings;
}
export class CombatReadySubSettings extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 600,
            resizable: true
        });
    }
    getSelected() {
        switch (this.type) {
            case "timers":
                return currentTimer;
            case "animations":
                return currentAnimation;
            default:
                throw new Error("Incorrect Type for subsettings");
                break;
        }
    }
    async _onSubmit(event, { updateData = {}, preventClose = false, preventRender = false } = {}) {
        if (event.submitter.name == "apply") {
            preventClose = true;
        }
        return super._onSubmit(event, { updateData, preventClose, preventRender });
    }
    async _updateObject(event, formData) {
        let mainKey = (this.type == "timers" ? "selectedTimer" : this.type == "animations" ? "selectedAnimation" : "");
        if (mainKey == "")
            throw new Error("Incorrect Type for subsettings");
        let selectedObject = game.settings.get(MODULE_NAME, mainKey);
        if (game.user?.isGM) {
            //@ts-ignore
            selectedObject = (this.type == "timers" ? formData.selectedTimer : this.type == "animations" ? formData.selectedAnimation : "");
        }
        for (let [key, value] of Object.entries(formData)) {
            if (key !== mainKey && !key.startsWith(selectedObject))
                continue;
            let setting;
            if (key === mainKey)
                setting = mainKey;
            else
                setting = `${this.type}.${key}`;
            // Get the old setting value
            const oldValue = game.settings.get(MODULE_NAME, setting);
            // Only update the setting if it has been changed (this leaves the default in place if it hasn't been touched)
            if (value !== oldValue)
                await game.settings.set(MODULE_NAME, setting, value);
        }
        switch (this.type) {
            case "timers":
                updateTimer();
                break;
            case "animations":
                updateAnimation();
                break;
        }
    }
    activateListeners(html) {
        let mainKey = (this.type == "timers" ? "selectedTimer" : this.type == "animations" ? "selectedAnimation" : "");
        if (mainKey == "")
            throw new Error("Incorrect Type for subsettings");
        super.activateListeners(html);
        html.find(`select[name=${mainKey}]`).on("change", this.onObjectSelectedChange.bind(this));
    }
    async onObjectSelectedChange(event) {
        let mainKey = (this.type == "timers" ? "selectedTimer" : this.type == "animations" ? "selectedAnimation" : "");
        if (mainKey == "")
            throw new Error("Incorrect Type for subsettings");
        // Hide all module settings
        document.querySelectorAll(`.combatready-${this.type}-settings`).forEach(element => element.style.display = "none");
        // Show the settings block for the currently selected module
        document.getElementById(`combatready.${this.type}.${event.currentTarget.value}`).style.display = "";
        // Recalculate window height
        this.element[0].style.height = "";
        this.position.height = null;
        await game.settings.set(MODULE_NAME, mainKey, event.currentTarget.value);
        switch (this.type) {
            case "timers":
                updateTimer();
                break;
            case "animations":
                updateAnimation();
                break;
        }
    }
}
