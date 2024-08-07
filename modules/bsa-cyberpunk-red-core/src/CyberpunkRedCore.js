// @ts-ignore
import CPRChat from "../../../systems/cyberpunk-red-core/modules/chat/cpr-chat.js?12";
export class CyberpunkRedCore {
	constructor() {
		this.skillList = [];
	}
	get version() {
		return 2;
	}
	get id() {
		return "cyberpunk-red-core";
	}
	async actorRollSkill(actor, skillId) {
		const pack = game["packs"].get("cyberpunk-red-core.internal_skills");
		const packItem = await pack.getDocument(skillId);
		const item = actor.items.filter(i => i.type === "skill" && packItem?.name === i.name)[0];
		if (!item || !packItem) {
			ui.notifications?.warn("I do not know skill " + skillId);
			return null;
		}
		const x = item.createRoll("skill", actor);
		const doRoll = await x.handleRollDialog({}, actor, item);
		if (doRoll) {
			await x.roll();
			// @ts-ignore
			await CPRChat.RenderRollCard(x);
			x._roll._total = x.resultTotal;
			return x._roll;
		}
		return null;
	}
	async actorRollAbility(actor, abilityId) {
		const x = actor.createRoll("stat", abilityId);
		const doRoll = await x.handleRollDialog({}, actor, null);
		if (doRoll) {
			await x.roll();
			// @ts-ignore
			await CPRChat.RenderRollCard(x);
			x._roll._total = x.resultTotal;
			return x._roll;
		}
		return null;
	}
	actorCurrenciesGet(actor) {
		return { "wealth": actor["system"].wealth.value };
	}
	async actorCurrenciesStore(actor, currencies) {
		await actor.update({ system: { wealth: { value: currencies.wealth } } });
	}
	actorSheetAddTab(sheet, html, actor, tabData, tabBody) {
		const tabs = $(html).find('nav.navtabs-right[data-group="primary"]');
		const tabItem = $('<div class="tab-pink-underlay"><a class="tab-label text-semi tab-indent" data-tab="' + tabData.id + '" title="' + tabData.label + '">' + tabData.label + '</a></div>');
		tabs.append(tabItem);
		const body = $(html).find(".right-content-section");
		const tabContent = $('<div class="tab flexcol" style="width:inherit" data-group="primary" data-tab="' + tabData.id + '"></div>');
		body.append(tabContent);
		tabContent.append(tabBody);
	}
	itemSheetReplaceContent(app, html, element) {
		let value = html.find('.item-details-name').text().trim();
		html.find('.item-details-name').html(`<input name="name" type="text" value='${value}'>`);
		html.find('.item-bottom-tabs-section').remove();
		const sheetBody = html.find('.item-bottom-content-section');
		sheetBody.addClass("flexrow");
		sheetBody.empty();
		sheetBody.append(element);
	}
	get configSkills() {
		if (this.skillList.length === 0) {
			this.skillList = game["packs"].get("cyberpunk-red-core.internal_skills").index.map(skill => {
				return { id: skill._id, label: skill.name };
			});
		}
		return this.skillList;
	}
	get configAbilities() {
		return Object.entries(game["i18n"].translations.CPR.global.stats).map(stat => {
			return {
				id: stat[0],
				label: stat[1]
			};
		});
	}
	get currencyComponent() {
		if (!this._currencyComponent) {
			this._currencyComponent = beaversSystemInterface.componentCreate({
				type: "Currency",
				name: "Eurobucks",
				img: 'modules/bsa-cyberpunk-red-core/icons/money-stack.svg'
			});
		}
		return this._currencyComponent;
	}
	get configCurrencies() {
		return [
			{
				id: "wealth",
				factor: 1,
				label: "Eurobucks",
				component: this.currencyComponent,
			}
		];
	}
	get configCanRollAbility() {
		return true;
	}
	get configLootItemType() {
		return "gear";
	}
	get itemPriceAttribute() {
		return "system.price";
	}
	get itemQuantityAttribute() {
		return "system.amount";
	}
}
