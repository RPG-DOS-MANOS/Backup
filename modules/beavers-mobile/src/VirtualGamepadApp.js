import { VirtualGamepad as VG } from "./VirtualGamepad.js";
export class VirtualGamepadApp extends Application {
	constructor(virtualGamepad, startAxes = 0) {
		super({ id: virtualGamepad.id });
		this.virtualGamepad = virtualGamepad;
		this.startAxes = startAxes;
	}
	static for(id) {
		const vg = new VG(id);
		return new VirtualGamepadApp(vg);
	}
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			// @ts-ignore
			template: "modules/beavers-mobile/templates/gamepad-overlay.hbs",
			classes: ["beavers-mobile"],
			popOut: false,
		});
	}
	async getData(options) {
	}
	activateListeners(html) {
		$(html).find(".drag").on("touchstart", (e) => {
			this.isDragged = true;
			this.touchStart = this._getTouchFrom(e);
		});
		$(html).find(".drag").on("touchmove", (e) => {
			if (this.isDragged) {
				this.touchNow = this._getTouchFrom(e);
				const x = Math.max(0, Math.min(50 + this.touchNow.clientX - this.touchStart.clientX, 100));
				const y = Math.max(0, Math.min(50 + this.touchNow.clientY - this.touchStart.clientY, 100));
				$(html).find(".drag").css({ "top": y, "left": x });
				this.virtualGamepad.setAxes(this.startAxes, (x - 50) / 50);
				this.virtualGamepad.setAxes(this.startAxes + 1, (y - 50) / 50);
			}
		});
		$(html).find(".drag").on("touchend", (e) => {
			this.isDragged = false;
			$(html).find(".drag").css({ "top": 50, "left": 50 });
			this.virtualGamepad.setAxes(this.startAxes, 0);
			this.virtualGamepad.setAxes(this.startAxes + 1, 0);
		});
	}
	_getTouchFrom(e) {
		// @ts-ignore
		const te = e.originalEvent;
		return te.touches[0];
	}
}
