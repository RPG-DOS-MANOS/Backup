export class D35E {
	get version() {
		return 2;
	}
	get id() {
		return "D35E";
	}
	async actorRollSkill(actor, skillId) {
		return await actor.rollSkill(skillId);
	}
	async actorRollAbility(actor, abilityId) {
		const roll = await actor.rollAbilityTest(abilityId);
		return roll[0];
	}
	actorCurrenciesGet(actor) {
		return actor["system"].currency;
	}
	async actorCurrenciesStore(actor, currencies) {
		await actor.update({ system: { currency: currencies } });
	}
	actorSheetAddTab(sheet, html, actor, tabData, tabBody) {
		const tabs = $(html).find('nav[data-group="primary"]');
		const tabItem = $('<a class="item" data-tab="' + tabData.id + '" title="' + tabData.label + '">' + tabData.html + '</a>');
		tabs.append(tabItem);
		const body = $(html).find(".primary-body");
		const tabContent = $('<div class="tab" data-group="primary" data-tab="' + tabData.id + '"></div>');
		body.append(tabContent);
		tabContent.append(tabBody);
		if (!sheet._tabs?.[0]) {
			sheet.options.tabs = [{ navSelector: ".tabs", contentSelector: ".primary-body", initial: "details" }];
			sheet._tabs = sheet._createTabHandlers();
		}
	}
	itemSheetReplaceContent(app, html, element) {
		const sheetBody = html.find('.sheet-content');
		app.saveMCEContent = async function (data = null) {
		};
		sheetBody.css("overflow", "hidden");
		sheetBody.css("min-height", "inherit");
		sheetBody.css("height", "inherit");
		sheetBody.empty();
		sheetBody.append(element);
	}
	get configSkills() {
		return Object.entries(CONFIG["D35E"].skills)
			.map(skills => {
			// @ts-ignore
			return { id: skills[0], label: skills[1] };
		});
	}
	get configAbilities() {
		return Object.entries(CONFIG["D35E"].abilities).map(ab => {
			return { id: ab[0], label: ab[1] };
		});
	}
	get configCurrencies() {
		return [
			{
				id: "pp",
				factor: 1000,
				label: "PP"
			},
			{
				id: "gp",
				factor: 100,
				label: "GP"
			},
			{
				id: "sp",
				factor: 10,
				label: "SP"
			},
			{
				id: "cp",
				factor: 1,
				label: "CP"
			}
		];
	}
	get configCanRollAbility() {
		return true;
	}
	get configLootItemType() {
		return "loot";
	}
	get itemPriceAttribute() {
		return "system.price";
	}
	get itemQuantityAttribute() {
		return "system.quantity";
	}
}
