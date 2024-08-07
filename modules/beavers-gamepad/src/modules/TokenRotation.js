var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TokenRotation_1;
import { NAMESPACE } from "../main.js";
function staticImplements() {
	return (constructor) => {
		constructor;
	};
}
// @ts-ignore
let TokenRotation = TokenRotation_1 = class TokenRotation {
	_data = {
		config: TokenRotation_1.defaultConfig,
		userPosition: "bottom",
		userId: "",
	};
	X_AXES = "horizontal";
	Y_AXES = "vertical";
	static defaultConfig = {
		binding: {
			axes: {
				"horizontal": {
					index: "2",
					reversed: false
				},
				"vertical": {
					index: "3",
					reversed: false
				},
			},
			buttons: {}
		},
		name: "Token Rotation",
		id: "beavers-token-rotation",
		desc: "beaversGamepad.TokenRotation.desc"
	};
	updateGamepadConfig(gamepadConfig) {
		this._data.config = TokenRotation_1.defaultConfig;
		this._data.config.binding = gamepadConfig.modules[this._data.config.id].binding;
		const userData = game[NAMESPACE].Settings.getUserData(gamepadConfig.userId);
		this._data.userPosition = userData.userPosition;
		this._data.userId = gamepadConfig.userId;
		const user = game.users?.find(u => u.id === gamepadConfig.userId);
		this._data.actorId = user?.character?.id;
	}
	getConfig() {
		return this._data.config;
	}
	tick(event) {
		if (event.hasAnyAxesTicked) {
			this.tickAxes(event);
		}
		return true;
	}
	tickAxes(event) {
		const axes = this.getAxes(event, this.X_AXES, this.Y_AXES, this._data.userPosition);
		if (Math.abs(axes.y) + Math.abs(axes.x) > 0.3) {
			// @ts-ignore
			const token = canvas.tokens?.objects?.children.find(token => this._data.actorId?.endsWith(token.actor?.id));
			if (token) {
				token.rotate(this.getDegree(axes), 0);
			}
		}
	}
	getDegree(point) {
		return (Math.atan2(point.x * -1, point.y) * 180) / Math.PI;
	}
	getAxes(event, xAxis, yAxis, userPosition) {
		let x = 0;
		let y = 0;
		for (const [i, value] of Object.entries(event.gamepad.axes)) {
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
				result = value;
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
TokenRotation = TokenRotation_1 = __decorate([
	staticImplements()
], TokenRotation);
export { TokenRotation };
