import { TinyUserInterface } from "./TinyUserInterface.js";
import { NAMESPACE } from "../main.js";
export class TinyUIModuleManager {
	_data = {
		instances: {},
		uiModules: {},
	};
	getInstance(userId) {
		return this._data.instances[userId];
	}
	getUiModuleChoices() {
		const choices = {};
		Object.entries(this._data.uiModules).forEach(([moduleId, uiModule]) => {
			choices[moduleId] = { text: uiModule.name };
		});
		return choices;
	}
	processUI(userId, moduleId) {
		return this._data.uiModules[moduleId].process(userId, this._data.instances[userId]);
	}
	/**
	* this injects and updates uiModules into "the" TinyUserInterface.
	* if uiModuleInstance is nonexistent on the gamepad it creates an instance.
	*/
	updateUIModules() {
		const uiData = game[NAMESPACE].Settings.getUIData();
		for (const [userId, userData] of Object.entries(uiData)) {
			if (userData.enableUI) {
				if (this._data.instances[userId]) {
					this._data.instances[userId].render(true);
				}
				else {
					this.addInstance(userId);
				}
			}
			else {
				this.removeInstance(userId);
			}
		}
	}
	addInstance(userId) {
		this._data.instances[userId] = new TinyUserInterface(userId);
		this._data.instances[userId].render(true);
	}
	async removeInstance(userId) {
		if (this._data.instances[userId]) {
			await this._data.instances[userId].close();
			delete this._data.instances[userId];
		}
	}
	addModule(moduleId, uiModule) {
		this._data.uiModules[moduleId] = uiModule;
	}
	removeModule(moduleId) {
		delete this._data.uiModules[moduleId];
	}
}
