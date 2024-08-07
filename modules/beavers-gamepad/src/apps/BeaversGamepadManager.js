import { HOOK_GAMEPAD_CONNECTED, NAMESPACE } from "../main.js";
/**
* here are physical gamepads registered
* it genereates a tick event for each gamepad that is sent to gamepadModuleManager.
*/
export class BeaversGamepadManager {
	gamepads = {};
	constructor() {
		window.addEventListener("gamepadconnected", (e) => {
			this._registerGamePad(e.gamepad);
		});
		window.setInterval(() => {
			this._gamepadTick();
		}, 100);
	}
	getRegisteredGamepads() {
		const result = {};
		for (const [index, value] of Object.entries(this.gamepads)) {
			result[index] = {
				id: value.id,
				count: {
					buttons: value.count.buttons,
					axes: value.count.axes
				}
			};
		}
		return result;
	}
	_registerGamePad(gamepad) {
		this.gamepads[gamepad.index] = { button: {}, id: gamepad.id, count: { buttons: gamepad.buttons.length, axes: gamepad.axes.length } };
		Hooks.call(HOOK_GAMEPAD_CONNECTED);
	}
	async _gamepadTick() {
		for (const gamepad of navigator.getGamepads()) {
			if (!gamepad)
				continue;
			if (!this.gamepads[gamepad.index]) {
				await this._registerGamePad(gamepad);
			}
			const gamepadTickEvent = {
				gamepad: gamepad,
				hasAnyButtonTicked: false,
				hasAnyAxesTicked: false,
				hasAnyAxesActivity: false,
				isAnyButtonPressed: false,
				axes: {},
				buttons: {}
			};
			this._gatherButtonTickEvent(gamepadTickEvent);
			this._gatherAxesTickEvent(gamepadTickEvent);
			this._triggerGamepadTickEvent(gamepadTickEvent);
		}
	}
	_gatherButtonTickEvent(gamepadTickEvent) {
		const gamepad = gamepadTickEvent.gamepad;
		const data = this.gamepads[gamepad.index];
		for (const [index, button] of gamepad.buttons.entries()) {
			if (button.pressed) {
				data.button[index] = data.button[index] + 1 || 1;
				gamepadTickEvent.isAnyButtonPressed = true;
			}
			else {
				data.button[index] = 0;
			}
			if (data.button[index] == 1 || data.button[index] > 5) {
				gamepadTickEvent.buttons[index] = 1;
				gamepadTickEvent.hasAnyButtonTicked = true;
			}
		}
	}
	_gatherAxesTickEvent(gamepadTickEvent) {
		const gamepad = gamepadTickEvent.gamepad;
		for (const [index, axis] of gamepad.axes.entries()) {
			const value = axis * 10;
			if (value < -1 || value > 1) {
				gamepadTickEvent.hasAnyAxesActivity = true;
			}
			if (value < -5) {
				gamepadTickEvent.hasAnyAxesTicked = true;
				gamepadTickEvent.axes[index] = -1;
			}
			else if (value > 5) {
				gamepadTickEvent.hasAnyAxesTicked = true;
				gamepadTickEvent.axes[index] = 1;
			}
		}
	}
	_triggerGamepadTickEvent(gamepadTickEvent) {
		game[NAMESPACE].GamepadModuleManager.tick(gamepadTickEvent);
	}
}
