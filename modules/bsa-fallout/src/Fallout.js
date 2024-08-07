export class Fallout {
	get version() {
		return 2;
	}
	get id() {
		return "fallout";
	}
	async actorRollSkill(actor, skillName) {
		const item = actor.items.find(i => i.type === "skill" && i.name === skillName);
		if (item) {
			// @ts-ignore
			const result = await fallout.Dialog2d20.createDialog({
				rollName: skillName,
				diceNum: 2,
				attribute: actor.system.attributes[item.system.defaultAttribute].value,
				skill: item.system.value,
				tag: item.system.tag,
				complication: parseInt(actor.system.complication)
			});
			let totalFake = 0;
			result.dicesRolled.forEach(d => {
				totalFake += d.success;
			});
			result.roll._total = totalFake;
			return result.roll;
		}
		return null;
	}
	async actorRollAbility(actor, abilityId) {
		throw new Error("can not do this");
	}
	actorCurrenciesGet(actor) {
		return { caps: actor["system"].currency.caps };
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
		html.find('.sheet-tabs').remove();
		const sheetBody = html.find('.sheet-body');
		sheetBody.addClass("flexrow");
		sheetBody.empty();
		sheetBody.append(element);
	}
	get configSkills() {
		return game["bsa-fallout"].Settings.packSkills.map(i => {
			return { id: i.name, label: i.name };
		});
	}
	get configAbilities() {
		return Object.entries(CONFIG["FALLOUT"].attributes).map(([key, value]) => {
			return {
				id: key,
				label: game["i18n"].localize(value)
			};
		});
	}
	get configCurrencies() {
		return [
			{
				id: "caps",
				factor: 1,
				label: "CAPS",
			}
		];
	}
	get configCanRollAbility() {
		return false;
	}
	get configLootItemType() {
		return "miscellany";
	}
	get itemPriceAttribute() {
		return "system.cost";
	}
	get itemQuantityAttribute() {
		return "system.quantity";
	}
}
