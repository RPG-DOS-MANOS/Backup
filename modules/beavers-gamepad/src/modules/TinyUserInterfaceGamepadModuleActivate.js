var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TinyUserInterfaceGamepadModuleActivate_1;
import { NAMESPACE } from "../main.js";
function staticImplements() {
	return (constructor) => { constructor; };
}
// @ts-ignore
let TinyUserInterfaceGamepadModuleActivate = TinyUserInterfaceGamepadModuleActivate_1 = class TinyUserInterfaceGamepadModuleActivate {
	_data = {
		config: TinyUserInterfaceGamepadModuleActivate_1.defaultConfig,
		userId: "",
	};
	static defaultConfig = {
		binding: {
			axes: {},
			buttons: {
				"activate": {
					index: "0",
					label: "activate :"
				},
			}
		},
		name: "Tiny-User-Interface Activation",
		id: "beavers-tinyUI-activate",
		desc: "beaversGamepad.TUIGamepadModule.desc2"
	};
	updateGamepadConfig(gamepadConfig) {
		this._data.config = TinyUserInterfaceGamepadModuleActivate_1.defaultConfig;
		this._data.config.binding = gamepadConfig.modules[this._data.config.id].binding;
		this._data.userId = gamepadConfig.userId;
	}
	getConfig() {
		return this._data.config;
	}
	tick(event) {
		if (!event.hasAnyButtonTicked) {
			return true;
		}
		const index = this._data.config.binding.buttons["activate"].index;
		if (event.buttons[index]) {
			const choices = game[NAMESPACE].TinyUIModuleManager.getUiModuleChoices();
			game[NAMESPACE].TinyUIModuleManager.getInstance(this._data.userId).select({ choices: choices })
				.then(moduleId => {
				if (moduleId !== null && moduleId !== "") {
					game[NAMESPACE].TinyUIModuleManager.processUI(this._data.userId, moduleId);
				}
			});
		}
		return true;
	}
	destroy() {
	}
};
TinyUserInterfaceGamepadModuleActivate = TinyUserInterfaceGamepadModuleActivate_1 = __decorate([
	staticImplements()
], TinyUserInterfaceGamepadModuleActivate);
export { TinyUserInterfaceGamepadModuleActivate };
