import { GamepadSimulator } from "./GamepadSimulator.js";
export class VirtualGamepad {
	constructor(id) {
		this._axes = [0, 0, 0, 0];
		this._buttons = [
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
			{
				pressed: false,
				touched: false,
				value: 0,
			},
		];
		this._id = id;
		this._index = GamepadSimulator.addVirtualGamepad(this);
		const event = new Event("gamepadconnected");
		event["gamepad"] = this;
		window.dispatchEvent(event);
	}
	get axes() {
		return [...this._axes];
	}
	get buttons() {
		return this._buttons;
	}
	get connected() {
		return true;
	}
	get hapticActuators() {
		return [];
	}
	get id() {
		return this._id;
	}
	get index() {
		return this._index;
	}
	get mapping() {
		return "";
	}
	get timestamp() {
		return Math.floor(Date.now() / 1000);
	}
	destroy() {
		const event = new Event("gamepaddisconnected");
		event["gamepad"] = this;
		window.dispatchEvent(event);
		GamepadSimulator.removeVirtualGamepad(this);
	}
	setAxes(index, value) {
		this._axes[index] = value;
	}
	setButton(index, button) {
		this._buttons[index] = button;
	}
}
VirtualGamepad._index = 0;
