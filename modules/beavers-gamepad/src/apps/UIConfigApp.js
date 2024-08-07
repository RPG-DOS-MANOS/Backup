import { HOOK_GAMEPAD_CONNECTED, NAMESPACE } from "../main.js";
/**
* this is the configuration module that allows to add and delete and configure gamepadmodules
*/
export class UIConfigApp extends FormApplication {
	gamepadModules;
	gamepadConfigs;
	hook;
	constructor() {
		super();
		this.hook = Hooks.on(HOOK_GAMEPAD_CONNECTED, async function () {
			this.render();
		}.bind(this));
	}
	static get defaultOptions() {
		if (!(game instanceof Game)) {
			throw new Error("Settings called before game has been initialized");
		}
		const title = game.i18n.localize("beaversGamepad.uiConfigApp.title");
		return mergeObject(super.defaultOptions, {
			title: title,
			template: `modules/${NAMESPACE}/templates/ui-config.hbs`,
			id: NAMESPACE + "ui-config",
			width: 600,
			height: 600,
			resizable: true,
			submitOnChange: false,
			submitOnClose: true,
			classes: [NAMESPACE, "ui-config"]
		});
	}
	async getData(options) {
		if (!(game instanceof Game)) {
			throw new Error("Settings called before game has been initialized");
		}
		return {
			users: game.users?.contents.reduce((a, v) => ({ ...a, [v.id]: v }), {}) || {},
			uiData: game[NAMESPACE].Settings.getUIData(),
		};
	}
	activateListeners(html) {
		super.activateListeners(html);
		html.find('button[type=submit]').on("click", e => {
			this.close();
		});
		html.find('.addUser').on("click", e => {
			const formData = new FormData($(e.currentTarget).parents("form")[0]);
			const userId = formData.get("addUser");
			if (userId) {
				game[NAMESPACE].Settings.setUserData(userId, {}).then(() => {
					this.render();
				});
			}
		});
		html.find('.removeUser').on("click", e => {
			const id = $(e.currentTarget).data("id");
			game[NAMESPACE].Settings.removeUserData(id).then(() => {
				game[NAMESPACE].TinyUIModuleManager.removeInstance(id);
				this.render();
			});
		});
	}
	async _updateObject(event, formData) {
		if (formData != undefined) {
			delete formData["addUser"];
			const uiData = {};
			for (const [attribute, value] of Object.entries(formData)) {
				setProperty(uiData, attribute, value);
			}
			game[NAMESPACE].Settings.setUIData(uiData, { updateUI: true });
		}
	}
	async close(options) {
		super.close(options);
		const result = super.close(options);
		Hooks.off(HOOK_GAMEPAD_CONNECTED, this.hook);
		return result;
	}
}
