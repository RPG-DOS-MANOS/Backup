import { CharacterSheetContext, getSetting, ModuleSetting, QuickInsert, setSetting } from './quick-insert.js';
import './vendor.js';

// D&D 5th edition integration
const SYSTEM_NAME = "dnd5e";
const defaultSheetFilters = {
    class: "dnd5e.classes",
    feat: "dnd5e.classfeatures",
    "npc.feat": "dnd5e.monsterfeatures",
    spell: "dnd5e.spells",
    weapon: "dnd5e.items",
    equipment: "dnd5e.items",
    consumable: "dnd5e.items",
    backpack: "dnd5e.items",
    tool: "dnd5e.items",
    loot: "dnd5e.items",
};
class Dnd5eSheetContext extends CharacterSheetContext {
    constructor(documentSheet, anchor, sheetType, insertType) {
        super(documentSheet, anchor);
        if (sheetType && insertType) {
            const sheetFilters = getSetting(ModuleSetting.FILTERS_SHEETS).baseFilters;
            this.filter =
                sheetFilters[`${sheetType}.${insertType}`] || sheetFilters[insertType];
        }
    }
}
const ignoredTypes = new Set(["passengers", "crew"]);
function sheet5eRenderHook(app, sheetType) {
    if (app.element.find(".quick-insert-link").length > 0) {
        return;
    }
    const link = `<a class="item-control quick-insert-link" title="Quick Insert"><i class="fas fa-search"></i></a>`;
    app.element.find("a.item-create").each((i, el) => {
        let type = el.dataset.type;
        if (!type) {
            let parent = el.parentElement;
            while (parent && parent !== app.element[0]) {
                if (parent.dataset.type) {
                    type = parent.dataset.type;
                    break;
                }
                parent = parent.parentElement;
            }
        }
        if (type && ignoredTypes.has(type)) {
            return;
        }
        const linkEl = $(link);
        $(el).after(linkEl);
        linkEl.on("click", () => {
            const context = new Dnd5eSheetContext(app, linkEl, sheetType, type);
            QuickInsert.open(context);
        });
    });
}
function init() {
    if (game.user?.isGM) {
        const customFilters = getSetting(ModuleSetting.FILTERS_SHEETS).baseFilters;
        setSetting(ModuleSetting.FILTERS_SHEETS, {
            baseFilters: {
                ...defaultSheetFilters,
                ...customFilters,
            },
        });
    }
    Hooks.on("renderActorSheet5eCharacter", (app) => {
        getSetting(ModuleSetting.FILTERS_SHEETS_ENABLED) &&
            sheet5eRenderHook(app, "character");
    });
    Hooks.on("renderActorSheet5eNPC", (app) => {
        getSetting(ModuleSetting.FILTERS_SHEETS_ENABLED) &&
            sheet5eRenderHook(app, "npc");
    });
    Hooks.on("renderActorSheet5eVehicle", (app) => {
        getSetting(ModuleSetting.FILTERS_SHEETS_ENABLED) &&
            sheet5eRenderHook(app, "vehicle");
    });
    Hooks.on("renderTidy5eSheet", (app) => {
        getSetting(ModuleSetting.FILTERS_SHEETS_ENABLED) &&
            sheet5eRenderHook(app, "character");
    });
    Hooks.on("renderTidy5eNPC", (app) => {
        getSetting(ModuleSetting.FILTERS_SHEETS_ENABLED) &&
            sheet5eRenderHook(app, "npc");
    });
    try {
        const tidyApi = game.modules.get("tidy5e-sheet")?.api ??
            game.modules.get("tidy5e-sheet-kgar")?.api;
        if (tidyApi) {
            tidyApi.actorItem.registerSectionFooterCommands([
                {
                    enabled: (params) => getSetting(ModuleSetting.FILTERS_SHEETS_ENABLED) &&
                        ["npc", "character", "vehicle"].includes(params.actor.type),
                    execute: (params) => {
                        const context = new Dnd5eSheetContext(params.actor.sheet, $(params.event.currentTarget), params.actor.type, params.section.dataset.type);
                        QuickInsert.open(context);
                    },
                    iconClass: "fas fa-search",
                    tooltip: "Quick Insert",
                },
            ]);
        }
    }
    catch (e) {
        console.error("Tidy 5e Sheet (Rewrite) Quick Insert compatibility failed to initialize", e);
    }
    console.log("Quick Insert | dnd5e system extensions initiated");
}

export { Dnd5eSheetContext, SYSTEM_NAME, defaultSheetFilters, init, sheet5eRenderHook };
//# sourceMappingURL=dnd5e.js.map
