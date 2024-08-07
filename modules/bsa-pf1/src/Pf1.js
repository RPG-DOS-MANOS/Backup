import { CUSTOM_SKILLS, NAMESPACE } from "./PF1Settings.js";
export class pf1 {
	get version() {
		return 2;
	}
	get id() {
		return "pf1";
	}
	async actorRollSkill(actor, skillId) {
		if (!Object.keys(actor.system.skills).includes(skillId)) {
			Object.entries(actor.system.skills).forEach(([id, skill]) => {
				// @ts-ignore
				if (skill.name && skill.name.toLowerCase().trim() === skillId) {
					skillId = id;
				}
				// @ts-ignore
				if (skill.subSkills) {
					// @ts-ignore
					Object.entries(skill.subSkills).forEach(([subId, subSkill]) => {
						// @ts-ignore
						if (subSkill.name && subSkill.name.toLowerCase().trim() === skillId) {
							skillId = `${id}.subSkills.${subId}`;
						}
					});
				}
			});
		}
		const message = await actor.rollSkill(skillId);
		if (!message) {
			return null;
		}
		return message.rolls[0];
	}
	async actorRollAbility(actor, abilityId) {
		const message = await actor.rollAbilityTest(abilityId);
		if (!message) {
			return null;
		}
		return message.rolls[0];
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
		const tabContent = $('<div class="tab flexcol" data-group="primary" data-tab="' + tabData.id + '"></div>');
		body.append(tabContent);
		tabContent.append(tabBody);
	}
	itemSheetReplaceContent(app, html, element) {
		html.find('.sheet-navigation').remove();
		var properties = html.find('.item-properties').clone();
		const sheetBody = html.find('.primary-body');
		sheetBody.addClass("flexrow");
		sheetBody.empty();
		sheetBody.append(properties);
		sheetBody.append(element);
	}
	get configSkills() {
		const customSkillString = game[NAMESPACE].Settings.get(CUSTOM_SKILLS) || "";
		const skills = Object.entries(CONFIG["PF1"].skills).map(skills => {
			return {
				id: skills[0],
				label: skills[1]
			};
		});
		customSkillString.split(",").forEach(skill => {
			skills.push({ id: skill.trim().toLowerCase(), label: skill.trim() });
		});
		return skills;
	}
	get configAbilities() {
		return Object.entries(CONFIG["PF1"].abilitiesShort).map(ab => {
			return {
				id: ab[0],
				label: game["i18n"].localize("PF1.Ability" + ab[1])
			};
		});
	}
	get configCurrencies() {
		return [
			{
				id: "pp",
				factor: 1000,
				label: game["i18n"].localize("PF1.CurrencyPlatinumP"),
			},
			{
				id: "gp",
				factor: 100,
				label: game["i18n"].localize("PF1.CurrencyGoldP"),
			},
			{
				id: "sp",
				factor: 10,
				label: game["i18n"].localize("PF1.CurrencySilverP"),
			},
			{
				id: "cp",
				factor: 1,
				label: game["i18n"].localize("PF1.CurrencyCopperP"),
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
