export class SelectDialog extends Application {
	selectData;
	callback;
	selected;
	static promise(data) {
		return new Promise((resolve) => {
			const keys = Object.keys(data.choices);
			if (keys.length === 1) {
				resolve(keys[0]);
				return;
			}
			if (keys.length === 0) {
				resolve("");
				return;
			}
			new SelectDialog(data, resolve).render(true);
		});
	}
	constructor(data, callback, options) {
		super(options);
		this.selectData = data;
		this.callback = callback;
	}
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			title: game["i18n"].localize(`beaversSystemInterface.select-dialog.title`),
			width: 300,
			height: 80,
			template: "modules/beavers-system-interface/templates/selectDialog.hbs",
			resizable: false,
			classes: ["select-dialog"],
			popOut: true
		});
	}
	getData() {
		return mergeObject(this.selectData, { size: "l" });
	}
	activateListeners(html) {
		html.find("select").on("input", () => {
			this.selected = html.find("select").val();
			if (this.selected != "") {
				this.close();
			}
		});
		html.find("input").on("input", () => {
			const result = html.find("input").val();
			this.selected = result;
			if (result != "") {
				this.close();
			}
		});
	}
	close(options) {
		const result = super.close(options);
		this.callback(this.selected);
		return result;
	}
}
