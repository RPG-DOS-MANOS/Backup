export class dnd4e {
	get version() {
		return 2;
	}
	get id() {
		return "dnd4e";
	}
	async actorRollSkill(actor, skillId) {
		return await actor.rollSkill(skillId);
	}
	async actorRollAbility(actor, abilityId) {
		return await actor.rollAbility(abilityId);
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
		const body = $(html).find(".sheet-body");
		const tabContent = $('<div class="tab flexcol" data-group="primary" data-tab="' + tabData.id + '"></div>');
		body.append(tabContent);
		tabContent.append(tabBody);
	}
	itemSheetReplaceContent(app, html, element) {
		html.find('.sheet-navigation').remove();
		var properties = html.find('.item-properties').clone();
		const sheetBody = html.find('.sheet-body');
		sheetBody.addClass("flexrow");
		sheetBody.empty();
		sheetBody.append(properties);
		sheetBody.append(element);
	}
	get configSkills() {
		return Object.entries(CONFIG["DND4EBETA"].skills).map(([key, value]) => {
			return {
				id: key,
				label: game["i18n"].localize("DND4EBETA.Skill" + key.charAt(0).toUpperCase() + key.substring(1))
			};
		});
	}
	get configAbilities() {
		return Object.entries(CONFIG["DND4EBETA"].abilities).map(([key, value]) => {
			return {
				id: key,
				label: game["i18n"].localize("DND4EBETA.Ability" + key.charAt(0).toUpperCase() + key.substring(1))
			};
		});
	}
	get configCurrencies() {
		return [
			{
				id: "ad",
				factor: 1000000,
				label: game["i18n"].localize("DND4EBETA.CurrencyAD"),
			},
			{
				id: "pp",
				factor: 10000,
				label: game["i18n"].localize("DND4EBETA.CurrencyPP"),
			},
			{
				id: "gp",
				factor: 100,
				label: game["i18n"].localize("DND4EBETA.CurrencyGP"),
			},
			{
				id: "sp",
				factor: 10,
				label: game["i18n"].localize("DND4EBETA.CurrencySP"),
			},
			{
				id: "cp",
				factor: 1,
				label: game["i18n"].localize("DND4EBETA.CurrencyCP"),
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
