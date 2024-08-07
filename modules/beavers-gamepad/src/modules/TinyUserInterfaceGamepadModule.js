var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TinyUserInterfaceGamepadModule_1;
import { NAMESPACE } from "../main.js";
function staticImplements() {
	return (constructor) => { constructor; };
}
// @ts-ignore
let TinyUserInterfaceGamepadModule = TinyUserInterfaceGamepadModule_1 = class TinyUserInterfaceGamepadModule {
	_data = {
		config: TinyUserInterfaceGamepadModule_1.defaultConfig,
		consecutiveTick: 0,
		userPosition: "bottom",
		userId: "",
	};
	X_AXES = "horizontal";
	Y_AXES = "vertical";
	static defaultConfig = {
		binding: {
			axes: {
				"horizontal": {
					index: "0",
					reversed: false
				},
				"vertical": {
					index: "1",
					reversed: false
				},
			},
			buttons: {
				"ok": {
					index: "0",
					label: "(A) ok:"
				},
				"abort": {
					index: "1",
					label: "(B) abort:"
				}
			}
		},
		name: "Tiny-User-Interface Control",
		id: "beavers-tinyUI-control",
		isContextModule: true,
		desc: "beaversGamepad.TUIGamepadModule.desc"
	};
	updateGamepadConfig(gamepadConfig) {
		this._data.config = TinyUserInterfaceGamepadModule_1.defaultConfig;
		this._data.config.binding = gamepadConfig.modules[this._data.config.id].binding;
		const userData = game[NAMESPACE].Settings.getUserData(gamepadConfig.userId);
		this._data.userPosition = userData.userPosition;
		this._data.userId = gamepadConfig.userId;
	}
	getConfig() {
		return this._data.config;
	}
	tick(event) {
		this._data.consecutiveTick++;
		if (event.hasAnyAxesTicked) {
			this.tickAxes(event);
		}
		if (event.hasAnyButtonTicked) {
			this.tickButton(event);
		}
		return true;
	}
	tickAxes(event) {
		const axes = this.getAxes(event, this.X_AXES, this.Y_AXES, this._data.userPosition);
		if (axes.y != 0) {
			if (this._data.consecutiveTick > 3) {
				game[NAMESPACE].TinyUIModuleManager.getInstance(this._data.userId).rotateWheel(axes.y);
				this._data.consecutiveTick = 0;
			}
		}
	}
	tickButton(event) {
		const okIndex = this._data.config.binding.buttons["ok"].index;
		if (event.buttons[okIndex]) {
			game[NAMESPACE].TinyUIModuleManager.getInstance(this._data.userId).ok();
		}
		const abortIndex = this._data.config.binding.buttons["abort"].index;
		if (event.buttons[abortIndex]) {
			game[NAMESPACE].TinyUIModuleManager.getInstance(this._data.userId).abort();
		}
	}
	getAxes(event, xAxis, yAxis, userPosition) {
		let x = 0;
		let y = 0;
		event.axes;
		for (const [i, value] of Object.entries(event.axes)) {
			x = x || this._get(xAxis, i, value);
			y = y || this._get(yAxis, i, value);
		}
		if (userPosition === "top" || userPosition === "right") {
			x = x * -1;
			y = y * -1;
		}
		if (userPosition === "right" || userPosition === "left") {
			const y2 = y;
			y = x;
			x = y2 * -1;
		}
		return { x: x, y: y };
	}
	_get(type, i, value) {
		let result = 0;
		const { index, reversed } = this._data.config.binding.axes[type];
		if (i === index.toString()) {
			if (reversed) {
				result = value * -1;
			}
			else {
				result = value;
			}
		}
		return result;
	}
	destroy() {
	}
};
TinyUserInterfaceGamepadModule = TinyUserInterfaceGamepadModule_1 = __decorate([
	staticImplements()
], TinyUserInterfaceGamepadModule);
export { TinyUserInterfaceGamepadModule };
