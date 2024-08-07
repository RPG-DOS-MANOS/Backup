import { NAMESPACE } from "./main.js";
import { GamepadConfigApp } from "./apps/GamepadConfigApp.js";
import { UIConfigApp } from "./apps/UIConfigApp.js";
export const USER_UI = "user_ui";
export const ACTOR_FILTER = "actor_filter";
export class GamepadSettings {
	GAMEPAD_CONFIG = "gamepad_config";
	GAMEPAD_CONFIG_BUTTON = "gamepad_config_button";
	UI_CONFIG_BUTTON = "ui_config_button";
	_gamepadManager;
	_gamepadModuleManager;
	constructor() {
		this._gamepadManager = game[NAMESPACE].GamepadManager;
		this._gamepadModuleManager = game[NAMESPACE].GamepadModuleManager;
		if (!(game instanceof Game)) {
			throw new Error("Settings called before game has been initialized");
		}
		game.settings.register(NAMESPACE, USER_UI, {
			scope: "client",
			config: false,
			default: {},
			type: Object
		});
		game.settings.register(NAMESPACE, ACTOR_FILTER, {
			name: game.i18n.localize('beaversGamepad.settings.actorFilter.name'),
			hint: game.i18n.localize('beaversGamepad.settings.actorFilter.hint'),
			scope: "client",
			config: true,
			default: "character"
		});
		game.settings.register(NAMESPACE, this.GAMEPAD_CONFIG, {
			name: game.i18n.localize('beaversGamepad.settings.gamepadConfig.name'),
			scope: "client",
			config: false,
			default: {},
			type: Object
		});
		game.settings.registerMenu(NAMESPACE, this.GAMEPAD_CONFIG_BUTTON, {
			name: game.i18n.localize('beaversGamepad.settings.gamepadConfig.name'),
			label: game.i18n.localize("beaversGamepad.settings.gamepadConfig.label"),
			hint: game.i18n.localize('beaversGamepad.settings.gamepadConfig.hint'),
			//@ts-ignore
			type: GamepadConfigApp,
			restricted: false,
		});
		game.settings.registerMenu(NAMESPACE, this.UI_CONFIG_BUTTON, {
			name: game.i18n.localize('beaversGamepad.settings.uiConfig.name'),
			label: game.i18n.localize("beaversGamepad.settings.uiConfig.label"),
			hint: game.i18n.localize('beaversGamepad.settings.uiConfig.hint'),
			//@ts-ignore
			type: UIConfigApp,
			restricted: false,
		});
	}
	_getGamepadConfigs() {
		return this.get(this.GAMEPAD_CONFIG);
	}
	_setGamepadConfigs(gamepadConfigs) {
		return this.set(this.GAMEPAD_CONFIG, gamepadConfigs);
	}
	async setUIData(updateData, options) {
		const data = this.getUIData();
		for (const [userId, userData] of Object.entries(updateData)) {
			data[userId] = data[userId] || {};
			data[userId] = { ...data[userId], ...userData };
		}
		await this.set(USER_UI, data);
		if (options?.updateUI) {
			game[NAMESPACE].TinyUIModuleManager.updateUIModules();
		}
	}
	getUIData() {
		return this.get(USER_UI) || {};
	}
	getUserData(userId) {
		return this.get(USER_UI)?.[userId] || {
			userPosition: "bottom",
			enableUI: false,
			top: 0,
			left: 0
		};
	}
	setUserData(userId, updateData) {
		const userData = this.getUserData(userId);
		const data = this.getUIData();
		data[userId] = { ...userData, ...updateData };
		return this.set(USER_UI, data);
	}
	async removeUserData(userId) {
		const data = this.getUIData();
		delete data[userId];
		await this.set(USER_UI, data);
		game[NAMESPACE].TinyUIModuleManager.updateUIModules();
	}
	get(key) {
		if (!(game instanceof Game)) {
			throw new Error("Settings called before game has been initialized");
		}
		return game.settings.get(NAMESPACE, key);
	}
	;
	set(key, value) {
		if (!(game instanceof Game)) {
			throw new Error("Settings called before game has been initialized");
		}
		return game.settings.set(NAMESPACE, key, value);
	}
	/**
	* this looks up the stored gamepadConfigSettings.
	* if a registered gamepad does not have any stored config information it returns a default config
	*/
	getGamepadConfigs() {
		const result = {};
		const registeredGamepads = this._gamepadManager.getRegisteredGamepads();
		for (const [key, value] of Object.entries(registeredGamepads)) {
			result[key] = this.getGamepadConfig(key);
		}
		return result;
	}
	getGamepadConfig(gamepadIndex) {
		const registeredGamepads = this._gamepadManager.getRegisteredGamepads();
		const gamepadConfigs = this._getGamepadConfigs();
		if (!gamepadConfigs[gamepadIndex] || registeredGamepads[gamepadIndex].id !== gamepadConfigs[gamepadIndex].gamepadId) {
			gamepadConfigs[gamepadIndex] = {
				userId: "",
				gamepadId: registeredGamepads[gamepadIndex].id,
				actorId: "",
				modules: {}
			};
			this._setGamepadConfigs(gamepadConfigs);
		}
		return gamepadConfigs[gamepadIndex];
	}
	getGamepadIndexForUser(userId) {
		const gamepadIndexes = Object.entries(this.getGamepadConfigs()).filter(([k, v]) => v.userId === userId).map(([k, v]) => k);
		if (gamepadIndexes[0]) {
			return gamepadIndexes[0];
		}
		return undefined;
	}
	/**
	* this is called when updating the gamepadConfig store
	* @param data
	*/
	async updateGamepadConfigs(data) {
		const gamepadConfigs = this._getGamepadConfigs();
		for (const [attribute, value] of Object.entries(data)) {
			setProperty(gamepadConfigs, attribute, value);
		}
		return this._setGamepadConfigs(gamepadConfigs).then(v => {
			this._gamepadModuleManager.updateGamepadModuleInstance();
			return v;
		});
	}
	/**
	* removes a gamepadmoduleInstancecs
	* @param gamepadIndex
	* @param moduleId
	*/
	deleteGamepadConfig(gamepadIndex, moduleId) {
		const gamepadConfigs = this._getGamepadConfigs();
		if (gamepadConfigs[gamepadIndex]?.modules[moduleId]) {
			delete gamepadConfigs[gamepadIndex].modules[moduleId];
		}
		return this.set(this.GAMEPAD_CONFIG, gamepadConfigs).then(v => {
			this._gamepadModuleManager.deleteGamepadModuleInstance(gamepadIndex, moduleId);
			return v;
		});
	}
}
