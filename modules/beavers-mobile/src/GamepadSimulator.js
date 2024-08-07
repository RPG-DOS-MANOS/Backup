export class GamepadSimulator {
	static addVirtualGamepad(virtualGamepad, index = this._virtualGamepadIndex++) {
		this._virtualGamepads[index] = virtualGamepad;
		return index;
	}
	static removeVirtualGamepad(virtualGamepad) {
		if (this._virtualGamepads[virtualGamepad.index] == virtualGamepad) {
			delete this._virtualGamepads[virtualGamepad.index];
		}
	}
	static getAllGamepads() {
		const originalGamepads = GamepadSimulator._getOriginalGamepads.call(navigator);
		const result = GamepadSimulator._getOriginalGamepads.call(navigator) == null ? [] : [...originalGamepads];
		for (const [i, virtualGamepad] of Object.entries(GamepadSimulator._virtualGamepads)) {
			result[i] = virtualGamepad; //virtual gamepads starts at 10
		}
		return result;
	}
}
GamepadSimulator._getOriginalGamepads = navigator.getGamepads;
GamepadSimulator._virtualGamepads = {};
GamepadSimulator._virtualGamepadIndex = 10;
