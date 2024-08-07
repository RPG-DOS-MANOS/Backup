var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a;
const SETTINGS = {
  // Client settings
  // Module Settings
  SPELL_COMPENDIUM_KEY: "default-spell-compendium",
  // LOOT_SHEET_TO_USE_KEY: "loot-sheet-to-use",
  SHOW_REROLL_BUTTONS: "show-reroll-buttons",
  SHOW_OPEN_BUTTONS: "show-open-buttons",
  // USE_CONDENSED_BETTERROLL: "use-condensed-betterroll",
  ADD_ROLL_IN_COMPENDIUM_CONTEXTMENU: "add-roll-on-compendium-contextmenu",
  ADD_ROLL_IN_ROLLTABLE_CONTEXTMENU: "add-roll-on-rolltable-contextmenu",
  SHOW_WARNING_BEFORE_REROLL: "show-warning-before-reroll",
  STICK_ROLLTABLE_HEADER: "stick-rolltable-header",
  ROLL_TABLE_FROM_JOURNAL: "roll-table-from-journal",
  // ENABLE_OLD_BEHAVIOR: "enableOldBehavior",
  // Loot
  // SHOW_CURRENCY_SHARE_BUTTON: "show-currency-share-button",
  // ALWAYS_SHOW_GENERATED_LOOT_AS_MESSAGE: "always-show-generated-loot-as-message",
  // Harvest
  // ALWAYS_SHOW_GENERATED_HARVEST_AS_MESSAGE: "always-show-generated-harvest-as-message",
  TAGS: {
    USE: "use-tags",
    DEFAULTS: "tag-defaults"
  }
  // Style settings
  /*
      // System Settings
      DEFAULT_ACTOR_NPC_TYPE: "systemDefaultActorNpcType",
      DEFAULT_LOOT_SHEET: "systemDefaultLootSheet",
      DEFAULT_SPELL_COMPENDIUM: "systemDefaultSpellCompendium",
      QUANTITY_PROPERTY_PATH: "systemQuantityPropertyPath",
      WEIGHT_PROPERTY_PATH: "systemWeightPropertyPath",
      PRICE_PROPERTY_PATH: "systemPricePropertyPath",
      SPELL_LEVEL_PATH: "systemSpellLevelPath",
      ITEM_LOOT_TYPE: "systemItemLootType",
      SCROLL_REGEX: "systemScrollRegex",
      MATCH_ATTRIBUTES_BLACKLIST: "systemMatchAttributesBlacklist",
  
      // Hidden settings
      SYSTEM_FOUND: "systemFound",
      SYSTEM_NOT_FOUND_WARNING_SHOWN: "systemNotFoundWarningShown",
      SYSTEM_VERSION: "systemVersion",
      
      GET_DEFAULT() {
          return foundry.utils.deepClone(SETTINGS.DEFAULTS());
      },
  
      GET_SYSTEM_DEFAULTS() {
          return Object.fromEntries(
              Object.entries(SETTINGS.GET_DEFAULT()).filter((entry) => {
                  return entry[1].system;
              }),
          );
      },
  
      DEFAULTS: () => ({
          [SETTINGS.DEFAULT_ACTOR_NPC_TYPE]: {
              scope: "world",
              config: false,
              system: true,
              type: String,
              default: SYSTEMS.DATA.DEFAULT_ACTOR_NPC_TYPE,
          },
          [SETTINGS.DEFAULT_LOOT_SHEET]: {
              scope: "world",
              config: false,
              system: true,
              type: String,
              default: SYSTEMS.DATA.DEFAULT_LOOT_SHEET,
          },
          [SETTINGS.DEFAULT_SPELL_COMPENDIUM]: {
              scope: "world",
              config: false,
              system: true,
              type: String,
              default: SYSTEMS.DATA.DEFAULT_SPELL_COMPENDIUM,
          },
          [SETTINGS.QUANTITY_PROPERTY_PATH]: {
              scope: "world",
              config: false,
              system: true,
              type: String,
              default: SYSTEMS.DATA.QUANTITY_PROPERTY_PATH,
          },
          [SETTINGS.WEIGHT_PROPERTY_PATH]: {
              scope: "world",
              config: false,
              system: true,
              type: String,
              default: SYSTEMS.DATA.WEIGHT_PROPERTY_PATH,
          },
          [SETTINGS.PRICE_PROPERTY_PATH]: {
              scope: "world",
              config: false,
              system: true,
              type: String,
              default: SYSTEMS.DATA.PRICE_PROPERTY_PATH,
          },
          [SETTINGS.SPELL_LEVEL_PATH]: {
              scope: "world",
              config: false,
              system: true,
              type: String,
              default: SYSTEMS.DATA.SPELL_LEVEL_PATH,
          },
          [SETTINGS.ITEM_LOOT_TYPE]: {
              scope: "world",
              config: false,
              system: true,
              type: String,
              default: SYSTEMS.DATA.ITEM_LOOT_TYPE,
          },
          [SETTINGS.SCROLL_REGEX]: {
              scope: "world",
              config: false,
              system: true,
              type: String,
              default: SYSTEMS.DATA.SCROLL_REGEX,
          },
          [SETTINGS.MATCH_ATTRIBUTES_BLACKLIST]: {
              scope: "world",
              config: false,
              system: true,
              type: String,
              default: SYSTEMS.DATA.MATCH_ATTRIBUTES_BLACKLIST,
          },
      }),
      */
};
const CONSTANTS = {
  MODULE_ID: "better-rolltables",
  PATH: "modules/better-rolltables",
  TYPES: ["none", "better", "loot", "harvest", "story"],
  PRE_RESULT_TEXT_ROLL: "/roll ",
  PRE_RESULT_TEXT_ROLLED: "Rolled: ",
  PRE_RESULT_TEXT_CURRENCY: "/currency ",
  FLAGS: {
    LOOT: "loot",
    BETTER: "better",
    LOOT_CURRENCY: "loot.currency",
    LOOT_SHARED: "loot.shared",
    // saved data keys (used e.g. in the rolltableEntity.data.flags)
    TABLE_TYPE_KEY: "table-type",
    GENERIC_AMOUNT_KEY: "loot-amount-key",
    GENERIC_SHOW_HIDDEN_RESULT_ON_CHAT: "brt-show-hidden-result-on-chat",
    GENERIC_DISTINCT_RESULT: "brt-distinct-result",
    GENERIC_DISTINCT_RESULT_KEEP_ROLLING: "brt-distinct-result-keep-rolling",
    GENERIC_USE_PERCENTAGE: "brt-use-percentage",
    GENERIC_SOURCE_VALUE_KEY: "brt-source-value",
    GENERIC_RESULT_UUID: "brt-result-uuid",
    GENERIC_RESULT_CUSTOM_NAME: "brt-result-custom-name",
    GENERIC_RESULT_ORIGINAL_NAME: "brt-result-original-name",
    GENERIC_RESULT_CUSTOM_ICON: "brt-result-custom-icon",
    GENERIC_RESULT_ORIGINAL_ICON: "brt-result-original-icon",
    GENERIC_RESULT_HIDDEN_TABLE: "brt-hidden-table",
    GENERIC_RESULT_SHOW_HIDDEN_RESULT_ON_CHAT: "brt-show-hidden-result-on-chat",
    GENERIC_RESULT_PERCENTAGE_LOW_VALUE: "brt-percentage-low-value",
    GENERIC_RESULT_PERCENTAGE_HIGH_VALUE: "brt-percentage-high-value",
    GENERIC_RESULT_JOURNAL_PAGE_UUID: "brt-result-journal-page-uuid",
    GENERIC_RESULT_CUSTOM_QUANTITY: "brt-result-custom-quantity",
    GENERIC_RESULT_ORIGINAL_QUANTITY: "brt-result-original-quantity",
    // TODO
    // GENERIC_RESULT_CUSTOM_PRICE: "brt-result-custom-price",
    // GENERIC_RESULT_ORIGINAL_PRICE: "brt-result-original-price",
    LOOT_CURRENCY_STRING_KEY: "table-currency-string",
    LOOT_AMOUNT_KEY: "loot-amount-key",
    LOOT_ACTOR_NAME_KEY: "loot-actor-name",
    HARVEST: "harvest",
    HARVEST_AMOUNT_KEY: "loot-amount-key",
    HARVEST_ACTOR_NAME_KEY: "loot-actor-name",
    HARVEST_USE_DYNAMIC_DC: "brt-use-dynamic-dc",
    HARVEST_DC_VALUE_KEY: "brt-dc-value",
    HARVEST_SKILL_VALUE_KEY: "brt-skill-value",
    HARVEST_RESULT_DYNAMIC_DC_VALUE: "brt-result-dynamic-dc-value",
    // /** @deprecated used on the old html view */
    // RESULTS_FORMULA_KEY: "brt-result-formula",
    /** @deprecated it should be replaced in favor of GENERIC_RESULT_CUSTOM_QUANTITY */
    RESULTS_FORMULA_KEY_FORMULA: "brt-result-formula.formula",
    HIDDEN_TABLE: "brt-hidden-table",
    ACTOR_LIST: {
      ROLL_TABLES_LIST: "brt-actor-list-roll-table-list",
      CURRENCIES: "brt-actor-list-currencies"
      // TYPE: "brt-actor-list-type"
    }
  },
  // different type of table type the mod will support. none will basically keep the basic rolltable functionality
  TABLE_TYPE_NONE: "none",
  TABLE_TYPE_BETTER: "better",
  TABLE_TYPE_LOOT: "loot",
  TABLE_TYPE_HARVEST: "harvest",
  TABLE_TYPE_STORY: "story",
  // DEFAULT_HIDDEN_RESULT_IMAGE: "modules/better-rolltables/assets/artwork/unidentified-result.webp",
  // DEFAULT_HIDDEN_RESULT_TEXT: "???",
  // SETTINGS
  SPELL_COMPENDIUM_KEY: SETTINGS.SPELL_COMPENDIUM_KEY,
  // LOOT_SHEET_TO_USE_KEY: SETTINGS.LOOT_SHEET_TO_USE_KEY,
  SHOW_REROLL_BUTTONS: SETTINGS.SHOW_REROLL_BUTTONS,
  SHOW_OPEN_BUTTONS: SETTINGS.SHOW_OPEN_BUTTONS,
  // USE_CONDENSED_BETTERROLL: SETTINGS.USE_CONDENSED_BETTERROLL,
  ADD_ROLL_IN_COMPENDIUM_CONTEXTMENU: SETTINGS.ADD_ROLL_IN_COMPENDIUM_CONTEXTMENU,
  ADD_ROLL_IN_ROLLTABLE_CONTEXTMENU: SETTINGS.ADD_ROLL_IN_ROLLTABLE_CONTEXTMENU,
  SHOW_WARNING_BEFORE_REROLL: SETTINGS.SHOW_WARNING_BEFORE_REROLL,
  STICK_ROLLTABLE_HEADER: SETTINGS.STICK_ROLLTABLE_HEADER,
  ROLL_TABLE_FROM_JOURNAL: SETTINGS.ROLL_TABLE_FROM_JOURNAL,
  // Loot
  // SHOW_CURRENCY_SHARE_BUTTON: SETTINGS.SHOW_CURRENCY_SHARE_BUTTON,
  // ALWAYS_SHOW_GENERATED_LOOT_AS_MESSAGE: SETTINGS.ALWAYS_SHOW_GENERATED_LOOT_AS_MESSAGE,
  // Harvest
  // ALWAYS_SHOW_GENERATED_HARVEST_AS_MESSAGE: SETTINGS.ALWAYS_SHOW_GENERATED_HARVEST_AS_MESSAGE,
  TAGS: {
    USE: SETTINGS.TAGS.USE,
    DEFAULTS: SETTINGS.TAGS.DEFAULTS
  }
  // this are setted on registerSettings
  // QUANTITY_PROPERTY_PATH: null,
  // WEIGHT_PROPERTY_PATH: null,
  // PRICE_PROPERTY_PATH: null,
  // SPELL_LEVEL_PATH: null,
  // ITEM_LOOT_TYPE: null,
  // SCROLL_REGEX: null,
};
const _Logger = class _Logger {
  static get DEBUG() {
    return game.settings.get(CONSTANTS.MODULE_ID, "debug") || game.modules.get("_dev-mode")?.api?.getPackageDebugValue(CONSTANTS.MODULE_ID, "boolean");
  }
  // export let debugEnabled = 0;
  // 0 = none, warnings = 1, debug = 2, all = 3
  static debug(msg, ...args) {
    try {
      if (game.settings.get(CONSTANTS.MODULE_ID, "debug") || game.modules.get("_dev-mode")?.api?.getPackageDebugValue(CONSTANTS.MODULE_ID, "boolean")) {
        console.log(`DEBUG | ${CONSTANTS.MODULE_ID} | ${msg}`, ...args);
      }
    } catch (e) {
      console.error(e.message);
    }
    return msg;
  }
  static logObject(...args) {
    return this.log("", args);
  }
  static log(message, ...args) {
    try {
      message = `${CONSTANTS.MODULE_ID} | ${message}`;
      console.log(message.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return message;
  }
  static notify(message, ...args) {
    try {
      message = `${CONSTANTS.MODULE_ID} | ${message}`;
      ui.notifications?.notify(message);
      console.log(message.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return message;
  }
  static info(info, notify = false, ...args) {
    try {
      info = `${CONSTANTS.MODULE_ID} | ${info}`;
      if (notify) {
        ui.notifications?.info(info);
      }
      console.log(info.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return info;
  }
  static warn(warning, notify = false, ...args) {
    try {
      warning = `${CONSTANTS.MODULE_ID} | ${warning}`;
      if (notify) {
        ui.notifications?.warn(warning);
      }
      console.warn(warning.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return warning;
  }
  static errorObject(...args) {
    return this.error("", false, args);
  }
  static error(error, notify = true, ...args) {
    try {
      error = `${CONSTANTS.MODULE_ID} | ${error}`;
      if (notify) {
        ui.notifications?.error(error);
      }
      console.error(error.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return new Error(error.replace("<br>", "\n"));
  }
  static errorPermanent(error, notify = true, ...args) {
    try {
      error = `${CONSTANTS.MODULE_ID} | ${error}`;
      if (notify) {
        ui.notifications?.error(error, {
          permanent: true
        });
      }
      console.error(error.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return new Error(error.replace("<br>", "\n"));
  }
  static timelog(message) {
    this.warn(Date.now(), message);
  }
  // setDebugLevel = (debugText): void => {
  //   debugEnabled = { none: 0, warn: 1, debug: 2, all: 3 }[debugText] || 0;
  //   // 0 = none, warnings = 1, debug = 2, all = 3
  //   if (debugEnabled >= 3) CONFIG.debug.hooks = true;
  // };
  static dialogWarning(message, icon = "fas fa-exclamation-triangle") {
    return `<p class="${CONSTANTS.MODULE_ID}-dialog">
        <i style="font-size:3rem;" class="${icon}"></i><br><br>
        <strong style="font-size:1.2rem;">${CONSTANTS.MODULE_ID}</strong>
        <br><br>${message}
    </p>`;
  }
};
__name(_Logger, "Logger");
__publicField(_Logger, "i18n", (key) => {
  return game.i18n.localize(key)?.trim();
});
__publicField(_Logger, "i18nFormat", (key, data = {}) => {
  return game.i18n.format(key, data)?.trim();
});
let Logger = _Logger;
const _RetrieveHelpers = class _RetrieveHelpers {
  /**
   *
   * @param {options}
   * @param {string} [options.documentName]
   * @param {string} [options.documentId]
   * @param {("User"|"Folder"|"Actor"|"Item"|"Scene"|"Combat"|"JournalEntry"|"Macro"|"Playlist"|"RollTable"|"Cards"|"ChatMessage"|"Setting"|"FogExploration")} [options.collection]
   * @param {string} [options.documentPack]
   * @param {boolean} [options.ignoreError=false]
   */
  static retrieveUuid({ documentName, documentId, documentCollectionType, documentPack, ignoreError = false }) {
    let uuid = null;
    if (documentCollectionType || pack === "world") {
      const collection = game.collections.get(documentCollectionType);
      if (!collection) {
        Logger.warn(`Cannot retrieve collection for ${collection}`);
      } else {
        const original = documentId ? collection.get(documentId) : null;
        if (original) {
          if (documentName) {
            if (original.name !== documentName)
              ;
            else {
              return original.uuid;
            }
          } else {
            return original.uuid;
          }
        }
        const doc = collection.find((e) => e.id === documentId || e.name === documentName) || null;
        if (doc) {
          return doc.uuid;
        }
      }
    }
    if (documentPack) {
      const pack2 = _RetrieveHelpers.getCompendiumCollectionSync(documentPack, ignoreError);
      if (!pack2) {
        Logger.warn(`Cannot retrieve pack for ${documentPack}`);
      } else {
        const original = documentId ? pack2.index.get(documentId) : null;
        if (original) {
          if (documentName) {
            if (original.name !== documentName)
              ;
            else {
              return original.uuid;
            }
          } else {
            return original.uuid;
          }
        }
        const doc = pack2.index.find((i) => i._id === documentId || i.name === documentName) || null;
        if (doc) {
          return doc.uuid;
        }
      }
    }
    return uuid;
  }
  static getDocument(target) {
    if (_RetrieveHelpers.stringIsUuid(target)) {
      target = fromUuidSync(target);
    }
    return target?.document ?? target;
  }
  static stringIsUuid(inId) {
    const valid = typeof inId === "string" && (inId.match(/\./g) || []).length && !inId.endsWith(".");
    if (valid) {
      return !!fromUuidSync(inId);
    } else {
      return false;
    }
  }
  static getUuid(target) {
    if (_RetrieveHelpers.stringIsUuid(target)) {
      return target;
    }
    const document2 = getDocument(target);
    return document2?.uuid ?? false;
  }
  static getCompendiumCollectionSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`CompendiumCollection is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof CompendiumCollection) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof CompendiumCollection) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      if (game.packs.get(targetTmp)) {
        targetTmp = game.packs.get(targetTmp);
      } else if (!ignoreName && game.packs.getName(targetTmp)) {
        targetTmp = game.packs.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`CompendiumCollection is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`CompendiumCollection is not found`, true, targetTmp);
      }
    }
    if (!(targetTmp instanceof CompendiumCollection)) {
      if (ignoreError) {
        Logger.warn(`Invalid CompendiumCollection`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Invalid CompendiumCollection`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static async getCompendiumCollectionAsync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`CompendiumCollection is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof CompendiumCollection) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof CompendiumCollection) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = await fromUuid(targetTmp);
    } else {
      if (game.packs.get(targetTmp)) {
        targetTmp = game.packs.get(targetTmp);
      } else if (!ignoreName && game.packs.getName(targetTmp)) {
        targetTmp = game.packs.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`CompendiumCollection is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`CompendiumCollection is not found`, true, targetTmp);
      }
    }
    if (!(targetTmp instanceof CompendiumCollection)) {
      if (ignoreError) {
        Logger.warn(`Invalid CompendiumCollection`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Invalid CompendiumCollection`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static getUserSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`User is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof User) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof User) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      if (game.users.get(targetTmp)) {
        targetTmp = game.users.get(targetTmp);
      } else if (!ignoreName && game.users.getName(targetTmp)) {
        targetTmp = game.users.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`User is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`User is not found`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static getActorSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Actor is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Actor) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Actor) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      if (game.actors.get(targetTmp)) {
        targetTmp = game.actors.get(targetTmp);
      } else if (!ignoreName && game.actors.getName(targetTmp)) {
        targetTmp = game.actors.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Actor is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Actor is not found`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static async getActorAsync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Actor is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Actor) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Actor) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = await fromUuid(targetTmp);
    } else {
      if (game.actors.get(targetTmp)) {
        targetTmp = game.actors.get(targetTmp);
      } else if (!ignoreName && game.actors.getName(targetTmp)) {
        targetTmp = game.actors.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Actor is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Actor is not found`, true, targetTmp);
      }
    }
    if (!(targetTmp instanceof Actor)) {
      if (ignoreError) {
        Logger.warn(`Invalid Actor`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Invalid Actor`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static getJournalSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Journal is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Journal) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Journal) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      if (game.journal.get(targetTmp)) {
        targetTmp = game.journal.get(targetTmp);
      } else if (!ignoreName && game.journal.getName(targetTmp)) {
        targetTmp = game.journal.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Journal is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Journal is not found`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static async getJournalAsync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Journal is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Journal) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Journal) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = await fromUuid(targetTmp);
    } else {
      if (game.journal.get(targetTmp)) {
        targetTmp = game.journal.get(targetTmp);
      } else if (!ignoreName && game.journal.getName(targetTmp)) {
        targetTmp = game.journal.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Journal is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Journal is not found`, true, targetTmp);
      }
    }
    if (!(targetTmp instanceof Journal)) {
      if (ignoreError) {
        Logger.warn(`Invalid Journal`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Invalid Journal`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static getMacroSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Macro is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Macro) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Macro) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      if (game.macros.get(targetTmp)) {
        targetTmp = game.macros.get(targetTmp);
      } else if (!ignoreName && game.macros.getName(targetTmp)) {
        targetTmp = game.macros.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Macro is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Macro is not found`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static async getMacroAsync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Macro is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Macro) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Macro) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = await fromUuid(targetTmp);
    } else {
      if (game.macros.get(targetTmp)) {
        targetTmp = game.macros.get(targetTmp);
      } else if (!ignoreName && game.macros.getName(targetTmp)) {
        targetTmp = game.macros.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Macro is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Macro is not found`, true, targetTmp);
      }
    }
    if (!(targetTmp instanceof Macro)) {
      if (ignoreError) {
        Logger.warn(`Invalid Macro`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Invalid Macro`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static getSceneSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Scene is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Scene) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Scene) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      if (game.scenes.get(targetTmp)) {
        targetTmp = game.scenes.get(targetTmp);
      } else if (!ignoreName && game.scenes.getName(targetTmp)) {
        targetTmp = game.scenes.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Scene is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Scene is not found`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static async getSceneAsync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Scene is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Scene) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Scene) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = await fromUuid(targetTmp);
    } else {
      if (game.scenes.get(targetTmp)) {
        targetTmp = game.scenes.get(targetTmp);
      } else if (!ignoreName && game.scenes.getName(targetTmp)) {
        targetTmp = game.scenes.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Scene is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Scene is not found`, true, targetTmp);
      }
    }
    if (!(targetTmp instanceof Scene)) {
      if (ignoreError) {
        Logger.warn(`Invalid Scene`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Invalid Scene`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static getItemSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Item is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Item) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Item) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      if (game.items.get(targetTmp)) {
        targetTmp = game.items.get(targetTmp);
      } else if (!ignoreName && game.items.getName(targetTmp)) {
        targetTmp = game.items.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Item is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Item is not found`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static async getItemAsync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Item is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Item) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Item) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = await fromUuid(targetTmp);
    } else {
      if (game.items.get(targetTmp)) {
        targetTmp = game.items.get(targetTmp);
      } else if (!ignoreName && game.items.getName(targetTmp)) {
        targetTmp = game.items.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Item is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Item is not found`, true, targetTmp);
      }
    }
    if (!(targetTmp instanceof Item)) {
      if (ignoreError) {
        Logger.warn(`Invalid Item`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Invalid Item`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static getPlaylistSoundPathSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`PlaylistSound is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof PlaylistSound) {
      return targetTmp.path;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof PlaylistSound) {
      return targetTmp;
    }
    if (typeof targetTmp === "string" || targetTmp instanceof String) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      targetTmp = game.playlists.contents.flatMap((playlist) => playlist.sounds.contents).find((playlistSound) => {
        return playlistSound.id === targetTmp || playlistSound.name === targetTmp;
      });
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`PlaylistSound is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`PlaylistSound is not found`, true, targetTmp);
      }
    }
    return targetTmp.path;
  }
  static async getPlaylistSoundPathAsync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`PlaylistSound is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof PlaylistSound) {
      return targetTmp.path;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof PlaylistSound) {
      return targetTmp;
    }
    if (typeof targetTmp === "string" || targetTmp instanceof String) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = await fromUuid(targetTmp);
    } else {
      targetTmp = game.playlists.contents.flatMap((playlist) => playlist.sounds.contents).find((playlistSound) => {
        return playlistSound.id === targetTmp || playlistSound.name === targetTmp;
      });
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`PlaylistSound is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`PlaylistSound is not found`, true, targetTmp);
      }
    }
    if (!(targetTmp instanceof PlaylistSound)) {
      if (ignoreError) {
        Logger.warn(`Invalid PlaylistSound`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Invalid PlaylistSound`, true, targetTmp);
      }
    }
    return targetTmp.path;
  }
  static getTokenSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Token is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Token) {
      return targetTmp;
    }
    if (targetTmp instanceof TokenDocument) {
      targetTmp = targetTmp?.object ?? targetTmp;
      return targetTmp;
    }
    if (targetTmp instanceof Actor) {
      if (targetTmp.token) {
        targetTmp = canvas.tokens.get(targetTmp.token);
      } else {
        targetTmp = targetTmp.prototypeToken;
      }
      if (!targetTmp) {
        if (ignoreError) {
          Logger.warn(`Token is not found`, false, targetTmp);
          return;
        } else {
          throw Logger.error(`Token is not found`, true, targetTmp);
        }
      }
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Token) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      targetTmp = canvas.tokens?.placeables.find((t) => {
        return t.id === target;
      });
      if (!ignoreName) {
        targetTmp = canvas.tokens?.placeables.find((t) => {
          return t.name === target;
        });
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Token is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Token is not found`, true, targetTmp);
      }
    }
    targetTmp = targetTmp?.token ?? targetTmp;
    if (targetTmp instanceof TokenDocument) {
      targetTmp = targetTmp?.object ?? targetTmp;
    }
    return targetTmp;
  }
  static getRollTableSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`RollTable is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof RollTable) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof RollTable) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      if (game.tables.get(targetTmp)) {
        targetTmp = game.tables.get(targetTmp);
      } else if (!ignoreName && game.tables.getName(targetTmp)) {
        targetTmp = game.tables.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`RollTable is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`RollTable is not found`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static async getRollTableAsync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`RollTable is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof RollTable) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof RollTable) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = await fromUuid(targetTmp);
    } else {
      if (game.tables.get(targetTmp)) {
        targetTmp = game.tables.get(targetTmp);
      } else if (!ignoreName && game.tables.getName(targetTmp)) {
        targetTmp = game.tables.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`RollTable is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`RollTable is not found`, true, targetTmp);
      }
    }
    if (!(targetTmp instanceof RollTable)) {
      if (ignoreError) {
        Logger.warn(`Invalid RollTable`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Invalid RollTable`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static async getFolderAsync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Folder is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Folder) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Folder) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = await fromUuid(targetTmp);
    } else {
      if (game.folders.get(targetTmp)) {
        targetTmp = game.folders.get(targetTmp);
      } else if (!ignoreName && game.folders.getName(targetTmp)) {
        targetTmp = game.folders.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Folder is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Folder is not found`, true, targetTmp);
      }
    }
    if (!(targetTmp instanceof Folder)) {
      if (ignoreError) {
        Logger.warn(`Invalid Folder`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Invalid Folder`, true, targetTmp);
      }
    }
    return targetTmp;
  }
  static getFolderSync(target, ignoreError = false, ignoreName = true) {
    let targetTmp = target;
    if (!targetTmp) {
      throw Logger.error(`Folder is undefined`, true, targetTmp);
    }
    if (targetTmp instanceof Folder) {
      return targetTmp;
    }
    if (targetTmp.document) {
      targetTmp = targetTmp.document;
    }
    if (targetTmp.uuid) {
      targetTmp = targetTmp.uuid;
    }
    if (targetTmp instanceof Folder) {
      return targetTmp;
    }
    if (_RetrieveHelpers.stringIsUuid(targetTmp)) {
      targetTmp = fromUuidSync(targetTmp);
    } else {
      if (game.folders.get(targetTmp)) {
        targetTmp = game.folders.get(targetTmp);
      } else if (!ignoreName && game.folders.getName(targetTmp)) {
        targetTmp = game.folders.getName(targetTmp);
      }
    }
    if (!targetTmp) {
      if (ignoreError) {
        Logger.warn(`Folder is not found`, false, targetTmp);
        return;
      } else {
        throw Logger.error(`Folder is not found`, true, targetTmp);
      }
    }
    return targetTmp;
  }
};
__name(_RetrieveHelpers, "RetrieveHelpers");
let RetrieveHelpers = _RetrieveHelpers;
const _CompendiumToRollTableDialog = class _CompendiumToRollTableDialog extends Dialog {
  constructor(allCompendiums, itemTypes, { weightPredicate = null } = {}) {
    let compendiumsLength = allCompendiums.length;
    let itemTypesLength = itemTypes.length;
    let thisSystem = game.system.id;
    let windowWidth = 656;
    let compendiumSelect = ``;
    if (allCompendiums.length >= 1) {
      for (let i = 0; i < compendiumsLength; i++) {
        compendiumSelect += `<option value="${allCompendiums[i].metadata.id}">${allCompendiums[i].metadata.label}</option>`;
      }
      compendiumSelect = `<select name="compendiumSelect" style="width: 8em;">${compendiumSelect}</select>`;
    } else {
      compendiumSelect = `<input type="text" value="${allCompendiums[0].metadata.id}" readonly=true name="compendiumSelect" style="width: 8em;">${allCompendiums[0].metadata.id}</input>`;
    }
    function capitalize(string) {
      if (typeof string === "string")
        return string[0].toUpperCase() + string.substring(1);
      return string;
    }
    __name(capitalize, "capitalize");
    let itemTypeSelect = ``;
    for (let i = 0; i < itemTypesLength; i++) {
      itemTypeSelect += `
            <div class="form-group has-boxes">
                <label>${capitalize(itemTypes[i])}</label>
                <div class="form-fields">
                    <input type="checkbox" value="${itemTypes[i]}" class="itemTypeCheckbox">
                </div>
            </div>
            `;
    }
    let spellLevel = [];
    switch (thisSystem) {
      case "dnd5e": {
        spellLevel = [`cantrip`, `1st`, `2nd`, `3rd`, `4th`, `5th`, `6th`, `7th`, `8th`, `9th`];
        break;
      }
      case "sfrpg": {
        for (let i = 0; i < 7; i++) {
          spellLevel.push(i);
        }
        break;
      }
    }
    let spellLevelLength = spellLevel.length;
    let spellLevelSelect = ``;
    for (let i = 0; i < spellLevelLength; i++) {
      spellLevelSelect += `
            <div class="form-group has-boxes">
                <label>${capitalize(spellLevel[i])}</label>
                <div class="form-fields">
                    <input type="checkbox" value="${[i]}" class="spellLevelCheckbox">
                </div>
            </div>
            `;
    }
    let itemRarity = [];
    let itemRaritySelect = ``;
    switch (thisSystem) {
      case "sfrpg": {
        for (let i = 0; i < 22; i++) {
          itemRarity.push(i);
        }
        break;
      }
      case "dnd5e": {
        itemRarity = ["common", "uncommon", "rare", "veryRare", "legendary", "artifact"];
        itemRaritySelect = `
                    <div class="form-group has-boxes">
                        <label>None</label>
                        <div class="form-fields">
                            <input type="checkbox" value="" class="itemRarityCheckbox">
                        </div>
                    </div>
                    `;
        break;
      }
    }
    let itemRarityLength = itemRarity.length;
    for (let i = 0; i < itemRarityLength; i++) {
      itemRaritySelect += `
            <div class="form-group has-boxes">
                <label>${capitalize(itemRarity[i])}</label>
                <div class="form-fields">
                    <input type="checkbox" value="${itemRarity[i]}" class="itemRarityCheckbox">
                </div>
            </div>
            `;
    }
    let content = `
            <div>
                <form>
                    <div class="form-group">
                        <label>Compendium:</label>
                        <div class="form-fields">
                        ${compendiumSelect}
                        </div>
                    </div>
                    <hr>
                    <button id="toggleAll" type="button">Toggle All</button>
                    <input type="checkbox" id="filterTypes">Item Type</input>
                    <div id="itemTypeFilters" class="grid-container" style="display: none; font-size: 80%;">
                        ${itemTypeSelect}
                    </div>
                    <br>
                    <input type="checkbox" id="filterSpells">Spell Level</input>
                    <div id="spellLevelFilters" style="display: none; font-size: 80%; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 2px 8px;">
                        ${spellLevelSelect}
                    </div>
                    <br>
                    <input type="checkbox" id="filterRarity">Rarity</input>
                    <div id="rarityFilters" style="display: none; font-size: 80%; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 2px 8px;">
                        ${itemRaritySelect}
                    </div>
                    <hr>
                    <div id="nameFilters">
                        <button id="addNameFilter" type="button">Add Name Filter</button>
                    </div>
                    <hr>
                    <div id="customFilters">
                        <button id="addCustomFilter" type="button">Add Custom Filter</button>
                    </div>
                    <hr>
                </form>
            </div>`;
    let styles = `
            <style>
                .has-boxes{
                    border: 1px solid #000000;
                    border-radius: 3px;
                    padding: 3px;
                    display: flex;
                    flex-direction: column;
                }
                .has-boxes label {
                    white-space: nowrap;
                    text-overflow: clip;
                    width: 100%;
                }
                .has-boxes .form-fields {
                    display: flex;
                    flex-direction: column;
                }
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 4px 8px;
                  }
            </style>`;
    super(
      {
        title: "Compendium to Rolltable",
        content: content + styles,
        buttons: {
          proceed: {
            icon: "<i class='fas fa-check'></i>",
            label: "OK",
            callback: async (html) => {
              let selected = html.find('select[name="compendiumSelect"]').val();
              let filterTypes = html.find("#filterTypes").prop("checked");
              let selectedItems = filterTypes ? Array.from(html[0].querySelectorAll(".itemTypeCheckbox:checked")).map(
                (checkbox) => checkbox.value
              ) : itemTypes;
              let filterSpells = html.find("#filterSpells").prop("checked");
              let selectedSpellLevels = filterSpells ? Array.from(html[0].querySelectorAll(".spellLevelCheckbox:checked")).map(
                (checkbox) => parseInt(checkbox.value)
              ) : Array.from({ length: 10 }, (_, i) => i);
              let filterRarity = html.find("#filterRarity").prop("checked");
              let selectedRarities = filterRarity ? Array.from(html[0].querySelectorAll(".itemRarityCheckbox:checked")).map(
                (checkbox) => checkbox.value
              ) : itemRarity;
              let nameFilterSections = html.find(".nameFilterSection");
              let nameFilters = nameFilterSections.map(function() {
                return {
                  filterName: $(this).find(".filterName").val().trim(),
                  filterNameExclude: $(this).find(".filterNameExclude").prop("checked")
                };
              }).get();
              let customFilterSections = html.find(".customFilterSection");
              let customFilters = customFilterSections.map(function() {
                return {
                  filterPath: $(this).find(".filterPath").val().trim(),
                  filterRequirements: $(this).find(".filterRequirements").val().trim().split(",").map((req) => req.trim())
                };
              }).get();
              const myPack = await RetrieveHelpers.getCompendiumCollectionAsync(selected, false, false);
              let compendium = myPack;
              let msg = {
                name: compendium.metadata.label,
                title: compendium.title ?? compendium.metadata.name
              };
              Logger.info(
                game.i18n.format(`${CONSTANTS.MODULE_ID}.api.msg.startRolltableGeneration`, msg),
                true
              );
              const document2 = await this.fromCompendium(
                customFilters,
                nameFilters,
                selectedItems,
                selectedSpellLevels,
                filterRarity,
                selectedRarities,
                weightPredicate,
                compendium
              );
              Logger.info(
                game.i18n.format(`${CONSTANTS.MODULE_ID}.api.msg.rolltableGenerationFinished`, msg),
                true
              );
              return document2;
            },
            height: 40
          },
          cancel: {
            icon: "<i class='fas fa-times'></i>",
            label: "Cancel",
            callback: () => {
            },
            height: 40
          }
        },
        default: "cancel"
      },
      {
        width: windowWidth,
        resizable: true
      }
    );
  }
  activateListeners(html) {
    html.find("#toggleAll").on("click", async () => {
      let itemTypeCheckboxes = html.find(".itemTypeCheckbox");
      let spellLevelCheckboxes = html.find(".spellLevelCheckbox");
      let itemRarityCheckboxes = html.find(".itemRarityCheckbox");
      let allCheckboxes = itemTypeCheckboxes.add(spellLevelCheckboxes).add(itemRarityCheckboxes);
      let shouldCheckAll = allCheckboxes.toArray().some((checkbox) => !checkbox.checked);
      allCheckboxes.prop("checked", shouldCheckAll);
    });
    html.find("#filterTypes").on("change", (e) => {
      let isChecked = e.target.checked;
      if (isChecked) {
        html.find("#itemTypeFilters").css("display", "grid");
      } else {
        html.find("#itemTypeFilters").css("display", "none");
      }
    });
    html.find("#filterSpells").on("change", (e) => {
      let isChecked = e.target.checked;
      if (isChecked) {
        html.find("#spellLevelFilters").css("display", "grid");
      } else {
        html.find("#spellLevelFilters").css("display", "none");
      }
    });
    html.find("#filterRarity").on("change", (e) => {
      let isChecked = e.target.checked;
      if (isChecked) {
        html.find("#rarityFilters").css("display", "grid");
      } else {
        html.find("#rarityFilters").css("display", "none");
      }
    });
    html.find("#addCustomFilter").on("click", () => {
      const customFilterSection = this.createCustomFilterSection();
      html.find("#customFilters").append(customFilterSection);
    });
    html.find("#addNameFilter").on("click", () => {
      const nameFilterSection = this.createNameFilterSection();
      html.find("#nameFilters").append(nameFilterSection);
    });
    super.activateListeners(html);
  }
  /* ======================================== */
  // capitalize(string) {
  //   if (typeof string === "string") return string[0].toUpperCase() + string.substring(1);
  //   return string;
  // }
  getValueByPath(obj, path) {
    let parts = path.split(".");
    let current = obj;
    for (let part of parts) {
      if (current[part] !== void 0) {
        current = current[part];
      } else {
        return void 0;
      }
    }
    return current;
  }
  createCustomFilterSection() {
    const section = document.createElement("div");
    section.className = "customFilterSection";
    section.innerHTML = `
            <hr>
            <div class="form-group">
                <label>Path:</label>
                <div class="form-fields">
                    <input type="text" class="filterPath" placeholder="system.baseItem"></input>
                </div>
            </div>
            <div class="form-group">
                <label>Requirements:</label>
                <div class="form-fields">
                    <input type="text" class="filterRequirements" placeholder="battleaxe, longbow"></input>
                </div>
            </div>`;
    return section;
  }
  createNameFilterSection() {
    const section = document.createElement("div");
    section.className = "nameFilterSection";
    section.innerHTML = `
            <hr>
            <div class="form-group">
                <label>Name Contains:</label>
                <div class="form-fields">
                    <input type="text" class="filterName" placeholder="arrow"></input>
                </div>
                <input type="checkbox" class="filterNameExclude">Exclude</input>
            </div>`;
    return section;
  }
  caseInsensitiveIncludes(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
  }
  async fromCompendiumSimple(compendium, options2 = {}) {
    const results2 = await compendium.index.map((e, i) => {
      Logger.log("Compendium Item:");
      Logger.log(e);
      Logger.log("Compendium Index:");
      Logger.log(i);
      return {
        text: e.name,
        type: CONST.TABLE_RESULT_TYPES.COMPENDIUM,
        collection: compendium.type,
        resultId: e.id ? e.id : e._id,
        img: e.thumbnail || e.img || CONFIG.RollTable.resultIcon,
        weight: 1,
        range: [i + 1, i + 1],
        documentCollection: `${compendium.metadata.packageName}.${compendium.metadata.name}`,
        drawn: false
      };
    });
    return await this.createCompendiumFromData(compendium.metadata.label, results2, `1d${results2.length}`, options2);
  }
  async fromCompendium(customFilters, nameFilters, selectedItems, selectedSpellLevels, filterRarity, selectedRarities, weightPredicate, compendium, options2 = {}) {
    const entries = await compendium.getDocuments();
    const filteredEntries = entries.filter((entry) => {
      let customFiltersValid = customFilters.every(({ filterPath, filterRequirements }) => {
        let filterPathValue = this.getValueByPath(entry, filterPath);
        let filterPathValid = filterPath.length === 0 || filterRequirements.length > 0 && filterPathValue !== void 0 && filterRequirements.map(String).includes(String(filterPathValue));
        return filterPathValid;
      });
      let nameFilterValid = nameFilters.every(({ filterName, filterNameExclude }) => {
        return filterName.length === 0 || (filterNameExclude ? !this.caseInsensitiveIncludes(filterName, entry.name) : this.caseInsensitiveIncludes(filterName, entry.name));
      });
      let itemTypeValid = selectedItems.includes(entry.type);
      let spellLevelValid = entry.system.type !== "spell" && entry.type !== "spell" || selectedSpellLevels.includes(entry.system.level);
      let rarityValid = !filterRarity || entry.system.rarity && selectedRarities.includes(entry.system.rarity);
      return customFiltersValid && nameFilterValid && itemTypeValid && spellLevelValid && rarityValid;
    });
    if (filteredEntries.length === 0) {
      return Logger.error("No valid items within compendium for selected filters.", true);
    }
    const results2 = filteredEntries.map((entry, i) => {
      Logger.debug("Compendium Item:");
      Logger.debug(entry);
      Logger.debug("Compendium Index:");
      Logger.debug(i);
      return {
        text: entry.name,
        type: CONST.TABLE_RESULT_TYPES.COMPENDIUM,
        collection: compendium.type,
        resultId: entry.id,
        img: entry.thumbnail || entry.img || CONFIG.RollTable.resultIcon,
        weight: weightPredicate ? weightPredicate(item) : 1,
        range: [i + 1, i + 1],
        documentCollection: `${compendium.metadata.packageName}.${compendium.metadata.name}`,
        drawn: false
      };
    });
    return await this.createCompendiumFromData(compendium.metadata.label, results2, `1d${results2.length}`, options2);
  }
  async createCompendiumFromData(compendiumName, results2, formula, options2 = {}) {
    options2.renderSheet = options2.renderSheet ?? true;
    const documents = [];
    const document2 = await RollTable.create(
      {
        name: compendiumName + " RollTable",
        description: `A random table created from the contents of the ${compendiumName} compendium.`,
        results: results2,
        formula: formula ?? `1d${results2.length}`
      },
      options2
    );
    documents.push(document2);
    return documents;
  }
};
__name(_CompendiumToRollTableDialog, "CompendiumToRollTableDialog");
let CompendiumToRollTableDialog = _CompendiumToRollTableDialog;
function isEmptyObject(obj) {
  if (obj === null || obj === void 0) {
    return true;
  }
  if (isRealNumber(obj)) {
    return false;
  }
  if (obj instanceof Object && Object.keys(obj).length === 0) {
    return true;
  }
  if (obj instanceof Array && obj.length === 0) {
    return true;
  }
  if (obj && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}
__name(isEmptyObject, "isEmptyObject");
function isRealNumber(inNumber) {
  return !isNaN(inNumber) && typeof inNumber === "number" && isFinite(inNumber);
}
__name(isRealNumber, "isRealNumber");
function isRealBoolean(inBoolean) {
  return String(inBoolean) === "true" || String(inBoolean) === "false";
}
__name(isRealBoolean, "isRealBoolean");
function isRealBooleanOrElseNull(inBoolean) {
  return isRealBoolean(inBoolean) ? inBoolean : null;
}
__name(isRealBooleanOrElseNull, "isRealBooleanOrElseNull");
function getSubstring(string, char1, char2) {
  return string.slice(string.indexOf(char1) + 1, string.lastIndexOf(char2));
}
__name(getSubstring, "getSubstring");
function parseAsArray(obj) {
  if (!obj) {
    return [];
  }
  let arr = [];
  if (typeof obj === "string" || obj instanceof String) {
    arr = obj.split(",");
  } else if (obj.constructor === Array) {
    arr = obj;
  } else {
    arr = [obj];
  }
  return arr;
}
__name(parseAsArray, "parseAsArray");
function getRollMode(mode) {
  switch (mode) {
    case "r":
    case "roll": {
      return "roll";
    }
    case "pr":
    case "publicroll": {
      return "publicroll";
    }
    case "gmr":
    case "gmroll": {
      return "gmroll";
    }
    case "br":
    case "broll":
    case "blindroll": {
      return "blindroll";
    }
    case "sr":
    case "selfroll": {
      return "selfroll";
    }
  }
}
__name(getRollMode, "getRollMode");
async function tryToConvertToNumber(elementToConvertToNumber) {
  if (elementToConvertToNumber) {
    if (isRealNumber(elementToConvertToNumber))
      ;
    else if (String(elementToConvertToNumber) === "0") {
      elementToConvertToNumber = 0;
    } else {
      let elementI = null;
      try {
        elementI = Number(elementToConvertToNumber);
      } catch (e) {
      }
      if (elementI && isRealNumber(elementI)) {
        elementToConvertToNumber = elementI;
      } else {
        elementToConvertToNumber = await BRTBetterHelpers.tryRoll(elementToConvertToNumber, 0);
      }
    }
  } else {
    elementToConvertToNumber = 0;
  }
  return elementToConvertToNumber;
}
__name(tryToConvertToNumber, "tryToConvertToNumber");
function tryToConvertToNumberSync(elementToConvertToNumber) {
  if (elementToConvertToNumber) {
    if (isRealNumber(elementToConvertToNumber))
      ;
    else if (String(elementToConvertToNumber) === "0") {
      elementToConvertToNumber = 0;
    } else {
      let elementI = null;
      try {
        elementI = Number(elementToConvertToNumber);
      } catch (e) {
      }
      if (elementI && isRealNumber(elementI)) {
        elementToConvertToNumber = elementI;
      } else {
        elementToConvertToNumber = BRTBetterHelpers.tryRollSync(elementToConvertToNumber, 0);
      }
    }
  } else {
    elementToConvertToNumber = 0;
  }
  return elementToConvertToNumber;
}
__name(tryToConvertToNumberSync, "tryToConvertToNumberSync");
const _BRTUtils = class _BRTUtils {
  static addRollModeToChatData(chatData, rollMode) {
    rollMode = rollMode ?? game.settings.get("core", "rollMode");
    if (String(getProperty(chatData, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HIDDEN_TABLE}`)) === "true") {
      rollMode = "gmroll";
    }
    switch (rollMode) {
      case "blindroll":
        chatData.blind = true;
      case "gmroll":
        chatData.whisper = [game.users.find((u) => u.isGM).id];
        break;
      case "selfroll":
        chatData.whisper = [game.userId];
        break;
    }
  }
  /**
   *
   * @param {string} compendiumName
   * @param {string} entityName
   *
   * @returns {Item}
   */
  static async findInCompendiumByName(compendiumName, entityName) {
    const myPack = await RetrieveHelpers.getCompendiumCollectionAsync(compendiumName, true, false);
    const compendium = myPack;
    if (compendium) {
      const entry = compendium.index.getName(entityName);
      if (entry) {
        return await compendium.getDocument(entry._id);
      }
    } else {
      switch (compendiumName) {
        case "RollTable":
          return game.tables.getName(entityName);
        case "Actor":
          return game.actors.getName(entityName);
        case "Item":
          return game.items.getName(entityName);
        case "JournalEntry":
          return game.journal.getName(entityName);
        case "Playlist":
          return game.playlists.getName(entityName);
        case "Scene":
          return game.scenes.getName(entityName);
        case "Macro":
          return game.macros.getName(entityName);
        case "Card":
          return game.cards.getName(entityName);
      }
    }
  }
  static async findInCompendiumById(compendiumName, entityId) {
    const myPack = await RetrieveHelpers.getCompendiumCollectionAsync(compendiumName, false, false);
    return await myPack?.getDocument(entityId);
  }
  static separateIdComendiumName(stringWithComendium) {
    const split = stringWithComendium.split(".");
    const nameOrId = split.pop().trim();
    const compendiumName = split.join(".").trim();
    return {
      nameOrId,
      compendiumName
    };
  }
  /**
   *
   * @param {TableResult} result reference to item
   * @returns {object|boolean} item from compendium
   */
  static async getItemFromCompendium(result) {
    let nameEntry = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_NAME}`
    ) ? getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_NAME}`) : result.text;
    return _BRTUtils.findInCompendiumByName(result.collection, nameEntry);
  }
  /**
   *
   * @param {object} compendium reference to compendium to roll
   * @returns {object} item from compendium
   */
  static async getRandomItemFromCompendium(compendium) {
    const myPack = await RetrieveHelpers.getCompendiumCollectionAsync(compendium, true, false);
    const pack2 = myPack;
    if (!pack2) {
      return;
    }
    const size = pack2.index.size;
    if (size === 0) {
      Logger.warn(`Compendium ${pack2.title} is empty.`, true);
      return;
    }
    const randonIndex = Math.floor(Math.random() * size);
    const randomItem = pack2.index.contents[randonIndex];
    return pack2.getDocument(randomItem._id);
  }
  static getIconByEntityType(entityType) {
    switch (entityType) {
      case "RollTable":
        return "fa-th-list";
      case "Actor":
        return "fa-user";
      case "Item":
        return "fa-suitcase";
      case "JournalEntry":
        return "fa-book-open";
      case "Playlist":
        return "fa-music";
      case "Scene":
        return "fa-map";
      case "Macro":
        return "fa-terminal";
      default:
        return "";
    }
  }
  /**
   *
   * @param {RollTable} tableEntity
   * @param {Object} options
   * @param {Roll|string} options.roll An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} options.recursive Allow drawing recursively from inner RollTable results
   * @param {boolean} options.displayChat Whether to automatically display the results in chat
   * @param {number} options.rollsAmount
   * @param {number} options.dc
   * @param {string} options.skill
   * @param {boolean} options.isTokenActor
   * @param {boolean} options.stackSame
   * @param {string} options.customRoll
   * @param {number} options.itemLimit
   * @param {string} options.rollMode
   * @param {string} options.distinct
   * @param {string} options.distinctKeepRolling
   * @param {string} options.rollAsTableType
   * @returns {Promise<{rollsAmount: number, dc: number, skill: string, isTokenActor: boolean, stackSame: boolean, customRoll: string, itemLimit: number, rollMode: string, distinct: boolean, distinctKeepRolling: string; rollAsTableType:string;}>},
   */
  static async updateOptions(tableEntity, options2 = {}) {
    let newOptions = {};
    if (!options2) {
      options2 = {};
    }
    let rollsAmount = void 0;
    if (options2?.rollsAmount) {
      if (isRealNumber(options2?.rollsAmount)) {
        rollsAmount = options2?.rollsAmount;
      } else {
        rollsAmount = await BRTBetterHelpers.tryRoll(options2?.rollsAmount);
      }
    } else {
      rollsAmount = await BRTBetterHelpers.rollsAmount(tableEntity);
    }
    newOptions.rollsAmount = rollsAmount;
    let dc = options2?.dc || getProperty(tableEntity, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_DC_VALUE_KEY}`) || void 0;
    if (dc) {
      if (isRealNumber(dc))
        ;
      else if (String(dc) === "0") {
        dc = 0;
      } else {
        let dcI = null;
        try {
          dcI = Number(dc);
        } catch (e) {
        }
        if (dcI && isRealNumber(dcI)) {
          dc = dcI;
        } else {
          dc = await BRTBetterHelpers.tryRoll(dc);
        }
      }
    }
    newOptions.dc = dc;
    newOptions.skill = options2?.skill || getProperty(tableEntity, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_SKILL_VALUE_KEY}`) || void 0;
    newOptions.skills = parseAsArray(newOptions.skill);
    newOptions.isTokenActor = isRealBoolean(options2?.isTokenActor) ? String(options2?.isTokenActor) === "true" ? true : false : false;
    newOptions.stackSame = isRealBoolean(options2?.stackSame) ? String(options2?.stackSame) === "true" ? true : false : true;
    let customRole = options2?.customRole ? options2.customRole : void 0;
    if (!customRole) {
      customRole = options2?.customRoll ? options2.customRoll : void 0;
    }
    newOptions.customRoll = customRole;
    newOptions.itemLimit = options2?.itemLimit && isRealNumber(options2.itemLimit) ? Number(options2.itemLimit) : 0;
    let rollMode = options2?.rollMode ?? null;
    if (String(getProperty(tableEntity, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HIDDEN_TABLE}`)) === "true") {
      rollMode = "gmroll";
    }
    newOptions.rollMode = getRollMode(rollMode);
    let distinct = isRealBooleanOrElseNull(options2?.distinct);
    if (distinct === null) {
      distinct = isRealBooleanOrElseNull(
        getProperty(tableEntity, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_DISTINCT_RESULT}`)
      );
    }
    if (distinct === null) {
      distinct = void 0;
    }
    newOptions.distinct = isRealBoolean(distinct) ? String(distinct) === "true" ? true : false : false;
    let distinctKeepRolling = isRealBooleanOrElseNull(options2?.distinctKeepRolling);
    if (distinctKeepRolling === null) {
      distinctKeepRolling = isRealBooleanOrElseNull(
        getProperty(
          tableEntity,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_DISTINCT_RESULT_KEEP_ROLLING}`
        )
      );
    }
    if (distinctKeepRolling === null) {
      distinctKeepRolling = void 0;
    }
    newOptions.distinctKeepRolling = isRealBoolean(distinctKeepRolling) ? String(distinctKeepRolling) === "true" ? true : false : false;
    newOptions.resetTable = isRealBoolean(options2?.resetTable) ? String(options2?.resetTable) === "true" ? true : false : true;
    newOptions.normalizeTable = isRealBoolean(options2?.normalizeTable) ? String(options2?.normalizeTable) === "true" ? true : false : false;
    newOptions.displayChat = isRealBoolean(options2?.displayChat) ? String(options2?.displayChat) === "true" ? true : false : true;
    let usePercentage = isRealBooleanOrElseNull(options2?.usePercentage);
    if (usePercentage === null) {
      usePercentage = isRealBooleanOrElseNull(
        getProperty(tableEntity, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_USE_PERCENTAGE}`)
      );
    }
    if (usePercentage === null) {
      usePercentage = void 0;
    }
    newOptions.usePercentage = isRealBoolean(usePercentage) ? String(usePercentage) === "true" ? true : false : false;
    let useDynamicDc = isRealBooleanOrElseNull(options2?.useDynamicDc);
    if (useDynamicDc === null) {
      useDynamicDc = isRealBooleanOrElseNull(
        getProperty(tableEntity, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_USE_DYNAMIC_DC}`)
      );
    }
    if (useDynamicDc === null) {
      useDynamicDc = void 0;
    }
    newOptions.useDynamicDc = isRealBoolean(useDynamicDc) ? String(useDynamicDc) === "true" ? true : false : false;
    newOptions.recursive = isRealBoolean(options2.recursive) ? String(options2.recursive) === "true" ? true : false : true;
    newOptions.roll = options2.roll ? String(options2.roll) : null;
    let brtTypeToCheck = _BRTUtils.retrieveBRTType(tableEntity, options2?.rollAsTableType);
    if (!CONSTANTS.TYPES.includes(brtTypeToCheck)) {
      brtTypeToCheck = null;
    }
    if (brtTypeToCheck === "none") {
      brtTypeToCheck = null;
    }
    newOptions.rollAsTableType = brtTypeToCheck;
    newOptions.rollAsTableTypeAllTheTables = isRealBoolean(options2.rollAsTableTypeAllTheTables) ? String(options2.rollAsTableTypeAllTheTables) === "true" ? true : false : false;
    return newOptions;
  }
  /**
   * @deprecated try to not use this anymore
   * @param {*} itemsData
   * @param {*} itemEntity
   * @param {*} itemData
   * @param {*} isHidden
   * @returns
   */
  static async addToItemData(itemsData, itemEntity, itemData = {}, isHidden = false) {
    const existingItem = itemsData.find((i) => i.item.id === itemEntity.id);
    const quantity = getProperty(itemData, game.itempiles.API.ITEM_QUANTITY_ATTRIBUTE) || 1;
    if (existingItem) {
      existingItem.quantity = existingItem.quantity + quantity;
    } else {
      const fontSize = Math.max(60, 100 - Math.max(0, (itemEntity.name || itemEntity.text).length - 27) * 2);
      let type = void 0;
      if (itemEntity.isText) {
        type = CONST.TABLE_RESULT_TYPES.TEXT;
      } else if (itemEntity.pack) {
        type = CONST.TABLE_RESULT_TYPES.COMPENDIUM;
      } else {
        type = CONST.TABLE_RESULT_TYPES.DOCUMENT;
      }
      let resultDoc = itemEntity;
      itemsData.push({
        documentName: resultDoc.documentName,
        compendiumName: resultDoc.pack,
        type,
        item: {
          id: resultDoc.id,
          _id: resultDoc.id,
          name: resultDoc.name,
          img: resultDoc.img ?? resultDoc.src ?? `icons/svg/d20-highlight.svg`,
          text: resultDoc.text ?? resultDoc.name ?? "",
          uuid: resultDoc?.uuid ?? "",
          isHidden
        },
        quantity,
        // weight: weight,
        fontSize
      });
    }
    return itemsData;
  }
  static isTableResultText(result) {
    return result?.type === CONST.TABLE_RESULT_TYPES.TEXT;
  }
  static isTableResultDocument(result) {
    return result?.type === CONST.TABLE_RESULT_TYPES.DOCUMENT;
  }
  static isTableResultCompendium(result) {
    return result?.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM;
  }
  static retrieveBRTType(tableEntity, rollAsTableType = null, returnFlag = false) {
    let brtTypeToCheck = rollAsTableType ? rollAsTableType : getProperty(tableEntity, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.TABLE_TYPE_KEY}`);
    if (returnFlag) {
      return brtTypeToCheck;
    }
    if (!CONSTANTS.TYPES.includes(brtTypeToCheck)) {
      brtTypeToCheck = null;
    }
    if (brtTypeToCheck === "none") {
      brtTypeToCheck = null;
    }
    return brtTypeToCheck;
  }
  static retrieveBRTRollAmount(tableEntity, rollAmount = null) {
    let brtRollAmountToCheck = rollAmount ? rollAmount : getProperty(tableEntity, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_AMOUNT_KEY}`);
    if (!brtRollAmountToCheck && tableEntity.quantity) {
      brtRollAmountToCheck = tableEntity.quantity;
    }
    return brtRollAmountToCheck;
  }
  /**
   * @href https://github.com/krbz999/simple-loot-list/blob/main/module/module.mjs
   * @param {RollTable|string|UUID} tableEntity
   * @returns {Promise<Item[]>}
   */
  static async extractItemsFromRollTAble(tableEntity) {
    const table = await RetrieveHelpers.getRollTableAsync(tableEntity);
    const TYPES = CONST.TABLE_RESULT_TYPES;
    const uuids = table.results.filter((result) => {
      return [TYPES.DOCUMENT, TYPES.COMPENDIUM].includes(result.type) && !!result.documentCollection;
    }).map((result) => {
      if (result.type === TYPES.DOCUMENT) {
        return `${result.documentCollection}.${result.documentId}`;
      }
      return `Compendium.${result.documentCollection}.Item.${result.documentId}`;
    });
    if (!uuids.length) {
      Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningEmptyDocument`, {}), true);
      return false;
    }
    const promises = uuids.map((uuid) => fromUuid(uuid));
    const resolved = await Promise.all(promises);
    const items = resolved;
    if (!items.length) {
      Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningEmptyDocument`, {}), true);
      return false;
    }
    return items;
  }
};
__name(_BRTUtils, "BRTUtils");
let BRTUtils = _BRTUtils;
const _CompendiumsHelpers = class _CompendiumsHelpers {
  static async initializeCompendiumCache() {
  }
  static async getCompendiumAsync(packId) {
    if (!packId) {
      throw Logger.error(`No packId is been passed`);
    }
    let compendium = await RetrieveHelpers.getCompendiumCollectionAsync(packId, true, false);
    return compendium;
  }
  static async getCompendiumSync(packId) {
    if (!packId) {
      throw Logger.error(`No packId is been passed`);
    }
    let compendium = await RetrieveHelpers.getCompendiumCollectionSync(packId, false, false);
    return compendium;
  }
  static async getDocumentCompendiumAsync(packId, options2 = { name: "", type: "", id: "", uuid: "" }) {
    if (!packId) {
      throw Logger.error(`No packId is been passed`);
    }
    let compendium = await RetrieveHelpers.getCompendiumCollectionAsync(packId, false, false);
    const { name, type, id, uuid } = options2;
    const document2 = (await compendium?.getDocuments()).find((compendiumDocument) => {
      let isFound = true;
      if (isFound && type) {
        isFound = compendiumDocument.type === type;
      }
      if (isFound && name) {
        isFound = compendiumDocument.name === name;
      }
      if (isFound && id) {
        isFound = compendiumDocument.id === id || compendiumDocument._id === id;
      }
      if (isFound && uuid) {
        isFound = compendiumDocument.uuid === uuid;
      }
      return isFound;
    });
    return document2;
  }
  static getDocumentCompendiumSync(packId, options2 = { name: "", type: "", id: "", uuid: "" }) {
    if (!packId) {
      throw Logger.error(`No packId is been passed`);
    }
    let compendium = RetrieveHelpers.getCompendiumCollectionSync(packId, true, false);
    const { name, type, id, uuid } = options2;
    const document2 = compendium.index.find((compendiumDocument) => {
      let isFound = true;
      if (isFound && type) {
        isFound = compendiumDocument.type === type;
      }
      if (isFound && name) {
        isFound = compendiumDocument.name === name;
      }
      if (isFound && id) {
        isFound = compendiumDocument.id === id || compendiumDocument._id === id;
      }
      if (isFound && uuid) {
        isFound = compendiumDocument.uuid === uuid;
      }
      return isFound;
    });
    return document2;
  }
  static async addDocumentsToCompendium(packId, documents) {
    if (!packId) {
      throw Logger.error(`No packId is been passed`);
    }
    const documentsMapAdded = /* @__PURE__ */ new Map();
    for (const documentToAdd of documents) {
      if (documentToAdd.type === "Actor") {
        const list = documentsMapAdded.get("Actor", documentToAdd) || [];
        list.push(documentToAdd);
        documentsMapAdded.set("Actor", list);
      } else if (documentToAdd.type === "Cards") {
        const list = documentsMapAdded.get("Cards", documentToAdd) || [];
        list.push(documentToAdd);
        documentsMapAdded.set("Cards", list);
      } else if (documentToAdd.type === "Item") {
        const list = documentsMapAdded.get("Item", documentToAdd) || [];
        list.push(documentToAdd);
        documentsMapAdded.set("Item", list);
      } else if (documentToAdd.type === "Scene") {
        const list = documentsMapAdded.get("Scene", documentToAdd) || [];
        list.push(documentToAdd);
        documentsMapAdded.set("Scene", list);
      } else if (documentToAdd.type === "JournalEntry") {
        const list = documentsMapAdded.get("JournalEntry", documentToAdd) || [];
        list.push(documentToAdd);
        documentsMapAdded.set("JournalEntry", list);
      } else if (documentToAdd.type === "Macro") {
        const list = documentsMapAdded.get("Macro", documentToAdd) || [];
        list.push(documentToAdd);
        documentsMapAdded.set("Macro", list);
      } else if (documentToAdd.type === "RollTable") {
        const list = documentsMapAdded.get("RollTable", documentToAdd) || [];
        list.push(documentToAdd);
        documentsMapAdded.set("RollTable", list);
      } else if (documentToAdd.type === "PlaylistSound") {
        const list = documentsMapAdded.get("PlaylistSound", documentToAdd) || [];
        list.push(documentToAdd);
        documentsMapAdded.set("PlaylistSound", list);
      } else {
        throw Logger.error(`This document type ${documentToAdd?.type} is not supported`, false, documentToAdd);
      }
    }
    for (let [documentType, documents2] of documentsMapAdded) {
      Logger.log(`Add documents ${documentType} to ${packId}:`, documents2);
      if (documentType === "Actor") {
        Actor.createDocuments(documents2, { pack: packId });
      } else if (documentType === "Cards") {
        Cards.createDocuments(documents2, { pack: packId });
      } else if (documentType === "Item") {
        Item.createDocuments(documents2, { pack: packId });
      } else if (documentType === "Scene") {
        Scene.createDocuments(documents2, { pack: packId });
      } else if (documentType === "JournalEntry") {
        JournalEntry.createDocuments(documents2, { pack: packId });
      } else if (documentType === "Macro") {
        Macro.createDocuments(documents2, { pack: packId });
      } else if (documentType === "RollTable") {
        RollTable.createDocuments(documents2, { pack: packId });
      } else if (documentType === "PlaylistSound") {
        PlaylistSound.createDocuments(documents2, { pack: packId });
      } else {
        throw Logger.error(`This document type ${documentType} is not supported`, false);
      }
    }
    return documentsMapAdded;
  }
  static async findSimilarDocumentInCompendiumAsync(packId, documentReference) {
    if (!packId) {
      throw Logger.error(`No packId is been passed`);
    }
    const uuid = RetrieveHelpers.getUuid(documentReference);
    if (!uuid) {
      Logger.warn(`Cannot find document with '${documentReference}'`);
      return;
    }
    const documentToFind = await fromUuid(uuid);
    const pack2 = await _CompendiumsHelpers.getCompendiumAsync(packId);
    const document2 = game.packs.get(packId).index.find((compendiumDocument) => {
      return compendiumDocument.name === documentToFind.name && compendiumDocument.type === documentToFind.type;
    });
    return document2?._id ? pack2.getDocument(document2._id) : false;
  }
  static getDocumentFromCache(uuid) {
    return COMPENDIUM_CACHE[uuid] ?? false;
  }
  static async findOrCreateDocumentInCompendium(packId, documentData) {
    if (!packId) {
      throw Logger.error(`No packId is been passed`);
    }
    let compendiumToCheck = await _CompendiumsHelpers.findSimilarDocumentInCompendiumAsync(packId, documentData);
    if (!compendiumToCheck) {
      compendiumToCheck = (await _CompendiumsHelpers.addDocumentsToCompendium(packId, [documentData]))[0];
    }
    COMPENDIUM_CACHE[compendiumToCheck.uuid] = documentData;
    return compendiumToCheck;
  }
  static findSimilarDocumentInCompendiumSync(packId, documentToFind) {
    if (!packId) {
      throw Logger.error(`No packId is been passed`);
    }
    let document2 = Object.values(COMPENDIUM_CACHE).find((compendiumToCheck) => {
      return compendiumToCheck.name === documentToFind.name && compendiumToCheck.type === documentToFind.type;
    }) ?? false;
    if (!document2) {
      document2 = _CompendiumsHelpers.getDocumentCompendiumSync(packId, documentToFind.name, documentToFind.type);
    }
    return document2;
  }
  // =================================
  // ADDITIONAL METHODS
  // =================================
};
__name(_CompendiumsHelpers, "CompendiumsHelpers");
/**
 * Define the allowed Document types which may be dynamically linked in chat
 * @type {string[]}
 */
__publicField(_CompendiumsHelpers, "DOCUMENT_LINK_TYPES", [
  "Actor",
  "Cards",
  "Item",
  "Scene",
  "JournalEntry",
  "Macro",
  "RollTable",
  "PlaylistSound"
]);
__publicField(_CompendiumsHelpers, "PACK_ID_ITEM", `world.${CONSTANTS.MODULE_ID}-backup-do-not-delete-item`);
__publicField(_CompendiumsHelpers, "COMPENDIUM_CACHE", {});
let CompendiumsHelpers = _CompendiumsHelpers;
const _ItemPilesHelpers = class _ItemPilesHelpers {
  // ===================
  // CURRENCIES HELPERS
  // ===================
  /**
   * Turns a string of currencies into an array containing the data and quantities for each currency
   *
   * @returns {{primary: boolean, name: string, data: Object, img: string, abbreviation: string, exchange: number}[]} An array of object containing the data name and abbreviation for each currency
   */
  static retrieveCurrenciesRegistered() {
    const dic = [];
    const currenciesPrimary = game.itempiles.API.CURRENCIES;
    for (let c of currenciesPrimary) {
      dic.push({
        primary: currency.primary,
        name: currency.name,
        data: currency.data,
        img: currency.img,
        abbreviation: currency.abbreviation,
        exchange: currency.exchange
      });
    }
    const currenciesSecondary = game.itempiles.API.SECONDARY_CURRENCIES;
    for (let c of currenciesSecondary) {
      dic.push({
        primary: currency.primary,
        name: currency.name,
        data: currency.data,
        img: currency.img,
        abbreviation: currency.abbreviation.toLowerCase().replace("{#}", "").trim(),
        exchange: currency.exchange
      });
    }
    return dic;
  }
  // /**
  //  *
  //  * @param {Actor} actor
  //  * @param {string} currencyAbbreviation
  //  * @returns {number}
  //  */
  // static retrieveCurrency(actor, currencyAbbreviation) {
  //     // TODO
  //     return game.itempiles.API.getActorCurrencies(target, options);
  // }
  /**
   * Turns a string of currencies into an array containing the data and quantities for each currency
   *
   * @param {string} currenciesS                               A string of currencies to convert (eg, "5gp 25sp")
   *
   * @returns {Array<Record<string,number>>}                                 An array of object containing the data and quantity for each currency
   */
  static retrieveCurrenciesSimpleFromString(currenciesS) {
    const c = _ItemPilesHelpers.generateCurrenciesStringFromString(currenciesS);
    if (!c) {
      return "";
    }
    const arr = game.itempiles.API.getCurrenciesFromString(c);
    const currencies = {};
    for (const cc of arr) {
      const abbreviation = cc.abbreviation.toLowerCase().replace("{#}", "").trim();
      currencies[abbreviation] = (cc.roll ? cc.roll.total : cc.quantity) ?? 0;
    }
    return currencies;
  }
  /**
   * Turns a string of currencies into an array containing the data and quantities for each currency
   *
   * @param {string|object} currencies                               A string of currencies to convert (eg, "5gp 25sp")
   *
   * @returns {string}                                 A string of currencies to convert (eg, "5gp 25sp")
   */
  static generateCurrenciesStringFromString(currenciesS) {
    if (!currenciesS) {
      return "";
    }
    if (typeof currenciesS === "string" || currenciesS instanceof String) {
      let currenciesSTmp = currenciesS;
      currenciesSTmp = currenciesSTmp.replaceAll("[", "");
      currenciesSTmp = currenciesSTmp.replaceAll("]", "");
      currenciesSTmp = currenciesSTmp.replaceAll(",", " ");
      currenciesSTmp = currenciesSTmp.replaceAll(/{Copper}/gi, "cp");
      currenciesSTmp = currenciesSTmp.replaceAll(/{Silver}/gi, "sp");
      currenciesSTmp = currenciesSTmp.replaceAll(/{Electrum}/gi, "ep");
      currenciesSTmp = currenciesSTmp.replaceAll(/{Gold}/gi, "gp");
      currenciesSTmp = currenciesSTmp.replaceAll(/{Platinum}/gi, "pp");
      currenciesSTmp = currenciesSTmp.replaceAll("/r", "");
      currenciesSTmp = currenciesSTmp.replaceAll("}", "");
      currenciesSTmp = currenciesSTmp.replaceAll("{", "");
      currenciesSTmp = currenciesSTmp.replaceAll("</p>", "");
      currenciesSTmp = currenciesSTmp.replaceAll("<p>", "");
      return currenciesSTmp.trim();
    } else if ((typeof currenciesS === "object" || currenciesS instanceof Object) && Object.keys(currenciesS)?.length > 0) {
      let currenciesSTmp = "";
      for (const currencyKey of Object.keys(currenciesS)) {
        currenciesSTmp = currenciesSTmp + " " + currenciesS[currencyKey] + currencyKey;
      }
      return currenciesSTmp.trim();
    } else {
      Logger.error(`Cannot parse this currencies`, currenciesS);
      return "";
    }
  }
  /**
   *
   * @param {Actor|Token|TokenDocument} actorOrToken The actor or token to update
   * @param {Object[]|string} currencies - The array of currencies to pass to the actor
   * @param {string} currencies[].cost - The currency cost can be a number or a roll formula.
   * @param {string} currencies[].abbreviation - The currency abbreviation e.g. GP, SP.
   */
  static async addCurrencies(actorOrToken, currencies) {
    Logger.debug("addCurrencies | Currencies:", currencies);
    if (typeof currencies === "string" || currencies instanceof String) {
      if (!currencies) {
        return;
      }
      await game.itempiles.API.addCurrencies(actorOrToken, currencies);
    } else {
      if (_ItemPilesHelpers._isEmptyObject(currencies)) {
        return;
      }
      const currenciesForItemPiles = [];
      for (const currency2 of currencies) {
        if (currency2.cost && currency2.abbreviation) {
          const currencyForItemPilesS = (Math.abs(Number(currency2.cost)) + currency2.abbreviation).trim();
          Logger.debug("addCurrencies | Currency for Item Piles:", currencyForItemPilesS);
          currenciesForItemPiles.push(currencyForItemPilesS);
        }
      }
      Logger.debug("addCurrencies | Currencies for Item Piles:", currenciesForItemPiles);
      const currenciesForItemPilesS = currenciesForItemPiles.join(" ");
      Logger.debug("addCurrencies | Currencies string for Item Piles:" + currenciesForItemPilesS);
      await game.itempiles.API.addCurrencies(actorOrToken, currenciesForItemPilesS);
    }
  }
  /**
   *
   * @param {Actor|Token|TokenDocument} actorOrToken The actor or token to update
   * @param {Object[]|string} currencies - The array of currencies to pass to the actor
   * @param {string} currencies[].cost - The currency cost can be a number or a roll formula.
   * @param {string} currencies[].abbreviation - The currency abbreviation e.g. GP, SP.
   * @returns {void}
   */
  static async removeCurrencies(actorOrToken, currencies) {
    Logger.debug("removeCurrencies | Currencies:", currencies);
    if (typeof currencies === "string" || currencies instanceof String) {
      if (!currencies) {
        return;
      }
      await game.itempiles.API.removeCurrencies(actorOrToken, currencies);
    } else {
      if (_ItemPilesHelpers._isEmptyObject(currencies)) {
        return;
      }
      const currenciesForItemPiles = [];
      for (const currency2 of currencies) {
        if (currency2.cost && currency2.abbreviation) {
          const currencyForItemPilesS = (Math.abs(Number(currency2.cost)) + currency2.abbreviation).trim();
          Logger.debug("removeCurrencies | Currency for Item Piles:", currencyForItemPilesS);
          currenciesForItemPiles.push(currencyForItemPilesS);
        }
      }
      Logger.debug("removeCurrencies | Currencies for Item Piles:", currenciesForItemPiles);
      const currenciesForItemPilesS = currenciesForItemPiles.join(" ");
      Logger.debug("removeCurrencies | Currencies string for Item Piles:" + currenciesForItemPilesS);
      await game.itempiles.API.removeCurrencies(actorOrToken, currenciesForItemPilesS);
    }
  }
  /**
   *
   * @param {Actor|Token|TokenDocument} actorOrToken The actor or token to update
   * @param {Object[]} currencies - The array of currencies to pass to the actor
   * @param {string} currencies[].cost - The currency cost can be a number or a roll formula.
   * @param {string} currencies[].abbreviation - The currency abbreviation e.g. GP, SP.
   */
  static async updateCurrencies(actorOrToken, currencies) {
    Logger.debug("updateCurrencies | Currencies:", currencies);
    if (typeof currencies === "string" || currencies instanceof String) {
      if (!currencies) {
        return;
      }
      await game.itempiles.API.updateCurrencies(actorOrToken, currencies);
    } else {
      if (_ItemPilesHelpers._isEmptyObject(currencies)) {
        return;
      }
      const currenciesForItemPiles = [];
      for (const currency2 of currencies) {
        if (currency2.cost && currency2.abbreviation) {
          const currencyForItemPilesS = (Math.abs(Number(currency2.cost)) + currency2.abbreviation).trim();
          Logger.debug("updateCurrencies | Currency for Item Piles:", currencyForItemPilesS);
          currenciesForItemPiles.push(currencyForItemPilesS);
        }
      }
      Logger.debug("updateCurrencies | Currencies for Item Piles:", currenciesForItemPiles);
      const currenciesForItemPilesS = currenciesForItemPiles.join(" ");
      Logger.debug("updateCurrencies | Currencies string for Item Piles:" + currenciesForItemPilesS);
      await game.itempiles.API.updateCurrencies(actorOrToken, currenciesForItemPilesS);
    }
  }
  /**
   *
   * @param {Actor|Token|TokenDocument} actorOrToken The actor or token to update
   * @param {Object[]} currencies - The array of currencies to pass to the actor
   * @param {string} currencies[].cost - The currency cost can be a number or a roll formula.
   * @param {string} currencies[].abbreviation - The currency abbreviation e.g. GP, SP.
   * @returns {boolean} The actor or token has enough money
   */
  static hasEnoughCurrencies(actorOrToken, currencies) {
    Logger.debug("hasEnoughCurrencies | Currencies:", currencies);
    if (typeof currencies === "string" || currencies instanceof String) {
      if (!currencies) {
        return;
      }
      const currencyInfo = game.itempiles.API.getPaymentData(currencies, { target: actorOrToken });
      return currencyInfo.canBuy;
    } else {
      if (_ItemPilesHelpers._isEmptyObject(currencies)) {
        return;
      }
      const currenciesForItemPiles = [];
      for (const currency2 of currencies) {
        if (currency2.cost && currency2.abbreviation) {
          const currencyForItemPilesS = (Math.abs(Number(currency2.cost)) + currency2.abbreviation).trim();
          Logger.debug("hasEnoughCurrencies | Currency for Item Piles:", currencyForItemPilesS);
          currenciesForItemPiles.push(currencyForItemPilesS);
        }
      }
      Logger.debug("hasEnoughCurrencies | Currencies for Item Piles:", currenciesForItemPiles);
      const currenciesForItemPilesS = currenciesForItemPiles.join(" ");
      Logger.debug("hasEnoughCurrencies | Currencies string for Item Piles:" + currenciesForItemPilesS);
      const currencyInfo = game.itempiles.API.getPaymentData(currenciesForItemPilesS, { target: actorOrToken });
      return currencyInfo.canBuy;
    }
  }
  // ===================
  // LOOT HELPERS
  // ===================
  /**
   * Adds item to an actor, increasing item quantities if matches were found
   *
   * @param {Actor/TokenDocument/Token} actorOrToken            The target to add an item to
   * @param {Array} itemsToAdd                                  An array of objects, with the key "item" being an item object or an Item class (the foundry class), with an optional key of "quantity" being the amount of the item to add
   * @param {object} options                                    Options to pass to the function
   * @param {boolean} [options.removeExistingActorItems=false]  Whether to remove the actor's existing items before adding the new ones
   * @param {boolean} [options.skipVaultLogging=false]          Whether to skip logging this action to the target actor if it is a vault
   * @param {string/boolean} [options.interactionId=false]      The interaction ID of this action
   *
   * @returns {Promise<array>}                                  An array of objects, each containing the item that was added or updated, and the quantity that was added
   */
  static async addItems(actorOrToken, itemsToAdd, options2 = {
    removeExistingActorItems: false,
    skipVaultLogging: false,
    interactionId: false,
    mergeSimilarItems: true
  }) {
    const newOptions = foundry.utils.mergeObject(
      {
        removeExistingActorItems: false,
        skipVaultLogging: false,
        interactionId: false,
        mergeSimilarItems: true
      },
      options2
    );
    if (newOptions.removeExistingActorItems && actorOrToken instanceof Actor) {
      Logger.error(
        `Sorry i don't trust you i will not let you destroy some actor, you can use the 'removeExistingActorItems' options only with tokens`
      );
      return [];
    }
    const itemsData = await game.itempiles.API.addItems(actorOrToken, itemsToAdd, {
      mergeSimilarItems: newOptions.mergeSimilarItems,
      // NOT SUPPORTED ANYMORE FROM ITEM PILES TO REMOVE IN THE FUTURE
      removeExistingActorItems: newOptions.removeExistingActorItems,
      skipVaultLogging: newOptions.skipVaultLogging,
      interactionId: newOptions.interactionId
    });
    Logger.debug(`addItems | Added ${itemsToAdd.length} items to ${actorOrToken.name}`, itemsData);
    return itemsData;
  }
  /**
   * Rolls on a table of items and collates them to be able to be added to actors and such
   * @href https://fantasycomputer.works/FoundryVTT-ItemPiles/#/sample-macros?id=populate-loot-via-table
   * @param {string/Actor/Token}                                  The name, ID, UUID, or the actor itself, or an array of such
   * @param {TableResult[]} tableResults                          The tables results
   * @param {object} options                                      Options to pass to the function
   * @param {string/number} [options.timesToRoll="1"]             The number of times to roll on the tables, which can be a roll formula
   * @param {boolean} [options.resetTable=true]                   Whether to reset the table before rolling it
   * @param {boolean} [options.normalizeTable=true]               Whether to normalize the table before rolling it
   * @param {boolean} [options.displayChat=false]                 Whether to display the rolls to the chat
   * @param {object} [options.rollData={}]                        Data to inject into the roll formula
   * @param {Actor/string/boolean} [options.targetActor=false]    The target actor to add the items to, or the UUID of an actor
   * @param {boolean} [options.removeExistingActorItems=false]    Whether to clear the target actor's items before adding the ones rolled
   * @param {boolean/string} [options.customCategory=false]       Whether to apply a custom category to the items rolled
   *
   * @returns {Promise<Array<Item>>}                              An array of object containing the item data and their quantity
   */
  static async populateActorOrTokenViaTableResults(targetActor, tableResults, options2 = {}) {
    const newOptions = foundry.utils.mergeObject(
      {
        formula: "",
        timesToRoll: "1",
        resetTable: true,
        normalizeTable: false,
        displayChat: false,
        rollData: {},
        targetActor: false,
        removeExistingActorItems: false,
        customCategory: false
      },
      options2
    );
    const itemsToAdd = await _ItemPilesHelpers._convertResultsToStackedItems(tableResults);
    let items = [];
    if (targetActor) {
      items = await _ItemPilesHelpers.addItems(targetActor, itemsToAdd, {
        removeExistingActorItems: newOptions.removeExistingActorItems
      });
    }
    return items;
  }
  /**
   * Rolls on a table of items and collates them to be able to be added to actors and such
   * @href https://fantasycomputer.works/FoundryVTT-ItemPiles/#/sample-macros?id=populate-loot-via-table
   * @param {string/Actor/Token}                                  The name, ID, UUID, or the actor itself, or an array of such
   * @param {string/RollTable} tableReference                     The name, ID, UUID, or the table itself, or an array of such
   * @param {object} options                                      Options to pass to the function
   * @param {string/number} [options.timesToRoll="1"]             The number of times to roll on the tables, which can be a roll formula
   * @param {boolean} [options.resetTable=true]                   Whether to reset the table before rolling it
   * @param {boolean} [options.normalizeTable=true]               Whether to normalize the table before rolling it
   * @param {boolean} [options.displayChat=false]                 Whether to display the rolls to the chat
   * @param {object} [options.rollData={}]                        Data to inject into the roll formula
   * @param {Actor/string/boolean} [options.targetActor=false]    The target actor to add the items to, or the UUID of an actor
   * @param {boolean} [options.removeExistingActorItems=false]    Whether to clear the target actor's items before adding the ones rolled
   * @param {boolean/string} [options.customCategory=false]       Whether to apply a custom category to the items rolled
   *
   * @returns {Promise<Array<Item>>}                              An array of object containing the item data and their quantity
   */
  static async rollItemTable(targetActor, tableReference, options2 = {}) {
    return await _ItemPilesHelpers.populateActorOrTokenViaTable(targetActor, tableReference, options2);
  }
  /**
   * Rolls on a table of items and collates them to be able to be added to actors and such
   * @href https://fantasycomputer.works/FoundryVTT-ItemPiles/#/sample-macros?id=populate-loot-via-table
   * @param {string/Actor/Token}                                  The name, ID, UUID, or the actor itself, or an array of such
   * @param {string/RollTable} tableReference                     The name, ID, UUID, or the table itself, or an array of such
   * @param {object} options                                      Options to pass to the function
   * @param {string/number} [options.timesToRoll="1"]             The number of times to roll on the tables, which can be a roll formula
   * @param {boolean} [options.resetTable=true]                   Whether to reset the table before rolling it
   * @param {boolean} [options.normalizeTable=true]               Whether to normalize the table before rolling it
   * @param {boolean} [options.displayChat=false]                 Whether to display the rolls to the chat
   * @param {object} [options.rollData={}]                        Data to inject into the roll formula
   * @param {Actor/string/boolean} [options.targetActor=false]    The target actor to add the items to, or the UUID of an actor
   * @param {boolean} [options.removeExistingActorItems=false]    Whether to clear the target actor's items before adding the ones rolled
   * @param {boolean/string} [options.customCategory=false]       Whether to apply a custom category to the items rolled
   *
   * @returns {Promise<Array<Item>>}                              An array of object containing the item data and their quantity
   */
  static async populateActorOrTokenViaTable(targetActor, tableReference, options2 = {}) {
    const table = await RetrieveHelpers.getRollTableAsync(tableReference);
    const newOptions = foundry.utils.mergeObject(
      {
        timesToRoll: "1",
        resetTable: true,
        normalizeTable: false,
        displayChat: false,
        rollData: {},
        targetActor: false,
        removeExistingActorItems: false,
        customCategory: false
      },
      options2
    );
    if (!(typeof newOptions.timesToRoll === "string" || typeof newOptions.timesToRoll === "number")) {
      throw Logger.error(`populateActorOrTokenViaTable | timesToRoll must be of type string or number`);
    }
    if (typeof newOptions.rollData !== "object") {
      throw Logger.error(`populateActorOrTokenViaTable | rollData must be of type object`);
    }
    if (typeof newOptions.removeExistingActorItems !== "boolean") {
      throw Logger.error(`populateActorOrTokenViaTable | removeExistingActorItems of type boolean`);
    }
    if (newOptions.resetTable && table.uuid.startsWith("Compendium")) {
      newOptions.resetTable = false;
    }
    let itemsToAdd = await _ItemPilesHelpers.rollTable(table, newOptions);
    let items = [];
    if (targetActor) {
      items = await _ItemPilesHelpers.addItems(targetActor, itemsToAdd, {
        removeExistingActorItems: newOptions.removeExistingActorItems
      });
    }
    return items;
  }
  /**
   * @returns {Promise<ItemData[]>} Item Data Array.  An array of objects, each containing the item that was added or updated, and the quantity that was added
   */
  static async retrieveItemsDataFromRollTable(table, options2) {
    return await _ItemPilesHelpers.rollTable(table, options2);
  }
  /**
   * @href https://github.com/fantasycalendar/FoundryVTT-ItemPiles/blob/master/src/helpers/pile-utilities.js#L1885
   * @param {RollTable|string} tableReference
   * @param {Object} options
   * @returns {Promise<ItemData[]>} Item Data Array
   */
  static async rollTable(tableReference, options2) {
    const table = await RetrieveHelpers.getRollTableAsync(tableReference);
    table.formula;
    const resetTable = !!options2.resetTable;
    const normalizeTable = !!options2.normalizeTable;
    options2.displayChat;
    options2.roll;
    !!options2.customCategory;
    !!options2.recursive;
    if (!options2.formula) {
      options2.formula = table.formula;
    }
    if (!table.uuid.startsWith("Compendium")) {
      if (resetTable) {
        await table.reset();
      }
      if (normalizeTable) {
        await table.update({
          results: table.results.map((result) => ({
            _id: result.id,
            weight: result.range[1] - (result.range[0] - 1)
          }))
        });
        await table.normalize();
      }
    }
    options2.displayChat = false;
    const results2 = await game.modules.get("better-rolltables").api.betterTableRoll(table, options2);
    const itemsRetrieved = await _ItemPilesHelpers._convertResultsToStackedItems(results2, options2);
    return itemsRetrieved;
  }
  static async _convertResultsToStackedItems(results2, options2 = {}) {
    const resetTable = !!options2.resetTable;
    const normalizeTable = !!options2.normalizeTable;
    const displayChat = options2.displayChat;
    options2.roll;
    const customCategory = !!options2.customCategory;
    !!options2.recursive;
    const rolledItems = [];
    for (const rollData of results2) {
      let rolledQuantity = 1;
      const itemTmp = await game.modules.get("better-rolltables").api.resultToItemData(rollData);
      if (!itemTmp) {
        Logger.debug(
          `The result '${rollData.name + "|" + rollData.documentId}' is not a valid link anymore`,
          true
        );
        continue;
      }
      if (itemTmp instanceof RollTable) {
        Logger.error(
          `'itemTmp instanceof RollTable', It shouldn't never go here something go wrong with the code please contact the brt developer`
        );
        rolledItems.push(
          ...await _ItemPilesHelpers.rollTable({
            tableUuid: itemTmp.uuid,
            resetTable,
            normalizeTable,
            displayChat
          })
        );
      } else {
        const quantity = Math.max(_ItemPilesHelpers.getItemQuantity(itemTmp) * rolledQuantity, 1);
        rolledItems.push({
          ...rollData,
          item: itemTmp,
          quantity
        });
      }
    }
    const items = [];
    rolledItems.forEach((newItem) => {
      const existingItem = _ItemPilesHelpers.findSimilarItem(items, newItem);
      if (existingItem) {
        existingItem.quantity += Math.max(newItem.quantity, 1);
      } else {
        setProperty(
          newItem,
          _ItemPilesHelpers.FLAGS.ITEM,
          getProperty(newItem.item, _ItemPilesHelpers.FLAGS.ITEM)
        );
        if (game.itempiles.API.QUANTITY_FOR_PRICE_ATTRIBUTE && !getProperty(newItem, game.itempiles.API.QUANTITY_FOR_PRICE_ATTRIBUTE)) {
          setProperty(
            newItem,
            game.itempiles.API.QUANTITY_FOR_PRICE_ATTRIBUTE,
            _ItemPilesHelpers.getItemQuantity(newItem.item)
          );
        }
        if (customCategory) {
          setProperty(newItem, _ItemPilesHelpers.FLAGS.CUSTOM_CATEGORY, customCategory);
        }
        items.push({
          ...newItem
        });
      }
    });
    const itemsRetrieved = items.map((item2) => {
      const itemData = item2.item instanceof Item ? item2.item.toObject() : item2.item;
      const actualItem = itemData;
      return _ItemPilesHelpers.setItemQuantity(actualItem, item2.quantity);
    });
    return itemsRetrieved;
  }
  /**
   * Returns a given item's quantity
   *
   * @param {Item/Object} item
   * @returns {number}
   */
  static getItemQuantity(item2) {
    const itemData = item2 instanceof Item ? item2.toObject() : item2;
    return Number(getProperty(itemData, game.itempiles.API.ITEM_QUANTITY_ATTRIBUTE) ?? 0);
  }
  /**
   * Returns whether an item has the quantity property
   *
   * @param {Item/Object} item
   * @returns {Boolean}
   */
  static hasItemQuantity(item2) {
    const itemData = item2 instanceof Item ? item2.toObject() : item2;
    return hasProperty(itemData, game.itempiles.API.ITEM_QUANTITY_ATTRIBUTE);
  }
  /**
   * Returns a given item's quantity
   *
   * @param {Object} itemData
   * @param {Number} quantity
   * @param {Boolean} requiresExistingQuantity
   * @returns {Object}
   */
  static setItemQuantity(item2, quantity, requiresExistingQuantity = false) {
    const itemData = item2 instanceof Item ? item2.toObject() : item2;
    if (!requiresExistingQuantity || _ItemPilesHelpers.hasItemQuantity(itemData)) {
      setProperty(itemData, game.itempiles.API.ITEM_QUANTITY_ATTRIBUTE, quantity);
    }
    return itemData;
  }
  /**
   * Returns a given item's cost/price
   *
   * @param {Item/Object} item
   * @returns {number}
   */
  static getItemCost(item2) {
    const itemData = item2 instanceof Item ? item2.toObject() : item2;
    return getProperty(itemData, game.itempiles.API.ITEM_PRICE_ATTRIBUTE) ?? 0;
  }
  /**
   * Returns whether an item has the cost/price property
   *
   * @param {Item/Object} item
   * @returns {Boolean}
   */
  static hasItemCost(item2) {
    const itemData = item2 instanceof Item ? item2.toObject() : item2;
    return hasProperty(itemData, game.itempiles.API.ITEM_PRICE_ATTRIBUTE);
  }
  /**
   * Returns a given item's cost/price
   *
   * @param {Object} itemData
   * @param {Number} cost
   * @param {Boolean} requiresExistingCost
   * @returns {Object}
   */
  static setItemCost(item2, cost, requiresExistingCost = false) {
    const itemData = item2 instanceof Item ? item2.toObject() : item2;
    if (!requiresExistingCost || _ItemPilesHelpers.hasItemCost(itemData)) {
      setProperty(itemData, game.itempiles.API.ITEM_PRICE_ATTRIBUTE, cost);
    }
    return itemData;
  }
  /**
   * Find and retrieves an item in a list of items
   *
   * @param {Array<Item|Object>} items
   * @param {Item|Object} findItem
   * @param {object} options
   * @param {boolean} returnOne
   * @returns {*}
   */
  static findSimilarItem(itemsToSearch, itemToFind, { returnOne = true } = {}) {
    return game.itempiles.API.findSimilarItem(itemsToSearch, itemToFind, {
      returnOne
    });
  }
  // ==============================
  // ADDITIONAL HELPER
  // =============================
  static stackTableResults(rolledResult) {
    const resultsStacked = [];
    rolledResult.forEach((newResult) => {
      let isResultHidden = getProperty(newResult, `flags.better-rolltables.brt-hidden-table`) || false;
      const existingItem = resultsStacked.find((r) => {
        let isResultHidden2 = getProperty(r, `flags.better-rolltables.brt-hidden-table`) || false;
        if (r.documentId && newResult.documentId) {
          return r.documentId === newResult.documentId && isResultHidden === isResultHidden2;
        } else {
          return r._id === newResult._id && isResultHidden === isResultHidden2;
        }
      });
      if (!_ItemPilesHelpers._isRealNumber(newResult.quantity)) {
        newResult.quantity = 1;
      }
      if (existingItem) {
        existingItem.quantity += Math.max(newResult.quantity, 1);
      } else {
        resultsStacked.push({
          ...newResult
        });
      }
    });
    return resultsStacked;
  }
  /**
   * Converts the provided token to a item piles lootable sheet check out the documentation from the itempiles page
   * @href https://fantasycomputer.works/FoundryVTT-ItemPiles/#/api?id=turntokensintoitempiles
   * @href https://github.com/trioderegion/fvtt-macros/blob/master/honeybadger-macros/tokens/single-loot-pile.js#L77
   * @param {Array<Token|TokenDocument} tokensTarget
   * @param {object} options	object	Options to pass to the function
   * @param {boolean} [options.untouchedImage=""] little utility for lazy people apply a default image
   * @param {boolean} [options.applyDefaultLight=false] little utility for lazy people apply a default light
   * @param {boolean} [options.addCurrency=false] Add some random currency
   * @param {boolean} [options.isSinglePile=false] little utility it need 'warpgate' module installed and active for merge all the token items in one big item piles
   * @param {boolean} [options.deleteTokens=false] only if singlePile is true it will delete all tokens
   * @param {boolean} [options.warpgatePermanent=false] Set the warpgate mutate setting to permanent
   * @param {object} tokenSettings Overriding settings that will update the tokens settings
   * @param {object} pileSettings Overriding settings to be put on the item piles’ settings - see pile flag defaults
   * @returns {Promise<string[]>} The uuids of the targets after they were turned into item piles
   */
  static async convertTokensToItemPiles(tokensTarget, options2 = {
    applyDefaultLight: false,
    untouchedImage: "",
    isSinglePile: false,
    deleteTokens: false,
    addCurrency: false,
    warpgatePermanent: false
  }, tokenSettings = { rotation: 0 }, pileSettings = {
    openedImage: "",
    emptyImage: "",
    type: game.itempiles.pile_types.CONTAINER,
    deleteWhenEmpty: false,
    activePlayers: true,
    closed: true
  }) {
    options2 = foundry.utils.mergeObject(
      {
        applyDefaultLight: false,
        untouchedImage: "",
        isSinglePile: false,
        deleteTokens: false,
        addCurrency: false,
        warpgatePermanent: false
      },
      options2
    );
    tokenSettings = foundry.utils.mergeObject({ rotation: 0 }, tokenSettings);
    pileSettings = foundry.utils.mergeObject(
      {
        openedImage: "",
        emptyImage: "",
        type: game.itempiles.pile_types.CONTAINER,
        deleteWhenEmpty: false,
        activePlayers: true,
        closed: true
      },
      pileSettings
    );
    const tokens = Array.isArray(tokensTarget) ? tokensTarget : [tokensTarget];
    const token = tokens[0];
    const { applyDefaultLight, untouchedImage, addCurrency, isSinglePile, deleteTokens, warpgatePermanent } = options2;
    if (applyDefaultLight) {
      let light = {
        dim: 0.2,
        bright: 0.2,
        luminosity: 0,
        alpha: 1,
        color: "#ad8800",
        coloration: 6,
        animation: {
          // type:"sunburst",
          type: "radialrainbow",
          speed: 3,
          intensity: 10
        }
      };
      foundry.utils.mergeObject(tokenSettings, { light });
    }
    if (game.modules.get("warpgate")?.active && isSinglePile) {
      let activeEffectUpdates = token.actor.effects.reduce((acc, curr) => {
        acc[curr.data.label] = warpgate.CONST.DELETE;
        return acc;
      }, {});
      let updates = {
        token: {
          "texture.src": untouchedImage ? untouchedImage : token.img,
          name: `Pile of ${token.name}`
        },
        actor: {
          // system: { currency: token.actor?.system?.currency ?? { gp: 0, sp: 0, cp: 0 } },
          name: `Pile of ${token.name}`
        },
        embedded: {
          ActiveEffect: activeEffectUpdates ? activeEffectUpdates : null,
          Item: {}
        }
      };
      const singlePile = tokens.reduce((acc, tok) => {
        if (tok.id === token.id) {
          return acc;
        }
        const items = tok.actor.items.reduce((acc2, item2) => {
          if (_ItemPilesHelpers._shouldBeLoot(item2)) {
            const itemData = item2 instanceof Item ? item2.toObject() : item2;
            acc2[randomID()] = itemData;
          }
          return acc2;
        }, {});
        foundry.utils.mergeObject(acc.embedded.Item, items);
        return acc;
      }, updates);
      if (deleteTokens) {
        const toDelete = tokens.filter((t) => t.id !== token.id).map((t) => t.id);
        await canvas.scene.deleteEmbeddedDocuments("Token", toDelete);
      }
      await warpgate.mutate(
        token.document,
        singlePile,
        {},
        { permanent: warpgatePermanent, comparisonKeys: { ActiveEffect: "label", Item: "id" } }
      );
      const newTargets = await game.itempiles.API.turnTokensIntoItemPiles([token], {
        pileSettings,
        tokenSettings
      });
      return newTargets;
    } else if (isSinglePile) {
      Logger.warn(`You select the "single pile" feature but the module 'warpgate' is not installed`, true);
      return [];
    } else {
      const newTargets = await game.itempiles.API.turnTokensIntoItemPiles(tokens, {
        pileSettings,
        tokenSettings
      });
      return newTargets;
    }
  }
  /**
   * Converts the provided token to a item piles lootable sheet check out the documentation from the itempiles page
   * @href https://fantasycomputer.works/FoundryVTT-ItemPiles/#/api?id=turntokensintoitempiles
   * @href https://github.com/trioderegion/fvtt-macros/blob/master/honeybadger-macros/tokens/single-loot-pile.js#L77
   * @param {Token|TokenDocument} tokenTarget
   * @param {object} options	object	Options to pass to the function
   * @param {boolean} [options.untouchedImage=""] little utility for lazy people apply a default image
   * @param {boolean} [options.applyDefaultLight=false] little utility for lazy people apply a default light
   * @param {boolean} [options.addCurrency=false] Add some random currency
   * @param {object} tokenSettings Overriding settings that will update the tokens settings
   * @param {object} pileSettings Overriding settings to be put on the item piles’ settings - see pile flag defaults
   * @returns {Promise<string[]>} The uuids of the targets after they were turned into item piles
   */
  static async convertTokenToItemPilesContainer(tokenTarget, options2 = {
    applyDefaultLight: false,
    untouchedImage: "",
    addCurrency: false
  }, tokenSettings = { rotation: 0 }, pileSettings = {
    openedImage: "",
    emptyImage: "",
    type: game.itempiles.pile_types.CONTAINER,
    deleteWhenEmpty: false,
    activePlayers: true,
    closed: true
  }) {
    options2 = foundry.utils.mergeObject(
      {
        applyDefaultLight: false,
        untouchedImage: "",
        addCurrency: false
      },
      options2
    );
    tokenSettings = foundry.utils.mergeObject({ rotation: 0 }, tokenSettings);
    pileSettings = foundry.utils.mergeObject(
      {
        openedImage: "",
        emptyImage: "",
        type: game.itempiles.pile_types.CONTAINER,
        deleteWhenEmpty: false,
        activePlayers: true,
        closed: true
      },
      pileSettings
    );
    const tokens = [tokenTarget];
    const { applyDefaultLight, untouchedImage, addCurrency } = options2;
    if (applyDefaultLight) {
      let light = {
        dim: 0.2,
        bright: 0.2,
        luminosity: 0,
        alpha: 1,
        color: "#ad8800",
        coloration: 6,
        animation: {
          // type:"sunburst",
          type: "radialrainbow",
          speed: 3,
          intensity: 10
        }
      };
      foundry.utils.mergeObject(tokenSettings, { light });
    }
    const newTargets = await game.itempiles.API.turnTokensIntoItemPiles(tokens, {
      pileSettings,
      tokenSettings
    });
    return newTargets;
  }
  /**
   * Whether an item pile is locked. If it is not enabled or not a container, it is always false.
   *
   * @param {Token/TokenDocument} target
   * @param {Object/boolean} [data=false] data existing flags data to use
   * @return {boolean}
   */
  static isItemPileLocked(target, data = false) {
    return game.itempiles.API.isItemPileLocked(target, data);
  }
  /**
   * Whether an item pile is closed. If it is not enabled or not a container, it is always false.
   *
   * @param {Token/TokenDocument} target
   * @param {Object/boolean} [data=false] data existing flags data to use
   * @return {boolean}
   */
  static isItemPileClosed(target, data = false) {
    return game.itempiles.API.isItemPileClosed(target, data);
  }
  /**
   * Whether an item pile is a valid item pile. If it is not enabled, it is always false.
   *
   * @param {Token/TokenDocument} target
   * @param {Object/boolean} [data=false] data existing flags data to use
   * @return {boolean}
   */
  static isValidItemPile(target, data = false) {
    return game.itempiles.API.isValidItemPile(target, data);
  }
  /**
   * Whether an item pile is a regular item pile. If it is not enabled, it is always false.
   *
   * @param {Token/TokenDocument} target
   * @param {Object/boolean} [data=false] data existing flags data to use
   * @return {boolean}
   */
  static isRegularItemPile(target, data = false) {
    return game.itempiles.API.isRegularItemPile(target, data);
  }
  /**
   * Whether an item pile is a container. If it is not enabled, it is always false.
   *
   * @param {Token/TokenDocument} target
   * @param {Object/boolean} [data=false] data existing flags data to use
   * @return {boolean}
   */
  static isItemPileContainer(target, data = false) {
    return game.itempiles.API.isItemPileContainer(target, data);
  }
  /**
   * Whether an item pile is a lootable. If it is not enabled, it is always false.
   *
   * @param {Token/TokenDocument} target
   * @param {Object/boolean} [data=false] data existing flags data to use
   * @return {boolean}
   */
  static isItemPileLootable(target, data = false) {
    return game.itempiles.API.isItemPileLootable(target, data);
  }
  /**
   * Whether an item pile is a vault. If it is not enabled, it is always false.
   *
   * @param {Token/TokenDocument} target
   * @param {Object/boolean} [data=false] data existing flags data to use
   * @return {boolean}
   */
  static isItemPileVault(target, data = false) {
    return game.itempiles.API.isItemPileVault(target, data);
  }
  /**
   * Whether an item pile is a merchant. If it is not enabled, it is always false.
   *
   * @param {Token/TokenDocument} target
   * @param {Object/boolean} [data=false] data existing flags data to use
   * @return {boolean}
   */
  static isItemPileMerchant(target, data = false) {
    return game.itempiles.API.isItemPileMerchant(target, data);
  }
  /**
   * Whether an item pile is a merchant. If it is not enabled, it is always false.
   *
   * @param {Token/TokenDocument} target
   * @param {Object/boolean} [data=false] data existing flags data to use
   * @return {boolean}
   */
  static isItemPileAuctioneer(target, data = false) {
    return game.itempiles.API.isItemPileAuctioneer(target, data);
  }
  /**
   * Whether an item pile is empty pile. If it is not enabled, it is always false.
   *
   * @param {Token/TokenDocument} target
   * @return {boolean}
   */
  static isItemPileEmpty(target) {
    return game.itempiles.API.isItemPileEmpty(target);
  }
  /**
   * Whether an item pile is stackable. If it is not enabled, it is always false.
   *
   * @param {Item} target
   * @return {boolean}
   */
  static isItemStackable(target) {
    return game.itempiles.API.canItemStack(target);
  }
  /**
   * Unlink the token
   * @param {Token/TokenDocument/string} token
   */
  static async unlinkToken(token) {
    const tokenTarget = RetrieveHelpers.getTokenSync(token);
    if (tokenTarget instanceof Token) {
      await tokenTarget.document.update({ actorLink: false });
    } else if (tokenTarget instanceof TokenDocument) {
      await tokenTarget.update({ actorLink: false });
    } else {
      Logger.log(`Cannot unlink this token ?`, tokenTarget);
    }
  }
  /**
   * Unlink actor
   * @param {Token/TokenDocument/string} token
   */
  static async unlinkActor(actor) {
    const actorTarget = await RetrieveHelpers.getActorAsync(actor);
    const isNowLinked = actorTarget.prototypeToken.actorLink;
    if (isNowLinked) {
      actorTarget.update({ "token.actorLink": false });
    } else {
      Logger.log(`Cannot unlink this actor ?`, actorTarget);
    }
  }
  /**
   * Link actor
   * @param {Token/TokenDocument/string} token
   */
  static async linkActor(actor) {
    const actorTarget = await RetrieveHelpers.getActorAsync(actor);
    const isNowLinked = actorTarget.prototypeToken.actorLink;
    if (!isNowLinked) {
      actorTarget.update({ "token.actorLink": true });
    } else {
      Logger.log(`Cannot link this actor ?`, actorTarget);
    }
  }
  // ======================================
  // PRIVATE METHODS
  // ========================================
  /**
   * It is recommended to add the following filter to Item Pile's default filter: system.weaponType | natural. Which will filter out the natural weapons found on many creatures. Alternatively, define the `shouldBeLoot` filter function
   * @param {Item5e} item
   * @returns {boolean}
   */
  static _shouldBeLoot(item2) {
    return game.itempiles.API.canItemStack(item2);
  }
  static _isEmptyObject(obj) {
    if (obj === null || obj === void 0) {
      return true;
    }
    if (_ItemPilesHelpers._isRealNumber(obj)) {
      return false;
    }
    if (obj instanceof Object && Object.keys(obj).length === 0) {
      return true;
    }
    if (obj instanceof Array && obj.length === 0) {
      return true;
    }
    if (obj && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  }
  static _isRealNumber(inNumber) {
    return !isNaN(inNumber) && typeof inNumber === "number" && isFinite(inNumber);
  }
};
__name(_ItemPilesHelpers, "ItemPilesHelpers");
__publicField(_ItemPilesHelpers, "FLAGS", {
  VERSION: `flags.item-piles.version`,
  PILE: `flags.item-piles.data`,
  ITEM: `flags.item-piles.item`,
  NO_VERSION: `flags.item-piles.-=version`,
  NO_PILE: `flags.item-piles.-=data`,
  NO_ITEM: `flags.item-piles.-=item`,
  LOG: `flags.item-piles.log`,
  SHARING: `flags.item-piles.sharing`,
  PUBLIC_TRADE_ID: `flags.item-piles.publicTradeId`,
  TRADE_USERS: `flags.item-piles.tradeUsers`,
  TEMPORARY_ITEM: `flags.item-piles.temporary_item`,
  CUSTOM_CATEGORY: `flags.item-piles.item.customCategory`
});
let ItemPilesHelpers = _ItemPilesHelpers;
const _BRTBetterHelpers = class _BRTBetterHelpers {
  /**
   * when dropping a link entity on a rolltable if the drop is a tableResult, we assign the dropped entity to that result table.
   * If the drop happens in another part of the tableview we create a new table result
   * @param {event} event
   * @param {RollTable} table the rolltable the event is called on
   */
  static async dropEventOnTable(event, table) {
    try {
      JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch (err) {
      Logger.error(`no entity dropped`, false, err);
      return;
    }
    const targetName = event.target.name;
    let resultIndex = -1;
    const isString = targetName && typeof targetName.startsWith === "function";
    if (isString && (targetName.startsWith("results.") || targetName.startsWith("brt."))) {
      const splitString = targetName.split(".");
      if (splitString.length > 1) {
        resultIndex = Number(splitString[1]);
      }
    }
    const resultTableData = {};
    if (resultIndex >= 0) {
      resultTableData._id = table.results[resultIndex]._id;
    }
    if (resultTableData._id) {
      table.updateEmbeddedDocuments("TableResult", [resultTableData]);
    } else {
      const lastTableResult = table.results[table.results.length - 1];
      if (lastTableResult) {
        const rangeLenght = lastTableResult.range[1] - lastTableResult.range[0];
        resultTableData.weight = lastTableResult.weight;
        resultTableData.range = [lastTableResult.range[1], lastTableResult.range[1] + rangeLenght];
      } else {
        resultTableData.weight = 1;
        resultTableData.range = [1, 1];
      }
      table.createEmbeddedDocuments("TableResult", [resultTableData]);
    }
  }
  static async tryRoll(rollFormula, defaultValue = 1) {
    try {
      const qtFormula = String(rollFormula);
      if (qtFormula == null || qtFormula === "" || qtFormula === "1") {
        return 1;
      } else {
        try {
          const qt = (await new Roll(qtFormula).roll({ async: true })).total || defaultValue;
          return qt;
        } catch (e) {
          Logger.debug(e.message, false, e);
          const qtRoll = Roll.create(qtFormula);
          const qt = (await qtRoll.evaluate({ async: true })).total || defaultValue;
          return qt;
        }
      }
    } catch (e) {
      Logger.error(e.message, false, e);
      return defaultValue;
    }
  }
  static tryRollSync(rollFormula, defaultValue = 1) {
    try {
      const qtFormula = String(rollFormula);
      if (qtFormula == null || qtFormula === "" || qtFormula === "1") {
        return 1;
      } else {
        try {
          const qt = new Roll(qtFormula).roll({ async: false }).total || defaultValue;
          return qt;
        } catch (e) {
          Logger.debug(e.message, false, e);
          const qtRoll = Roll.create(qtFormula);
          const qt = qtRoll.evaluate({ async: false }).total || defaultValue;
          return qt;
        }
      }
    } catch (e) {
      Logger.error(e.message, false, e);
      return defaultValue;
    }
  }
  /**
   * we can provide a formula on how many times we roll on the table.
   * @deprecated maybe to remove they are all use the same flag property ?
   * @returns {Number} how many times to roll on this table
   */
  static async rollsAmount(table) {
    const brtTypeToCheck = BRTUtils.retrieveBRTType(table);
    if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_BETTER) {
      const rollFormula = table.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.GENERIC_AMOUNT_KEY);
      return await _BRTBetterHelpers.tryRoll(rollFormula);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_LOOT) {
      const rollFormula = table.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.LOOT_AMOUNT_KEY);
      return await _BRTBetterHelpers.tryRoll(rollFormula);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_HARVEST) {
      const rollFormula = table.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.HARVEST_AMOUNT_KEY);
      return await _BRTBetterHelpers.tryRoll(rollFormula);
    } else {
      const rollFormula = table.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.GENERIC_AMOUNT_KEY);
      return await _BRTBetterHelpers.tryRoll(rollFormula);
    }
  }
  static async retrieveDocumentFromResultOnlyUuid(result, throwError) {
    return _BRTBetterHelpers.retrieveDocumentFromResult(result, throwError, true);
  }
  static async retrieveDocumentFromResult(result, throwError, onlyUuid = false) {
    let findDocument = null;
    let docUuid = getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`);
    if (docUuid) {
      if (onlyUuid) {
        findDocument = fromUuidSync(docUuid);
      } else {
        findDocument = await fromUuid(docUuid);
      }
    }
    if (!findDocument) {
      if (result.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM) {
        let compendium = await RetrieveHelpers.getCompendiumCollectionAsync(
          result.documentCollection,
          true,
          false
        );
        if (!compendium) {
          if (throwError) {
            throw Logger.error(`Compendium ${result.documentCollection} was not found`);
          } else {
            Logger.warn(`Compendium ${result.documentCollection} was not found`);
            return null;
          }
        }
        if (onlyUuid) {
          findDocument = CompendiumsHelpers.getDocumentCompendiumSync(compendium.metadata.id, {
            id: result.documentId
          });
        } else {
          findDocument = await CompendiumsHelpers.getDocumentCompendiumAsync(compendium.metadata.id, {
            id: result.documentId
          });
        }
        if (!findDocument) {
          if (throwError) {
            throw Logger.error(
              `The "${result.documentId}" document was not found in Compendium ${result.documentCollection}`
            );
          } else {
            Logger.warn(
              `The "${result.documentId}" document was not found in Compendium ${result.documentCollection}`
            );
            return null;
          }
        }
      } else if (result.type === CONST.TABLE_RESULT_TYPES.DOCUMENT) {
        let collection = game.collections.get(result.documentCollection);
        if (!collection) {
          if (throwError) {
            throw Logger.error(`Collection ${result.documentCollection} was not found`);
          } else {
            Logger.warn(`Collection ${result.documentCollection} was not found`);
            return null;
          }
        }
        if (collection) {
          if (onlyUuid) {
            findDocument = collection.contents.find((m) => m.id === `${result.documentId}`);
          } else {
            findDocument = collection.contents.find((m) => m.id === `${result.documentId}`);
          }
          if (!findDocument) {
            if (throwError) {
              throw Logger.error(
                `The "${result.documentId}" document was not found in collection ${result.documentCollection}`
              );
            } else {
              Logger.warn(
                `The "${result.documentId}" document was not found in collection ${result.documentCollection}`
              );
              return null;
            }
          }
        } else {
          findDocument = fromUuid(`${result.documentName}.${result.documentId}`);
          if (!findDocument) {
            if (throwError) {
              throw Logger.error(
                `The "${result.documentId}" document was not found in collection ${result.documentName}.${result.documentId}`
              );
            } else {
              Logger.warn(
                `The "${result.documentId}" document was not found in collection ${result.documentName}.${result.documentId}`
              );
              return null;
            }
          }
        }
      }
    }
    if (!findDocument) {
      Logger.debug(
        `The uuid can be retrieved only from result type '${CONST.TABLE_RESULT_TYPES.COMPENDIUM}' or '${CONST.TABLE_RESULT_TYPES.DOCUMENT}'`
      );
      findDocument = null;
    }
    return findDocument;
  }
  static async updateTableResult(resultToUpdate) {
    let isUpdate = false;
    let result = resultToUpdate instanceof TableResult ? resultToUpdate.toObject(false) : resultToUpdate;
    result.isText = result.type === CONST.TABLE_RESULT_TYPES.TEXT;
    result.isDocument = result.type === CONST.TABLE_RESULT_TYPES.DOCUMENT;
    result.isCompendium = result.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM;
    result.img = result.icon || result.img || CONFIG.RollTable.resultIcon;
    result.text = TextEditor.decodeHTML(result.text);
    result.innerText = result.text || "";
    result.innerText = result.innerText.replaceAll("</p>", "");
    result.innerText = result.innerText.replaceAll("<p>", "");
    result.innerText = result.innerText.trim();
    result.html = result.text;
    result.textOriginal = result.text;
    result.uuid = resultToUpdate.uuid ?? "";
    const resultDoc = await _BRTBetterHelpers.retrieveDocumentFromResultOnlyUuid(result, false);
    result.uuidDoc = resultDoc?.uuid ?? "";
    result.isStackable = false;
    const currentUuid = getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`);
    const currentOriginalName = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_NAME}`
    );
    const currentCustomName = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`
    );
    const currentOriginalIcon = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_ICON}`
    );
    const currentCustomIcon = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`
    );
    const currentOriginalQuantity = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_QUANTITY}`
    );
    const currentCustomQuantity = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_QUANTITY}`
    );
    const currentCustomQuantityOLD = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.RESULTS_FORMULA_KEY_FORMULA}`
    );
    if (result.isDocument || result.isCompendium) {
      if (result.uuidDoc && (!currentUuid || currentUuid !== result.uuidDoc)) {
        setProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`,
          result.uuidDoc
        );
        isUpdate = true;
      }
      if (currentCustomQuantityOLD && !currentCustomQuantity) {
        setProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_QUANTITY}`,
          currentCustomQuantityOLD
        );
        setProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.RESULTS_FORMULA_KEY_FORMULA}`, "");
      }
      if (result.quantity && currentOriginalQuantity !== result.quantity && currentCustomQuantity && currentCustomQuantity !== result.quantity) {
        setProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_QUANTITY}`,
          result.quantity
        );
        isUpdate = true;
      }
      if (result.documentCollection === "JournalEntry") {
        if (result.uuidDoc) {
          result.isJournal = true;
          const journalEntry = await fromUuid(result.uuidDoc);
          if (journalEntry?.pages.size > 0) {
            const sortedArray = journalEntry.pages.contents.sort((a, b) => a.sort - b.sort);
            const journalPages = [];
            journalPages.push({
              uuid: "",
              name: ""
            });
            for (const page of sortedArray) {
              journalPages.push({
                uuid: page.uuid,
                name: page.name
              });
            }
            result.journalPages = journalPages;
          } else {
            result.journalPages = [];
          }
        }
      }
      if (result.uuidDoc) {
        let resultDocType = null;
        if (resultDoc?.documentName) {
          resultDocType = resultDoc?.documentName;
        } else if (resultDoc.pack && game.packs.get(resultDoc.pack)) {
          resultDocType = game.packs.get(resultDoc.pack)?.documentClass?.documentName;
        } else if (resultDoc.documentCollection && game.packs.get(resultDoc.documentCollection)) {
          resultDocType = game.packs.get(resultDoc.documentCollection)?.documentClass?.documentName;
        } else if (resultDoc.documentCollection) {
          resultDocType = resultDoc.documentCollection;
        }
        if (resultDocType === "Item" || result.uuidDoc.includes("Item.")) {
          result.isStackable = true;
        } else if (resultDocType === "Actor" || result.uuidDoc.includes("Actor.")) {
          result.isStackable = true;
        } else if (resultDocType === "RollTable" || result.uuidDoc.includes("RollTable.")) {
          result.isStackable = true;
        }
      }
    }
    if (result.text && currentOriginalName !== result.text && currentCustomName && currentCustomName !== result.text) {
      setProperty(
        result,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_NAME}`,
        result.text
      );
      isUpdate = true;
    }
    if (result.text && !currentCustomName) {
      setProperty(
        result,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`,
        result.text
      );
      isUpdate = true;
    }
    if (result.img && currentOriginalIcon !== result.img && currentCustomIcon && currentCustomIcon !== result.img) {
      setProperty(
        result,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_ICON}`,
        result.img
      );
      isUpdate = true;
    }
    if (result.img && !currentCustomIcon) {
      setProperty(
        result,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`,
        result.img
      );
      isUpdate = true;
    }
    if (!result.img || result.img === CONFIG.RollTable.resultIcon) {
      result.img = currentCustomIcon || resultDoc?.img || CONFIG.RollTable.resultIcon;
    }
    return {
      result,
      isUpdate
    };
  }
  static async retrieveAvailableRange(table) {
    let available = table.results.filter((r) => !r.drawn);
    if (!available.length) {
      Logger.warn(game.i18n.localize("TABLE.NoAvailableResults"), true);
      return { roll, results };
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(table);
    const useDynamicDcOnTable = getProperty(
      table,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_USE_DYNAMIC_DC}`
    );
    if (useDynamicDcOnTable && brtTypeToCheck === CONSTANTS.TABLE_TYPE_HARVEST) {
      const availableTmp = [];
      for (const a of available) {
        const dynamicDcFormula = getProperty(
          a,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_RESULT_DYNAMIC_DC_VALUE}`
        );
        if (dynamicDcFormula) {
          const dynamicDcValue = BRTHarvestHelpers.prepareValueDynamicDcSync(dynamicDcFormula);
          const brtAvailable = foundry.utils.deepClone(a);
          setProperty(
            brtAvailable,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_RESULT_DYNAMIC_DC_VALUE}`,
            dynamicDcValue
          );
          availableTmp.push(brtAvailable);
        } else {
          availableTmp.push(a);
        }
      }
      available = availableTmp;
    }
    const availableRange = available.reduce(
      (range, result) => {
        const r = result.range;
        if (!range[0] || r[0] < range[0])
          range[0] = r[0];
        if (!range[1] || r[1] > range[1])
          range[1] = r[1];
        return range;
      },
      [null, null]
    );
    return availableRange;
  }
};
__name(_BRTBetterHelpers, "BRTBetterHelpers");
let BRTBetterHelpers = _BRTBetterHelpers;
const _CompendiumToRollTableSpecialHarvestDialog = class _CompendiumToRollTableSpecialHarvestDialog {
  constructor(allCompendiums, itemTypes) {
    let compendium = allCompendiums[0];
    let msg = {
      name: compendium.metadata.label,
      title: compendium.title ?? compendium.metadata.name
    };
    Logger.info(game.i18n.format(`${CONSTANTS.MODULE_ID}.api.msg.startRolltableGeneration`, msg), true);
    const document2 = this.fromCompendium(compendium);
    Logger.info(game.i18n.format(`${CONSTANTS.MODULE_ID}.api.msg.rolltableGenerationFinished`, msg), true);
    return document2;
  }
  /**
   * Group an array of objects by a specified property.
   * @param {Array<T>} array - The array of objects to group.
   * @param {string} property - The property to group the objects by.
   * @returns {Object} An object where the keys are the unique values of the specified property and the values are arrays of objects with that property value.
   * @template T
   *
   * @example
   * const arr = [{type:"A"}, {type:"A"}, {type:"B"}];
   * const result = groupBy(arr, "type");
   * console.log(result); // Output: { A: [{type: "A"}, {type: "A"}], B: [{type: "B"}] }
   */
  _groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
      if (!memo[getProperty(x, property)]) {
        memo[getProperty(x, property)] = [];
      }
      memo[getProperty(x, property)].push(x);
      return memo;
    }, {});
  }
  _convertToSkillDenomination(skillValue) {
    if (!skillValue) {
      return "";
    }
    const skillValueToCheck = String(skillValue).toLowerCase().trim();
    const r = this.skillMap.get(skillValueToCheck);
    return r;
  }
  _containsNumbers(str) {
    return /\d/.test(str);
  }
  /**
   * @override
   * @param {*} customFilters
   * @param {*} nameFilters
   * @param {*} selectedItems
   * @param {*} selectedSpellLevels
   * @param {*} selectedRarities
   * @param {*} weightPredicate
   * @param {*} compendium
   * @param {*} options
   * @returns
   */
  async fromCompendium(compendium, options2 = {}) {
    const results2 = await Promise.all(
      // compendium.contents.map(async (es, i) => {
      compendium.index.contents.map(async (es, i) => {
        Logger.log("Compendium Item:" + es);
        Logger.log("Compendium Index:" + i);
        const e = await fromUuid(es.uuid);
        const dcValue = getProperty(e, `system.description.chat`);
        const skillValue = getProperty(e, `system.description.unidentified`);
        const sourceValue = getProperty(e, `system.source`);
        const skillDenom = this._convertToSkillDenomination(skillValue) ?? skillValue;
        let nameTmp = e.name;
        let has1d = false;
        if (nameTmp.includes("1d")) {
          nameTmp = nameTmp.replace("1d", "");
          has1d = true;
        }
        let num = 1;
        let newName = TextEditor.decodeHTML(e.name);
        if (this._containsNumbers(nameTmp)) {
          let numStr = nameTmp.match(/\d+/)[0];
          num = has1d ? "1d" + parseInt(numStr) : String(parseInt(numStr));
          if (num <= 0) {
            num = 1;
          }
          let stringToCheck = getSubstring(newName, "(", ")");
          stringToCheck = stringToCheck.replace(/[0-9]/g, "");
          stringToCheck = stringToCheck.replace(" x", "");
          stringToCheck = stringToCheck.replace("x ", "");
          stringToCheck = stringToCheck ?? "";
          let arrNames = newName.replace(numStr, "").split("(");
          if (arrNames.length > 0) {
            newName = arrNames?.length > 0 ? arrNames[0] : nameTmp;
          }
          newName = newName.trim() + " " + stringToCheck.trim();
          newName = newName.replace("scales", "scale");
          newName = newName.replace("Scales", "Scale");
          newName = newName.replace("plates", "plate");
          newName = newName.replace("Plates", "Plate");
          newName = newName.replace("vials", "vial");
          newName = newName.replace("Vials", "Vial");
          newName = newName.replace("sacks", "sack");
          newName = newName.replace("Sacks", "Sack");
          newName = newName.replace("fins", "fin");
          newName = newName.replace("Fins", "Fin");
          newName = newName.replace("claws", "claw");
          newName = newName.replace("Claws", "Claw");
          newName = newName.replace(" x", "");
          newName = newName.trim();
        }
        return {
          text: e.name,
          type: CONST.TABLE_RESULT_TYPES.COMPENDIUM,
          collection: compendium.type,
          resultId: e.id ? e.id : e._id,
          img: e.thumbnail || e.img || CONFIG.RollTable.resultIcon,
          weight: 1,
          range: [i + 1, i + 1],
          documentCollection: `${compendium.metadata.packageName}.${compendium.metadata.name}`,
          drawn: false,
          flags: {
            [`${CONSTANTS.MODULE_ID}`]: {
              // [`${CONSTANTS.FLAGS.RESULTS_FORMULA_KEY_FORMULA}`]: String(num) ?? "1",
              [`${CONSTANTS.FLAGS.HARVEST_DC_VALUE_KEY}`]: String(dcValue) ?? "0",
              [`${CONSTANTS.FLAGS.HARVEST_SKILL_VALUE_KEY}`]: skillDenom ?? "",
              [`${CONSTANTS.FLAGS.GENERIC_SOURCE_VALUE_KEY}`]: sourceValue ?? "",
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`]: es.uuid ?? "",
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`]: newName ?? "",
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`]: "",
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_QUANTITY}`]: String(num) ?? "1",
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_NAME}`]: e.name ?? "",
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_ICON}`]: e.img ?? "",
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_QUANTITY}`]: ItemPilesHelpers.getItemQuantity(e) ?? 1
            }
          }
        };
      })
    );
    return await this.createCompendiumFromData(compendium.metadata.label, results2, `1d${results2.length}`, options2);
  }
  /**
   * @override
   * @param {*} compendiumName
   * @param {*} results
   * @param {*} formula
   * @param {*} options
   */
  async createCompendiumFromData(compendiumName, results2, formula, options2 = {}) {
    const resultsGroupedBySystemOrigin = this._groupBy(
      results2,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_SOURCE_VALUE_KEY}`
    );
    const documents = [];
    for (const [key, values] of Object.entries(resultsGroupedBySystemOrigin)) {
      let firstDcValue = 0;
      let firstSkillDenom = values?.length > 0 ? getProperty(values[0], `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_SKILL_VALUE_KEY}`) : "";
      let amount = values.length <= 0 ? values.length + 1 : values.length;
      const document2 = await RollTable.create(
        {
          name: "Better Harvester | " + key + " RollTable",
          description: `Rolltable created from the '${compendiumName}' compendium filter for the system source value '${key}'.`,
          results: values,
          formula: `1d${amount}`,
          flags: {
            [`${CONSTANTS.MODULE_ID}`]: {
              [`${CONSTANTS.FLAGS.TABLE_TYPE_KEY}`]: CONSTANTS.TABLE_TYPE_HARVEST,
              [`${CONSTANTS.FLAGS.HARVEST_DC_VALUE_KEY}`]: String(firstDcValue) ?? "0",
              [`${CONSTANTS.FLAGS.HARVEST_SKILL_VALUE_KEY}`]: firstSkillDenom ?? "",
              [`${CONSTANTS.FLAGS.GENERIC_SOURCE_VALUE_KEY}`]: key ?? "",
              [`${CONSTANTS.FLAGS.GENERIC_DISTINCT_RESULT}`]: true,
              [`${CONSTANTS.FLAGS.GENERIC_DISTINCT_RESULT_KEEP_ROLLING}`]: false,
              [`${CONSTANTS.FLAGS.GENERIC_AMOUNT_KEY}`]: amount ?? 1
            }
          },
          img: "icons/svg/pawprint.svg"
        },
        options2
      );
      await document2.normalize();
      documents.push(document2);
    }
    return documents;
  }
  skillMap = /* @__PURE__ */ new Map([
    ["acrobatics", "acr"],
    ["animal handling", "ani"],
    ["arcana", "arc"],
    ["athletics", "ath"],
    ["deception", "dec"],
    ["history", "his"],
    ["insight", "ins"],
    ["investigation", "inv"],
    ["intimidation", "itm"],
    ["medicine", "med"],
    ["nature", "nat"],
    ["persuasion", "per"],
    ["perception", "prc"],
    ["performance", "prf"],
    ["religion", "rel"],
    ["sleight of Hand", "slt"],
    ["stealth", "ste"],
    ["survival", "sur"]
  ]);
};
__name(_CompendiumToRollTableSpecialHarvestDialog, "CompendiumToRollTableSpecialHarvestDialog");
let CompendiumToRollTableSpecialHarvestDialog = _CompendiumToRollTableSpecialHarvestDialog;
const _CompendiumToRollTableHelpers = class _CompendiumToRollTableHelpers {
  /**
   * Tested to work with FoundryVTT V11, direct compatibility with DnD5e & SFRPG. Thorough testing still required.
   */
  static async compendiumToRollTableWithDialog(compendiumName, { weightPredicate = null } = {}) {
    let allCompendiums = [];
    if (compendiumName) {
      const myPack = await RetrieveHelpers.getCompendiumCollectionAsync(compendiumName, true, false);
      if (!myPack) {
        Logger.warn(`No compendium found with id '${compendiumName}'`, true);
        return;
      }
      allCompendiums = [myPack];
    } else {
      allCompendiums = await game.packs.contents;
    }
    let itemTypes = await game.documentTypes.Item.sort();
    const documents = new CompendiumToRollTableDialog(allCompendiums, itemTypes, {
      weightPredicate
    }).render(true);
    return documents;
  }
  /**
   * Tested to work with FoundryVTT V11, direct compatibility with DnD5e & SFRPG. Thorough testing still required.
   */
  static async compendiumToRollTableWithDialogSpecialCaseHarvester({ weightPredicate = null } = {}) {
    if (!game.modules.get("harvester")?.active) {
      Logger.warn(`You must activate the module 'harvester'`, true);
      return;
    }
    const myPack = await RetrieveHelpers.getCompendiumCollectionAsync("harvester.harvest", false, false);
    let allCompendiums = [myPack];
    let itemTypes = await game.documentTypes.Item.sort();
    const documents = new CompendiumToRollTableSpecialHarvestDialog(
      allCompendiums,
      itemTypes,
      { weightPredicate = null } = {}
    );
    return documents;
  }
  static async compendiumToRollTable(compendiumName, tableName, { weightPredicate = null } = {}) {
    const myPack = await RetrieveHelpers.getCompendiumCollectionAsync(compendiumName, true, false);
    const compendium = myPack;
    if (!compendium) {
      Logger.warn(
        game.i18n.format(`${CONSTANTS.MODULE_ID}.api.msg.compendiumNotFound`, { name: compendiumName }),
        true
      );
      return;
    }
    let msg = {
      name: compendiumName,
      tableName,
      title: compendium.title ?? compendium.metadata.name,
      compendiumSize: (await compendium.getIndex()).size
    };
    if (!msg.compendiumSize) {
      Logger.warn(game.i18n.format(`${CONSTANTS.MODULE_ID}.api.msg.compendiumEmpty`, msg), true);
      return;
    }
    Logger.info(game.i18n.format(`${CONSTANTS.MODULE_ID}.api.msg.startRolltableGeneration`, msg), true);
    const document2 = compendium.getDocuments().then((compendiumItems) => {
      return compendiumItems.map((item2) => ({
        type: CONST.TABLE_RESULT_TYPES.COMPENDIUM,
        collection: compendiumName,
        text: item2.name,
        img: item2.thumbnail || item2.img || CONFIG.RollTable.resultIcon,
        weight: weightPredicate ? weightPredicate(item2) : 1,
        range: [1, 1]
      }));
    }).then(
      (results2) => RollTable.create({
        name: tableName,
        results: results2.filter((x) => x.weight !== 0)
        // remove empty results due to null weight
      })
    ).then((rolltable) => {
      rolltable.normalize();
      Logger.info(game.i18n.format(`${CONSTANTS.MODULE_ID}.api.msg.rolltableGenerationFinished`, msg), true);
      return rolltable;
    });
    return document2;
  }
};
__name(_CompendiumToRollTableHelpers, "CompendiumToRollTableHelpers");
let CompendiumToRollTableHelpers = _CompendiumToRollTableHelpers;
const _RollFromCompendiumAsRollTableHelpers = class _RollFromCompendiumAsRollTableHelpers {
  /**
   *
   * @param {String} compendium ID of the compendium to roll
   */
  static async rollCompendiumAsRollTable(compendium = null, hideChatMessage) {
    if (!game.user.isGM) {
      Logger.warn(`Only gm can roll directly from compendium`, true);
      return;
    }
    if (!compendium) {
      Logger.warn(`No reference to a compendium is been passed`, true);
      return;
    }
    const item2 = await BRTUtils.getRandomItemFromCompendium(compendium);
    const fontSize = Math.max(60, 100 - Math.max(0, item2.name.length - 27) * 2);
    const chatCardData = {
      id: "",
      compendium,
      itemsData: [{ item: item2, quantity: 1, fontSize, type: 2 }]
    };
    const cardHtml = await renderTemplate(
      `modules/${CONSTANTS.MODULE_ID}/templates/card/loot-chat-card.hbs`,
      chatCardData
    );
    let chatData = {
      flavor: `Rolled from compendium ${item2.pack}`,
      sound: "sounds/dice.wav",
      user: game.user.id,
      content: cardHtml
    };
    if (!hideChatMessage) {
      ChatMessage.create(chatData);
    }
    return chatData;
  }
};
__name(_RollFromCompendiumAsRollTableHelpers, "RollFromCompendiumAsRollTableHelpers");
let RollFromCompendiumAsRollTableHelpers = _RollFromCompendiumAsRollTableHelpers;
const _LootChatCard = class _LootChatCard {
  /**
   * @param {object} betterResults
   * @param {object} currencyData
   */
  constructor(betterResults, currencyData, rollMode, roll2) {
    this.betterResults = betterResults;
    this.currencyData = currencyData;
    this.rollMode = getRollMode(rollMode);
    this.roll = roll2;
    this.itemsData = [];
    this.itemsDataGM = [];
    this.numberOfDraws = 0;
    this.atLeastOneRollIsHidden = false;
    for (const result of this.betterResults) {
      if (getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`)) {
        this.atLeastOneRollIsHidden = true;
        break;
      }
    }
  }
  async findOrCreateItems() {
    for (const result of ItemPilesHelpers.stackTableResults(this.betterResults)) {
      this.numberOfDraws++;
      const quantity = result.quantity;
      let type = void 0;
      if (result.isText || result.type === CONST.TABLE_RESULT_TYPES.TEXT) {
        type = CONST.TABLE_RESULT_TYPES.TEXT;
      } else if (result.pack || result.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM) {
        type = CONST.TABLE_RESULT_TYPES.COMPENDIUM;
      } else if (result.documentCollection || result.type === CONST.TABLE_RESULT_TYPES.DOCUMENT) {
        type = CONST.TABLE_RESULT_TYPES.DOCUMENT;
      } else {
        throw Logger.error(`No vaid type is been found for this result`, true, result);
      }
      let customResultName = void 0;
      if (hasProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`)) {
        customResultName = getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`) || "";
      }
      let customResultImg = void 0;
      if (hasProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`)) {
        customResultImg = getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`) || "";
      }
      let isResultHidden = false;
      if (hasProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`)) {
        isResultHidden = getProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`
        ) || false;
      }
      const entityUuid = getProperty(
        result,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`
      );
      let itemEntity = await fromUuid(entityUuid);
      const fontSize = itemEntity ? Math.max(60, 100 - Math.max(0, (customResultName || itemEntity.name || result.text).length - 27) * 2) : Math.max(60, 100 - Math.max(0, (result.name || result.text).length - 27) * 2);
      if (result.type === CONST.TABLE_RESULT_TYPES.TEXT || !itemEntity) {
        Logger.debug(`Cannot find document with '${entityUuid}'`);
        this.itemsDataGM.push({
          id: result.text,
          text: customResultName ?? result.text ?? result.name,
          img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
          isText: true,
          documentName: result.documentName,
          compendiumName: result.pack,
          type,
          item: {
            id: result.id,
            _id: result.id,
            name: customResultName ?? result.text ?? result.name,
            img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
            text: customResultName ?? result.text ?? result.name,
            uuid: "",
            isHidden: false,
            quantity,
            // weight: weight,
            fontSize
          },
          isHidden: false,
          quantity,
          // weight: weight,
          fontSize
        });
        if (!getProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_SHOW_HIDDEN_RESULT_ON_CHAT}`
        ) && getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`)) {
          continue;
        }
        if (isResultHidden) {
          this.itemsData.push({
            id: result.text,
            text: result.text ?? result.name,
            img: result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
            isText: true,
            documentName: result.documentName,
            compendiumName: result.pack,
            type,
            item: {
              id: result.id,
              _id: result.id,
              name: result.text ?? result.name,
              img: result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
              text: result.text ?? result.name,
              uuid: "",
              isHidden: isResultHidden,
              quantity,
              // weight: weight,
              fontSize
            },
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          });
        } else {
          this.itemsData.push({
            id: result.text,
            text: customResultName ?? result.text ?? result.name,
            img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
            isText: true,
            documentName: result.documentName,
            compendiumName: result.pack,
            type,
            item: {
              id: result.id,
              _id: result.id,
              name: customResultName ?? result.text ?? result.name,
              img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
              text: customResultName ?? result.text ?? result.name,
              uuid: "",
              isHidden: isResultHidden,
              quantity,
              // weight: weight,
              fontSize
            },
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          });
        }
        continue;
      }
      const itemFolder = await this.getBRTFolder();
      if (itemFolder) {
        itemEntity.folder = itemFolder.id;
      } else {
        Logger.debug(`No folder tables found with name 'Better RollTable | Better Items'`);
      }
      if (customResultName && customResultName !== itemEntity.name) {
        setProperty(itemEntity, `name`, customResultName);
      }
      if (customResultImg && customResultImg !== itemEntity.img) {
        setProperty(itemEntity, `img`, customResultImg);
      }
      let isJournal = itemEntity instanceof JournalEntry;
      let docJournalPageUuid = getProperty(
        result,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`
      );
      if (isJournal && docJournalPageUuid) {
        itemEntity = await fromUuid(docJournalPageUuid);
      }
      this.itemsDataGM.push({
        id: result.text,
        text: customResultName ?? result.text ?? result.name,
        img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
        isText: false,
        documentName: itemEntity.documentName,
        compendiumName: itemEntity.pack,
        type,
        item: {
          id: itemEntity.id,
          _id: itemEntity.id,
          name: itemEntity.name,
          img: itemEntity.img ?? itemEntity.src ?? `icons/svg/d20-highlight.svg`,
          text: itemEntity.text ?? itemEntity.name ?? "",
          uuid: itemEntity?.uuid ?? "",
          isHidden: false,
          quantity,
          // weight: weight,
          fontSize
        },
        isHidden: false,
        quantity,
        // weight: weight,
        fontSize
      });
      if (isResultHidden) {
        if (!getProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_SHOW_HIDDEN_RESULT_ON_CHAT}`
        )) {
          continue;
        }
      }
      setProperty(
        itemEntity,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`,
        isResultHidden
      );
      if (isResultHidden) {
        this.itemsData.push({
          id: result.text,
          text: result.text ?? result.name,
          img: result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
          isText: false,
          documentName: itemEntity.documentName,
          compendiumName: itemEntity.pack,
          type,
          item: {
            id: itemEntity.id,
            _id: itemEntity.id,
            name: itemEntity.name,
            img: itemEntity.img ?? itemEntity.src ?? `icons/svg/d20-highlight.svg`,
            text: itemEntity.text ?? itemEntity.name ?? "",
            uuid: itemEntity?.uuid ?? "",
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          },
          isHidden: isResultHidden,
          quantity,
          // weight: weight,
          fontSize
        });
      } else {
        this.itemsData.push({
          id: result.text,
          text: customResultName ?? result.text ?? result.name,
          img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
          isText: false,
          documentName: itemEntity.documentName,
          compendiumName: itemEntity.pack,
          type,
          item: {
            id: itemEntity.id,
            _id: itemEntity.id,
            name: itemEntity.name,
            img: itemEntity.img ?? itemEntity.src ?? `icons/svg/d20-highlight.svg`,
            text: itemEntity.text ?? itemEntity.name ?? "",
            uuid: itemEntity?.uuid ?? "",
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          },
          isHidden: isResultHidden,
          quantity,
          // weight: weight,
          fontSize
        });
      }
    }
  }
  async renderMessage(data) {
    return renderTemplate(`modules/${CONSTANTS.MODULE_ID}/templates/card/loot-chat-card.hbs`, data);
  }
  async getBRTFolder() {
    if (!this.historyFolder) {
      let historyFolder = game.folders.getName("Better RollTable | Loot Items");
      if (!historyFolder) {
        historyFolder = await Folder.create({
          name: "Better RollTable | Loot Items",
          parent: null,
          type: "Item"
        });
      }
      this.historyFolder = historyFolder;
    }
    return this.historyFolder;
  }
  async prepareCharCart(table) {
    const htmlDescription = await TextEditor.enrichHTML(table.description, {
      async: true,
      secrets: table.isOwner,
      documents: true
    });
    const rollHTML = null;
    let flavorString;
    if (this.numberOfDraws > 1) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultPlural`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else if (this.numberOfDraws > 0) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultSingular`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultZero`, {
        name: table.name
      });
    }
    const chatCardData = {
      rollHTML,
      tableData: table,
      htmlDescription,
      // gmTitleLabel: Logger.i18n(`${CONSTANTS.MODULE_ID}.label.tableTextGmTitleLabel`),
      itemsData: this.itemsData,
      currency: this.currencyData,
      compendium: table.pack,
      id: table.id,
      users: game.users.filter((user) => !user.isGM && user.character).map((user) => ({
        id: user.id,
        name: user.character.name,
        img: user.character.token?.img || user.avatar
      }))
    };
    const cardHtml = await this.renderMessage(chatCardData);
    const chatData = {
      flavor: flavorString,
      sound: "sounds/dice.wav",
      user: game.user._id,
      content: cardHtml,
      flags: {
        [`${CONSTANTS.MODULE_ID}`]: {
          [`${CONSTANTS.FLAGS.LOOT}`]: chatCardData
        }
      }
    };
    return chatData;
  }
  async prepareCharCartGM(table) {
    const htmlDescription = await TextEditor.enrichHTML(table.description, {
      async: true,
      secrets: table.isOwner,
      documents: true
    });
    const rollHTML = null;
    let flavorString;
    if (this.numberOfDraws > 1) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultPlural`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else if (this.numberOfDraws > 0) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultSingular`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultZero`, {
        name: table.name
      });
    }
    const chatCardData = {
      rollHTML,
      tableData: table,
      htmlDescription,
      gmTitleLabel: Logger.i18n(`${CONSTANTS.MODULE_ID}.label.tableTextGmTitleLabel`),
      itemsData: this.itemsDataGM,
      currency: this.currencyData,
      compendium: table.pack,
      id: table.id,
      users: game.users.filter((user) => user.isGM && user.character).map((user) => ({
        id: user.id,
        name: user.character.name,
        img: user.character.token?.img || user.avatar
      }))
    };
    const cardHtml = await this.renderMessage(chatCardData);
    const chatData = {
      flavor: flavorString,
      sound: "sounds/dice.wav",
      user: game.user._id,
      content: cardHtml,
      flags: {
        [`${CONSTANTS.MODULE_ID}`]: {
          [`${CONSTANTS.FLAGS.LOOT}`]: chatCardData
        }
      }
    };
    return chatData;
  }
  async createChatCard(table) {
    if (!game.user.isGM) {
      if (this.atLeastOneRollIsHidden || this.rollMode === "gmroll") {
        await betterRolltablesSocket.executeAsGM(
          "invokeGenericChatCardCreateArr",
          table.uuid,
          this.betterResults,
          this.rollMode,
          this.roll,
          false,
          CONSTANTS.TABLE_TYPE_LOOT
        );
      } else {
        await this.findOrCreateItems();
        const chatData = await this.prepareCharCart(table);
        BRTUtils.addRollModeToChatData(chatData, this.rollMode);
        ChatMessage.create(chatData);
      }
    } else {
      const isShowHiddenResultOnChat = getProperty(
        table,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_SHOW_HIDDEN_RESULT_ON_CHAT}`
      );
      await this.findOrCreateItems();
      if (this.itemsData?.length > 0) {
        const chatData = await this.prepareCharCart(table);
        if (!isShowHiddenResultOnChat) {
          BRTUtils.addRollModeToChatData(chatData, this.rollMode);
        }
        ChatMessage.create(chatData);
      }
      if (this.atLeastOneRollIsHidden) {
        const chatDataGM = await this.prepareCharCartGM(table);
        BRTUtils.addRollModeToChatData(chatDataGM, "gmroll");
        ChatMessage.create(chatDataGM);
      }
    }
  }
};
__name(_LootChatCard, "LootChatCard");
let LootChatCard = _LootChatCard;
const _StoryBoolCondition = class _StoryBoolCondition {
  evaluate() {
    return true;
  }
};
__name(_StoryBoolCondition, "StoryBoolCondition");
let StoryBoolCondition = _StoryBoolCondition;
const _StoryBuilder = class _StoryBuilder {
  constructor(tableEntity) {
    let brtTable2 = new BetterRollTable(tableEntity, {});
    this.table = brtTable2;
    this._storyTokens = {};
    this._story = "";
    this._storyGm = "";
  }
  /**
   * Draw story from entity
   *
   */
  async drawStory() {
    await this.table.initialize();
    const draw = await this.table.drawMany(1, { displayChat: false });
    let journalContent, errorString;
    for (const entry of draw.results) {
      if (entry.type === CONST.TABLE_RESULT_TYPES.DOCUMENT && entry.documentCollection === "JournalEntry") {
        const storyJournal = game.journal.get(entry.documentId);
        if (storyJournal) {
          const pages = [...storyJournal.pages];
          journalContent = pages[0].text.content?.replaceAll("</p>", "</p>\n");
        } else {
          errorString = `Journal Entry ${entry.name} not found inside your world`;
        }
      } else if (entry.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM) {
        let nameEntry = getProperty(
          entry,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_NAME}`
        ) ? getProperty(entry, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_NAME}`) : entry.text;
        const entity = await BRTUtils.findInCompendiumByName(entry.documentCollection, nameEntry);
        if (!entity) {
          errorString = `entity ${entry.text} not found in compendium ${entry.documentCollection}`;
        } else if (entity.documentCollection === "JournalEntry") {
          const pages = [...entity.pages];
          journalContent = pages[0].text.content?.replaceAll("</p>", "</p>\n");
        } else {
          errorString = "Only Journal entries are supported in the story generation as table results";
        }
      } else {
        errorString = "Only Journal entries are supported in the story generation as table results";
      }
      if (journalContent) {
        await this._parseStoryDefinition(journalContent);
      }
      if (errorString) {
        Logger.error(errorString, true);
      }
    }
  }
  /**
   *
   * @param {string} storyDefinition
   */
  async _parseStoryDefinition(storyDefinition) {
    const PARSE_MODE = {
      NONE: 0,
      DEFINITION: 1,
      STORY: 2,
      STORYGM: 3
    };
    storyDefinition = storyDefinition.replace(/(&nbsp;|<br>)+/g, " ");
    let lines = storyDefinition.split(/\r\n|\r|\n/);
    lines = lines.filter((line) => {
      let lineTmp = line;
      return lineTmp?.replaceAll("<p>", "")?.replaceAll("</p>", "").trim().length > 0;
    });
    let parseMode = PARSE_MODE.DEFINITION;
    for (const line of lines) {
      const sectionMatch = /.*#([a-zA-Z]+)/.exec(line);
      if (sectionMatch) {
        switch (sectionMatch[1].toLowerCase()) {
          case "story":
            parseMode = PARSE_MODE.STORY;
            break;
          case "storygm":
            parseMode = PARSE_MODE.STORYGM;
            break;
          case "definition":
            parseMode = PARSE_MODE.DEFINITION;
            break;
        }
      } else {
        if (parseMode === PARSE_MODE.STORY) {
          this._story += line;
        } else if (parseMode === PARSE_MODE.STORYGM) {
          this._storyGm += line;
        } else if (parseMode === PARSE_MODE.DEFINITION) {
          const matches = /\s*<p>(.+)\sas\s(.+)<\/p>/i.exec(line);
          if (matches) {
            await this._processDefinition(matches[1], matches[2]);
          }
        }
      }
    }
  }
  /**
   *
   * @param {*} defValue
   * @param {string} definitionName
   * @returns
   */
  async _processDefinition(defValue, definitionName) {
    const match = /{ *([^}]*?) *}/.exec(definitionName);
    if (!match) {
      Logger.error(
        `definition error, ${definitionName} is malformed. After keyword AS we expect a name in brackets {}`,
        true
      );
      return;
    }
    const definition = match[1];
    if (hasProperty(this._storyTokens, definition)) {
      Logger.log(`definition ${definition} is already defined, skipping line`);
      return;
    }
    const regexIF = /IF\s*\((.+)\)/;
    const ifMatch = regexIF.exec(defValue);
    let conditionMet = true;
    if (ifMatch) {
      const storyCondition = new StoryBoolCondition(defValue);
      conditionMet = storyCondition.evaluate();
    }
    if (!conditionMet) {
      return;
    }
    const regexTable = /\s*@(RollTable|Compendium)\[ *([^\]]*?) *\]/;
    const tableMatch = regexTable.exec(defValue);
    let valueResult;
    if (tableMatch) {
      const out = BRTUtils.separateIdComendiumName(tableMatch[2]);
      const tableId = out.nameOrId;
      const compendiumName = out.compendiumName;
      let table;
      if (compendiumName) {
        table = await BRTUtils.findInCompendiumById(compendiumName, tableId);
      } else {
        table = RetrieveHelpers.getRollTableSync(tableId, true);
      }
      if (!table) {
        Logger.error(
          `table with id ${tableId} not found in the world, check the generation journal for broken links`,
          true
        );
        return;
      }
      let draw = await table.drawMany(1, { displayChat: false });
      if (!draw) {
        await table.resetResults();
        draw = await table.drawMany(1, { displayChat: false });
      }
      if (draw.results.length !== 1) {
        Logger.error(
          `0 or more than 1 result was drawn from table ${table.name}, only 1 result is supported check your table config`,
          true
        );
        return;
      }
      const tableResult = draw.results[0];
      if (tableResult.type !== 0) {
        Logger.warn(`only text result from table are supported at the moment, check table ${table.name}`, true);
      }
      valueResult = tableResult.text;
    } else {
      const regexRoll = /\s*\[\[ *([^\]]*?) *\]\]/;
      const rollMatch = regexRoll.exec(defValue);
      if (rollMatch) {
        const rollFormula = rollMatch[1];
        try {
          valueResult = new Roll(rollFormula).roll({ async: false }).total || 0;
        } catch (e) {
          Logger.error(e.message, false, e);
          valueResult = 0;
        }
      } else {
        Logger.error(
          "on the left side of the AS in a story definition a rolltable or rollformula must be provided",
          true
        );
      }
    }
    if (valueResult) {
      setProperty(this._storyTokens, definition, valueResult);
    }
  }
  getGeneratedStory() {
    return this._generateStory(this._story);
  }
  getGeneratedStoryGM() {
    return this._generateStory(this._storyGm);
  }
  /**
   * @param {*} story
   * @returns {string}
   */
  _generateStory(story) {
    if (!story) {
      Logger.warn(`No story is been passed in th correct format`, true);
      return story;
    }
    const regex = /{ *([^}]*?) *}/g;
    let replacedStory = story;
    let matches;
    while ((matches = regex.exec(story)) != null) {
      const value = getProperty(this._storyTokens, matches[1]);
      if (!value) {
        Logger.error(`cannot find a value for token ${matches[1]} in #story definition`, true);
        continue;
      }
      replacedStory = replacedStory.replace(matches[0], value);
    }
    return replacedStory;
  }
};
__name(_StoryBuilder, "StoryBuilder");
let StoryBuilder = _StoryBuilder;
const _BRTStoryHelpers = class _BRTStoryHelpers {
  static async getStoryResults(tableEntity) {
    const storyBuilder = new StoryBuilder(tableEntity);
    await storyBuilder.drawStory();
    const storyHtml = storyBuilder.getGeneratedStory();
    const storyGMHtml = storyBuilder.getGeneratedStoryGM();
    return { storyHtml, storyGMHtml };
  }
  static async generateChatStory(tableEntity) {
    const storyBuilder = new StoryBuilder(tableEntity);
    await storyBuilder.drawStory();
    const storyHtml = storyBuilder.getGeneratedStory();
    const storyGMHtml = storyBuilder.getGeneratedStoryGM();
    this.createChatCardByText(tableEntity, storyHtml);
    this.createChatCardByText(tableEntity, storyGMHtml, { gmOnly: true });
  }
  static async generateContentHtmlStory(tableEntity) {
    const storyBuilder = new StoryBuilder(tableEntity);
    await storyBuilder.drawStory();
    const storyHtml = storyBuilder.getGeneratedStory();
    return storyHtml;
  }
  static async generateContentGMHtmlStory(tableEntity) {
    const storyBuilder = new StoryBuilder(tableEntity);
    await storyBuilder.drawStory();
    const storyGMHtml = storyBuilder.getGeneratedStoryGM();
    return storyGMHtml;
  }
  /**
   * Create a chat card to display the story string
   * @param {string} story the html string of the story to display in chat
   * @param {Object} options set of options, if gmOnly = true then the card will be set to shown only to GM regardless of the chat preferences
   */
  static createChatCardByText(tableEntity, story, options2 = {}) {
    if (!story) {
      return;
    }
    story = '<div class="story-text-selectable">' + story + "</div>";
    const chatData = {
      flavor: tableEntity.name,
      sound: "sounds/dice.wav",
      user: game.user._id,
      content: story
    };
    if (options2.gmOnly) {
      chatData.whisper = [game.users.find((u) => u.isGM).id];
    } else {
      BRTUtils.addRollModeToChatData(chatData);
    }
    ChatMessage.create(chatData);
  }
};
__name(_BRTStoryHelpers, "BRTStoryHelpers");
let BRTStoryHelpers = _BRTStoryHelpers;
const _StoryChatCard = class _StoryChatCard {
  /**
   * @param {object} betterResults
   * @param {object} currencyData
   */
  constructor(betterResults, rollMode, roll2) {
    this.betterResults = betterResults;
    this.rollMode = getRollMode(rollMode);
    this.roll = roll2;
  }
  /**
   * Create a chat card to display the story string
   * @param {string} story the html string of the story to display in chat
   * @param {Object} options set of options, if gmOnly = true then the card will be set to shown only to GM regardless of the chat preferences
   */
  async createChatCard(table, options2 = {}) {
    let story = null;
    if (options2.gmOnly) {
      story = await BRTStoryHelpers.generateContentGMHtmlStory(table);
    } else {
      story = await BRTStoryHelpers.generateContentHtmlStory(table);
    }
    story = '<div class="better-rolltables-story-text-selectable">' + story + "</div>";
    const rollHTML = null;
    const chatData = {
      rollHTML,
      flavor: table.name,
      sound: "sounds/dice.wav",
      user: game.user._id,
      content: story
    };
    if (options2.gmOnly) {
      chatData.whisper = [game.users.find((u) => u.isGM).id];
    } else {
      BRTUtils.addRollModeToChatData(chatData);
    }
    ChatMessage.create(chatData);
  }
};
__name(_StoryChatCard, "StoryChatCard");
let StoryChatCard = _StoryChatCard;
const _HarvestChatCard = class _HarvestChatCard {
  /**
   * @param {object} betterResults
   */
  constructor(betterResults, rollMode, roll2) {
    this.betterResults = betterResults;
    this.rollMode = getRollMode(rollMode);
    this.roll = roll2;
    this.itemsData = [];
    this.itemsDataGM = [];
    this.numberOfDraws = 0;
    this.atLeastOneRollIsHidden = false;
    for (const result of this.betterResults) {
      if (getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`)) {
        this.atLeastOneRollIsHidden = true;
        break;
      }
    }
  }
  async findOrCreateItems() {
    for (const result of ItemPilesHelpers.stackTableResults(this.betterResults)) {
      this.numberOfDraws++;
      const quantity = result.quantity;
      let type = void 0;
      if (result.isText || result.type === CONST.TABLE_RESULT_TYPES.TEXT) {
        type = CONST.TABLE_RESULT_TYPES.TEXT;
      } else if (result.pack || result.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM) {
        type = CONST.TABLE_RESULT_TYPES.COMPENDIUM;
      } else if (result.documentCollection || result.type === CONST.TABLE_RESULT_TYPES.DOCUMENT) {
        type = CONST.TABLE_RESULT_TYPES.DOCUMENT;
      } else {
        throw Logger.error(`No vaid type is been found for this result`, true, result);
      }
      let customResultName = void 0;
      if (hasProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`)) {
        customResultName = getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`) || "";
      }
      let customResultImg = void 0;
      if (hasProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`)) {
        customResultImg = getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`) || "";
      }
      let isResultHidden = false;
      if (hasProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`)) {
        isResultHidden = getProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`
        ) || false;
      }
      const entityUuid = getProperty(
        result,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`
      );
      let itemEntity = await fromUuid(entityUuid);
      const fontSize = itemEntity ? Math.max(60, 100 - Math.max(0, (customResultName || itemEntity.name || result.text).length - 27) * 2) : Math.max(60, 100 - Math.max(0, (result.name || result.text).length - 27) * 2);
      if (result.type === CONST.TABLE_RESULT_TYPES.TEXT || !itemEntity) {
        Logger.debug(`Cannot find document with '${entityUuid}'`);
        this.itemsDataGM.push({
          id: result.text,
          text: customResultName ?? result.text ?? result.name,
          img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
          isText: true,
          documentName: result.documentName,
          compendiumName: result.pack,
          type,
          item: {
            id: result.id,
            _id: result.id,
            name: customResultName ?? result.text ?? result.name,
            img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
            text: customResultName ?? result.text ?? result.name,
            uuid: "",
            isHidden: false,
            quantity,
            // weight: weight,
            fontSize
          },
          isHidden: false,
          quantity,
          // weight: weight,
          fontSize
        });
        if (!getProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_SHOW_HIDDEN_RESULT_ON_CHAT}`
        ) && getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`)) {
          continue;
        }
        if (isResultHidden) {
          this.itemsData.push({
            id: result.text,
            text: result.text ?? result.name,
            img: result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
            isText: true,
            documentName: result.documentName,
            compendiumName: result.pack,
            type,
            item: {
              id: result.id,
              _id: result.id,
              name: result.text ?? result.name,
              img: result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
              text: result.text ?? result.name,
              uuid: "",
              isHidden: isResultHidden,
              quantity,
              // weight: weight,
              fontSize
            },
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          });
        } else {
          this.itemsData.push({
            id: result.text,
            text: customResultName ?? result.text ?? result.name,
            img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
            isText: true,
            documentName: result.documentName,
            compendiumName: result.pack,
            type,
            item: {
              id: result.id,
              _id: result.id,
              name: customResultName ?? result.text ?? result.name,
              img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
              text: customResultName ?? result.text ?? result.name,
              uuid: "",
              isHidden: isResultHidden,
              quantity,
              // weight: weight,
              fontSize
            },
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          });
        }
        continue;
      }
      const itemFolder = await this.getBRTFolder();
      if (itemFolder) {
        itemEntity.folder = itemFolder.id;
      } else {
        Logger.debug(`No folder tables found with name 'Better RollTable | Better Items'`);
      }
      if (customResultName && customResultName !== itemEntity.name) {
        setProperty(itemEntity, `name`, customResultName);
      }
      if (customResultImg && customResultImg !== itemEntity.img) {
        setProperty(itemEntity, `img`, customResultImg);
      }
      let isJournal = itemEntity instanceof JournalEntry;
      let docJournalPageUuid = getProperty(
        result,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`
      );
      if (isJournal && docJournalPageUuid) {
        itemEntity = await fromUuid(docJournalPageUuid);
      }
      this.itemsDataGM.push({
        id: result.text,
        text: customResultName ?? result.text ?? result.name,
        img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
        isText: false,
        documentName: itemEntity.documentName,
        compendiumName: itemEntity.pack,
        type,
        item: {
          id: itemEntity.id,
          _id: itemEntity.id,
          name: itemEntity.name,
          img: itemEntity.img ?? itemEntity.src ?? `icons/svg/d20-highlight.svg`,
          text: itemEntity.text ?? itemEntity.name ?? "",
          uuid: itemEntity?.uuid ?? "",
          isHidden: false,
          quantity,
          // weight: weight,
          fontSize
        },
        isHidden: false,
        quantity,
        // weight: weight,
        fontSize
      });
      if (isResultHidden) {
        if (!getProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_SHOW_HIDDEN_RESULT_ON_CHAT}`
        )) {
          continue;
        }
      }
      setProperty(
        itemEntity,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`,
        isResultHidden
      );
      if (isResultHidden) {
        this.itemsData.push({
          id: result.text,
          text: result.text ?? result.name,
          img: result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
          isText: false,
          documentName: itemEntity.documentName,
          compendiumName: itemEntity.pack,
          type,
          item: {
            id: itemEntity.id,
            _id: itemEntity.id,
            name: itemEntity.name,
            img: itemEntity.img ?? itemEntity.src ?? `icons/svg/d20-highlight.svg`,
            text: itemEntity.text ?? itemEntity.name ?? "",
            uuid: itemEntity?.uuid ?? "",
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          },
          isHidden: isResultHidden,
          quantity,
          // weight: weight,
          fontSize
        });
      } else {
        this.itemsData.push({
          id: result.text,
          text: customResultName ?? result.text ?? result.name,
          img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
          isText: false,
          documentName: itemEntity.documentName,
          compendiumName: itemEntity.pack,
          type,
          item: {
            id: itemEntity.id,
            _id: itemEntity.id,
            name: itemEntity.name,
            img: itemEntity.img ?? itemEntity.src ?? `icons/svg/d20-highlight.svg`,
            text: itemEntity.text ?? itemEntity.name ?? "",
            uuid: itemEntity?.uuid ?? "",
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          },
          isHidden: isResultHidden,
          quantity,
          // weight: weight,
          fontSize
        });
      }
    }
  }
  async renderMessage(data) {
    return renderTemplate(`modules/${CONSTANTS.MODULE_ID}/templates/card/harvest-chat-card.hbs`, data);
  }
  async getBRTFolder() {
    if (!this.historyFolder) {
      let historyFolder = game.folders.getName("Better RollTable | Harvest Items");
      if (!historyFolder) {
        historyFolder = await Folder.create({
          name: "Better RollTable | Harvest Items",
          parent: null,
          type: "Item"
        });
      }
      this.historyFolder = historyFolder;
    }
    return this.historyFolder;
  }
  async prepareCharCart(table) {
    const htmlDescription = await TextEditor.enrichHTML(table.description, {
      async: true,
      secrets: table.isOwner,
      documents: true
    });
    const rollHTML = null;
    let flavorString;
    if (this.numberOfDraws > 1) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultPlural`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else if (this.numberOfDraws > 0) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultSingular`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultZero`, {
        name: table.name
      });
    }
    const chatCardData = {
      rollHTML,
      tableData: table,
      htmlDescription,
      // gmTitleLabel: Logger.i18n(`${CONSTANTS.MODULE_ID}.label.tableTextGmTitleLabel`),
      itemsData: this.itemsData,
      compendium: table,
      id: table.id,
      users: game.users.filter((user) => !user.isGM && user.character).map((user) => ({
        id: user.id,
        name: user.character.name,
        img: user.character.token?.img || user.avatar
      }))
    };
    const cardHtml = await this.renderMessage(chatCardData);
    const chatData = {
      flavor: flavorString,
      sound: "sounds/dice.wav",
      user: game.user._id,
      content: cardHtml,
      flags: {
        [`${CONSTANTS.MODULE_ID}`]: {
          [`${CONSTANTS.FLAGS.HARVEST}`]: chatCardData
        }
      }
    };
    return chatData;
  }
  async prepareCharCartGM(table) {
    const htmlDescription = await TextEditor.enrichHTML(table.description, {
      async: true,
      secrets: table.isOwner,
      documents: true
    });
    const rollHTML = null;
    let flavorString;
    if (this.numberOfDraws > 1) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultPlural`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else if (this.numberOfDraws > 0) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultSingular`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultZero`, {
        name: table.name
      });
    }
    const chatCardData = {
      rollHTML,
      tableData: table,
      htmlDescription,
      gmTitleLabel: Logger.i18n(`${CONSTANTS.MODULE_ID}.label.tableTextGmTitleLabel`),
      itemsData: this.itemsDataGM,
      compendium: table,
      id: table.id,
      users: game.users.filter((user) => user.isGM && user.character).map((user) => ({
        id: user.id,
        name: user.character.name,
        img: user.character.token?.img || user.avatar
      }))
    };
    const cardHtml = await this.renderMessage(chatCardData);
    const chatData = {
      flavor: flavorString,
      sound: "sounds/dice.wav",
      user: game.user._id,
      content: cardHtml,
      flags: {
        [`${CONSTANTS.MODULE_ID}`]: {
          [`${CONSTANTS.FLAGS.HARVEST}`]: chatCardData
        }
      }
    };
    return chatData;
  }
  async createChatCard(table) {
    if (!game.user.isGM) {
      if (this.atLeastOneRollIsHidden || this.rollMode === "gmroll") {
        await betterRolltablesSocket.executeAsGM(
          "invokeGenericChatCardCreateArr",
          table.uuid,
          this.betterResults,
          this.rollMode,
          this.roll,
          false,
          CONSTANTS.TABLE_TYPE_HARVEST
        );
      } else {
        await this.findOrCreateItems();
        const chatData = await this.prepareCharCart(table);
        BRTUtils.addRollModeToChatData(chatData, this.rollMode);
        ChatMessage.create(chatData);
      }
    } else {
      const isShowHiddenResultOnChat = getProperty(
        table,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_SHOW_HIDDEN_RESULT_ON_CHAT}`
      );
      await this.findOrCreateItems();
      if (this.itemsData?.length > 0) {
        const chatData = await this.prepareCharCart(table);
        if (!isShowHiddenResultOnChat) {
          BRTUtils.addRollModeToChatData(chatData, this.rollMode);
        }
        ChatMessage.create(chatData);
      }
      if (this.atLeastOneRollIsHidden) {
        const chatDataGM = await this.prepareCharCartGM(table);
        BRTUtils.addRollModeToChatData(chatDataGM, "gmroll");
        ChatMessage.create(chatDataGM);
      }
    }
  }
};
__name(_HarvestChatCard, "HarvestChatCard");
let HarvestChatCard = _HarvestChatCard;
let betterRolltablesSocket$1;
function registerSocket() {
  if (betterRolltablesSocket$1) {
    return betterRolltablesSocket$1;
  }
  betterRolltablesSocket$1 = socketlib.registerModule(CONSTANTS.MODULE_ID);
  betterRolltablesSocket$1.register(
    "invokeGenericChatCardCreateArr",
    (...args) => API$1.invokeGenericChatCardCreateArr(...args)
  );
  betterRolltablesSocket$1.register("invokeBetterTableRollArr", (...args) => API$1.invokeBetterTableRollArr(...args));
  game.modules.get(CONSTANTS.MODULE_ID).socket = betterRolltablesSocket$1;
  return betterRolltablesSocket$1;
}
__name(registerSocket, "registerSocket");
const _BetterChatCard = class _BetterChatCard {
  /**
   * @param {object} betterResults
   */
  constructor(betterResults, rollMode, roll2) {
    this.betterResults = betterResults;
    this.rollMode = getRollMode(rollMode);
    this.roll = roll2;
    this.itemsData = [];
    this.itemsDataGM = [];
    this.numberOfDraws = 0;
    this.atLeastOneRollIsHidden = false;
    for (const result of this.betterResults) {
      if (getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`)) {
        this.atLeastOneRollIsHidden = true;
        break;
      }
    }
  }
  async findOrCreateItems() {
    for (const result of ItemPilesHelpers.stackTableResults(this.betterResults)) {
      this.numberOfDraws++;
      const quantity = result.quantity || 1;
      let type = void 0;
      if (result.isText || result.type === CONST.TABLE_RESULT_TYPES.TEXT) {
        type = CONST.TABLE_RESULT_TYPES.TEXT;
      } else if (result.pack || result.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM) {
        type = CONST.TABLE_RESULT_TYPES.COMPENDIUM;
      } else if (result.documentCollection || result.type === CONST.TABLE_RESULT_TYPES.DOCUMENT) {
        type = CONST.TABLE_RESULT_TYPES.DOCUMENT;
      } else {
        throw Logger.error(`No vaid type is been found for this result`, true, result);
      }
      let customResultName = void 0;
      if (hasProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`)) {
        customResultName = getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`) || "";
      }
      let customResultImg = void 0;
      if (hasProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`)) {
        customResultImg = getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`) || "";
      }
      let isResultHidden = false;
      if (hasProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`)) {
        isResultHidden = getProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`
        ) || false;
      }
      const entityUuid = getProperty(
        result,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`
      );
      let itemEntity = await fromUuid(entityUuid);
      const fontSize = itemEntity ? Math.max(60, 100 - Math.max(0, (customResultName || itemEntity.name || result.text).length - 27) * 2) : Math.max(60, 100 - Math.max(0, (result.name || result.text).length - 27) * 2);
      if (result.type === CONST.TABLE_RESULT_TYPES.TEXT || !itemEntity) {
        Logger.debug(`Cannot find document with '${entityUuid}'`);
        this.itemsDataGM.push({
          id: result.text,
          text: customResultName ?? result.text ?? result.name,
          img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
          isText: true,
          documentName: result.documentName,
          compendiumName: result.pack,
          type,
          item: {
            id: result.id,
            _id: result.id,
            name: customResultName ?? result.text ?? result.name,
            img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
            text: customResultName ?? result.text ?? result.name,
            uuid: "",
            isHidden: false,
            quantity,
            // weight: weight,
            fontSize
          },
          isHidden: false,
          quantity,
          // weight: weight,
          fontSize
        });
        if (!getProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_SHOW_HIDDEN_RESULT_ON_CHAT}`
        ) && getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`)) {
          continue;
        }
        if (isResultHidden) {
          this.itemsData.push({
            id: result.text,
            text: result.text ?? result.name,
            img: result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
            isText: true,
            documentName: result.documentName,
            compendiumName: result.pack,
            type,
            item: {
              id: result.id,
              _id: result.id,
              name: result.text ?? result.name,
              img: result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
              text: result.text ?? result.name,
              uuid: "",
              isHidden: isResultHidden,
              quantity,
              // weight: weight,
              fontSize
            },
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          });
        } else {
          this.itemsData.push({
            id: result.text,
            text: customResultName ?? result.text ?? result.name,
            img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
            isText: true,
            documentName: result.documentName,
            compendiumName: result.pack,
            type,
            item: {
              id: result.id,
              _id: result.id,
              name: customResultName ?? result.text ?? result.name,
              img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
              text: customResultName ?? result.text ?? result.name,
              uuid: "",
              isHidden: isResultHidden,
              quantity,
              // weight: weight,
              fontSize
            },
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          });
        }
        continue;
      }
      const itemFolder = await this.getBRTFolder();
      if (itemFolder) {
        itemEntity.folder = itemFolder.id;
      } else {
        Logger.debug(`No folder tables found with name 'Better RollTable | Better Items'`);
      }
      if (customResultName && customResultName !== itemEntity.name) {
        setProperty(itemEntity, `name`, customResultName);
      }
      if (customResultImg && customResultImg !== itemEntity.img) {
        setProperty(itemEntity, `img`, customResultImg);
      }
      let isJournal = itemEntity instanceof JournalEntry;
      let docJournalPageUuid = getProperty(
        result,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`
      );
      if (isJournal && docJournalPageUuid) {
        itemEntity = await fromUuid(docJournalPageUuid);
      }
      this.itemsDataGM.push({
        id: result.text,
        text: customResultName ?? result.text ?? result.name,
        img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
        isText: false,
        documentName: itemEntity.documentName,
        compendiumName: itemEntity.pack,
        type,
        item: {
          id: itemEntity.id,
          _id: itemEntity.id,
          name: itemEntity.name,
          img: itemEntity.img ?? itemEntity.src ?? `icons/svg/d20-highlight.svg`,
          text: itemEntity.text ?? itemEntity.name ?? "",
          uuid: itemEntity?.uuid ?? "",
          isHidden: false,
          quantity,
          // weight: weight,
          fontSize
        },
        isHidden: false,
        quantity,
        // weight: weight,
        fontSize
      });
      if (isResultHidden) {
        if (!getProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_SHOW_HIDDEN_RESULT_ON_CHAT}`
        )) {
          continue;
        }
      }
      setProperty(
        itemEntity,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`,
        isResultHidden
      );
      if (isResultHidden) {
        this.itemsData.push({
          id: result.text,
          text: result.text ?? result.name,
          img: result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
          isText: false,
          documentName: itemEntity.documentName,
          compendiumName: itemEntity.pack,
          type,
          item: {
            id: itemEntity.id,
            _id: itemEntity.id,
            name: itemEntity.name,
            img: itemEntity.img ?? itemEntity.src ?? `icons/svg/d20-highlight.svg`,
            text: itemEntity.text ?? itemEntity.name ?? "",
            uuid: itemEntity?.uuid ?? "",
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          },
          isHidden: isResultHidden,
          quantity,
          // weight: weight,
          fontSize
        });
      } else {
        this.itemsData.push({
          id: result.text,
          text: customResultName ?? result.text ?? result.name,
          img: customResultImg ?? result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`,
          isText: false,
          documentName: itemEntity.documentName,
          compendiumName: itemEntity.pack,
          type,
          item: {
            id: itemEntity.id,
            _id: itemEntity.id,
            name: itemEntity.name,
            img: itemEntity.img ?? itemEntity.src ?? `icons/svg/d20-highlight.svg`,
            text: itemEntity.text ?? itemEntity.name ?? "",
            uuid: itemEntity?.uuid ?? "",
            isHidden: isResultHidden,
            quantity,
            // weight: weight,
            fontSize
          },
          isHidden: isResultHidden,
          quantity,
          // weight: weight,
          fontSize
        });
      }
    }
  }
  async renderMessage(data) {
    return renderTemplate(`modules/${CONSTANTS.MODULE_ID}/templates/card/better-chat-card.hbs`, data);
  }
  async getBRTFolder() {
    if (!this.historyFolder) {
      let historyFolder = game.folders.getName("Better RollTable | Better Items");
      if (!historyFolder) {
        historyFolder = await Folder.create({
          name: "Better RollTable | Better Items",
          parent: null,
          type: "Item"
        });
      }
      this.historyFolder = historyFolder;
    }
    return this.historyFolder;
  }
  async prepareCharCart(table) {
    const htmlDescription = await TextEditor.enrichHTML(table.description, {
      async: true,
      secrets: table.isOwner,
      documents: true
    });
    const rollHTML = null;
    let flavorString;
    if (this.numberOfDraws > 1) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultPlural`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else if (this.numberOfDraws > 0) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultSingular`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultZero`, {
        name: table.name
      });
    }
    const chatCardData = {
      rollHTML,
      tableData: table,
      htmlDescription,
      // gmTitleLabel: Logger.i18n(`${CONSTANTS.MODULE_ID}.label.tableTextGmTitleLabel`),
      itemsData: this.itemsData,
      compendium: table.pack,
      id: table.id,
      users: game.users.filter((user) => !user.isGM && user.character).map((user) => ({
        id: user.id,
        name: user.character.name,
        img: user.character.token?.img || user.avatar
      }))
    };
    const cardHtml = await this.renderMessage(chatCardData);
    const chatData = {
      flavor: flavorString,
      sound: "sounds/dice.wav",
      user: game.user._id,
      content: cardHtml,
      flags: {
        [`${CONSTANTS.MODULE_ID}`]: {
          [`${CONSTANTS.FLAGS.BETTER}`]: chatCardData
        }
      }
    };
    return chatData;
  }
  async prepareCharCartGM(table) {
    const htmlDescription = await TextEditor.enrichHTML(table.description, {
      async: true,
      secrets: table.isOwner,
      documents: true
    });
    const rollHTML = null;
    let flavorString;
    if (this.numberOfDraws > 1) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultPlural`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else if (this.numberOfDraws > 0) {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultSingular`, {
        amount: this.numberOfDraws,
        name: table.name
      });
    } else {
      flavorString = game.i18n.format(`${CONSTANTS.MODULE_ID}.DrawResultZero`, {
        name: table.name
      });
    }
    const chatCardData = {
      rollHTML,
      tableData: table,
      htmlDescription,
      gmTitleLabel: Logger.i18n(`${CONSTANTS.MODULE_ID}.label.tableTextGmTitleLabel`),
      itemsData: this.itemsDataGM,
      compendium: table.pack,
      id: table.id,
      users: game.users.filter((user) => user.isGM && user.character).map((user) => ({
        id: user.id,
        name: user.character.name,
        img: user.character.token?.img || user.avatar
      }))
    };
    const cardHtml = await this.renderMessage(chatCardData);
    const chatData = {
      flavor: flavorString,
      sound: "sounds/dice.wav",
      user: game.user._id,
      content: cardHtml,
      flags: {
        [`${CONSTANTS.MODULE_ID}`]: {
          [`${CONSTANTS.FLAGS.BETTER}`]: chatCardData
        }
      }
    };
    return chatData;
  }
  async createChatCard(table) {
    if (!game.user.isGM) {
      if (this.atLeastOneRollIsHidden || this.rollMode === "gmroll") {
        await betterRolltablesSocket$1.executeAsGM(
          "invokeGenericChatCardCreateArr",
          table.uuid,
          this.betterResults,
          this.rollMode,
          this.roll,
          false,
          CONSTANTS.TABLE_TYPE_BETTER
        );
      } else {
        await this.findOrCreateItems();
        const chatData = await this.prepareCharCart(table);
        BRTUtils.addRollModeToChatData(chatData, this.rollMode);
        ChatMessage.create(chatData);
      }
    } else {
      const isShowHiddenResultOnChat = getProperty(
        table,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_SHOW_HIDDEN_RESULT_ON_CHAT}`
      );
      await this.findOrCreateItems();
      if (this.itemsData?.length > 0) {
        const chatData = await this.prepareCharCart(table);
        if (!isShowHiddenResultOnChat) {
          BRTUtils.addRollModeToChatData(chatData, this.rollMode);
        }
        ChatMessage.create(chatData);
      }
      if (this.atLeastOneRollIsHidden) {
        const chatDataGM = await this.prepareCharCartGM(table);
        BRTUtils.addRollModeToChatData(chatDataGM, "gmroll");
        ChatMessage.create(chatDataGM);
      }
    }
  }
};
__name(_BetterChatCard, "BetterChatCard");
let BetterChatCard = _BetterChatCard;
let BRTHarvestHelpers$1 = (_a = class {
  /**
   * Roll a table an add the resulting harvest to a given token.
   *
   * @param {RollTable} tableEntity
   * @param {TokenDocument} token
   * @param {options} object
   * @returns
   */
  static async addHarvestToSelectedToken(tableEntity, token = null, options2 = {}) {
    let tokenstack = [];
    if (null == token && canvas.tokens.controlled.length === 0) {
      return Logger.error("Please select a token first");
    } else {
      tokenstack = token ? token.constructor === Array ? token : [token] : canvas.tokens.controlled;
    }
    Logger.info("Harvest generation started.");
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    for (const token2 of tokenstack) {
      Logger.info(`Harvest generation started on token '${token2.name}'`, true);
      const resultsBrt = await brtTable2.betterRoll();
      const rollMode = brtTable2.rollMode;
      const roll2 = brtTable2.mainRoll;
      const results2 = resultsBrt?.results;
      const br2 = new BetterResults(
        tableEntity,
        results2,
        options2?.stackResultsWithBRTLogic,
        options2?.rollAsTableType
      );
      const betterResults = await br2.buildResults();
      await ItemPilesHelpers.populateActorOrTokenViaTableResults(token2, results2);
      Logger.info(`Harvest generation ended on token '${token2.name}'`, true);
      if (isRealBoolean(options2.displayChat)) {
        if (!options2.displayChat) {
          continue;
        }
      }
      const harvestChatCard = new HarvestChatCard(betterResults, rollMode, roll2);
      await harvestChatCard.createChatCard(tableEntity);
    }
    Logger.info("Harvest generation complete.");
    return;
  }
  /**
   *
   * @param {*} tableEntity
   */
  static async generateHarvest(tableEntity, options2 = {}) {
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    const resultsBrt = await brtTable2.betterRoll();
    brtTable2.options?.isTokenActor;
    brtTable2.options?.stackSame;
    brtTable2.options?.itemLimit;
    const rollMode = brtTable2.rollMode;
    const roll2 = brtTable2.mainRoll;
    const results2 = resultsBrt?.results;
    const br2 = new BetterResults(tableEntity, results2, options2?.stackResultsWithBRTLogic, options2?.rollAsTableType);
    const betterResults = await br2.buildResults();
    const actor = await _a.createActor(tableEntity);
    await ItemPilesHelpers.populateActorOrTokenViaTableResults(actor, results2);
    if (isRealBoolean(options2.displayChat)) {
      if (!options2.displayChat) {
        return;
      }
    }
    const harvestChatCard = new HarvestChatCard(betterResults, rollMode, roll2);
    await harvestChatCard.createChatCard(tableEntity);
  }
  static async generateChatHarvest(tableEntity, options2 = {}) {
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    const resultsBrt = await brtTable2.betterRoll();
    const rollMode = brtTable2.rollMode;
    const roll2 = brtTable2.mainRoll;
    const results2 = resultsBrt?.results;
    const br2 = new BetterResults(tableEntity, results2, options2?.stackResultsWithBRTLogic, options2?.rollAsTableType);
    const betterResults = await br2.buildResults();
    const harvestChatCard = new HarvestChatCard(betterResults, rollMode, roll2);
    await harvestChatCard.createChatCard(tableEntity);
  }
  static async createActor(table, overrideName = void 0) {
    const actorName = overrideName || table.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.HARVEST_ACTOR_NAME_KEY);
    let actor = game.actors.getName(actorName);
    if (!actor) {
      actor = await Actor.create({
        name: actorName || "New Harvest",
        type: game.itempiles.API.ACTOR_CLASS_TYPE,
        // game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.DEFAULT_ACTOR_NPC_TYPE),
        img: `modules/${CONSTANTS.MODULE_ID}/assets/artwork/chest.webp`,
        sort: 12e3,
        token: { actorLink: true }
      });
    }
    return actor;
  }
  /**
   *
   * @param {string} dynamicDcValue
   * @param {number} dc
   * @param {string} skill
   * @returns {boolean}
   */
  static calculateDynamicDcSync(dynamicDcValue, dc, skill2) {
    if (!isRealNumber(dc) || parseInt(dc) <= 0) {
      return false;
    }
    if (!skill2) {
      return false;
    }
    const mapDynamicDc = _a.prepareMapDynamicDcSync(dynamicDcValue);
    if (!mapDynamicDc.has(skill2.trim())) {
      return false;
    }
    if (mapDynamicDc.get(skill2.trim()) <= parseInt(dc)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   *
   * @param {string} dynamicDcValue
   * @returns {Map<string,string>}
   */
  static prepareMapDynamicDcSync(dynamicDcValue) {
    const dynamicDcValues = parseAsArray(dynamicDcValue);
    const mapDynamicDc = /* @__PURE__ */ new Map();
    for (const entry of dynamicDcValues) {
      if (!entry || !entry.includes("=")) {
        continue;
      }
      const ss = entry.split("=");
      const skillEntry = ss[0].trim();
      const dcEntry = ss[1].trim();
      mapDynamicDc.set(skillEntry, BRTBetterHelpers.tryRollSync(dcEntry));
    }
    return mapDynamicDc;
  }
  /**
   *
   * @param {string} dynamicDcValue
   * @returns {string} A joiner string of value X=10,Y=20
   */
  static prepareValueDynamicDcSync(dynamicDcValue) {
    const mapDynamicDc = _a.prepareMapDynamicDcSync(dynamicDcValue);
    let asStrings = [];
    for (let [key, value] of mapDynamicDc.entries()) {
      asStrings.push(`${key}=${value}`);
    }
    return asStrings.join(",").trim();
  }
  /**
   * Utility method to retrieve the minimal dc value present on the table
   * @param {RollTable|string|UUID} tableEntity
   * @returns {Promise<number>} The minimal dc founded or 0 otherwise
   */
  static async retrieveMinDCOnTable(tableEntity) {
    const table = await RetrieveHelpers.getRollTableAsync(tableEntity);
    const dcs = [];
    let results2 = table.results?.contents || [];
    const useDynamicDcOnTable = getProperty(
      table,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_USE_DYNAMIC_DC}`
    );
    for (const r of results2) {
      if (useDynamicDcOnTable) {
        const dynamicDcValue = getProperty(
          r,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_RESULT_DYNAMIC_DC_VALUE}`
        );
        if (dynamicDcValue) {
          const mapDynamicDc = _a.prepareMapDynamicDcSync(dynamicDcValue);
          for (const dcValue of mapDynamicDc.values()) {
            dcs.push(await tryToConvertToNumber(dcValue));
          }
        }
      } else {
        const dcValue = getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_DC_VALUE_KEY}`);
        dcs.push(await tryToConvertToNumber(dcValue));
      }
    }
    const minimalDC = Math.min(...dcs);
    return minimalDC;
  }
  /**
   * Utility method to retrieve the minimal dc value present on the table
   * @param {RollTable|string|UUID} tableEntity
   * @returns {number} The minimal dc founded or 0 otherwise
   */
  static retrieveMinDCOnTableSync(tableEntity) {
    const table = RetrieveHelpers.getRollTableSync(tableEntity);
    const dcs = [];
    let results2 = table.results?.contents || [];
    const useDynamicDcOnTable = getProperty(
      table,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_USE_DYNAMIC_DC}`
    );
    for (const r of results2) {
      if (useDynamicDcOnTable) {
        const dynamicDcValue = getProperty(
          r,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_RESULT_DYNAMIC_DC_VALUE}`
        );
        if (dynamicDcValue) {
          const mapDynamicDc = _a.prepareMapDynamicDcSync(dynamicDcValue);
          for (const dcValue of mapDynamicDc.values()) {
            dcs.push(tryToConvertToNumberSync(dcValue));
          }
        }
      } else {
        const dcValue = getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_DC_VALUE_KEY}`);
        dcs.push(tryToConvertToNumberSync(dcValue));
      }
    }
    const minimalDC = Math.min(...dcs);
    return minimalDC;
  }
}, __name(_a, "BRTHarvestHelpers"), _a);
const _BetterRollTable = class _BetterRollTable {
  // extends RollTable {
  get rollMode() {
    return this.options.rollMode;
  }
  constructor(table, options2) {
    this.table = table;
    this.options = mergeObject(
      {
        roll: null,
        results: [],
        recursive: true,
        displayChat: false,
        rollMode: null,
        _depth: 0
      },
      options2
    );
    this.mainRoll = void 0;
    this.blackListForDistinct = [];
    this.rollAsTableType = this.options.rollAsTableType ? this.options.rollAsTableType : this.table.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TABLE_TYPE_KEY);
    this.options.rollAsTableType = this.rollAsTableType;
  }
  async initialize() {
    let optionsTmp = await BRTUtils.updateOptions(this.table, this.options);
    this.options = mergeObject(
      {
        roll: null,
        results: [],
        recursive: true,
        displayChat: false,
        rollMode: null,
        _depth: 0
      },
      optionsTmp
    );
    this.mainRoll = void 0;
    this.tableUuid = this.table.uuid;
    if (!this.tableUuid.startsWith("Compendium")) {
      if (this.options.resetTable) {
        await this.table.reset();
      }
      if (this.options.normalizeTable) {
        await this.table.update({
          results: this.table.results.map((result) => ({
            _id: result.id,
            weight: result.range[1] - (result.range[0] - 1)
          }))
        });
        await this.table.normalize();
      }
    }
    this.rollAsTableType = this.options.rollAsTableType ? this.options.rollAsTableType : this.table.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TABLE_TYPE_KEY);
    this.options.rollAsTableType = this.rollAsTableType;
  }
  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */
  /**
   * Display a result drawn from a RollTable in the Chat Log along.
   * Optionally also display the Roll which produced the result and configure aspects of the displayed messages.
   *
   * @param {TableResult[]} results         An Array of one or more TableResult Documents which were drawn and should
   *                                        be displayed.
   * @param {object} [options={}]           Additional options which modify message creation
   * @param {Roll} [options.roll]                 An optional Roll instance which produced the drawn results
   * @param {Object} [options.messageData={}]     Additional data which customizes the created messages
   * @param {Object} [options.messageOptions={}]  Additional options which customize the created messages
   */
  async toMessage(results2, { roll: roll2 = null, messageData = {}, messageOptions = {} } = {}) {
    const speaker = ChatMessage.getSpeaker();
    const flavorKey = `TABLE.DrawFlavor${results2.length > 1 ? "Plural" : ""}`;
    messageData = foundry.utils.mergeObject(
      {
        flavor: game.i18n.format(flavorKey, { number: results2.length, name: this.table.name }),
        user: game.user.id,
        speaker,
        type: roll2 ? CONST.CHAT_MESSAGE_TYPES.ROLL : CONST.CHAT_MESSAGE_TYPES.OTHER,
        roll: roll2,
        sound: roll2 ? CONFIG.sounds.dice : null,
        flags: { "core.RollTable": this.table.id }
      },
      messageData
    );
    let betterResults = results2.map((result) => {
      if (result instanceof TableResult) {
        const r = result.toObject(false);
        r.text = result.getChatText();
        r.icon = result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`;
        return r;
      } else {
        const r = result;
        r.icon = result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`;
        return r;
      }
    });
    if (this.rollAsTableType === CONSTANTS.TABLE_TYPE_BETTER) {
      const betterChatCard = new BetterChatCard(betterResults, this.rollMode, roll2);
      await betterChatCard.createChatCard(this.table);
    } else if (this.rollAsTableType === CONSTANTS.TABLE_TYPE_LOOT) {
      const currencyData = br.getCurrencyData();
      const lootChatCard = new LootChatCard(betterResults, currencyData, this.rollMode, roll2);
      await lootChatCard.createChatCard(this.table);
    } else if (this.rollAsTableType === CONSTANTS.TABLE_TYPE_STORY) {
      const storyChatCard = new StoryChatCard(betterResults, this.rollMode, roll2);
      await storyChatCard.createChatCard(this.table);
    } else if (this.rollAsTableType === CONSTANTS.TABLE_TYPE_HARVEST) {
      const harvestChatCard = new HarvestChatCard(betterResults, this.rollMode, roll2);
      await harvestChatCard.createChatCard(this.table);
    } else {
      messageData.content = await renderTemplate(CONFIG.RollTable.resultTemplate, {
        // messageData.content = await renderTemplate(`modules/${CONSTANTS.MODULE_ID}/templates/card/better-chat-card.hbs`, {
        description: await TextEditor.enrichHTML(this.table.description, { documents: true, async: true }),
        results: results2.map((result) => {
          if (result instanceof TableResult) {
            const r = result.toObject(false);
            r.text = result.getChatText();
            r.icon = result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`;
            return r;
          } else {
            const r = result;
            r.icon = result.icon ?? result.img ?? result.src ?? `icons/svg/d20-highlight.svg`;
            return r;
          }
        }),
        rollHTML: this.table.displayRoll && roll2 ? await roll2.render() : null,
        table: this.table
      });
      return ChatMessage.implementation.create(messageData, messageOptions);
    }
  }
  /* -------------------------------------------- */
  /**
   * Draw a result from the RollTable based on the table formula or a provided Roll instance
   * @param {object} [options={}]         Optional arguments which customize the draw behavior
   * @param {Roll} [options.roll]                   An existing Roll instance to use for drawing from the table
   * @param {boolean} [options.recursive=true]      Allow drawing recursively from inner RollTable results
   * @param {TableResult[]} [options.results]       One or more table results which have been drawn
   * @param {boolean} [options.displayChat=true]    Whether to automatically display the results in chat
   * @param {string} [options.rollMode]             The chat roll mode to use when displaying the result
   * @returns {Promise<{RollTableDraw}>}  A Promise which resolves to an object containing the executed roll and the
   *                                      produced results.
   */
  async draw({ roll: roll2, recursive = true, results: results2 = [], displayChat = true, rollMode } = {}) {
    const draw = await this.table.draw({ roll: roll2, recursive, results: results2, displayChat: false, rollMode });
    let newResults = [];
    for (let i = 0; i < draw.results.length; i++) {
      const r = draw.results[i];
      let formulaAmount = "";
      if (hasProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_QUANTITY}`)) {
        formulaAmount = getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_QUANTITY}`) || "";
      }
      if (!formulaAmount && getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.RESULTS_FORMULA_KEY_FORMULA}`)) {
        formulaAmount = getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.RESULTS_FORMULA_KEY_FORMULA}`) || "";
      }
      if (r.type === CONST.TABLE_RESULT_TYPES.TEXT) {
        formulaAmount = "";
      }
      const qtFormula = await BRTBetterHelpers.tryRoll(formulaAmount);
      if (qtFormula == null || qtFormula === "" || qtFormula === "1") {
        newResults.push(r);
      } else {
        const qtRoll = Roll.create(qtFormula);
        const qt = (await qtRoll.evaluate({ async: true })).total;
        Logger.log(qt);
        newResults = newResults.concat(Array(qt).fill(r));
      }
    }
    draw.results = newResults;
    Logger.log(draw);
    if (displayChat) {
      await this.toMessage(draw.results, {
        roll: roll2,
        messageOptions: { rollMode }
      });
    }
    Logger.log(`Draw results:`, false, draw.results);
    return draw;
  }
  /* -------------------------------------------- */
  /**
   * Draw multiple results from a RollTable, constructing a final synthetic Roll as a dice pool of inner rolls.
   * @param {number} number               The number of results to draw
   * @param {object} [options={}]         Optional arguments which customize the draw
   * @param {Roll} [options.roll]                   An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true]      Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true]    Automatically display the drawn results in chat? Default is true
   * @param {string} [options.rollMode]             Customize the roll mode used to display the drawn results
   * @returns {Promise<{RollTableDraw}>}  The drawn results
   */
  async drawMany(number, { roll: roll2 = null, recursive = true, displayChat = false, rollMode = null, _depth = 0 } = {}) {
    let results2 = [];
    let updates = [];
    const rolls = [];
    for (let n = 0; n < number; n++) {
      let draw = await this.roll({ roll: roll2, recursive, _depth });
      if (draw.results.length) {
        rolls.push(draw.roll);
        results2 = results2.concat(draw.results);
      } else
        break;
      if (!this.table.replacement && !this.table.pack) {
        updates = updates.concat(
          draw.results.map((r) => {
            r.drawn = true;
            return { _id: r.id, drawn: true };
          })
        );
      }
    }
    const pool = PoolTerm.fromRolls(rolls);
    roll2 = Roll.defaultImplementation.fromTerms([pool]);
    if (updates.length) {
      await this.table.updateEmbeddedDocuments("TableResult", updates, { diff: false });
    }
    const isTableHidden = getProperty(this.table, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HIDDEN_TABLE}`);
    const isShowHiddenResultOnChat = getProperty(
      this.table,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_SHOW_HIDDEN_RESULT_ON_CHAT}`
    );
    results2.map((r) => {
      if (isTableHidden || String(
        getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`)
      ) === "true") {
        setProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`, true);
      } else {
        setProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_HIDDEN_TABLE}`, false);
      }
      if (isShowHiddenResultOnChat || String(
        getProperty(
          r,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_SHOW_HIDDEN_RESULT_ON_CHAT}`
        )
      ) === "true") {
        setProperty(
          r,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_SHOW_HIDDEN_RESULT_ON_CHAT}`,
          true
        );
      } else {
        setProperty(
          r,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_SHOW_HIDDEN_RESULT_ON_CHAT}`,
          false
        );
      }
      return r;
    });
    if (displayChat && results2.length) {
      await this.toMessage(results2, {
        roll: roll2,
        messageOptions: { rollMode }
      });
    }
    return { roll: roll2, results: results2 };
  }
  /* -------------------------------------------- */
  // /**
  //  * Normalize the probabilities of rolling each item in the RollTable based on their assigned weights
  //  * @returns {Promise<RollTable>}
  //  */
  // async normalize() {
  //   let totalWeight = 0;
  //   let counter = 1;
  //   const updates = [];
  //   for (let result of this.table.results) {
  //     const w = result.weight ?? 1;
  //     totalWeight += w;
  //     updates.push({ _id: result.id, range: [counter, counter + w - 1] });
  //     counter = counter + w;
  //   }
  //   return this.table.update({ results: updates, formula: `1d${totalWeight}` });
  // }
  /* -------------------------------------------- */
  // /**
  //  * Reset the state of the RollTable to return any drawn items to the table
  //  * @returns {Promise<RollTable>}
  //  */
  // async resetResults() {
  //   const updates = this.table.results.map((result) => ({ _id: result.id, drawn: false }));
  //   return this.table.updateEmbeddedDocuments("TableResult", updates, { diff: false });
  // }
  /* -------------------------------------------- */
  /**
   * Evaluate a RollTable by rolling its formula and retrieving a drawn result.
   *
   * Note that this function only performs the roll and identifies the result, the RollTable#draw function should be
   * called to formalize the draw from the table.
   *
   * @param {object} [options={}]       Options which modify rolling behavior
   * @param {Roll} [options.roll]                   An alternative dice Roll to use instead of the default table formula
   * @param {boolean} [options.recursive=true]   If a RollTable document is drawn as a result, recursively roll it
   * @param {number} [options._depth]            An internal flag used to track recursion depth
   * @returns {Promise<RollTableDraw>}  The Roll and results drawn by that Roll
   *
   * @example Draw results using the default table formula
   * ```js
   * const defaultResults = await table.roll();
   * ```
   *
   * @example Draw results using a custom roll formula
   * ```js
   * const roll = new Roll("1d20 + @abilities.wis.mod", actor.getRollData());
   * const customResults = await table.roll({roll});
   * ```
   */
  async roll({ roll: roll2, recursive = true, _depth = 0 } = {}) {
    if (_depth > 5) {
      throw Logger.error(
        `Maximum recursion depth exceeded when attempting to draw from RollTable ${this.table.id}`
      );
    }
    if (!this.table.formula) {
      await this.table.normalize();
    }
    let results2 = [];
    if (this.options.usePercentage) {
      roll2 = Roll.create(`1d1000`);
      let available = this.table.results.filter((r) => !r.drawn);
      if (!available.length) {
        Logger.warn(game.i18n.localize("TABLE.NoAvailableResults"), true);
        return { roll: roll2, results: results2 };
      }
      const useDynamicDcOnTable = getProperty(
        this.table,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_USE_DYNAMIC_DC}`
      );
      if (useDynamicDcOnTable && this.options.rollAsTableType === CONSTANTS.TABLE_TYPE_HARVEST) {
        const availableTmp = [];
        for (const a of available) {
          const dynamicDcFormula = getProperty(
            a,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_RESULT_DYNAMIC_DC_VALUE}`
          );
          if (dynamicDcFormula) {
            const dynamicDcValue = BRTHarvestHelpers$1.prepareValueDynamicDcSync(dynamicDcFormula);
            const brtAvailable = foundry.utils.deepClone(a);
            setProperty(
              brtAvailable,
              `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_RESULT_DYNAMIC_DC_VALUE}`,
              dynamicDcValue
            );
            availableTmp.push(brtAvailable);
          } else {
            availableTmp.push(a);
          }
        }
        available = availableTmp;
      }
      const minRoll = 10;
      const maxRoll = 1e3;
      const availableRange = available.reduce(
        (range, result) => {
          const percentageValueLFlag = getProperty(
            result,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_PERCENTAGE_LOW_VALUE}`
          ) ?? null;
          let percentageValueLTmp = isRealNumber(percentageValueLFlag) ? percentageValueLFlag : 0;
          percentageValueLTmp = percentageValueLTmp * 10;
          const percentageValueHFlag = getProperty(
            result,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_PERCENTAGE_HIGH_VALUE}`
          ) ?? null;
          let percentageValueHTmp = isRealNumber(percentageValueHFlag) ? percentageValueHFlag : 100;
          percentageValueHTmp = percentageValueHTmp * 10;
          const r = [percentageValueLTmp, percentageValueHTmp];
          if (!range[0] || r[0] < range[0])
            range[0] = r[0];
          if (!range[1] || r[1] > range[1])
            range[1] = r[1];
          return range;
        },
        [null, null]
      );
      if (availableRange[0] > maxRoll || availableRange[1] < minRoll) {
        return { roll: roll2, results: results2 };
      }
      roll2 = await roll2.reroll({ async: true });
      let resultsTmp = this.getResultsForRoll(roll2.total);
      if (resultsTmp?.length > 0) {
        let resultTmp = resultsTmp[Math.floor(Math.random() * resultsTmp.length)];
        results2 = [resultTmp];
      }
    } else {
      if (this.options.roll) {
        roll2 = this.options.roll instanceof Roll ? this.options.roll : Roll.create(this.options.roll);
      }
      roll2 = roll2 instanceof Roll ? roll2 : Roll.create(this.table.formula);
      let available = this.table.results.filter((r) => !r.drawn);
      if (!available.length) {
        Logger.warn(game.i18n.localize("TABLE.NoAvailableResults"), true);
        return { roll: roll2, results: results2 };
      }
      const useDynamicDcOnTable = getProperty(
        this.table,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_USE_DYNAMIC_DC}`
      );
      if (useDynamicDcOnTable && this.options.rollAsTableType === CONSTANTS.TABLE_TYPE_HARVEST) {
        const availableTmp = [];
        for (const a of available) {
          const dynamicDcFormula = getProperty(
            a,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_RESULT_DYNAMIC_DC_VALUE}`
          );
          if (dynamicDcFormula) {
            const dynamicDcValue = BRTHarvestHelpers$1.prepareValueDynamicDcSync(dynamicDcFormula);
            const brtAvailable = foundry.utils.deepClone(a);
            setProperty(
              brtAvailable,
              `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_RESULT_DYNAMIC_DC_VALUE}`,
              dynamicDcValue
            );
            availableTmp.push(brtAvailable);
          } else {
            availableTmp.push(a);
          }
        }
        available = availableTmp;
      }
      let minRoll = (await roll2.reroll({ minimize: true, async: true })).total;
      let maxRoll = (await roll2.reroll({ maximize: true, async: true })).total;
      let availableRange = available.reduce(
        (range, result) => {
          const r = result.range;
          if (!range[0] || r[0] < range[0])
            range[0] = r[0];
          if (!range[1] || r[1] > range[1])
            range[1] = r[1];
          return range;
        },
        [null, null]
      );
      if (availableRange[0] > maxRoll || availableRange[1] < minRoll) {
        if (game.settings.get(CONSTANTS.MODULE_ID, "forceNormalizeIfNoResultAreDrawn")) {
          await this.table.reset();
          await this.table.update({
            results: this.table.results.map((result) => ({
              _id: result.id,
              weight: result.range[1] - (result.range[0] - 1)
            }))
          });
          await this.table.normalize();
          roll2 = Roll.create(this.table.formula);
          minRoll = (await roll2.reroll({ minimize: true, async: true })).total;
          maxRoll = (await roll2.reroll({ maximize: true, async: true })).total;
          availableRange = await BRTBetterHelpers.retrieveAvailableRange(this.table);
          if (availableRange[0] > maxRoll || availableRange[1] < minRoll) {
            Logger.error(
              "Sorry i tried everything ! No results can possibly be drawn from this table and formula.",
              true,
              this.table
            );
            return { roll: roll2, results: results2 };
          }
        } else {
          Logger.warn("No results can possibly be drawn from this table and formula.", true, this.table);
          return { roll: roll2, results: results2 };
        }
      }
      let iter = 0;
      while (!results2.length) {
        if (iter >= 1e4) {
          const isTableDistinct = getProperty(
            this.table,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_DISTINCT_RESULT}`
          );
          const isTableDistinctKeepRolling = getProperty(
            this.table,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_DISTINCT_RESULT_KEEP_ROLLING}`
          );
          if (isTableDistinct && !isTableDistinctKeepRolling)
            ;
          else {
            Logger.error(
              `Failed to draw an available entry from Table ${this.table.name}, maximum iteration reached`,
              true
            );
          }
          break;
        }
        roll2 = await roll2.reroll({ async: true });
        results2 = this.getResultsForRoll(roll2.total);
        iter++;
      }
    }
    if (recursive) {
      let inner = [];
      for (let result of results2) {
        let formulaAmount = "";
        if (hasProperty(
          result,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_QUANTITY}`
        )) {
          formulaAmount = getProperty(
            result,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_QUANTITY}`
          ) || "";
        }
        if (!formulaAmount && getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.RESULTS_FORMULA_KEY_FORMULA}`)) {
          formulaAmount = getProperty(
            result,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.RESULTS_FORMULA_KEY_FORMULA}`
          ) || "";
        }
        if (result.type === CONST.TABLE_RESULT_TYPES.TEXT) {
          formulaAmount = "";
        }
        const resultAmount = await BRTBetterHelpers.tryRoll(formulaAmount);
        let pack2;
        let documentName;
        if (result.type === CONST.TABLE_RESULT_TYPES.DOCUMENT) {
          documentName = result.documentCollection;
        } else if (result.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM) {
          pack2 = await RetrieveHelpers.getCompendiumCollectionAsync(result.documentCollection, false, false);
          documentName = pack2?.documentName;
        }
        if (documentName === "RollTable") {
          const id = result.documentId;
          const innerTable = pack2 ? await pack2.getDocument(id) : RetrieveHelpers.getRollTableSync(id, true);
          if (innerTable) {
            const innerOptions = this.options;
            innerOptions.rollAsTableType = this.options.rollAsTableTypeAllTheTables ? innerOptions.rollAsTableType : void 0;
            const brtInnerTable = new _BetterRollTable(innerTable, innerOptions);
            await brtInnerTable.initialize();
            const innerRoll = await brtInnerTable.drawMany(resultAmount, {
              roll: formulaAmount,
              recursive: true,
              displayChat: false,
              rollMode: "gmroll",
              _depth: _depth + 1
            });
            inner = inner.concat(innerRoll.results);
          }
        } else {
          inner.push(result);
        }
      }
      results2 = inner;
    }
    return { roll: roll2, results: results2 };
  }
  /* -------------------------------------------- */
  /**
   * Get an Array of valid results for a given rolled total
   * @param {number} value    The rolled value
   * @returns {TableResult[]} An Array of results
   */
  getResultsForRoll(value) {
    let dc = tryToConvertToNumberSync(this.options.dc || void 0);
    let skills = this.options.skills || void 0;
    let resultsUpdate = [];
    if (this.options.usePercentage) {
      resultsUpdate = this.table.results.filter((r) => {
        const percentageValueLFlag = getProperty(
          r,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_PERCENTAGE_LOW_VALUE}`
        ) ?? null;
        let percentageValueLTmp = isRealNumber(percentageValueLFlag) ? percentageValueLFlag : 0;
        percentageValueLTmp = percentageValueLTmp * 10;
        const percentageValueHFlag = getProperty(
          r,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_PERCENTAGE_HIGH_VALUE}`
        ) ?? null;
        let percentageValueHTmp = isRealNumber(percentageValueHFlag) ? percentageValueHFlag : 100;
        percentageValueHTmp = percentageValueHTmp * 10;
        return !r.drawn && Number.between(value, percentageValueLTmp, percentageValueHTmp, true);
      });
    } else {
      resultsUpdate = this.table.results.filter((r) => {
        return !r.drawn && Number.between(value, ...r.range);
      });
    }
    if (this.options.rollAsTableType === CONSTANTS.TABLE_TYPE_HARVEST) {
      if (dc < BRTHarvestHelpers$1.retrieveMinDCOnTableSync(this.table)) {
        return [];
      }
      if (this.options.useDynamicDc) {
        if (isRealNumber(dc) && parseInt(dc) > 0) {
          resultsUpdate = resultsUpdate.filter((r) => {
            return BRTHarvestHelpers$1.calculateDynamicDcSync(
              getProperty(
                r,
                `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_RESULT_DYNAMIC_DC_VALUE}`
              ),
              parseInt(dc),
              skill
            );
          });
        }
      } else {
        if (isRealNumber(dc) && parseInt(dc) > 0) {
          resultsUpdate = resultsUpdate.filter((r) => {
            return getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_DC_VALUE_KEY}`) <= parseInt(dc);
          });
        }
        if (skills?.length > 0) {
          resultsUpdate = resultsUpdate.filter((r) => {
            return skills.includes(
              getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.HARVEST_SKILL_VALUE_KEY}`)
            );
          });
        }
      }
    }
    const isTableDistinct = getProperty(
      this.table,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_DISTINCT_RESULT}`
    );
    const isTableDistinctKeepRolling = getProperty(
      this.table,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_DISTINCT_RESULT_KEEP_ROLLING}`
    );
    const available = this.table.results.filter((r) => !r.drawn);
    if (isTableDistinct) {
      resultsUpdate = resultsUpdate.filter((r) => {
        const blackId = this.table.uuid + "|" + r.id;
        if (this.blackListForDistinct.includes(blackId)) {
          if (this.blackListForDistinct.length >= available.length) {
            if (isTableDistinctKeepRolling) {
              return true;
            }
          }
          return false;
        } else {
          this.blackListForDistinct.push(blackId);
          return true;
        }
      });
    }
    return resultsUpdate;
  }
  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */
  // /** @inheritdoc */
  // _onCreateDescendantDocuments(parent, collection, documents, data, options, userId) {
  //   this.table.table._onCreateDescendantDocuments(parent, collection, documents, data, options, userId);
  //   if (options.render !== false) this.table.collection.render();
  // }
  /* -------------------------------------------- */
  // /** @inheritdoc */
  // _onDeleteDescendantDocuments(parent, collection, documents, ids, options, userId) {
  //   this.table.table._onDeleteDescendantDocuments(parent, collection, documents, ids, options, userId);
  //   if (options.render !== false) this.table.collection.render();
  // }
  /* -------------------------------------------- */
  /*  Importing and Exporting                     */
  /* -------------------------------------------- */
  // /** @override */
  // toCompendium(pack, options = {}) {
  //   const data = this.table.toCompendium(pack, options);
  //   if (options.clearState) {
  //     for (let r of data.results) {
  //       r.drawn = false;
  //     }
  //   }
  //   return data;
  // }
  /* -------------------------------------------- */
  /**
   * Create a new RollTable document using all of the Documents from a specific Folder as new results.
   * @param {Folder} folder       The Folder document from which to create a roll table
   * @param {object} options      Additional options passed to the RollTable.create method
   * @returns {Promise<RollTable>}
   */
  static async fromFolder(folder, options2 = {}) {
    const results2 = folder.contents.map((e, i) => {
      return {
        text: e.name,
        type: folder.pack ? CONST.TABLE_RESULT_TYPES.COMPENDIUM : CONST.TABLE_RESULT_TYPES.DOCUMENT,
        documentCollection: folder.pack ? folder.pack : folder.type,
        documentId: e.id,
        img: e.thumbnail || e.img,
        weight: 1,
        range: [i + 1, i + 1],
        drawn: false
      };
    });
    options2.renderSheet = options2.renderSheet ?? true;
    return this.create(
      {
        name: folder.name,
        description: `A random table created from the contents of the ${folder.name} Folder.`,
        results: results2,
        formula: `1d${results2.length}`
      },
      options2
    );
  }
  /* -------------------------------------------- */
  /*  Methods BRT                                   */
  /* -------------------------------------------- */
  /**
   * @param {number} rollsAmount               The number of results to draw
   *
   * @returns {Promise<RollTableDraw>}  The Roll and results drawn by that Roll
   */
  async betterRoll(rollsAmount = null) {
    const amount = rollsAmount ? await BRTBetterHelpers.tryRoll(rollsAmount) : this.options?.customRoll ?? this.options?.rollsAmount;
    this.mainRoll = void 0;
    const firstResults = {
      roll: this.options.roll,
      recursive: this.options.recursive,
      displayChat: this.options.displayChat,
      _depth: 0
    };
    let resultsBrt = await this.rollManyOnTable(amount, firstResults);
    let resultsTmp = [];
    for (const r of resultsBrt?.results ?? []) {
      let rTmp = r;
      if (rTmp.type !== CONST.TABLE_RESULT_TYPES.TEXT) {
        let rDoc = await BRTBetterHelpers.retrieveDocumentFromResultOnlyUuid(r, false);
        if (!rDoc || !rDoc.uuid) {
          Logger.warn(`Cannot find document for result`, false, r);
          if (!rDoc) {
            rDoc = {};
          }
        }
        if (!getProperty(rTmp, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`) && rDoc.uuid) {
          setProperty(
            rTmp,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`,
            rDoc.uuid ?? ""
          );
        }
      }
      resultsTmp.push(rTmp);
    }
    if (resultsTmp.length === 0) {
      Logger.warn(
        `No results are be drawn with this table and with these options`,
        true,
        this.table,
        this.options
      );
    }
    this.results = resultsTmp;
    return {
      roll: this.mainRoll,
      results: this.results
    };
  }
  /**
   *
   * @param {array} results
   */
  async createChatCard(results2, rollMode = null) {
    let msgData = { roll: this.mainRoll, messageData: {} };
    let rollModeToUse = rollMode ? rollMode : this.options.rollMode;
    BRTUtils.addRollModeToChatData(msgData.messageData, rollModeToUse);
    await this.toMessage(results2, msgData);
  }
  /**
   * Draw multiple results from a RollTable, constructing a final synthetic Roll as a dice pool of inner rolls.
   * @param {amount} amount               The number of results to draw
   * @param {object} [options={}]         Optional arguments which customize the draw
   * @param {Roll} [options.roll]                   An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true]      Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=false]    Automatically display the drawn results in chat? Default is false for brt (is true on standard)
   * @param {number} [options._depth]  The rolls amount value
   *
   * @returns {Promise<RollTableDraw>}  The Roll and results drawn by that Roll
   */
  async rollManyOnTable(amount, { roll: roll2 = null, recursive = true, displayChat = false, _depth = 0 } = {}) {
    let options2 = mergeObject(this.options, {
      roll: roll2,
      recursive,
      displayChat,
      _depth
    });
    const maxRecursions = 5;
    if (_depth > maxRecursions) {
      let msg = game.i18n.format(`${CONSTANTS.MODULE_ID}.Strings.Warnings.MaxRecursion`, {
        maxRecursions,
        tableId: this.table.id
      });
      throw Logger.error(msg);
    }
    let drawnResults = [];
    while (amount > 0) {
      if (!this.table.replacement) {
        const resultsLeft = this.table.results.reduce(function(n, r) {
          return n + !r.drawn;
        }, 0);
        if (resultsLeft === 0) {
          await this.table.resetResults();
          continue;
        }
      }
      if (!this.table.formula) {
        let msg = game.i18n.format(`${CONSTANTS.MODULE_ID}.RollTable.NoFormula`, {
          name: this.table.name
        });
        Logger.error(msg, true);
        return;
      }
      let draw = {};
      if (this.options.usePercentage) {
        draw = await this.drawMany(1, {
          roll: roll2,
          recursive,
          displayChat: false,
          rollMode: "gmroll"
        });
      } else {
        draw = await this.drawMany(1, {
          roll: roll2,
          recursive,
          displayChat: false,
          rollMode: "gmroll"
        });
      }
      if (!this.mainRoll) {
        this.mainRoll = draw.roll;
      }
      for (const entry of draw.results) {
        let formulaAmount = "";
        if (hasProperty(entry, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_QUANTITY}`)) {
          formulaAmount = getProperty(
            entry,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_QUANTITY}`
          ) || "";
        }
        if (!formulaAmount && getProperty(entry, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.RESULTS_FORMULA_KEY_FORMULA}`)) {
          formulaAmount = getProperty(
            entry,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.RESULTS_FORMULA_KEY_FORMULA}`
          ) || "";
        }
        if (entry.type === CONST.TABLE_RESULT_TYPES.TEXT) {
          formulaAmount = "";
        }
        const entryAmount = await BRTBetterHelpers.tryRoll(formulaAmount);
        let innerTable;
        if (entry.type === CONST.TABLE_RESULT_TYPES.DOCUMENT && entry.documentCollection === "RollTable") {
          innerTable = RetrieveHelpers.getRollTableSync(entry.documentId, true);
        } else if (entry.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM) {
          const entityInCompendium = await BRTUtils.findInCompendiumByName(
            entry.documentCollection,
            entry.text
          );
          if (entityInCompendium !== void 0 && entityInCompendium.documentName === "RollTable") {
            innerTable = entityInCompendium;
          }
        }
        if (innerTable) {
          const innerOptions = options2;
          innerOptions.rollAsTableType = options2.rollAsTableTypeAllTheTables ? innerOptions.rollAsTableType : void 0;
          const innerBrtTable = new _BetterRollTable(innerTable, innerOptions);
          await innerBrtTable.initialize();
          const innerResults = await innerBrtTable.rollManyOnTable(entryAmount, {
            roll: roll2,
            recursive,
            displayChat: false,
            _depth: _depth + 1
          });
          drawnResults = drawnResults.concat(innerResults);
        } else {
          drawnResults = drawnResults.concat(Array(entryAmount).fill(entry));
        }
      }
      if (this.options.usePercentage) {
        if (draw.results?.length > 0) {
          amount = amount - draw.results?.length;
        } else {
          amount = amount - 1;
        }
      } else {
        amount = amount - 1;
      }
    }
    let resultsTmp = [];
    for (const r of drawnResults ?? []) {
      let rTmp = r;
      if (rTmp.type !== CONST.TABLE_RESULT_TYPES.TEXT) {
        let rDoc = await BRTBetterHelpers.retrieveDocumentFromResultOnlyUuid(r, false);
        if (!rDoc || !rDoc.uuid) {
          Logger.warn(`Cannot find document for result`, false, r);
          if (!rDoc) {
            rDoc = {};
          }
        }
        if (!getProperty(rTmp, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`) && rDoc.uuid) {
          setProperty(
            rTmp,
            `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`,
            rDoc.uuid ?? ""
          );
        }
        setProperty(
          rTmp,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_NAME}`,
          r.text
        );
        if (getProperty(rTmp, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`) && getProperty(rTmp, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`) !== r.text)
          ;
        setProperty(
          rTmp,
          `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_ICON}`,
          r.icon
        );
        if (getProperty(rTmp, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`) && getProperty(rTmp, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`) !== r.icon)
          ;
      }
      resultsTmp.push(rTmp);
    }
    return {
      roll: this.mainRoll,
      results: resultsTmp
    };
  }
  // /**
  //  * Evaluate a RollTable by rolling its formula and retrieving a drawn result.
  //  *
  //  * Note that this function only performs the roll and identifies the result, the RollTable#draw function should be
  //  * called to formalize the draw from the table.
  //  *
  //  * @param {object} [options={}]       Options which modify rolling behavior
  //  * @param {Roll} [options.roll]                   An alternative dice Roll to use instead of the default table formula
  //  * @param {boolean} [options.recursive=true]   If a RollTable document is drawn as a result, recursively roll it
  //  * @param {number} [options._depth]            An internal flag used to track recursion depth
  //  *
  //  * @returns {Promise<RollTableDraw>}  The Roll and results drawn by that Roll
  //  *
  //  * @example Draw results using the default table formula
  //  * ```js
  //  * const defaultResults = await table.roll();
  //  * ```
  //  *
  //  * @example Draw results using a custom roll formula
  //  * ```js
  //  * const roll = new Roll("1d20 + @abilities.wis.mod", actor.getRollData());
  //  * const customResults = await table.roll({roll});
  //  * ```
  //  */
  // async roll({ roll = null, recursive = true, displayChat = false, _depth = 0 } = {}) {
  //   let resultsBrt = await this.rollManyOnTable(1, { roll, recursive, displayChat, _depth });
  //   // Patch add uuid to every each result for better module compatibility
  //   let resultsTmp = [];
  //   for (const r of resultsBrt?.results ?? []) {
  //     let rTmp = r;
  //     if (rTmp.type !== CONST.TABLE_RESULT_TYPES.TEXT) {
  //       let rDoc = await BRTBetterHelpers.retrieveDocumentFromResultOnlyUuid(r, false);
  //      if(!rDoc || !rDoc.uuid) {
  //        Logger.warn(`Cannot find document for result`, false, r);
  //        if(!rDoc) {
  //          rDoc = {};
  //        }
  //      }
  //       if (!getProperty(rTmp, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`) && rDoc.uuid) {
  //         setProperty(rTmp, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`, rDoc.uuid ?? "");
  //       }
  //     }
  //     resultsTmp.push(rTmp);
  //   }
  //   return {
  //     roll: resultsBrt.roll,
  //     results: resultsTmp,
  //   };
  // }
};
__name(_BetterRollTable, "BetterRollTable");
let BetterRollTable = _BetterRollTable;
const _BetterResults = class _BetterResults {
  constructor(table, tableResults, stackResults, rollAsTableType) {
    this.results = [];
    this.currencyData = {};
    this.table = table;
    this.tableResults = tableResults;
    this.stackResults = isRealBoolean(stackResults) ? String(stackResults) === "true" ? true : false : false;
    this.rollAsTableType = BRTUtils.retrieveBRTType(table, rollAsTableType);
  }
  /**
   *
   * @returns {Promise<TableResult[]>}
   */
  async buildResults() {
    const currencyString = this.table.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.LOOT_CURRENCY_STRING_KEY);
    this.currencyData = ItemPilesHelpers.retrieveCurrenciesSimpleFromString(currencyString);
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.table, this.rollAsTableType);
    for (const r of this.tableResults) {
      const betterResult = await BRTBetterHelpers.updateTableResult(r);
      if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_BETTER) {
        if (betterResult.result.isText && betterResult.result.innerText?.startsWith(CONSTANTS.PRE_RESULT_TEXT_ROLL)) {
          betterResult.result.text = CONSTANTS.PRE_RESULT_TEXT_ROLLED + await BRTBetterHelpers.tryRoll(
            betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_ROLL, "").trim()
          );
        } else if (betterResult.result.isText && betterResult.result.innerText?.startsWith(CONSTANTS.PRE_RESULT_TEXT_CURRENCY)) {
          betterResult.result.text = betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_CURRENCY, "").trim();
          const currencyDataToAddS = betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_CURRENCY, "").trim();
          const currencyDataToAdd = ItemPilesHelpers.retrieveCurrenciesSimpleFromString(currencyDataToAddS);
          for (const currencyKey of Object.keys(currencyDataToAdd)) {
            if (this.currencyData[currencyKey]) {
              this.currencyData[currencyKey] = this.currencyData[currencyKey] + await BRTBetterHelpers.tryRoll(String(currencyDataToAdd[currencyKey]));
            } else {
              this.currencyData[currencyKey] = await BRTBetterHelpers.tryRoll(
                String(currencyDataToAdd[currencyKey])
              );
            }
          }
        }
      } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_LOOT) {
        if (betterResult.result.isText && betterResult.result.innerText?.startsWith(CONSTANTS.PRE_RESULT_TEXT_ROLL)) {
          betterResult.result.text = CONSTANTS.PRE_RESULT_TEXT_ROLLED + await BRTBetterHelpers.tryRoll(
            betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_ROLL, "").trim()
          );
        } else if (betterResult.result.isText && betterResult.result.innerText?.startsWith(CONSTANTS.PRE_RESULT_TEXT_CURRENCY)) {
          betterResult.result.text = betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_CURRENCY, "").trim();
          const currencyDataToAddS = betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_CURRENCY, "").trim();
          const currencyDataToAdd = ItemPilesHelpers.retrieveCurrenciesSimpleFromString(currencyDataToAddS);
          for (const currencyKey of Object.keys(currencyDataToAdd)) {
            if (this.currencyData[currencyKey]) {
              this.currencyData[currencyKey] = this.currencyData[currencyKey] + await BRTBetterHelpers.tryRoll(String(currencyDataToAdd[currencyKey]));
            } else {
              this.currencyData[currencyKey] = await BRTBetterHelpers.tryRoll(
                String(currencyDataToAdd[currencyKey])
              );
            }
          }
        } else if (betterResult.result.isText) {
          const currencyDataToAddS = betterResult.result.text;
          const currencyDataToAdd = ItemPilesHelpers.retrieveCurrenciesSimpleFromString(currencyDataToAddS);
          for (const currencyKey of Object.keys(currencyDataToAdd)) {
            if (this.currencyData[currencyKey]) {
              this.currencyData[currencyKey] = this.currencyData[currencyKey] + await BRTBetterHelpers.tryRoll(String(currencyDataToAdd[currencyKey]));
            } else {
              this.currencyData[currencyKey] = await BRTBetterHelpers.tryRoll(
                String(currencyDataToAdd[currencyKey])
              );
            }
          }
        }
      } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_STORY) {
        if (betterResult.result.isText && betterResult.result.innerText?.startsWith(CONSTANTS.PRE_RESULT_TEXT_ROLL)) {
          betterResult.result.text = CONSTANTS.PRE_RESULT_TEXT_ROLLED + await BRTBetterHelpers.tryRoll(
            betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_ROLL, "").trim()
          );
        } else if (betterResult.result.isText && betterResult.result.innerText?.startsWith(CONSTANTS.PRE_RESULT_TEXT_CURRENCY)) {
          betterResult.result.text = betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_CURRENCY, "").trim();
          const currencyDataToAddS = betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_CURRENCY, "").trim();
          const currencyDataToAdd = ItemPilesHelpers.retrieveCurrenciesSimpleFromString(currencyDataToAddS);
          for (const currencyKey of Object.keys(currencyDataToAdd)) {
            if (this.currencyData[currencyKey]) {
              this.currencyData[currencyKey] = this.currencyData[currencyKey] + await BRTBetterHelpers.tryRoll(String(currencyDataToAdd[currencyKey]));
            } else {
              this.currencyData[currencyKey] = await BRTBetterHelpers.tryRoll(
                String(currencyDataToAdd[currencyKey])
              );
            }
          }
        }
      } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_HARVEST) {
        if (betterResult.result.isText && betterResult.result.innerText?.startsWith(CONSTANTS.PRE_RESULT_TEXT_ROLL)) {
          betterResult.result.text = CONSTANTS.PRE_RESULT_TEXT_ROLLED + await BRTBetterHelpers.tryRoll(
            betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_ROLL, "").trim()
          );
        } else if (betterResult.result.isText && betterResult.result.innerText?.startsWith(CONSTANTS.PRE_RESULT_TEXT_CURRENCY)) {
          betterResult.result.text = betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_CURRENCY, "").trim();
          const currencyDataToAddS = betterResult.result.innerText?.replaceAll(CONSTANTS.PRE_RESULT_TEXT_CURRENCY, "").trim();
          const currencyDataToAdd = ItemPilesHelpers.retrieveCurrenciesSimpleFromString(currencyDataToAddS);
          for (const currencyKey of Object.keys(currencyDataToAdd)) {
            if (this.currencyData[currencyKey]) {
              this.currencyData[currencyKey] = this.currencyData[currencyKey] + await BRTBetterHelpers.tryRoll(String(currencyDataToAdd[currencyKey]));
            } else {
              this.currencyData[currencyKey] = await BRTBetterHelpers.tryRoll(
                String(currencyDataToAdd[currencyKey])
              );
            }
          }
        }
      }
      delete betterResult.result.uuid;
      delete betterResult.result._id;
      const br2 = mergeObject(r, betterResult.result);
      this.results.push(br2);
    }
    if (this.stackResults) {
      this.results = ItemPilesHelpers.stackTableResults(this.results);
    }
    return this.results;
  }
  getResults() {
    return this.results;
  }
  getCurrencyData() {
    return this.currencyData;
  }
  // /**
  //  * @deprecated not used anymore there is a method on the loot helpers now ?
  //  * @param {*} result
  //  * @returns
  //  */
  // async _parseResult(result) {
  //     let betterResults = [];
  //     if (result.type === CONST.TABLE_RESULT_TYPES.TEXT) {
  //         const textResults = result.text.split("|");
  //         for (let t of textResults) {
  //             // if the text is a currency, we process that first
  //             t = await this._processTextAsCurrency(t);
  //             t = await this._rollInlineDice(t);
  //
  //             const regex = /(\s*[^\[@]*)@*(\w+)*\[([\w.,*+-\/\(\)]+)\]/g;
  //             let textString = t;
  //             const commands = [];
  //             let table;
  //             const betterResult = mergeObject({}, result.toObject(false));
  //             let matches;
  //             while ((matches = regex.exec(t)) !== null) {
  //                 // matches[1] is undefined in case we are matching [tablename]
  //                 // if we are matching @command[string] then matches[2] is the command and [3] is the arg inside []
  //                 // Logger.log(`match 0: ${matches[0]}, 1: ${matches[1]}, 2: ${matches[2]}, 3: ${matches[3]}`);
  //                 if (matches[1] !== undefined && matches[1].trim() !== "") {
  //                     textString = matches[1];
  //                 }
  //                 // textString = matches[1] || textString; //the first match is the text outside [], a rollformula
  //                 const commandName = matches[2];
  //                 const innerTableName = matches[3];
  //                 if (!commandName && innerTableName) {
  //                     const out = BRTUtils.separateIdComendiumName(innerTableName);
  //                     const tableName = out.nameOrId;
  //                     const tableCompendiumName = out.compendiumName;
  //                     if (tableCompendiumName) {
  //                         table = await BRTUtils.findInCompendiumByName(tableCompendiumName, tableName);
  //                     } else {
  //                         table = RetrieveHelpers.getRollTableSync(tableName, true, false);
  //                     }
  //                     if (!table) {
  //                         msg = game.i18n.format(NotTableByNameInPack, {
  //                             tableName: tableName,
  //                             packName: tableCompendiumName,
  //                         });
  //                         Logger.warn(msg, true);
  //                     }
  //                     break;
  //                 } else if (commandName) {
  //                     commands.push({
  //                         command: commandName.toLowerCase(),
  //                         arg: matches[3],
  //                     });
  //                     if (commandName.toLowerCase() === "compendium") {
  //                         betterResult.collection = matches[3];
  //                     }
  //                 }
  //             }
  //             // if a table definition is found, the textString is the rollFormula to be rolled on that table
  //             if (table) {
  //                 const numberRolls = await BRTBetterHelpers.tryRoll(textString);
  //                 const options = {
  //                     rollsAmount: numberRolls,
  //                 };
  //                 const innerBrtTable = new BetterRollTable(table, options);
  //                 await innerBrtTable.initialize();
  //                 const innerResultsBrt = await innerBrtTable.betterRoll();
  //                 const innerResults = innerResultsBrt?.results;
  //                 // this.tableResults = this.tableResults.concat(innerResults);
  //                 betterResults = betterResults.concat(innerResults);
  //             } else if (textString) {
  //                 // if no table definition is found, the textString is the item name
  //                 Logger.log(`results text ${textString.trim()} and commands ${commands}`);
  //                 betterResult.img =
  //                     result.thumbnail ??
  //                     result.img ??
  //                     CONFIG.RollTable.resultIcon ??
  //                     result.src ??
  //                     `icons/svg/d20-black.svg`;
  //                 betterResult.text = textString.trim();
  //                 // if there is command, then it's not a pure text but a generated item
  //                 if (!commands || commands.length === 0) {
  //                     betterResult.type = CONST.TABLE_RESULT_TYPES.TEXT;
  //                 }
  //                 betterResult.commands = commands;
  //                 // PATCH 2023-10-04
  //                 if (isEmptyObject(betterResult.flags)) {
  //                     betterResult.flags = {};
  //                 }
  //                 mergeObject(betterResult.flags, result.flags);
  //                 betterResults.push(betterResult);
  //             }
  //         }
  //     } else {
  //         const betterResult = mergeObject({}, result.toObject(false));
  //         betterResult.img =
  //             result.thumbnail || result.img || CONFIG.RollTable.resultIcon || `icons/svg/d20-black.svg`;
  //         betterResult.collection = result.documentCollection;
  //         betterResult.text = result.text;
  //         // PATCH 2023-10-04
  //         if (isEmptyObject(betterResult.flags)) {
  //             betterResult.flags = {};
  //         }
  //         mergeObject(betterResult.flags, result.flags);
  //         betterResults.push(betterResult);
  //     }
  //     return betterResults;
  // }
  /**
   * @deprecated not used anymore there is a method on the loot helpers now ?
   * @param {String} tableText
   * @returns
   */
  async _processTextAsCurrency(tableText) {
    const regex = /{([^}]+)}/g;
    let matches;
    while ((matches = regex.exec(tableText)) != null) {
      this._addCurrency(await this._generateCurrency(matches[1]));
    }
    return tableText.replace(regex, "");
  }
  /**
   * Add given currency to existing currency
   * @deprecated not used anymore there is a method on the loot helpers now ?
   * @param {array} currencyData
   */
  _addCurrency(currencyData) {
    for (const key in currencyData) {
      this.currencyData[key] = (this.currencyData[key] || 0) + currencyData[key];
    }
  }
  /**
   * @deprecated not used anymore there is a method on the loot helpers now ?
   * @param {string} tableText
   * @returns
   */
  async _rollInlineDice(tableText) {
    const regex = /\[{2}(\w*[^\]])\]{2}/g;
    let matches;
    while ((matches = regex.exec(tableText)) != null) {
      tableText = tableText.replace(matches[0], await BRTBetterHelpers.tryRoll(matches[1]));
    }
    return tableText;
  }
  /**
   * Check given string and parse it against a regex to generate currency array
   * @deprecated not used anymore there is a method on the loot helpers now ?
   * @param {String} currencyString
   *
   * @returns
   */
  async _generateCurrency(currencyString) {
    const currenciesToAdd = {};
    if (currencyString) {
      const currenciesPieces = currencyString.split(",");
      for (const currency2 of currenciesPieces) {
        const match = /(.*)\[(.*?)\]/g.exec(currency2);
        if (!match || match.length < 3) {
          let msg = game.i18n.format(`${CONSTANTS.MODULE_ID}.Strings.Warnings.CurrencyFormat`, {
            currencyString: currency2
          });
          Logger.warn(msg, true);
          continue;
        }
        const rollFormula = match[1];
        const currencyString2 = match[2];
        const amount = await BRTBetterHelpers.tryRoll(rollFormula);
        currenciesToAdd[currencyString2] = (currenciesToAdd[currencyString2] || 0) + amount;
      }
    }
    return currenciesToAdd;
  }
};
__name(_BetterResults, "BetterResults");
let BetterResults = _BetterResults;
const _BetterTables = class _BetterTables {
  constructor() {
  }
  // /**
  //  * Get spells in cache for
  //  * @returns {*}
  //  */
  // getSpellCache() {
  //   return this._spellCache;
  // }
  /**
   *
   * @param {*} tableEntity
   */
  async generateLoot(tableEntity, options2 = {}) {
    return await API$1.generateLoot(tableEntity, options2);
  }
  /**
   * Roll a table an add the resulting loot to a given token.
   *
   * @param {RollTable} tableEntity
   * @param {TokenDocument} token
   * @param {options} object
   * @returns
   */
  async addLootToSelectedToken(tableEntity, token = null, options2 = {}) {
    return await API$1.addLootToSelectedToken(tableEntity, token, options2);
  }
  async generateChatLoot(tableEntity, options2 = {}) {
    return await API$1.generateChatLoot(tableEntity, options2);
  }
  async getStoryResults(tableEntity) {
    return await API$1.getStoryResults(tableEntity);
  }
  async generateChatStory(tableEntity) {
    return await API$1.generateChatStory(tableEntity);
  }
  /**
   * @param {*} tableEntity
   * @param {*} options
   * @returns {Promise<TableResult[]>}
   */
  async getBetterTableResults(tableEntity, options2 = {}) {
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    const resultBrt = await brtTable2.betterRoll();
    const results2 = resultBrt?.results;
    const br2 = new BetterResults(tableEntity, results2, options2?.stackResultsWithBRTLogic, options2?.rollAsTableType);
    const betterResults = await br2.buildResults();
    return betterResults;
  }
  /**
   * @param {*} tableEntity
   * @param {*} options
   * @returns {Promise<TableResult[]>}
   */
  async betterTableRoll(tableEntity, options2 = {}) {
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    const resultBrt = await brtTable2.betterRoll();
    const results2 = resultBrt?.results;
    const br2 = new BetterResults(tableEntity, results2, options2?.stackResultsWithBRTLogic, options2?.rollAsTableType);
    const betterResults = await br2.buildResults();
    let rollMode = brtTable2.rollMode;
    let roll2 = brtTable2.mainRoll;
    if (isRealBoolean(options2.displayChat) && !options2.displayChat) {
      return betterResults;
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(tableEntity, options2?.rollAsTableType);
    if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_BETTER) {
      const betterChatCard = new BetterChatCard(betterResults, rollMode, roll2);
      await betterChatCard.createChatCard(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_LOOT) {
      const currencyData = br2.getCurrencyData();
      const lootChatCard = new LootChatCard(betterResults, currencyData, rollMode, roll2);
      await lootChatCard.createChatCard(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_STORY) {
      const storyChatCard = new StoryChatCard(betterResults, rollMode, roll2);
      await storyChatCard.createChatCard(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_HARVEST) {
      const harvestChatCard = new HarvestChatCard(betterResults, rollMode, roll2);
      await harvestChatCard.createChatCard(tableEntity);
    } else {
      await brtTable2.createChatCard(betterResults, rollMode, roll2);
    }
    return betterResults;
  }
  /**
   * @param {RollTable|string|UUID} tableEntity
   * @param {object} options
   * @returns {Promise<{results:TableResult[], currenciesData:Record<string,number}>}
   */
  async betterTableRollV2(tableEntity, options2 = {}) {
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    const resultBrt = await brtTable2.betterRoll();
    const results2 = resultBrt?.results;
    const br2 = new BetterResults(tableEntity, results2, options2?.stackResultsWithBRTLogic, options2?.rollAsTableType);
    const betterResults = await br2.buildResults();
    let rollMode = brtTable2.rollMode;
    let roll2 = brtTable2.mainRoll;
    if (isRealBoolean(options2.displayChat) && !options2.displayChat) {
      return {
        results: betterResults,
        currenciesData: br2.currencyData
      };
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(tableEntity, options2?.rollAsTableType);
    if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_BETTER) {
      const betterChatCard = new BetterChatCard(betterResults, rollMode, roll2);
      await betterChatCard.createChatCard(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_LOOT) {
      const currencyData = br2.getCurrencyData();
      const lootChatCard = new LootChatCard(betterResults, currencyData, rollMode, roll2);
      await lootChatCard.createChatCard(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_STORY) {
      const storyChatCard = new StoryChatCard(betterResults, rollMode, roll2);
      await storyChatCard.createChatCard(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_HARVEST) {
      const harvestChatCard = new HarvestChatCard(betterResults, rollMode, roll2);
      await harvestChatCard.createChatCard(tableEntity);
    } else {
      await brtTable2.createChatCard(betterResults, rollMode, roll2);
    }
    return {
      results: betterResults,
      currenciesData: br2.currencyData
    };
  }
  /**
   * @deprecated TO REMOVE
   * @param {RollTable} tableEntity rolltable to generate content from
   * @returns {Promise<{flavor: *, sound: string, user: *, content: *}>}
   */
  async rollOld(tableEntity, options2 = {}) {
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    const resultBrt = await brtTable2.betterRoll();
    const results2 = resultBrt?.results;
    let rollMode = options2?.rollMode || brtTable2.rollMode || null;
    let roll2 = options2?.roll || brtTable2.mainRoll || null;
    const br2 = new BetterResults(tableEntity, results2, options2?.stackResultsWithBRTLogic, options2?.rollAsTableType);
    const betterResults = await br2.buildResults();
    if (isRealBoolean(options2.displayChat)) {
      if (!options2.displayChat) {
        return betterResults;
      }
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(tableEntity, options2?.rollAsTableType);
    if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_BETTER) {
      const betterChatCard = new BetterChatCard(betterResults, rollMode, roll2);
      await betterChatCard.findOrCreateItems();
      await betterChatCard.prepareCharCart(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_LOOT) {
      const currencyData = br2.getCurrencyData();
      const lootChatCard = new LootChatCard(betterResults, currencyData, rollMode, roll2);
      await lootChatCard.findOrCreateItems();
      await lootChatCard.prepareCharCart(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_STORY) {
      const storyChatCard = new StoryChatCard(betterResults, rollMode, roll2);
      await storyChatCard.prepareCharCart(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_HARVEST) {
      const harvestChatCard = new HarvestChatCard(betterResults, rollMode, roll2);
      await harvestChatCard.findOrCreateItems();
      await harvestChatCard.prepareCharCart(tableEntity);
    }
    return betterResults;
  }
  /**
   * @param {RollTable} tableEntity rolltable to generate content from
   * @returns {Promise<TableResult[]>}
   */
  async roll(tableEntity, options2 = {}) {
    return await API$1.roll(tableEntity, options2);
  }
  /**
   * Create a new RollTable by extracting entries from a compendium.
   *
   * @param {string} tableName the name of the table entity that will be created
   * @param {string} compendiumName the name of the compendium to use for the table generation
   * @param {function(Document)} weightPredicate a function that returns a weight (number) that will be used
   * for the tableResult weight for that given entity. returning 0 will exclude the entity from appearing in the table
   *
   * @deprecated use api.createRolltableFromCompendium instead
   */
  async createTableFromCompendium(tableName, compendiumName, { weightPredicate = null } = {}) {
    return await API$1.createTableFromCompendium(tableName, compendiumName, { weightPredicate });
  }
  // /**
  //  * Update spell cache used for random spell scroll generation
  //  *
  //  * @returns {Promise<void>}
  //  */
  // async updateSpellCache(pack) {
  //   if (game.user.isGM) {
  //     const defaultPack = game.settings.get(CONSTANTS.MODULE_ID, CONSTANTS.SPELL_COMPENDIUM_KEY),
  //       spellCompendium = await RetrieveHelpers.getCompendiumCollectionAsync(defaultPack);
  //     if ((!pack && spellCompendium) || pack === defaultPack) {
  //       const spellCompendiumIndex = await spellCompendium.getIndex({
  //         fields: [SETTINGS.SPELL_LEVEL_PATH, "img"],
  //       });
  //       this._spellCache = spellCompendiumIndex
  //         .filter((entry) => entry.type === "spell")
  //         .map((i) => mergeObject(i, { collection: spellCompendium.collection }));
  //     } else {
  //       Logger.error(`Spell cache could not be initialized/updated.`);
  //     }
  //   }
  // }
  createLink(item2) {
    if (!item2) {
      return void 0;
    }
    if (!item2.type || item2.type > 0) {
      const id = item2.id;
      const uuid = item2.uuid;
      const text = item2.name || item2.text;
      const entity = item2.documentName;
      const pack2 = item2.pack || game.collections.get(item2.collectionName)?.documentName || "";
      const packPart = pack2 !== "" ? `data-pack="${pack2}"` : "";
      const icon = BRTUtils.getIconByEntityType(entity);
      return `<a class="content-link" draggable="true" ${packPart} data-entity="${entity}" data-id="${id}" data-uuid="${uuid}"><i class="fas ${icon}"></i>${text}</a>`;
    }
    return item2.text;
  }
  /* =================================== */
  /* STATIC METHODS */
  /* =================================== */
  /**
   *
   * @param {HTMLElement} html
   * @param {Array} options
   */
  static async enhanceCompendiumContextMenu(html, options2) {
    if (game.user.isGM) {
      options2.push({
        name: Logger.i18n(`${CONSTANTS.MODULE_ID}.api.msg.generateRolltableFromCompendium`),
        icon: '<i class="fas fa-th-list"></i>',
        callback: (li) => {
          API$1.createRolltableFromCompendium(li.data("pack"));
        }
      });
      options2.push({
        name: Logger.i18n(`${CONSTANTS.MODULE_ID}.api.msg.generateRolltableFromCompendiumWithFilters`),
        icon: '<i class="fa-solid fa-arrows-split-up-and-left"></i>',
        callback: (li) => {
          API$1.compendiumToRollTableWithDialog(li.data("pack"));
        }
      });
      if (game.settings.get(CONSTANTS.MODULE_ID, CONSTANTS.ADD_ROLL_IN_COMPENDIUM_CONTEXTMENU)) {
        options2.push({
          name: Logger.i18n(`${CONSTANTS.MODULE_ID}.api.msg.rollCompendiumAsRolltable`),
          icon: '<i class="fa-solid fa-dice"></i>',
          callback: (li) => {
            API$1.rollCompendiumAsRolltable(li.data("pack"));
          }
        });
      }
    }
  }
  /**
   * Add a roll option in context menu of rolltables
   * @param {HTMLElement} html
   * @param {Array} options
   */
  static async enhanceRolltableContextMenu(html, options2) {
    if (game.user.isGM && game.settings.get(CONSTANTS.MODULE_ID, CONSTANTS.ADD_ROLL_IN_ROLLTABLE_CONTEXTMENU)) {
      options2.unshift({
        name: "Roll table (BRT)",
        icon: '<i class="fa-solid fa-dice"></i>',
        callback: (li) => {
          _BetterTables.menuCallBackRollTable(li.data("documentId"));
        }
      });
    }
  }
  /**
   *
   * @param {String} rolltableId ID of the rolltable to roll
   */
  static async menuCallBackRollTable(rolltableId) {
    const rolltable = RetrieveHelpers.getRollTableSync(rolltableId);
    await API$1.betterTableRoll(rolltable);
  }
  /**
   * Create card content from compendium content
   *
   * @param {String} compendium compendium name
   *
   * @returns {Promise<{flavor: string, sound: string, user: *, content: *}>}
   *
   * @deprecated use api.rollCompendiumAsRolltable instead
   */
  static async rollCompendiumAsRolltable(compendium) {
    API$1.rollCompendiumAsRolltable(compendium);
  }
  static async _renderMessage(message) {
    const dataMessageLoot = getProperty(message, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.LOOT}`) || {};
    if (!dataMessageLoot.compendium) {
      dataMessageLoot.compendium = "";
    }
    if (!dataMessageLoot.id) {
      dataMessageLoot.id = "";
    }
    const cardHtml = await renderTemplate(
      `modules/${CONSTANTS.MODULE_ID}/templates/card/loot-chat-card.hbs`,
      dataMessageLoot
      //message.flags.betterTables.loot
    );
    message.content = cardHtml;
    return message;
  }
  /**
   *
   * @param {String} compendium ID of the compendium to roll
   */
  static async menuCallBackRollCompendium(compendium) {
    const chatData = await API$1.rollCompendiumAsRolltable(compendium);
    ChatMessage.create(chatData);
  }
  /**
   * Create card content from rolltable
   * @param {RollTable} tableEntity rolltable to generate content from
   * @returns {TableResult[]}
   */
  static async prepareCardData(tableEntity, options2 = {}) {
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    const resultBrt = await brtTable2.betterRoll();
    const results2 = resultBrt?.results;
    let rollMode = options2?.rollMode || brtTable2.rollMode || null;
    let roll2 = options2?.roll || brtTable2.mainRoll || null;
    const br2 = new BetterResults(tableEntity, results2, options2?.stackResultsWithBRTLogic, options2?.rollAsTableType);
    const betterResults = await br2.buildResults();
    if (isRealBoolean(options2.displayChat)) {
      if (!options2.displayChat) {
        return betterResults;
      }
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(tableEntity, options2?.rollAsTableType);
    let chatData = null;
    if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_BETTER) {
      const betterChatCard = new BetterChatCard(betterResults, rollMode, roll2);
      await betterChatCard.findOrCreateItems();
      chatData = await betterChatCard.prepareCharCart(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_LOOT) {
      const currencyData = br2.getCurrencyData();
      const lootChatCard = new LootChatCard(betterResults, currencyData, rollMode, roll2);
      await lootChatCard.findOrCreateItems();
      chatData = await lootChatCard.prepareCharCart(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_STORY) {
      const storyChatCard = new StoryChatCard(betterResults, rollMode, roll2);
      chatData = await storyChatCard.prepareCharCart(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_HARVEST) {
      const harvestChatCard = new HarvestChatCard(betterResults, rollMode, roll2);
      await harvestChatCard.findOrCreateItems();
      chatData = await harvestChatCard.prepareCharCart(tableEntity);
    }
    return chatData;
  }
  static async _toggleCurrenciesShareSection(message, html) {
    const section = html[0].querySelector(`section.${CONSTANTS.MODULE_ID}-share-currencies`);
    section.classList.toggle(`${CONSTANTS.MODULE_ID}-hidden`);
  }
  static async _addButtonsToMessage(message, html) {
    const tableDrawNode = $(html).find(".table-draw");
    const id = $(tableDrawNode).data("id");
    const pack2 = $(tableDrawNode).data("pack");
    if (!id && !pack2) {
      return;
    }
    if (game.settings.get(CONSTANTS.MODULE_ID, CONSTANTS.SHOW_REROLL_BUTTONS)) {
      const rerollButton = $(
        `<a class="better-rolltables-roll-table-reroll-button" title="${game.i18n.localize(
          `${CONSTANTS.MODULE_ID}.DrawReroll`
        )}">`
      ).append("<i class='fas fa-dice-d20'></i>");
      rerollButton.click(async () => {
        let rolltable;
        if (pack2 && id) {
          const myPack = await RetrieveHelpers.getCompendiumCollectionAsync(pack2, true, false);
          rolltable = await myPack?.getDocument(id);
        } else {
          rolltable = RetrieveHelpers.getRollTableSync(id, true);
        }
        if (rolltable) {
          const chatData = await _BetterTables.prepareCardData(rolltable);
          const cardContent = chatData.content;
          const cardFlags = chatData.flags;
          await _BetterTables.updateChatMessage(message, cardContent, {
            flags: cardFlags
          });
        } else {
          Logger.warn(`No rollTable find with reference pack = '${pack2}' and id = '${id}'`, true);
        }
      });
      $(html).find(".message-delete").before(rerollButton);
    }
    if (game.settings.get(CONSTANTS.MODULE_ID, CONSTANTS.SHOW_OPEN_BUTTONS)) {
      let document2;
      if (pack2 && id) {
        const myPack = await RetrieveHelpers.getCompendiumCollectionAsync(pack2, true, false);
        document2 = await myPack?.getDocument(id);
      } else {
        document2 = RetrieveHelpers.getRollTableSync(id, true);
      }
      if (document2) {
        const openLink = $(
          `<a class="better-rolltables-roll-table-open-table" title="${game.i18n.localize(
            `${CONSTANTS.MODULE_ID}.OpenRolltable`
          )}">`
        ).append("<i class='fas fa-th-list'></i>");
        if (id)
          openLink.data("id", id);
        if (pack2)
          openLink.data("pack", pack2);
        openLink.click(async () => document2.sheet.render(true));
        $(html).find(".message-delete").before(openLink);
      }
    }
  }
  /**
   *
   * @param {ChatMessage} message
   * @param {HTMLElement} html
   * @returns {Promise<undefined>}
   * @private
   */
  static async _shareCurrenciesToPlayers(message, html) {
    await _BetterTables._toggleCurrenciesShareSection(message, html);
    const usersId = Array.from(
      html[0].querySelector(`section.${CONSTANTS.MODULE_ID}-share-currencies`)?.querySelectorAll("input:checked")
    ).map((x) => x.dataset.userId);
    if (!usersId)
      return void 0;
    const currenciesToShare = getProperty(message, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.LOOT_CURRENCY}`);
    const usersCount = usersId.length;
    const share = Object.keys(currenciesToShare).map((x) => ({ [x]: Math.floor(currenciesToShare[x] / usersCount) })).reduce((a, b) => Object.assign(a, b), {});
    for (const userId of usersId) {
      const user = game.users.get(userId);
      const currency2 = user.character.system.currency;
      for (let key of Object.keys(currency2)) {
        const increment = share[key] || 0;
        if (increment > 0) {
          currency2[key] += increment;
        }
      }
      await user.character.update({ currency: currency2 });
    }
    const newMessage = await _BetterTables._renderMessage(
      mergeObject(message, { [`flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.LOOT_SHARED}`]: true })
      //"flags.betterTables.loot.shared"
    );
    await _BetterTables.updateChatMessage(message, newMessage);
  }
  static async _addRollButtonsToEntityLink(html) {
    if (game.settings.get(CONSTANTS.MODULE_ID, CONSTANTS.ROLL_TABLE_FROM_JOURNAL)) {
      $(html).find("a.content-link[data-entity='RollTable']").each(async (index, link) => {
        $(link).data("id");
        const uuid = $(link).data("uuid");
        const rolltable = await RetrieveHelpers.getRollTableAsync(uuid);
        if (rolltable) {
          const rollNode = $(
            `<a class="better-rolltables-roll-table-roll-link" title="${game.i18n.localize(
              `${CONSTANTS.MODULE_ID}.DrawReroll`
            )}"><i class="fas fa-dice-d20"></i></a>`
          ).click(async () => {
            await API$1.betterTableRoll(rolltable);
          });
          $(link).after(rollNode);
        } else {
          Logger.warn(`No rolltable found for reference '${uuid}'`);
        }
      });
      $(html).find("a.content-link[data-pack]").each(async (index, link) => {
        const packName = $(link).data("pack");
        const myPack = await RetrieveHelpers.getCompendiumCollectionAsync(packName, true, false);
        const pack2 = myPack;
        if (!pack2) {
          return;
        }
        const id = $(link).data("id");
        const document2 = await pack2.getDocument(id);
        if (!document2 || document2.documentName !== "RollTable")
          return;
        const rollNode = $(
          `<a class="better-rolltables-roll-table-roll-link" title="${game.i18n.localize(
            `${CONSTANTS.MODULE_ID}.DrawReroll`
          )}"><i class="fas fa-dice-d20"></i></a>`
        ).click(async () => {
          await API$1.generateChatLoot(document2);
        });
        $(link).after(rollNode);
      });
    }
  }
  /**
   * Handle Reroll buttons on cards
   * @param {ChatMessage} message newly created message
   * @param {Object} html message content
   * @returns {Promise<void>}
   */
  static async handleChatMessageButtons(message, html) {
    if (game.user.isGM) {
      _BetterTables._addButtonsToMessage(message, html);
      _BetterTables._addRollButtonsToEntityLink(html);
    }
  }
  /**
   * Update a message with a new content
   * @param {ChatMessage} message message to update
   * @param {ChatMessage} content new HTML content of message
   * @param {Object} options
   * @returns {Promise<void>}
   */
  static async updateChatMessage(message, content, options2 = {}) {
    if (game.user.isGM) {
      if (!options2.force && game.settings.get(CONSTANTS.MODULE_ID, CONSTANTS.SHOW_WARNING_BEFORE_REROLL)) {
        Dialog.confirm({
          title: game.i18n.localize(`${CONSTANTS.MODULE_ID}.Settings.RerollWarning.Title`),
          content: game.i18n.localize(`${CONSTANTS.MODULE_ID}.Settings.RerollWarning.Description`),
          yes: () => {
            _BetterTables.updateChatMessage(message, content, { force: true, flags: options2.flags });
          },
          defaultYes: false
        });
      } else {
        message.update({
          content,
          flags: options2.flags || {},
          timestamp: Date.now()
        });
      }
    }
  }
  /**
   * @deprecated TODO other modules do this ?
   */
  static handleDropRollTableSheetData(rollTable, rollTableSheet, json) {
    if (json.event === "sort") {
      return false;
    } else {
      return true;
    }
  }
  /**
   * @deprecated TODO other modules do this ?
   */
  static async handleRolltableLink(sheet, html) {
    if (game.user.isGM && game.settings.get(CONSTANTS.MODULE_ID, CONSTANTS.ROLL_TABLE_FROM_JOURNAL)) {
      $(html).find("a.content-link[data-uuid^='RollTable']").each((index, link) => {
        const id = $(link).data("id");
        const rolltable = RetrieveHelpers.getRollTableSync(id);
        const rollNode = $(
          `<a class="better-rolltables-roll-table-roll-link" title="${game.i18n.localize(
            `${CONSTANTS.MODULE_ID}.DrawReroll`
          )}"><i class="fas fa-dice-d20"></i></a>`
        ).click(async () => {
          await API$1.generateChatLoot(rolltable);
        });
        $(link).after(rollNode);
      });
      $(html).find("a.content-link[data-pack]").each(async (index, link) => {
        const packName = $(link).data("pack");
        const myPack = await RetrieveHelpers.getCompendiumCollectionAsync(packName, true, false);
        const pack2 = myPack;
        if (!pack2) {
          return;
        }
        const id = $(link).data("id");
        const document2 = await pack2.getDocument(id);
        if (!document2 || document2.documentName !== "RollTable")
          return;
        const rollNode = $(
          `<a class="better-rolltables-roll-table-roll-link" title="${game.i18n.localize(
            `${CONSTANTS.MODULE_ID}.DrawReroll`
          )}"><i class="fas fa-dice-d20"></i></a>`
        ).click(async () => {
          await API$1.generateChatLoot(document2);
        });
        $(link).after(rollNode);
      });
    }
  }
  static async checkRenderDefaultRollTableConfig(rollTableConfig, html, rollTable) {
    if (rollTableConfig.object.sheet.template !== "templates/sheets/roll-table-config.html")
      ;
    else {
      Logger.debug(`Set table type to null for default sheet rolltable config`);
      if (!rollTableConfig.object.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TABLE_TYPE_KEY)) {
        await rollTableConfig.object.setFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TABLE_TYPE_KEY, null);
      }
    }
  }
};
__name(_BetterTables, "BetterTables");
let BetterTables = _BetterTables;
const _RollTableToActorHelpers = class _RollTableToActorHelpers {
  /**
   *
   * @param {RollTable} table
   * @param {Object} options
   * @returns {Promise<ItemData[]>} Item Data Array.  An array of objects, each containing the item that was added or updated, and the quantity that was added
   */
  static async retrieveItemsDataFromRollTableResult(table, options2 = {}) {
    let itemsData = await ItemPilesHelpers.retrieveItemsDataFromRollTable(table, options2);
    return itemsData;
  }
  static async retrieveItemsDataFromRollTableResultSpecialHarvester(table, options2 = {}) {
    let itemsData = await ItemPilesHelpers.retrieveItemsDataFromRollTable(table, options2);
    return itemsData;
  }
  static async addRollTableItemsToActor(table, actor, options2 = {}) {
    const itemsData = ItemPilesHelpers.populateActorOrTokenViaTable(actor, table, {
      targetActor: actor,
      removeExistingActorItems: false
    });
    Logger.info(Logger.i18n(`${CONSTANTS.MODULE_ID}.label.importSuccess`), true);
    const items = itemsData;
    return items;
  }
  /**
   * Add rolltable results to actor
   * @deprecated to remove we use item piles now
   * @param {Token} token
   * @param {TableResult[]} results
   * @param {boolean} stackSame
   * @param {boolean} isTokenActor - is the token already the token actor?
   * @param {number} customLimit
   * @return {void} array of item data
   */
  static async addResultsToControlledTokens(token, results2, stackSame = true, isTokenActor = false, customLimit = 0) {
    let itemsData = await _RollTableToActorHelpers.resultsToItemsData(results2);
    if (itemsData.length === 0) {
      return;
    }
    itemsData = _RollTableToActorHelpers.preStackItems(itemsData);
    const tokenstack = token ? token.constructor === Array ? token : [token] : canvas.tokens.controlled;
    const controlledActors = tokenstack.map((t) => t.actor).filter((a) => a.isOwner);
    if (controlledActors.length === 0) {
      Logger.warn(`No actors founded on the token passed`, true);
      return;
    }
    for (const actor of controlledActors) {
      await ItemPilesHelpers.addItems(actor, itemsData);
    }
    Logger.info(Logger.i18n(`${CONSTANTS.MODULE_ID}.label.importSuccess`), true);
    const items = itemsData;
    return items;
  }
  /**
   * @deprecated to remove we use item piles now
   * @param {*} str
   * @param {*} arr
   * @returns
   */
  static _stringInject(str, arr) {
    if (typeof str !== "string" || !(arr instanceof Array)) {
      return false;
    }
    return str.replace(/({\d})/g, function(i) {
      return arr[i.replace(/{/, "").replace(/}/, "")];
    });
  }
  /**
   * Converts a list of results into a list of item data
   * @param {TableResult[]} results
   * @return {Promise<{Object[]}>} array of item data
   */
  static async resultsToItemsData(results2) {
    const itemsData = [];
    for (const r of results2) {
      const itemTmp = await _RollTableToActorHelpers.resultToItemData(r);
      if (itemTmp) {
        itemsData.push(itemTmp);
      }
    }
    return itemsData;
  }
  /**
   * Converts a result into a item data
   * @param {TableResult} r
   * @return {Promise<{ItemData}>} item data
   */
  static async resultToItemData(r) {
    let document2 = null;
    if (!r.documentId || r.type === CONST.TABLE_RESULT_TYPES.TEXT) {
      if (getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`)) {
        document2 = await fromUuid(
          getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`)
        );
      }
      if (!document2) {
        return null;
      }
    }
    if (getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`)) {
      document2 = await fromUuid(
        getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`)
      );
      if (!document2) {
        try {
          const collection = game.collections.get(r.documentCollection) ?? await RetrieveHelpers.getCompendiumCollectionAsync(r.documentCollection, true, false);
          document2 = await collection?.get(r.documentId) ?? await collection?.getDocument(r.documentId);
        } catch (e) {
        }
      }
    } else {
      try {
        const collection = game.collections.get(r.documentCollection) ?? await RetrieveHelpers.getCompendiumCollectionAsync(r.documentCollection, true, false);
        document2 = await collection?.get(r.documentId) ?? await collection?.getDocument(r.documentId);
      } catch (e) {
      }
    }
    if (!document2 && r.collection) {
      document2 = await BRTUtils.getItemFromCompendium(r);
    }
    if (!document2) {
      document2 = game.items.getName(r.text);
    }
    if (!document2) {
      Logger.error(`Cannot find document for result`, false, r);
      return null;
    }
    let itemTmp = null;
    let customName = getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`);
    let customImage = getProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`);
    if (document2 instanceof Item) {
      itemTmp = document2.toObject();
      itemTmp.uuid = document2.uuid;
    } else if (document2 instanceof Actor && game.itempiles.API.ITEM_CLASS_LOOT_TYPE) {
      Logger.debug(`The Table Result is not a item but a Actor`, false, r);
      itemTmp = {};
      itemTmp.name = `${r.text || document2?.name} Portrait`;
      itemTmp.img = document2?.img || "icons/svg/mystery-man.svg";
      itemTmp.type = game.itempiles.API.ITEM_CLASS_LOOT_TYPE;
      ItemPilesHelpers.setItemCost(itemTmp, await BRTBetterHelpers.tryRoll("1d20 +10", 1));
      ItemPilesHelpers.setItemQuantity(itemTmp, 1);
      customName = `${customName || itemTmp.name} Portrait`;
    } else if (document2 instanceof Scene && game.itempiles.API.ITEM_CLASS_LOOT_TYPE) {
      Logger.debug(`The Table Result is not a item but a Scene`, false, r);
      itemTmp = {};
      itemTmp.name = `Map of ${r.text || document2?.name}`;
      itemTmp.img = document2?.thumb || document2?.img || "icons/svg/direction.svg";
      itemTmp.type = game.itempiles.API.ITEM_CLASS_LOOT_TYPE;
      ItemPilesHelpers.setItemCost(itemTmp, await BRTBetterHelpers.tryRoll("1d20 +10", 1));
      ItemPilesHelpers.setItemQuantity(itemTmp, 1);
      customName = `Map of ${customName || itemTmp.name}`;
    } else {
      Logger.debug(`The Table Result is not a item`, false, r);
      return null;
    }
    setProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_NAME}`, itemTmp.name);
    if (!customName) {
      setProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`, itemTmp.name);
    } else {
      setProperty(itemTmp, `name`, customName);
    }
    setProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_ORIGINAL_ICON}`, itemTmp.img);
    if (!customImage) {
      setProperty(r, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`, itemTmp.img);
    } else {
      setProperty(itemTmp, `img`, customImage);
    }
    if (!getProperty(itemTmp, `flags.${CONSTANTS.MODULE_ID}`)) {
      setProperty(itemTmp, `flags.${CONSTANTS.MODULE_ID}`, {});
    }
    mergeObject(itemTmp.flags[CONSTANTS.MODULE_ID], getProperty(r, `flags.${CONSTANTS.MODULE_ID}`));
    return itemTmp;
  }
  /**
   * Preemptively stacks all items in the itemsData, if possible
   * @deprecated remain for the special case of the harvester module harvester
   * @param itemsData
   * @return {*[]|*}
   */
  static preStackItems(itemsData) {
    return _RollTableToActorHelpers._preStackItemsImpl(itemsData, false, false, false);
  }
  /**
   * Preemptively stacks all items in the itemsData, if possible
   * @deprecated remain for the special case of the harvester module harvester
   * @param itemsData
   * @return {*[]|*}
   */
  static preStackItemsSpecialHarvester(itemsData) {
    return _RollTableToActorHelpers._preStackItemsImpl(itemsData, false, true, true);
  }
  /**
   * Preemptively stacks all items in the itemsData, if possible
   * @deprecated remain for the special case of the harvester module harvester
   * @param itemsData
   * @return {*[]|*}
   */
  static _preStackItemsImpl(itemsData, ignoreQuantity = false, ignorePrice = false, ignoreWeight = false) {
    const stackAttribute = game.itempiles.API.ITEM_QUANTITY_ATTRIBUTE;
    const priceAttribute = game.itempiles.API.ITEM_PRICE_ATTRIBUTE;
    if (!stackAttribute) {
      return itemsData;
    }
    const stackedItemsData = [];
    for (const item2 of itemsData) {
      const match = ItemPilesHelpers.findSimilarItem(stackedItemsData, item2);
      if (!match) {
        stackedItemsData.push(item2);
      } else {
        if (!ignoreQuantity) {
          const newStack = getProperty(match, stackAttribute) + (getProperty(item2, stackAttribute) ?? 1);
          setProperty(match, `${stackAttribute}`, newStack);
        }
        if (!ignorePrice) {
          const newPriceValue = (getProperty(match, priceAttribute)?.value ?? 0) + (getProperty(item2, priceAttribute)?.value ?? 0);
          const newPrice = {
            denomination: getProperty(item2, priceAttribute)?.denomination,
            value: newPriceValue
          };
          setProperty(match, `${priceAttribute}`, newPrice);
        }
      }
    }
    return stackedItemsData;
  }
  /**
   * Adds the Items item to an actor, stacking them if possible
   * @param {Actor} actor
   * @param {Object[]} itemsData
   * @param {boolean} stackSame
   * @param {number} customLimit
   * @returns {Promise<itemsData>}
   */
  static async addItemsToActor(actor, itemsData, stackSame = true, customLimit = 0) {
    const stackAttribute = game.itempiles.API.ITEM_QUANTITY_ATTRIBUTE;
    const priceAttribute = game.itempiles.API.ITEM_PRICE_ATTRIBUTE;
    if (!stackAttribute) {
      return Item.create(itemsData, { parent: actor });
    }
    const items = [];
    for (const item2 of itemsData) {
      if (stackSame) {
        const match = actor.getEmbeddedCollection("Item").find((i) => {
          return _RollTableToActorHelpers.itemMatches(i, item2);
        });
        if (match) {
          const newStack = getProperty(match, stackAttribute) + (getProperty(item2, stackAttribute) ?? 1);
          const newPriceValue = (getProperty(match, priceAttribute)?.value ?? 0) + (getProperty(item2, priceAttribute)?.value ?? 0);
          const newPrice = {
            denomination: getProperty(item2, priceAttribute)?.denomination,
            value: newPriceValue
          };
          const newQty = _RollTableToActorHelpers._handleLimitedQuantity(
            newStack,
            getProperty(item2, stackAttribute),
            customLimit
          );
          await match.update({
            [`${stackAttribute}`]: newQty,
            [`${priceAttribute}`]: newPrice
            // [`${weightAttribute}`]: newWeight,
          });
        } else {
          const i = await Item.create(itemsData, { parent: actor });
          items.push(i);
        }
      } else {
        const i = await Item.create(itemsData, { parent: actor });
        items.push(i);
      }
    }
    return items;
  }
  static itemMatches(charItem, tableItem) {
    if (charItem.name !== tableItem.name) {
      return false;
    }
    const matchAttributesBlacklist = game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.MATCH_ATTRIBUTES_BLACKLIST);
    const flattenChar = flattenObject(charItem.system);
    const flattenTable = flattenObject(tableItem.system);
    for (const k of Object.keys(tableItem)) {
      if (flattenChar[k] == null || flattenTable[k] == null) {
        continue;
      }
      const isBlacklisted = matchAttributesBlacklist.find((b) => k.startsWith(b));
      if (isBlacklisted != null) {
        continue;
      }
      if (flattenChar[k] !== flattenTable[k]) {
        Logger.log(flattenChar[k], k);
        return false;
      }
    }
    return true;
  }
  // /**
  //  * Interesting but not necessary there are other modules for this
  //  * Hooks.on('renderItemSheet', (_app, element, _options) => injectRightClickContentLink(element));
  //  * Hooks.on('renderActorSheet', (_app, element, _options) => injectRightClickContentLink(element));
  //  * @param {*} appElement
  //  */
  // static async injectRightClickContentLink(appElement) {
  //   const contentLinks = appElement.find('.content-link[data-type="RollTable"]');
  //   contentLinks.mousedown(async (ev) => {
  //     if (ev.which !== 3) return;
  //     const tableUuid = ev.currentTarget.dataset.uuid;
  //     if (!tableUuid) return;
  //     const tableDocument = await fromUuid(tableUuid);
  //     const roll = await tableDocument.roll();
  //     await tableDocument?.draw({
  //       roll: roll.roll,
  //       results: roll.results,
  //       rollMode: game.settings.get("core", "rollMode"),
  //     });
  //   });
  // }
  /**
   *
   * @param {Actor} actor to which to add items to
   * @param {TableResult[]} results
   * @param {boolean} stackSame if true add quantity to an existing item of same name in the current actor
   * @param {number} customLimit
   *
   * @returns {object[]} items
   */
  static async addResultsToActor(actor, results2, stackSame = true, customLimit = 0) {
    let itemsData = await _RollTableToActorHelpers.resultsToItemsData(results2);
    if (itemsData.length === 0) {
      return;
    }
    itemsData = _RollTableToActorHelpers.preStackItems(itemsData);
    const items = await _RollTableToActorHelpers.addItemsToActor(actor, itemsData, stackSame, customLimit);
    return items;
  }
  /**
   * @deprecated
   * @param {Actor} actor to which to add items to
   * @param {TableResult[]} results
   * @param {boolean} stackSame if true add quantity to an existing item of same name in the current actor
   * @param {number} customLimit
   *
   * @returns {object[]} items
   */
  static async addItemsToActorOld(actor, results2, stackSame = true, customLimit = 0) {
    const items = await _RollTableToActorHelpers.addResultsToActor(actor, results2, stackSame, customLimit);
    return items;
  }
  /**
   * @deprecated very old method
   * @param {token} token
   * @param {TableResult[]} results
   * @param {boolean} stackSame
   * @param {boolean} isTokenActor - is the token already the token actor?
   * @param {number} customLimit
   *
   * @returns {object[]} items
   */
  static async addItemsToTokenOld(token, results2, stackSame = true, isTokenActor = false, customLimit = 0) {
    const items = await _RollTableToActorHelpers.addResultsToControlledTokens(
      token,
      results2,
      stackSame,
      isTokenActor,
      customLimit
    );
    return items;
  }
  // /**
  //  * @deprecated not used anymore
  //  * @param {TableResult} result representation
  //  * @param {Actor} actor to which to add items to
  //  * @param {boolean} stackSame if true add quantity to an existing item of same name in the current actor
  //  * @param {number} customLimit
  //  * @returns {Item} the create Item (foundry item)
  //  */
  // static async _createItem(result, actor, stackSame = true, customLimit = 0) {
  //     const newItemData = await RollTableToActorHelpers.buildItemData(result);
  //     const priceAttribute = game.itempiles.API.ITEM_PRICE_ATTRIBUTE; // SETTINGS.PRICE_PROPERTY_PATH
  //     const itemPrice = getProperty(newItemData, priceAttribute) || 0;
  //     const embeddedItems = [...actor.getEmbeddedCollection("Item").values()];
  //     const originalItem = embeddedItems.find(
  //         (i) => i.name === newItemData.name && itemPrice === getProperty(i, priceAttribute),
  //     );
  //     /** if the item is already owned by the actor (same name and same PRICE) */
  //     if (originalItem && stackSame) {
  //         /** add quantity to existing item */
  //         const stackAttribute = game.itempiles.API.ITEM_QUANTITY_ATTRIBUTE; // game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.QUANTITY_PROPERTY_PATH);
  //         const priceAttribute = game.itempiles.API.ITEM_PRICE_ATTRIBUTE; // game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.PRICE_PROPERTY_PATH);
  //         // const weightAttribute = game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.WEIGHT_PROPERTY_PATH);
  //         const newItemQty = getProperty(newItemData, stackAttribute) || 1;
  //         const originalQty = getProperty(originalItem, stackAttribute) || 1;
  //         const updateItem = { _id: originalItem.id };
  //         const newQty = RollTableToActorHelpers._handleLimitedQuantity(newItemQty, originalQty, customLimit);
  //         if (newQty != newItemQty) {
  //             setProperty(updateItem, stackAttribute, newQty);
  //             const newPriceValue =
  //                 (getProperty(originalItem, priceAttribute)?.value ?? 0) +
  //                 (getProperty(newItemData, priceAttribute)?.value ?? 0);
  //             const newPrice = {
  //                 denomination: getProperty(item, priceAttribute)?.denomination,
  //                 value: newPriceValue,
  //             };
  //             setProperty(updateItem, `${priceAttribute}`, newPrice);
  //             // const newWeight = getProperty(originalItem, weightAttribute) + (getProperty(newItemData, weightAttribute) ?? 1);
  //             // setProperty(updateItem, `${weightAttribute}`, newWeight);
  //             await actor.updateEmbeddedDocuments("Item", [updateItem]);
  //         }
  //         return actor.items.get(originalItem.id);
  //     } else {
  //         /** we create a new item if we don't own already */
  //         return await actor.createEmbeddedDocuments("Item", [newItemData]);
  //     }
  // }
  /**
   *
   * @param {number} currentQty Quantity of item we want to add
   * @param {number} originalQty Quantity of the originalItem already in posession
   * @param {number} customLimit A custom Limit
   * @returns
   */
  static _handleLimitedQuantity(currentQty, originalQty, customLimit = 0) {
    const newQty = Number(originalQty) + Number(currentQty);
    if (customLimit > 0) {
      if (Number(customLimit) >= Number(newQty)) {
        return newQty;
      }
      return customLimit;
    }
    return newQty;
  }
  // /**
  //  * @deprecated we use instead RollTableToActorHelpers.resultToItemData(result)
  //  * @param {TableResult} result
  //  * @returns
  //  */
  // static async buildItemData(result) {
  //     /*
  // // PATCH 2023-10-04
  // let customResultName = undefined;
  // let customResultImg = undefined;
  // if (getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`)) {
  //   customResultName = getProperty(
  //     result,
  //     `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_NAME}`
  //   );
  // }
  // if (getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`)) {
  //   customResultImg = getProperty(
  //     result,
  //     `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_CUSTOM_ICON}`
  //   );
  // }
  // let existingItem = undefined;
  // let docUuid = getProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_UUID}`);
  // if (docUuid) {
  //   existingItem = await fromUuid(docUuid);
  // }
  // if (result.documentCollection === "Item") {
  //   existingItem = game.items.get(result.documentId);
  // } else {
  //   const compendium = game.packs.get(result.documentCollection);
  //   if (compendium) {
  //     existingItem = await compendium.getDocument(result.documentId);
  //   }
  // }
  // // Try first to load item from compendium
  // if (!existingItem && result.collection) {
  //   existingItem = await BRTUtils.getItemFromCompendium(result);
  // }
  // // Try first to load item from item list
  // if (!existingItem) {
  //   // if an item with this name exist we load that item data, otherwise we create a new one
  //   existingItem = game.items.getName(result.text);
  // }
  // if (!existingItem) {
  //   Logger.error(`Cannot find document for result`, false, result);
  //   return null;
  // }
  // let itemData = duplicate(existingItem);
  // if (customResultName) {
  //   itemData.name = customResultName;
  // }
  // if (customResultImg) {
  //   itemData.img = customResultImg;
  // }
  // if(!itemData.type) {
  //    itemData.type = CONSTANTS.ITEM_LOOT_TYPE;
  // }
  // const itemConversions = {
  //   Actor: {
  //     text: customResultName ? `${customResultName} Portrait` : `${result.text} Portrait`,
  //     img: customResultImg || existingItem?.img || "icons/svg/mystery-man.svg",
  //     price: new Roll("1d20 + 10").roll({ async: false }).total || 1,
  //   },
  //   Scene: {
  //     text: customResultName ? `Map of ${customResultName}` : `Map of ${existingItem?.name}`,
  //     img: customResultImg || existingItem?.thumb || "icons/svg/direction.svg",
  //     price: new Roll("1d20 + 10").roll({ async: false }).total || 1,
  //   },
  // };
  // const convert = itemConversions[existingItem?.documentName] ?? false;
  // //  Create item from text since the item does not exist
  // const createNewItem = !existingItem || convert;
  // if (createNewItem) {
  //   const name = convert ? convert?.text : result.text;
  //   const type = CONSTANTS.ITEM_LOOT_TYPE;
  //   const img = convert ? convert?.img : result.img;
  //   const price = convert ? convert?.price : result.price || 0;
  //   itemData = {
  //     name: name,
  //     type: type,
  //     img: img, // "icons/svg/mystery-man.svg"
  //     system: {
  //       price: price,
  //     },
  //   };
  // }
  // if (Object.getOwnPropertyDescriptor(result, "commands") && result.commands) {
  //   itemData = RollTableToActorHelpers._applyCommandToItemData(itemData, result.commands);
  // }
  // if (!itemData) {
  //   return;
  // }
  // */
  //     const itemData = RollTableToActorHelpers.resultToItemData(result);
  //     return itemData;
  // }
  /**
   *
   * @param {object} itemData
   * @param {object[]} commands
   * @returns {object} itemData
   */
  static _applyCommandToItemData(itemData, commands) {
    for (const cmd of commands) {
      let rolledValue;
      try {
        rolledValue = new Roll(cmd.arg).roll({ async: false }).total;
      } catch (e) {
        Logger.error(e.message, false, e);
        continue;
      }
      setProperty(itemData, `system.${cmd.command.toLowerCase()}`, rolledValue);
    }
    return itemData;
  }
  /** MANIPULATOR */
  // /**
  //  *
  //  * @param {number} level
  //  *
  //  * @returns {Item}
  //  */
  // static async _getRandomSpell(level) {
  //   const spells = API.betterTables
  //       .getSpellCache()
  //       .filter((spell) => getProperty(spell, CONSTANTS.SPELL_LEVEL_PATH) === level),
  //     spell = spells[Math.floor(Math.random() * spells.length)];
  //   return BRTUtils.findInCompendiumById(spell.collection, spell._id);
  // }
  // /**
  //  *
  //  * @param {*} itemData
  //  *
  //  * @returns
  //  */
  // static async preItemCreationDataManipulation(itemData) {
  //   const match = CONSTANTS.SCROLL_REGEX.exec(itemData.name);
  //   itemData = duplicate(itemData);
  //   if (!match) {
  //     return itemData;
  //   }
  //   // If it is a scroll then open the compendium
  //   const level = match[1].toLowerCase() === "cantrip" ? 0 : parseInt(match[1]);
  //   const itemEntity = await RollTableToActorHelpers._getRandomSpell(level);
  //   if (!itemEntity) {
  //     Logger.warn(
  //       ` | No spell of level ${level} found in compendium  ${itemEntity.collection} `, true
  //     );
  //     return itemData;
  //   }
  //   const itemLink = `@Compendium[${itemEntity.pack}.${itemEntity._id}]`;
  //   // make the name shorter by removing some text
  //   itemData.name = itemData.name.replace(/^(Spell\s)/, "");
  //   itemData.name = itemData.name.replace(/(Cantrip\sLevel)/, "Cantrip");
  //   itemData.name += ` (${itemEntity.name})`;
  //   itemData.system.description.value =
  //     "<blockquote>" +
  //     itemLink +
  //     "<br />" +
  //     itemEntity.system.description.value +
  //     "<hr />" +
  //     itemData.system.description.value +
  //     "</blockquote>";
  //   return itemData;
  // }
};
__name(_RollTableToActorHelpers, "RollTableToActorHelpers");
let RollTableToActorHelpers = _RollTableToActorHelpers;
const _BRTLootHelpers = class _BRTLootHelpers {
  /**
   * Roll a table an add the resulting loot to a given token.
   *
   * @param {RollTable} tableEntity
   * @param {TokenDocument} token
   * @param {options} object
   * @returns
   */
  static async addLootToSelectedToken(tableEntity, token = null, options2 = {}) {
    let tokenstack = [];
    if (null == token && canvas.tokens.controlled.length === 0) {
      return Logger.error("Please select a token first", true);
    } else {
      tokenstack = token ? token.constructor === Array ? token : [token] : canvas.tokens.controlled;
    }
    Logger.info("Loot generation started.", true);
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    for (const token2 of tokenstack) {
      Logger.info(`Loot generation started on token '${token2.name}'`, true);
      const resultsBrt = await brtTable2.betterRoll();
      const rollMode = brtTable2.rollMode;
      const roll2 = brtTable2.mainRoll;
      const results2 = resultsBrt?.results;
      const br2 = new BetterResults(
        tableEntity,
        results2,
        options2?.stackResultsWithBRTLogic,
        options2?.rollAsTableType
      );
      const betterResults = await br2.buildResults();
      const currencyData = br2.getCurrencyData();
      const currencyDataForItemPiles = ItemPilesHelpers.generateCurrenciesStringFromString(currencyData);
      await ItemPilesHelpers.addCurrencies(token2, currencyDataForItemPiles);
      await ItemPilesHelpers.populateActorOrTokenViaTableResults(token2, results2);
      Logger.info(`Loot generation ended on token '${token2.name}'`, true);
      if (isRealBoolean(options2.displayChat)) {
        if (!options2.displayChat) {
          continue;
        }
      }
      const lootChatCard = new LootChatCard(betterResults, currencyData, rollMode, roll2);
      await lootChatCard.createChatCard(tableEntity);
    }
    Logger.info("Loot generation complete.", true);
    return;
  }
  /**
   *
   * @param {*} tableEntity
   */
  static async generateLoot(tableEntity, options2 = {}) {
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    const resultsBrt = await brtTable2.betterRoll();
    const rollMode = brtTable2.rollMode;
    const roll2 = brtTable2.mainRoll;
    const results2 = resultsBrt?.results;
    const br2 = new BetterResults(tableEntity, results2, options2?.stackResultsWithBRTLogic, options2?.rollAsTableType);
    const betterResults = await br2.buildResults();
    const currencyData = br2.getCurrencyData();
    const actor = await _BRTLootHelpers.createActor(tableEntity);
    const currencyDataForItemPiles = ItemPilesHelpers.generateCurrenciesStringFromString(currencyData);
    await ItemPilesHelpers.addCurrencies(actor, currencyDataForItemPiles);
    await ItemPilesHelpers.populateActorOrTokenViaTableResults(actor, results2);
    if (isRealBoolean(options2.displayChat)) {
      if (!options2.displayChat) {
        return;
      }
    }
    const lootChatCard = new LootChatCard(betterResults, currencyData, rollMode, roll2);
    await lootChatCard.createChatCard(tableEntity);
  }
  static async generateChatLoot(tableEntity, options2 = {}) {
    const brtTable2 = new BetterRollTable(tableEntity, options2);
    await brtTable2.initialize();
    const resultsBrt = await brtTable2.betterRoll();
    const rollMode = brtTable2.rollMode;
    const roll2 = brtTable2.mainRoll;
    const results2 = resultsBrt?.results;
    const br2 = new BetterResults(tableEntity, results2, options2?.stackResultsWithBRTLogic, options2?.rollAsTableType);
    const betterResults = await br2.buildResults();
    const currencyData = br2.getCurrencyData();
    const lootChatCard = new LootChatCard(betterResults, currencyData, rollMode, roll2);
    await lootChatCard.createChatCard(tableEntity);
  }
  // /**
  //  * @deprecated to remove we use item piles now
  //  * @param {*} actor
  //  * @param {*} lootCurrency
  //  */
  // static async addCurrenciesToActor(actor, lootCurrency) {
  //   const currencyData = duplicate(actor.system.currency);
  //   // const lootCurrency = this.currencyData;
  //   for (const key in lootCurrency) {
  //     if (Object.getOwnPropertyDescriptor(currencyData, key)) {
  //       const amount = Number(currencyData[key].value || 0) + Number(lootCurrency[key]);
  //       currencyData[key] = amount.toString();
  //     }
  //   }
  //   await actor.update({ "system.currency": currencyData });
  // }
  // /**
  //  * @deprecated not used anymore
  //  * @param {Token|Actor} token
  //  * @param {Object} currencyData
  //  * @param {Boolean} is the token passed as the token actor instead?
  //  */
  // static async addCurrenciesToToken(token, lootCurrency, isTokenActor = false) {
  //   // needed for base key set in the event that a token has no currency properties
  //   const currencyDataInitial = { cp: 0, ep: 0, gp: 0, pp: 0, sp: 0 };
  //   let currencyData = currencyDataInitial;
  //   if (isTokenActor) {
  //     currencyData = duplicate(token.system.currency);
  //   } else if (token.actor.system.currency) {
  //     currencyData = duplicate(token.actor.system.currency);
  //   }
  //   // const lootCurrency = currencyData;
  //   for (const key in currencyDataInitial) {
  //     const amount = Number(currencyData[key] || 0) + Number(lootCurrency[key] || 0);
  //     currencyData[key] = amount;
  //   }
  //   if (isTokenActor) {
  //     // @type {Actor}
  //     return await token.update({ "system.currency": currencyData });
  //   } else {
  //     return await token.actor.update({ "system.currency": currencyData });
  //   }
  // }
  static async createActor(table, overrideName = void 0) {
    const actorName = overrideName || table.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.LOOT_ACTOR_NAME_KEY);
    let actor = game.actors.getName(actorName);
    if (!actor) {
      actor = await Actor.create({
        name: actorName || "New Loot",
        type: game.itempiles.API.ACTOR_CLASS_TYPE,
        // game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.DEFAULT_ACTOR_NPC_TYPE),
        img: `modules/${CONSTANTS.MODULE_ID}/assets/artwork/chest.webp`,
        sort: 12e3,
        token: { actorLink: true }
      });
    }
    return actor;
  }
  // /**
  //  *
  //  * @param {TableResult} result
  //  * @returns {Array<{value:number,denom:string}>} currency extracted to insert on the actor
  //  */
  // static async retrieveLootFromTextLootRoll(result) {
  //   var rollMap = formatLootRoll(result.text);
  //   let currencyDataCalculate = [];
  //   for (let [key, value] of rollMap) {
  //     // var roll = new Roll(value);
  //     // var rollResult = roll.roll({async: false});
  //     var rollResult = await BRTBetterHelpers.tryRoll(value);
  //     currencyDataCalculate.push({
  //       value: rollResult,
  //       denom: key
  //     })
  //   }
  //   return currencyDataCalculate;
  // }
  // static formatLootRoll(resultText)
  // {
  //   let rollTableResult = resultText.replace(/(\[\[\/r\s)?(\]\])?(\}$)?/g,"").split("}");
  //   let returnMap = new Map();
  //   for(let i = 0; i < rollTableResult.length; i++)
  //   {
  //     let extractedRoll = rollTableResult[i].split("{");
  //     returnMap.set(extractedRoll[1], extractedRoll[0]);
  //   }
  //   return returnMap;
  // }
};
__name(_BRTLootHelpers, "BRTLootHelpers");
let BRTLootHelpers = _BRTLootHelpers;
const _BRTActorList = class _BRTActorList extends FormApplication {
  static initializeActorList(app, array) {
    if (!game.user.isGM) {
      return;
    }
    const listButton = {
      class: CONSTANTS.MODULE_ID,
      icon: "fa-solid fa-table-rows",
      onclick: async () => new _BRTActorList(app.document).render(true),
      label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.label.HeaderActorList`)
    };
    const isChar2 = app.constructor.name === "ActorSheet5eCharacter2";
    if (!isChar2 && !game.settings.get(CONSTANTS.MODULE_ID, "headerActorListLabel")) {
      delete listButton.label;
    }
    array.unshift(listButton);
  }
  constructor(actor, options2 = {}) {
    super(actor, options2);
    this.actor = actor;
    this.clone = actor.clone({}, { keepId: true });
  }
  /** @override */
  get title() {
    return game.i18n.format(`${CONSTANTS.MODULE_ID}.label.TitleActorList`, { name: this.actor.name });
  }
  /** @override */
  get id() {
    return `${CONSTANTS.MODULE_ID}-${this.actor.uuid.replaceAll(".", "-")}`;
  }
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [CONSTANTS.MODULE_ID],
      template: `modules/${CONSTANTS.MODULE_ID}/templates/sheet/brt-actor-config-list.hbs`,
      dragDrop: [{ dropSelector: "[data-action='drop']" }],
      scrollY: [".roll-table-list"],
      width: 550,
      height: "auto"
    });
  }
  /**
   * Get the roll table types that can have quantity and type.
   * @returns {Set<string>}     The valid roll table types.
   */
  static get validRollTableTypes() {
    return new Set(CONSTANTS.TYPES);
  }
  get validRollTableTypes() {
    return this.constructor.validRollTableTypes;
  }
  /** @override */
  async getData(options2 = {}) {
    const currencies = this._gatherCurrencies();
    const rollTableList = this._gatherTables().reduce((acc, data) => {
      const rollTable = RetrieveHelpers.getRollTableSync(data.uuid);
      if (rollTable) {
        acc.push({ ...data, name: rollTable.name, img: rollTable.img });
      }
      return acc;
    }, []).sort((a, b) => a.name.localeCompare(b.name));
    return {
      rollTableList,
      currencies,
      brtTypes: CONSTANTS.TYPES
    };
  }
  // /** @override */
  // async _onChangeInput(event) {
  //     if (event.currentTarget.closest("[data-currencies]")?.dataset?.currencies) {
  //         // const currencies = event.currentTarget.closest("[data-currencies]").value;
  //         // this.clone.updateSource({[`flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.CURRENCIES}`]: currencies});
  //         const data = this._getSubmitData();
  //         this.clone.updateSource(data);
  //     } else {
  //         const uuid = event.currentTarget.closest("[data-uuid]").dataset.uuid;
  //         const quantity = event.currentTarget.closest("[data-quantity]").dataset.quantity;
  //         const brtType= event.currentTarget.closest("[data-brtType]").dataset.brtType;
  //         this._updateQuantity(uuid, quantity, brtType);
  //     }
  //     return this.render();
  // }
  /**
   * Get an object of update data used to update the form's target object
   * @param {object} updateData     Additional data that should be merged with the form data
   * @returns {object}               The prepared update data
   * @protected
   * @override
   */
  _getSubmitData(updateData = {}) {
    let dataTmp2 = super._getSubmitData(updateData);
    dataTmp2 = foundry.utils.expandObject(dataTmp2);
    let currencies = foundry.utils.getProperty(
      dataTmp2,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.CURRENCIES}`
    );
    let rollTableListToPatch = foundry.utils.getProperty(
      dataTmp2,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.ROLL_TABLES_LIST}`
    );
    const rollTableList = [];
    if (rollTableListToPatch) {
      for (const [key, value] of Object.entries(rollTableListToPatch)) {
        rollTableList.push(value);
      }
    }
    this.clone.updateSource({
      [`flags.${CONSTANTS.MODULE_ID}`]: {
        [`${CONSTANTS.FLAGS.ACTOR_LIST.CURRENCIES}`]: currencies,
        [`${CONSTANTS.FLAGS.ACTOR_LIST.ROLL_TABLES_LIST}`]: rollTableList
      }
    });
    foundry.utils.setProperty(dataTmp2, `flags.${CONSTANTS.MODULE_ID}`, {});
    foundry.utils.setProperty(
      dataTmp2,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.ROLL_TABLES_LIST}`,
      rollTableList
    );
    foundry.utils.setProperty(
      dataTmp2,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.CURRENCIES}`,
      currencies
    );
    dataTmp2 = foundry.utils.flattenObject(dataTmp2);
    return dataTmp2;
  }
  /** @override */
  async _onDrop(event) {
    event.stopPropagation();
    event.target.closest("[data-action='drop']").classList.remove("drag-over");
    const data = TextEditor.getDragEventData(event);
    const rollTables = await this._validateDrops(data);
    if (!rollTables) {
      return;
    }
    for (const rollTable of rollTables) {
      const uuid = rollTable.uuid;
      rollTable.name;
      this._updateQuantity(
        uuid,
        BRTUtils.retrieveBRTRollAmount(rollTable) || "1",
        BRTUtils.retrieveBRTType(rollTable)
      );
    }
    Logger.info(
      Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningAddedRollTables`, {
        amount: rollTables.length,
        name: this.clone.name
      }),
      true
    );
    return this.render();
  }
  /**
   * Update the quantity of an existing roll table on the list.
   * @param {string} uuid           The uuid of the roll table to update. Add it if not found.
   * @param {string} [quantity]     A specific value to set it to, otherwise add 1.
   * @param {string} [brtType]
   * @returns {void}
   */
  _updateQuantity(uuid, quantity = null, brtType = null) {
    const list = this._gatherTables();
    const existing = list.find((e) => e.uuid === uuid);
    if (existing) {
      existing.quantity = quantity ? quantity : existing.quantity;
      existing.brtType = brtType ? brtType : existing.brtType;
    } else {
      list.push({
        quantity: quantity ? quantity : "1",
        brtType: brtType ? brtType : "none",
        uuid
      });
    }
    this.clone.updateSource({
      [`flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.ROLL_TABLES_LIST}`]: list
    });
  }
  /** @override */
  async _onDragOver(event) {
    event.target.closest("[data-action='drop']")?.classList.add("drag-over");
  }
  /** @override */
  async _updateObject() {
    const update = this.clone.flags[CONSTANTS.MODULE_ID];
    return this.actor.update({ [`flags.${CONSTANTS.MODULE_ID}`]: update });
  }
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html[0].querySelectorAll("[data-action]").forEach((n) => {
      switch (n.dataset.action) {
        case "delete":
          n.addEventListener("click", this._onClickRollTableDelete.bind(this));
          break;
        case "render":
          n.addEventListener("click", this._onClickRollTableName.bind(this));
          break;
        case "drop":
          n.addEventListener("dragleave", this._onDragLeaveBox.bind(this));
          break;
        case "clear":
          n.addEventListener("click", this._onClickClear.bind(this));
          break;
        case "grant":
          n.addEventListener("click", this._onClickGrant.bind(this));
          break;
      }
    });
    html[0].querySelectorAll("input[type=text]").forEach((n) => {
      n.addEventListener("focus", (event) => event.currentTarget.select());
    });
  }
  /**
   * Grant the loot and currency list to the targeted token's actor.
   * @param {PointerEvent} event      The initiating click event.
   * @returns {Promise<void>}
   */
  async _onClickGrant(event) {
    const rollTablesArrayBase = this._gatherTables();
    const currencies = this._gatherCurrencies();
    const target = game.user.targets.first()?.actor;
    if (!target) {
      Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningNoTarget`, {}), true);
      return;
    }
    target.getRollData();
    const rollTables = [];
    const rollTableArray = await Promise.all(
      rollTablesArrayBase.map(async ({ quantity, brtType, uuid }) => {
        const rollTable = await RetrieveHelpers.getRollTableAsync(uuid);
        return {
          quantity,
          brtType,
          uuid,
          rollTable
        };
      })
    );
    Hooks.callAll(`${CONSTANTS.MODULE_ID}.preGrantRollTables`, target, rollTableArray);
    for (const rollTableElement of rollTableArray) {
      await API$1.addRollTableItemsToActor({
        table: rollTableElement.uuid,
        actor: target,
        options: {
          rollsAmount: rollTableElement.quantity,
          rollAsTableType: rollTableElement.brtType
        }
      });
    }
    await ItemPilesHelpers.addCurrencies(target, currencies);
    Hooks.callAll(`${CONSTANTS.MODULE_ID}.grantRollTables`, target, rollTables);
  }
  /**
   * Remove all roll tables on the sheet. This does not stick unless saved.
   * @param {PointerEvent} event      The initiating click event.
   * @returns {BRTActorList}
   */
  _onClickClear(event) {
    this.clone.updateSource({
      [`flags.${CONSTANTS.MODULE_ID}`]: {
        [`${CONSTANTS.FLAGS.ACTOR_LIST.ROLL_TABLES_LIST}`]: [],
        [`${CONSTANTS.FLAGS.ACTOR_LIST.CURRENCIES}`]: ""
      }
    });
    return this.render();
  }
  /**
   * Remove a single roll table on the sheet. This does not stick unless saved.
   * @param {PointerEvent} event      The initiating click event.
   * @returns {BRTActorList}
   */
  _onClickRollTableDelete(event) {
    const uuid = event.currentTarget.closest("[data-uuid]").dataset.uuid;
    const list = this._gatherTables();
    list.findSplice((i) => i.uuid === uuid);
    this.clone.updateSource({
      [`flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.ROLL_TABLES_LIST}`]: list
    });
    return this.render();
  }
  /**
   * Render an roll table sheet by clicking its name.
   * @param {PointerEvent} event        The initiating click event.
   * @returns {Promise<ItemSheet>}      The rendered roll table sheet.
   */
  async _onClickRollTableName(event) {
    const rollTable = await fromUuid(event.currentTarget.closest("[data-uuid]").dataset.uuid);
    return rollTable.sheet.render(true);
  }
  /**
   * Remove the 'active' class from the drop area when left.
   * @param {DragEvent} event      The initiating drag event.
   * @returns {void}
   */
  _onDragLeaveBox(event) {
    event.currentTarget.classList.remove("drag-over");
  }
  /**
   * Read all roll tables on the sheet.
   * @returns {{uuid:string; quantity:number; brtType:string}[]}      An array of objects with quantity, uuid, and name.
   */
  _gatherTables() {
    return foundry.utils.getProperty(
      this.clone,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.ROLL_TABLES_LIST}`
    ) ?? [];
  }
  /**
   * Read all currencies on the sheet.
   * @returns {string} An object with the currency keys and value (string).
   */
  _gatherCurrencies() {
    const curr = foundry.utils.getProperty(
      this.clone,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.CURRENCIES}`
    ) ?? "";
    return curr ? String(curr) : null;
  }
  /**
   * Validate the dropped document and return an array of valid roll tables from it.
   * If a single valid roll table, return it in an array.
   * If a folder with at least 1 valid roll table in it, return that array.
   * If a rolltable with at least 1 valid roll table in it, return that array.
   * If a compendium with at least 1 valid roll table in it, return that array.
   * If no valid roll tables, returns false.
   * @param {object} data                     The dropped data object.
   * @returns {Promise<RollTable[]|boolean>}     The array of valid roll tables, or false if none found.
   */
  async _validateDrops(data) {
    const isFolder = data.type === "Folder";
    const isTable = data.type === "RollTable";
    const isPack = data.type === "Compendium";
    if (!isFolder && !isTable && !isPack) {
      Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningInvalidDocument`, {}), true);
      return false;
    }
    if (isFolder) {
      return await this._dropFolder(data);
    }
    if (isTable) {
      return await this._dropRollTable(data);
    }
    if (isPack) {
      return await this._dropPack(data);
    }
  }
  /**
   * Validate a single dropped roll table.
   * @param {object} data                     The dropped roll table's data.
   * @returns {Promise<RollTable[]|boolean>}     The single dropped roll table in an array, or false if invalid.
   */
  async _dropSingleRollTable(data) {
    const rollTable = await RetrieveHelpers.getRollTableAsync(data.uuid);
    return [rollTable];
  }
  /**
   * Validate a folder of roll tables.
   * @param {object} data                     The dropped folder's data.
   * @returns {Promise<RollTable[]|boolean>}     The array of valid roll tables, or false if none found.
   */
  async _dropFolder(data) {
    const folder = await fromUuid(data.uuid);
    if (folder.type !== "RollTable") {
      Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningInvalidDocument`, {}), true);
      return false;
    }
    const rollTables = folder.contents;
    if (!rollTables.length) {
      Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningEmptyDocument`, {}), true);
      return false;
    }
    return rollTables;
  }
  /**
   * Validate a dropped rolltable.
   * @param {object} data                     The dropped table's data.
   * @returns {Promise<RollTable[]|boolean>}     The array of valid roll tables, or false if none found.
   */
  async _dropRollTable(data) {
    return await this._dropSingleRollTable(data);
  }
  /**
   * Validate a dropped compendium.
   * @param {object} data                   The dropped pack's data.
   * @returns {Promise<RollTable[]|boolean>}     The array of valid roll tables, or false if none found.
   */
  async _dropPack(data) {
    const pack2 = RetrieveHelpers.getCompendiumCollectionSync(data.id);
    if (pack2.metadata.type !== "RollTable") {
      Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningInvalidDocument`, {}), true);
      return false;
    }
    const index = await pack2.getIndex();
    const rollTables = index.reduce((acc, rollTable) => {
      return acc.concat([
        {
          ...rollTable,
          quantity: BRTUtils.retrieveBRTRollAmount(rollTable) || "1",
          brtType: BRTUtils.retrieveBRTType(rollTable)
        }
      ]);
    }, []);
    if (!rollTables.length) {
      Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningEmptyDocument`, {}), true);
      return false;
    }
    return rollTables;
  }
  // =========================================================
  // STATIC
  // =======================================================
  /**
   * Method to add some rolltables to the actor list
   * @param {Actor|UUID|string} actor
   * @param {RollTable|Folder|CompendiumCollection} data
   * @param {Object} [options={}]
   * @returns {Promise<RollTable[]>}
   */
  static async addRollTablesToActorList(actor, data, options2 = {}) {
    let dataTmp2 = null;
    if (!dataTmp2) {
      dataTmp2 = await RetrieveHelpers.getRollTableAsync(data, true);
    }
    if (!dataTmp2) {
      dataTmp2 = await RetrieveHelpers.getFolderAsync(data, true);
    }
    if (!dataTmp2) {
      dataTmp2 = await RetrieveHelpers.getCompendiumCollectionAsync(data, true);
    }
    const isFolder = dataTmp2 instanceof Folder;
    const isTable = dataTmp2 instanceof RollTable;
    const isPack = dataTmp2 instanceof CompendiumCollection;
    let rollTables = null;
    if (!isFolder && !isTable && !isPack) {
      Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningInvalidDocument`, {}), true);
      return false;
    }
    if (isFolder) {
      const folder = await RetrieveHelpers.getFolderAsync(dataTmp2);
      if (folder.type !== "RollTable") {
        Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningInvalidDocument`, {}), true);
        return false;
      }
      rollTables = folder.contents;
    }
    if (isTable) {
      const rollTable = await RetrieveHelpers.getRollTableAsync(dataTmp2);
      rollTables = [rollTable];
    }
    if (isPack) {
      const pack2 = await RetrieveHelpers.getCompendiumCollectionAsync(dataTmp2);
      if (pack2.metadata.type !== "RollTable") {
        Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningInvalidDocument`, {}), true);
        return false;
      }
      const index = await pack2.getIndex();
      rollTables = index.reduce((acc, rollTable) => {
        return acc.concat([
          {
            ...rollTable,
            quantity: BRTUtils.retrieveBRTRollAmount(rollTable) || "1",
            brtType: BRTUtils.retrieveBRTType(rollTable)
          }
        ]);
      }, []);
    }
    if (!rollTables?.length) {
      Logger.warn(Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningEmptyDocument`, {}), true);
      return false;
    }
    for (const rollTable of rollTables) {
      const uuid = rollTable.uuid;
      rollTable.name;
      const quantity = BRTUtils.retrieveBRTRollAmount(rollTable) || "1";
      const brtType = BRTUtils.retrieveBRTType(rollTable);
      const list = foundry.utils.getProperty(
        actor,
        `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.ROLL_TABLES_LIST}`
      ) ?? [];
      const existing = list.find((e) => e.uuid === uuid);
      if (existing) {
        existing.quantity = quantity ? quantity : existing.quantity;
        existing.brtType = brtType ? brtType : existing.brtType;
      } else {
        list.push({
          quantity: quantity ? quantity : "1",
          brtType: brtType ? brtType : "none",
          uuid
        });
      }
      await actor.update({
        [`flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.ROLL_TABLES_LIST}`]: list
      });
    }
    Logger.info(
      Logger.i18nFormat(`${CONSTANTS.MODULE_ID}.label.WarningAddedRollTables`, {
        amount: rollTables.length,
        name: actor.name
      }),
      true
    );
    return rollTables;
  }
  /**
   * Method to add some rolltables to the actor list
   * @param {Actor|UUID|string} actor
   * @param {('none'|'better'|'loot'|'harvest'|'story')[]} brtTypes
   * @returns {Promise<{rollTableList:{rollTable:RollTable;options:{rollsAmount:string;rollAsTableType:string;}}[];currencies:string}>}
   */
  static async retrieveActorList(actor, brtTypes) {
    const list = foundry.utils.getProperty(
      actor,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.ROLL_TABLES_LIST}`
    ) ?? [];
    const curr = foundry.utils.getProperty(actor, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.ACTOR_LIST.CURRENCIES}`) ?? "";
    let listTmp = [];
    if (brtTypes?.length > 0) {
      listTmp = list.filter((rl) => {
        const brtType = rl.brtType;
        return brtType && brtTypes.includes(brtType);
      });
    } else {
      listTmp = list;
    }
    const rollTableArray = await Promise.all(
      listTmp.map(async ({ quantity, brtType, uuid }) => {
        const rollTable = await RetrieveHelpers.getRollTableAsync(uuid);
        return {
          rollTable,
          options: {
            rollsAmount: quantity,
            rollAsTableType: brtType
          }
        };
      })
    );
    return {
      rollTableList: rollTableArray,
      currencies: curr
    };
  }
};
__name(_BRTActorList, "BRTActorList");
let BRTActorList = _BRTActorList;
const API = {
  /**
   *  Support object for retrocompatbility
   */
  betterTables: new BetterTables(),
  /**
   * Get better rolltable tags from settings
   *
   */
  getTags() {
    return game.settings.get(CONSTANTS.MODULE_ID, CONSTANTS.TAGS.USE);
  },
  /**
   * @deprecated remains for retro compatibility for anyone used this ?
   * @param {RollTable} tableEntity rolltable to generate content from
   * @returns {Promise<{flavor: *, sound: string, user: *, content: *}>}
   */
  async rollOld(tableEntity, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`roll | No reference to a rollTable is been passed`, true);
      return;
    }
    return await this.betterTables.roll(tableEntity, options2);
  },
  /**
   * @deprecated remains for retro compatibility with Item Piles
   * @param {RollTable|string|UUID} tableEntity rolltable to generate content from
   * @returns {Promise<{flavor: *, sound: string, user: *, content: *}>}
   */
  async roll(tableEntity, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`roll | No reference to a rollTable is been passed`, true);
      return;
    }
    const table = await RetrieveHelpers.getRollTableAsync(tableEntity);
    const brtTable2 = new BetterRollTable(table, options2);
    await brtTable2.initialize();
    const resultBrt = await brtTable2.betterRoll();
    const results2 = resultBrt?.results;
    options2?.rollMode || brtTable2.rollMode || null;
    options2?.roll || brtTable2.mainRoll || null;
    const br2 = new BetterResults(table, results2, options2?.stackResultsWithBRTLogic);
    const betterResults = await br2.buildResults();
    const data = {};
    setProperty(data, `itemsData`, betterResults);
    return data;
  },
  /**
   *
   * @param {RollTable|string|UUID} tableEntity
   * @param {Object} options
   * @param {Roll|string} [options.roll] An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true] Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true] Whether to automatically display the results in chat
   * @param {('blindroll'|'gmroll'|'selfroll')} [options.rollMode=null] The chat roll mode to use when displaying the result
   * @param {string|number} [options.rollsAmount=1]  The rolls amount value
   * @param {string|number} [options.dc=null]  The dc value
   * @param {string} [options.skill=null]  The skill denomination. If there is a "," in the skill string. , it will be treated as an array of skills for example "nat,arc" implies that the roll result will be compared as both a nat (nat) and arcane (arc) roll
   * @param {boolean} [options.distinct=false] if checked the same result is not selected more than once indifferently from the number of 'Amount Roll'
   * @param {boolean} [options.distinctKeepRolling=false] if 'Distinct result' is checked and 'Amount Rolls' > of the numbers of the result, keep rolling as a normal 'Roll +' behavior
   * @param {boolean} [options.usePercentage=false] Use the % mechanism instead of the default formula+range behavior
   * @param {boolean} [options.stackResultsWithBRTLogic=false] if enabled the table results are stacked with the BRT logic like the module item-piles a new 'quantity' property is been added to the table result data to check how much the single result is been stacked
   * @param {('none'|'better'|'loot'|'harvest'|'story')} [options.rollAsTableType=null] Roll the rolltable as a specific BRT Roll Table type. Very useful for not duplicate the same rolltable for different usage. If not set the current BRT Roll Table types is used as usual.
   * @param {boolean} [options.rollAsTableTypeAllTheTables] This setting make sense only when you use the parameter 'rollAsTableType'. If true it will treat all the inner tables (or child tables if you prefer) with the same type used on 'rollAsTableType'. Bu default is false.
   * @returns {Promise<TableResult[]>}
   */
  async betterTableRoll(tableEntity, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`betterTableRoll | No reference to a rollTable is been passed`, true);
      return;
    }
    const table = await RetrieveHelpers.getRollTableAsync(tableEntity);
    return await this.betterTables.betterTableRoll(table, options2);
  },
  /**
   *
   * @param {RollTable|string|UUID} tableEntity
   * @param {Object} options
   * @param {Roll|string} [options.roll] An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true] Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true] Whether to automatically display the results in chat
   * @param {('blindroll'|'gmroll'|'selfroll')} [options.rollMode=null] The chat roll mode to use when displaying the result
   * @param {string|number} [options.rollsAmount=1]  The rolls amount value
   * @param {string|number} [options.dc=null]  The dc value
   * @param {string} [options.skill=null]  The skill denomination. If there is a "," in the skill string. , it will be treated as an array of skills for example "nat,arc" implies that the roll result will be compared as both a nat (nat) and arcane (arc) roll
   * @param {boolean} [options.distinct=false] if checked the same result is not selected more than once indifferently from the number of 'Amount Roll'
   * @param {boolean} [options.distinctKeepRolling=false] if 'Distinct result' is checked and 'Amount Rolls' > of the numbers of the result, keep rolling as a normal 'Roll +' behavior
   * @param {boolean} [options.usePercentage=false] Use the % mechanism instead of the default formula+range behavior
   * @param {boolean} [options.stackResultsWithBRTLogic=false] if enabled the table results are stacked with the BRT logic like the module item-piles a new 'quantity' property is been added to the table result data to check how much the single result is been stacked
   * @param {('none'|'better'|'loot'|'harvest'|'story')} [options.rollAsTableType=null] Roll the rolltable as a specific BRT Roll Table type. Very useful for not duplicate the same rolltable for different usage. If not set the current BRT Roll Table types is used as usual.
   * @param {boolean} [options.rollAsTableTypeAllTheTables] This setting make sense only when you use the parameter 'rollAsTableType'. If true it will treat all the inner tables (or child tables if you prefer) with the same type used on 'rollAsTableType'. Bu default is false.
   * @returns {Promise<{results:TableResult[],currenciesData:Record<string,number>}>}
   */
  async betterTableRollV2(tableEntity, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`betterTableRollV2 | No reference to a rollTable is been passed`, true);
      return;
    }
    const table = await RetrieveHelpers.getRollTableAsync(tableEntity);
    return await this.betterTables.betterTableRollV2(table, options2);
  },
  // async updateSpellCache(pack = null) {
  //   return await this.betterTables.updateSpellCache(pack);
  // },
  /**
   *
   * @param {String} compendium ID of the compendium to roll
   * @returns {Promise<{flavor: string; sound: string; user: object; content: object;} | undefined}
   */
  async rollCompendiumAsRolltable(compendium = null, hideChatMessage) {
    if (!compendium) {
      Logger.warn(`rollCompendiumAsRolltable | No reference to a compendium is been passed`, true);
      return;
    }
    return await RollFromCompendiumAsRollTableHelpers.rollCompendiumAsRollTable(compendium, hideChatMessage);
  },
  /**
   * @module BetterRolltables.API.createRolltableFromCompendium
   *
   * @description Create a new RollTable by extracting entries from a compendium.
   *
   * @version 1.0.1
   * @since 1.8.7
   *
   * @param {string} compendiumName the name of the compendium to use for the table generation
   * @param {string} tableName the name of the table entity that will be created
   * @param {function(Document)} weightPredicate a function that returns a weight (number) that will be used
   * for the tableResult weight for that given entity. returning 0 will exclude the entity from appearing in the table
   *
   * @returns {Promise<Document>} the table entity that was created
   */
  async createRolltableFromCompendium(compendiumName, tableName = compendiumName + " RollTable", { weightPredicate = null } = {}) {
    if (!compendiumName) {
      Logger.warn(`createRolltableFromCompendium | No reference to a compendiumName is been passed`, true);
      return;
    }
    return await CompendiumToRollTableHelpers.compendiumToRollTable(
      compendiumName,
      tableName ?? compendiumName + " RollTable",
      { weightPredicate }
    );
  },
  /**
   * @description Create a new RollTable by extracting entries from a compendium.
   * @param {string} compendiumName the name of the compendium to use for the table generation
   * @param {string} tableName the name of the table entity that will be created
   * @param {function(Document)} weightPredicate a function that returns a weight (number) that will be used
   * for the tableResult weight for that given entity. returning 0 will exclude the entity from appearing in the table
   *
   * @returns {Promise<Document>} the table entity that was created
   */
  async createTableFromCompendium(compendiumName, tableName = compendiumName + " RollTable", { weightPredicate = null } = {}) {
    if (!compendiumName) {
      Logger.warn(`createTableFromCompendium | No reference to a compendiumName is been passed`, true);
      return;
    }
    return await CompendiumToRollTableHelpers.compendiumToRollTable(
      compendiumName,
      tableName ?? compendiumName + " RollTable",
      { weightPredicate }
    );
  },
  /* ================================================ */
  /* LOOT */
  /* ================================================ */
  /**
   * Roll a table an add the resulting loot to a given token.
   *
   * @param {RollTable} tableEntity
   * @param {TokenDocument} token
   * @param {Object} options
   * @param {Roll|string} [options.roll] An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true] Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true] Whether to automatically display the results in chat
   * @param {('blindroll'|'gmroll'|'selfroll')} [options.rollMode=null] The chat roll mode to use when displaying the result
   * @param {string|number} [options.rollsAmount=1]  The rolls amount value
   * @param {string|number} [options.dc=null]  The dc value
   * @param {string} [options.skill=null]  The skill denomination. If there is a "," in the skill string. , it will be treated as an array of skills for example "nat,arc" implies that the roll result will be compared as both a nat (nat) and arcane (arc) roll
   * @param {boolean} [options.distinct=false] if checked the same result is not selected more than once indifferently from the number of 'Amount Roll'
   * @param {boolean} [options.distinctKeepRolling=false] if 'Distinct result' is checked and 'Amount Rolls' > of the numbers of the result, keep rolling as a normal 'Roll +' behavior
   * @param {boolean} [options.usePercentage=false] Use the % mechanism instead of the default formula+range behavior
   * @param {boolean} [options.stackResultsWithBRTLogic=false] if enabled the table results are stacked with the BRT logic like the module item-piles a new 'quantity' property is been added to the table result data to check how much the single result is been stacked
   * @param {('none'|'better'|'loot'|'harvest'|'story')} [options.rollAsTableType=null] Roll the rolltable as a specific BRT Roll Table type. Very useful for not duplicate the same rolltable for different usage. If not set the current BRT Roll Table types is used as usual.
   * @param {boolean} [options.rollAsTableTypeAllTheTables] This setting make sense only when you use the parameter 'rollAsTableType'. If true it will treat all the inner tables (or child tables if you prefer) with the same type used on 'rollAsTableType'. Bu default is false.
   * @returns {Promise<void>}
   */
  async addLootToSelectedToken(tableEntity, token = null, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`addLootToSelectedToken | No reference to a RollTable is been passed`, true);
      return;
    }
    return await BRTLootHelpers.addLootToSelectedToken(tableEntity, token, options2);
  },
  /**
   *
   * @param {RollTable} tableEntity
   * @param {Object} options
   * @param {Roll|string} [options.roll] An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true] Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true] Whether to automatically display the results in chat
   * @param {('blindroll'|'gmroll'|'selfroll')} [options.rollMode=null] The chat roll mode to use when displaying the result
   * @param {string|number} [options.rollsAmount=1]  The rolls amount value
   * @param {string|number} [options.dc=null]  The dc value
   * @param {string} [options.skill=null]  The skill denomination. If there is a "," in the skill string. , it will be treated as an array of skills for example "nat,arc" implies that the roll result will be compared as both a nat (nat) and arcane (arc) roll
   * @param {boolean} [options.distinct=false] if checked the same result is not selected more than once indifferently from the number of 'Amount Roll'
   * @param {boolean} [options.distinctKeepRolling=false] if 'Distinct result' is checked and 'Amount Rolls' > of the numbers of the result, keep rolling as a normal 'Roll +' behavior
   * @param {boolean} [options.usePercentage=false] Use the % mechanism instead of the default formula+range behavior
   * @param {boolean} [options.stackResultsWithBRTLogic=false] if enabled the table results are stacked with the BRT logic like the module item-piles a new 'quantity' property is been added to the table result data to check how much the single result is been stacked
   * @param {('none'|'better'|'loot'|'harvest'|'story')} [options.rollAsTableType=null] Roll the rolltable as a specific BRT Roll Table type. Very useful for not duplicate the same rolltable for different usage. If not set the current BRT Roll Table types is used as usual.
   * @param {boolean} [options.rollAsTableTypeAllTheTables] This setting make sense only when you use the parameter 'rollAsTableType'. If true it will treat all the inner tables (or child tables if you prefer) with the same type used on 'rollAsTableType'. Bu default is false.
   * @returns {Promise<void>}
   */
  async generateLoot(tableEntity, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`generateLoot | No reference to a RollTable is been passed`, true);
      return;
    }
    return await BRTLootHelpers.generateLoot(tableEntity, options2);
  },
  /**
   *
   * @param {RollTable} tableEntity
   * @param {Object} options
   * @param {Roll|string} [options.roll] An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true] Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true] Whether to automatically display the results in chat
   * @param {('blindroll'|'gmroll'|'selfroll')} [options.rollMode=null] The chat roll mode to use when displaying the result
   * @param {string|number} [options.rollsAmount=1]  The rolls amount value
   * @param {string|number} [options.dc=null]  The dc value
   * @param {string} [options.skill=null]  The skill denomination. If there is a "," in the skill string. , it will be treated as an array of skills for example "nat,arc" implies that the roll result will be compared as both a nat (nat) and arcane (arc) roll
   * @param {boolean} [options.distinct=false] if checked the same result is not selected more than once indifferently from the number of 'Amount Roll'
   * @param {boolean} [options.distinctKeepRolling=false] if 'Distinct result' is checked and 'Amount Rolls' > of the numbers of the result, keep rolling as a normal 'Roll +' behavior
   * @param {boolean} [options.usePercentage=false] Use the % mechanism instead of the default formula+range behavior
   * @param {boolean} [options.stackResultsWithBRTLogic=false] if enabled the table results are stacked with the BRT logic like the module item-piles a new 'quantity' property is been added to the table result data to check how much the single result is been stacked
   * @param {('none'|'better'|'loot'|'harvest'|'story')} [options.rollAsTableType=null] Roll the rolltable as a specific BRT Roll Table type. Very useful for not duplicate the same rolltable for different usage. If not set the current BRT Roll Table types is used as usual.
   * @param {boolean} [options.rollAsTableTypeAllTheTables] This setting make sense only when you use the parameter 'rollAsTableType'. If true it will treat all the inner tables (or child tables if you prefer) with the same type used on 'rollAsTableType'. Bu default is false.
   * @returns {Promise<void>}
   */
  async generateLootOnSelectedToken(tableEntity, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`generateLootOnSelectedToken | No reference to a RollTable is been passed`, true);
      return;
    }
    return await BRTLootHelpers.addLootToSelectedToken(tableEntity, null, options2);
  },
  /**
   *
   * @param {RollTable} tableEntity
   * @param {Object} options
   * @param {Roll|string} [options.roll] An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true] Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true] Whether to automatically display the results in chat
   * @param {('blindroll'|'gmroll'|'selfroll')} [options.rollMode=null] The chat roll mode to use when displaying the result
   * @param {string|number} [options.rollsAmount=1]  The rolls amount value
   * @param {string|number} [options.dc=null]  The dc value
   * @param {string} [options.skill=null]  The skill denomination. If there is a "," in the skill string. , it will be treated as an array of skills for example "nat,arc" implies that the roll result will be compared as both a nat (nat) and arcane (arc) roll
   * @param {boolean} [options.distinct=false] if checked the same result is not selected more than once indifferently from the number of 'Amount Roll'
   * @param {boolean} [options.distinctKeepRolling=false] if 'Distinct result' is checked and 'Amount Rolls' > of the numbers of the result, keep rolling as a normal 'Roll +' behavior
   * @param {boolean} [options.usePercentage=false] Use the % mechanism instead of the default formula+range behavior
   * @param {boolean} [options.stackResultsWithBRTLogic=false] if enabled the table results are stacked with the BRT logic like the module item-piles a new 'quantity' property is been added to the table result data to check how much the single result is been stacked
   * @param {('none'|'better'|'loot'|'harvest'|'story')} [options.rollAsTableType=null] Roll the rolltable as a specific BRT Roll Table type. Very useful for not duplicate the same rolltable for different usage. If not set the current BRT Roll Table types is used as usual.
   * @param {boolean} [options.rollAsTableTypeAllTheTables] This setting make sense only when you use the parameter 'rollAsTableType'. If true it will treat all the inner tables (or child tables if you prefer) with the same type used on 'rollAsTableType'. Bu default is false.
   * @returns {Promise<void>}
   */
  async generateChatLoot(tableEntity, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`generateChatLoot | No reference to a RollTable is been passed`, true);
      return;
    }
    return await BRTLootHelpers.generateChatLoot(tableEntity, options2);
  },
  /* ================================================ */
  /* HARVEST */
  /* ================================================ */
  /**
   *
   * @param {RollTable} tableEntity
   * @param {Object} options
   * @param {Roll|string} [options.roll] An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true] Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true] Whether to automatically display the results in chat
   * @param {('blindroll'|'gmroll'|'selfroll')} [options.rollMode=null] The chat roll mode to use when displaying the result
   * @param {string|number} [options.rollsAmount=1]  The rolls amount value
   * @param {string|number} [options.dc=null]  The dc value
   * @param {string} [options.skill=null]  The skill denomination. If there is a "," in the skill string. , it will be treated as an array of skills for example "nat,arc" implies that the roll result will be compared as both a nat (nat) and arcane (arc) roll
   * @param {boolean} [options.distinct=false] if checked the same result is not selected more than once indifferently from the number of 'Amount Roll'
   * @param {boolean} [options.distinctKeepRolling=false] if 'Distinct result' is checked and 'Amount Rolls' > of the numbers of the result, keep rolling as a normal 'Roll +' behavior
   * @param {boolean} [options.usePercentage=false] Use the % mechanism instead of the default formula+range behavior
   * @param {boolean} [options.stackResultsWithBRTLogic=false] if enabled the table results are stacked with the BRT logic like the module item-piles a new 'quantity' property is been added to the table result data to check how much the single result is been stacked
   * @param {('none'|'better'|'loot'|'harvest'|'story')} [options.rollAsTableType=null] Roll the rolltable as a specific BRT Roll Table type. Very useful for not duplicate the same rolltable for different usage. If not set the current BRT Roll Table types is used as usual.
   * @param {boolean} [options.rollAsTableTypeAllTheTables] This setting make sense only when you use the parameter 'rollAsTableType'. If true it will treat all the inner tables (or child tables if you prefer) with the same type used on 'rollAsTableType'. Bu default is false.
   * @returns {Promise<void>}
   */
  async generateHarvest(tableEntity, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`generateHarvest | No reference to a RollTable is been passed`, true);
      return;
    }
    return await BRTHarvestHelpers$1.generateHarvest(tableEntity, options2);
  },
  /**
   *
   * @param {RollTable} tableEntity
   * @param {Object} options
   * @param {Roll|string} [options.roll] An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true] Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true] Whether to automatically display the results in chat
   * @param {('blindroll'|'gmroll'|'selfroll')} [options.rollMode=null] The chat roll mode to use when displaying the result
   * @param {string|number} [options.rollsAmount=1]  The rolls amount value
   * @param {string|number} [options.dc=null]  The dc value
   * @param {string} [options.skill=null]  The skill denomination. If there is a "," in the skill string. , it will be treated as an array of skills for example "nat,arc" implies that the roll result will be compared as both a nat (nat) and arcane (arc) roll
   * @param {boolean} [options.distinct=false] if checked the same result is not selected more than once indifferently from the number of 'Amount Roll'
   * @param {boolean} [options.distinctKeepRolling=false] if 'Distinct result' is checked and 'Amount Rolls' > of the numbers of the result, keep rolling as a normal 'Roll +' behavior
   * @param {boolean} [options.usePercentage=false] Use the % mechanism instead of the default formula+range behavior
   * @param {boolean} [options.stackResultsWithBRTLogic=false] if enabled the table results are stacked with the BRT logic like the module item-piles a new 'quantity' property is been added to the table result data to check how much the single result is been stacked
   * @param {('none'|'better'|'loot'|'harvest'|'story')} [options.rollAsTableType=null] Roll the rolltable as a specific BRT Roll Table type. Very useful for not duplicate the same rolltable for different usage. If not set the current BRT Roll Table types is used as usual.
   * @param {boolean} [options.rollAsTableTypeAllTheTables] This setting make sense only when you use the parameter 'rollAsTableType'. If true it will treat all the inner tables (or child tables if you prefer) with the same type used on 'rollAsTableType'. Bu default is false.
   * @returns {Promise<void>}
   */
  async generateHarvestOnSelectedToken(tableEntity, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`generateHarvestOnSelectedToken | No reference to a RollTable is been passed`, true);
      return;
    }
    return await BRTHarvestHelpers$1.addHarvestToSelectedToken(tableEntity, null, options2);
  },
  /**
   *
   * @param {RollTable} tableEntity
   * @param {Object} options
   * @param {Roll|string} [options.roll] An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true] Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true] Whether to automatically display the results in chat
   * @param {('blindroll'|'gmroll'|'selfroll')} [options.rollMode=null] The chat roll mode to use when displaying the result
   * @param {string|number} [options.rollsAmount=1]  The rolls amount value
   * @param {string|number} [options.dc=null]  The dc value
   * @param {string} [options.skill=null]  The skill denomination. If there is a "," in the skill string. , it will be treated as an array of skills for example "nat,arc" implies that the roll result will be compared as both a nat (nat) and arcane (arc) roll
   * @param {boolean} [options.distinct=false] if checked the same result is not selected more than once indifferently from the number of 'Amount Roll'
   * @param {boolean} [options.distinctKeepRolling=false] if 'Distinct result' is checked and 'Amount Rolls' > of the numbers of the result, keep rolling as a normal 'Roll +' behavior
   * @param {boolean} [options.usePercentage=false] Use the % mechanism instead of the default formula+range behavior
   * @param {boolean} [options.stackResultsWithBRTLogic=false] if enabled the table results are stacked with the BRT logic like the module item-piles a new 'quantity' property is been added to the table result data to check how much the single result is been stacked
   * @param {('none'|'better'|'loot'|'harvest'|'story')} [options.rollAsTableType=null] Roll the rolltable as a specific BRT Roll Table type. Very useful for not duplicate the same rolltable for different usage. If not set the current BRT Roll Table types is used as usual.
   * @param {boolean} [options.rollAsTableTypeAllTheTables] This setting make sense only when you use the parameter 'rollAsTableType'. If true it will treat all the inner tables (or child tables if you prefer) with the same type used on 'rollAsTableType'. Bu default is false.
   * @returns {Promise<void>}
   */
  async generateChatHarvest(tableEntity, options2 = {}) {
    if (!tableEntity) {
      Logger.warn(`generateChatHarvest | No reference to a RollTable is been passed`, true);
      return;
    }
    return await BRTHarvestHelpers$1.generateChatHarvest(tableEntity, options2);
  },
  /**
   * Utility method to retrieve the minimal dc value present on the table
   * @module game.modules.get('better-rolltables').api.retrieveMinDCOnTable(table);
   * @param {RollTable|string|UUID} tableEntity
   * @returns {Promise<number>} The minimal dc founded or 0 otherwise
   */
  async retrieveMinDCOnTable(tableEntity) {
    if (!tableEntity) {
      Logger.warn(`retrieveMinDCOnTable | No reference to a RollTable is been passed`, true);
      return;
    }
    const minDC = await BRTHarvestHelpers$1.retrieveMinDCOnTable(tableEntity);
    return minDC;
  },
  /* ================================================ */
  /* STORY */
  /* ================================================ */
  /**
   * Get story results
   * @param {RollTable} tableEntity
   * @returns {Promise<{ string, string }>}
   */
  async getStoryResults(tableEntity) {
    if (!tableEntity) {
      Logger.warn(`getStoryResults | No reference to a RollTable is been passed`, true);
      return;
    }
    return await BRTStoryHelpers.getStoryResults(tableEntity);
  },
  /**
   * Get story results
   * @param {RollTable} tableEntity
   * @returns {Promise<void>}
   */
  async generateChatStory(tableEntity) {
    if (!tableEntity) {
      Logger.warn(`generateChatStory | No reference to a RollTable is been passed`, true);
      return;
    }
    return await BRTStoryHelpers.generateChatStory(tableEntity);
  },
  /* ======================================================== */
  /* NEW API INTEGRATION */
  /* ======================================================== */
  async compendiumToRollTableWithDialog(compendiumName = null, { weightPredicate = null } = {}) {
    if (!compendiumName) {
      Logger.warn(`compendiumToRollTableWithDialog | No reference to a compendiumName is been passed`, true);
      return;
    }
    return await CompendiumToRollTableHelpers.compendiumToRollTableWithDialog(compendiumName, { weightPredicate });
  },
  async compendiumToRollTableWithDialogSpecialCaseHarvester() {
    return await CompendiumToRollTableHelpers.compendiumToRollTableWithDialogSpecialCaseHarvester();
  },
  /**
   * @module game.modules.get('better-rolltables').api.createRollTableFromCompendium
   * @description Create a new RollTable by extracting entries from a compendium.
   * @param {string} compendiumName the name of the compendium to use for the table generation
   * @param {string} tableName the name of the table entity that will be created
   * @param {function(Document)} weightPredicate a function that returns a weight (number) that will be used
   * for the tableResult weight for that given entity. returning 0 will exclude the entity from appearing in the table
   *
   * @returns {Promise<Document>} the table entity that was created
   */
  async createRollTableFromCompendium(inAttributes) {
    if (typeof inAttributes !== "object") {
      throw Logger.error("createRollTableFromCompendium | inAttributes must be of type object");
    }
    const compendiumName = inAttributes.compendiumName;
    const tableName = inAttributes.tableName ?? compendiumName + " RollTable";
    const weightPredicate = inAttributes.weightPredicate;
    if (!compendiumName) {
      Logger.warn(`createRollTableFromCompendium | No reference to a compendiumName is been passed`, true);
      return;
    }
    return await CompendiumToRollTableHelpers.compendiumToRollTable(compendiumName, tableName, { weightPredicate });
  },
  /**
   *
   * @param {String} compendium ID of the compendium to roll
   * @returns {Promise<{flavor: string; sound: string; user: object; content: object;} | undefined}
   */
  async rollCompendiumAsRollTable(inAttributes) {
    if (typeof inAttributes !== "object") {
      throw Logger.error("rollCompendiumAsRollTable | inAttributes must be of type object");
    }
    const compendium = inAttributes.compendium;
    const hideChatMessage = inAttributes.hideChatMessage;
    if (!compendium) {
      Logger.warn(`rollCompendiumAsRollTable | No reference to a compendium is been passed`, true);
      return;
    }
    const obj = await RollFromCompendiumAsRollTableHelpers.rollCompendiumAsRollTable(compendium, hideChatMessage);
    return obj;
  },
  async addRollTableItemsToActor(inAttributes) {
    if (typeof inAttributes !== "object") {
      throw Logger.error("rollCompendiumAsRollTable | inAttributes must be of type object");
    }
    const table = inAttributes.table;
    const actor = inAttributes.actor;
    const options2 = inAttributes.options;
    const actorWithItems = await RollTableToActorHelpers.addRollTableItemsToActor(table, actor, options2);
    return actorWithItems ?? [];
  },
  /**
   *
   * @param {Object} inAttributes
   * @returns {Promise<ItemData[]>} Item Data Array.  An array of objects, each containing the item that was added or updated, and the quantity that was added
   */
  async retrieveItemsDataFromRollTableResult(inAttributes) {
    if (typeof inAttributes !== "object") {
      throw Logger.error("rollCompendiumAsRollTable | inAttributes must be of type object");
    }
    const table = inAttributes.table;
    const options2 = inAttributes.options;
    const itemsDataToReturn = await RollTableToActorHelpers.retrieveItemsDataFromRollTableResult(table, options2);
    return itemsDataToReturn ?? [];
  },
  async retrieveItemsDataFromRollTableResultSpecialHarvester(inAttributes) {
    if (typeof inAttributes !== "object") {
      throw Logger.error("rollCompendiumAsRollTable | inAttributes must be of type object");
    }
    const table = inAttributes.table;
    const options2 = inAttributes.options;
    const itemsDataToReturn = await RollTableToActorHelpers.retrieveItemsDataFromRollTableResultSpecialHarvester(
      table,
      options2
    );
    return itemsDataToReturn ?? [];
  },
  /**
   * Converts the provided token to a item piles lootable sheet check out the documentation from the itempiles page
   * @href https://fantasycomputer.works/FoundryVTT-ItemPiles/#/api?id=turntokensintoitempiles
   * @href https://github.com/trioderegion/fvtt-macros/blob/master/honeybadger-macros/tokens/single-loot-pile.js#L77
   * @param {Array<Token|TokenDocument} actorOrTokenTarget
   * @param {object} options	object	Options to pass to the function
   * @param {boolean} options.applyDefaultImage little utility for lazy people apply a default image
   * @param {boolean} options.applyDefaultLight little utility for lazy people apply a default light
   * @param {boolean} options.isSinglePile little utility it need 'warpgate' module installed and active for merge all the token items in one big item piles
   * @param {boolean} options.deleteTokens only if singlePile is true it will delete all tokens
   * @param {object} tokenSettings Overriding settings that will update the tokens settings
   * @param {object} pileSettings Overriding settings to be put on the item piles’ settings - see pile flag defaults
   * @returns {Promise<Array>} The uuids of the targets after they were turned into item piles
   */
  async convertTokensToItemPiles(tokens, options2 = {
    applyDefaultLight: true,
    untouchedImage: "",
    isSinglePile: false,
    deleteTokens: false,
    addCurrency: false
  }, tokenSettings = { rotation: 0 }, pileSettings = {
    openedImage: "",
    emptyImage: "",
    type: game.itempiles.pile_types.CONTAINER,
    deleteWhenEmpty: false,
    activePlayers: true,
    closed: true
  }) {
    let tokensTmp = tokens || [];
    if (tokensTmp?.length <= 0) {
      tokensTmp = canvas.tokens.controlled;
    }
    if (tokensTmp?.length > 0) {
      return await ItemPilesHelpers.convertTokensToItemPiles(tokensTmp, options2, tokenSettings, pileSettings);
    } else {
      Logger.warn(`No tokens are selected`, true);
    }
  },
  /**
   * Converts the provided token to a item piles lootable sheet check out the documentation from the itempiles page
   * @href https://fantasycomputer.works/FoundryVTT-ItemPiles/#/api?id=turntokensintoitempiles
   * @href https://github.com/trioderegion/fvtt-macros/blob/master/honeybadger-macros/tokens/single-loot-pile.js#L77
   * @param {Array<Token|TokenDocument} actorOrTokenTarget
   * @param {boolean} deleteTokens only if singlePile is true it will delete all tokens
   * @returns {Promise<Array>} The uuids of the targets after they were turned into item piles
   */
  async convertTokensToSingleItemPile(tokens, deleteTokens = false) {
    let tokensTmp = tokens || [];
    if (tokensTmp?.length <= 0) {
      tokensTmp = canvas.tokens.controlled;
    }
    if (tokensTmp?.length > 0) {
      const options2 = {
        applyDefaultLight: true,
        untouchedImage: "",
        isSinglePile: true,
        deleteTokens,
        addCurrency: false
      };
      return await ItemPilesHelpers.convertTokensToItemPiles(tokensTmp, options2);
    } else {
      Logger.warn(`No tokens are selected`, true);
    }
  },
  /**
   * Rolls on a table of items and collates them to be able to be added to actors and such
   * @href https://fantasycomputer.works/FoundryVTT-ItemPiles/#/sample-macros?id=populate-loot-via-table
   * @param {string/Actor/Token}                                  The name, ID, UUID, or the actor itself, or an array of such
   * @param {string/RollTable} tableReference                     The name, ID, UUID, or the table itself, or an array of such
   * @param {object} options                                      Options to pass to the function
   * @param {string/number} [options.timesToRoll="1"]             The number of times to roll on the tables, which can be a roll formula
   * @param {boolean} [options.resetTable=true]                   Whether to reset the table before rolling it
   * @param {boolean} [options.normalizeTable=false]               Whether to normalize the table before rolling it
   * @param {boolean} [options.displayChat=false]                 Whether to display the rolls to the chat
   * @param {object} [options.rollData={}]                        Data to inject into the roll formula
   * @param {Actor/string/boolean} [options.targetActor=false]    The target actor to add the items to, or the UUID of an actor
   * @param {boolean} [options.removeExistingActorItems=false]    Whether to clear the target actor's items before adding the ones rolled
   * @param {boolean/string} [options.customCategory=false]       Whether to apply a custom category to the items rolled
   *
   * @returns {Promise<Array<Item>>}                              An array of object containing the item data and their quantity
   */
  async rollItemTable(targetActor, tableReference, options2 = {}) {
    return await ItemPilesHelpers.rollItemTable(targetActor, tableReference, options2);
  },
  /**
   * Covert a Table Result Data to Item Data
   * NOTE: text,actor and scene are treated in different ways...)
   * @param {TableResult} tableResult Table result data to convert
   * @return {Promise<{ItemData}>} item data retrieve fro the current Table result Data
   */
  async resultToItemData(tableResult) {
    return await RollTableToActorHelpers.resultToItemData(tableResult);
  },
  // ===============================
  // SOCKET UTILITY
  // ================================
  /**
   *
   * @param {RollTable} tableEntity
   * @param {Object} options
   * @param {Roll|string} [options.roll] An optional pre-configured Roll instance which defines the dice roll to use
   * @param {boolean} [options.recursive=true] Allow drawing recursively from inner RollTable results
   * @param {boolean} [options.displayChat=true] Whether to automatically display the results in chat
   * @param {('blindroll'|'gmroll'|'selfroll')} [options.rollMode=null] The chat roll mode to use when displaying the result
   * @param {string|number} [options.rollsAmount=1]  The rolls amount value
   * @param {string|number} [options.dc=null]  The dc value
   * @param {string} [options.skill=null]  The skill denomination. If there is a "," in the skill string. , it will be treated as an array of skills for example "nat,arc" implies that the roll result will be compared as both a nat (nat) and arcane (arc) roll
   * @param {boolean} [options.distinct=false] if checked the same result is not selected more than once indifferently from the number of 'Amount Roll'
   * @param {boolean} [options.distinctKeepRolling=false] if 'Distinct result' is checked and 'Amount Rolls' > of the numbers of the result, keep rolling as a normal 'Roll +' behavior
   * @param {boolean} [options.usePercentage=false] Use the % mechanism instead of the default formula+range behavior
   * @param {boolean} [options.stackResultsWithBRTLogic=false] if enabled the table results are stacked with the BRT logic like the module item-piles a new 'quantity' property is been added to the table result data to check how much the single result is been stacked
   * @param {('none'|'better'|'loot'|'harvest'|'story')} [options.rollAsTableType=null] Roll the rolltable as a specific BRT Roll Table type. Very useful for not duplicate the same rolltable for different usage. If not set the current BRT Roll Table types is used as usual.
   * @param {boolean} [options.rollAsTableTypeAllTheTables] This setting make sense only when you use the parameter 'rollAsTableType'. If true it will treat all the inner tables (or child tables if you prefer) with the same type used on 'rollAsTableType'. Bu default is false.
   * @returns {Promise<TableResult[]>}
   */
  async invokeBetterTableRollArr(...inAttributes) {
    if (!Array.isArray(inAttributes)) {
      throw Logger.error("invokeBetterTableRollArr | inAttributes must be of type array");
    }
    const [tableReferenceUuid, options2] = inAttributes;
    const tableEntity = await fromUuid(tableReferenceUuid);
    return await this.betterTables.betterTableRoll(tableEntity, options2);
  },
  async invokeGenericChatCardCreateArr(...inAttributes) {
    if (!Array.isArray(inAttributes)) {
      throw Logger.error("invokeGenericTableRollArr | inAttributes must be of type array");
    }
    const [tableReferenceUuid, results2, rollMode, roll2, stackResultsWithBRTLogic, rollAsTableType] = inAttributes;
    const tableEntity = await fromUuid(tableReferenceUuid);
    const br2 = new BetterResults(tableEntity, results2, stackResultsWithBRTLogic, rollAsTableType);
    const betterResults = await br2.buildResults();
    const brtTypeToCheck = BRTUtils.retrieveBRTType(tableEntity, options?.rollAsTableType);
    if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_BETTER) {
      const betterChatCard = new BetterChatCard(betterResults, rollMode, roll2);
      await betterChatCard.createChatCard(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_LOOT) {
      const currencyData = br2.getCurrencyData();
      const lootChatCard = new LootChatCard(betterResults, currencyData, rollMode, roll2);
      await lootChatCard.createChatCard(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_STORY) {
      const storyChatCard = new StoryChatCard(betterResults, rollMode, roll2);
      await storyChatCard.createChatCard(tableEntity);
    } else if (brtTypeToCheck === CONSTANTS.TABLE_TYPE_HARVEST) {
      const harvestChatCard = new HarvestChatCard(betterResults, rollMode, roll2);
      await harvestChatCard.createChatCard(tableEntity);
    } else {
      await brtTable.createChatCard(results2, rollMode, roll2);
    }
  },
  // ===================================================
  // ACTOR LIST API
  // =====================================================
  /**
   * Method to add some rolltables to the actor list
   * @param {Actor|UUID|string} actor
   * @param {UUID|string} data Can be a RollTable a Folder aCompendiumCollection reference
   * @param {Object} [options={}]
   * @returns {Promise<RollTable[]>}
   */
  async addRollTablesToActorList(actor, data, options2 = {}) {
    const actorTmp = await RetrieveHelpers.getActorAsync(actor);
    return await BRTActorList.addRollTablesToActorList(actorTmp, dataTmp, options2);
  },
  /**
   * Method to add some rolltables to the actor list
   * @param {Actor|UUID|string} actor
   * @param {Object} [options={}]
   * @param {('none'|'better'|'loot'|'harvest'|'story')[]} [options.brtTypes=null]
   * @returns {Promise<{rollTableList:{rollTable:RollTable;options:{rollsAmount:string;rollAsTableType:string;}}[];currencies:string}>}
   */
  async retrieveActorList(actor, options2) {
    const brtTypes = parseAsArray(options2.brtTypes);
    const actorTmp = await RetrieveHelpers.getActorAsync(actor);
    return await BRTActorList.retrieveActorList(actorTmp, brtTypes);
  },
  /**
   *
   * @param {Actor|UUID|string} actor
   * @param {Object} [options={}]
   * @param {('none'|'better'|'loot'|'harvest'|'story')[]} [options.brtTypes=null]
   * @returns {Promise<ItemData[]>} Item Data Array.  An array of objects, each containing the item that was added or updated, and the quantity that was added
   */
  async retrieveItemsDataFromRollTableResultActorList(actor, options2) {
    const brtTypes = parseAsArray(options2.brtTypes);
    const actorTmp = await RetrieveHelpers.getActorAsync(actor);
    const brtActorList = await this.retrieveActorList(actorTmp, {
      brtTypes
    });
    const rolltableList = brtActorList.rollTableList;
    const itemsDataToReturnTotal = [];
    for (const rollTableElement of rolltableList) {
      const table = rollTableElement.rollTable;
      const options3 = rollTableElement.options;
      const itemsDataToReturn = await this.retrieveItemsDataFromRollTableResult({
        table,
        options: options3
      });
      itemsDataToReturnTotal.push(itemsDataToReturn ?? []);
    }
    return itemsDataToReturnTotal;
  }
};
const API$1 = API;
const WORLD = "world";
const GROUP_UI = "UI";
const GROUP_TAGS = "Tags";
function registerSettings() {
  game.settings.register(CONSTANTS.MODULE_ID, CONSTANTS.ADD_ROLL_IN_COMPENDIUM_CONTEXTMENU, {
    name: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.AddRollInCompediumContextMenu.Title`),
    hint: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.AddRollInCompediumContextMenu.Description`),
    scope: WORLD,
    group: GROUP_UI,
    config: true,
    default: false,
    type: Boolean
  });
  game.settings.register(CONSTANTS.MODULE_ID, CONSTANTS.ADD_ROLL_IN_ROLLTABLE_CONTEXTMENU, {
    name: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.AddRollInRolltableContextMenu.Title`),
    hint: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.AddRollInRolltableContextMenu.Description`),
    scope: WORLD,
    group: GROUP_UI,
    config: true,
    default: false,
    type: Boolean
  });
  game.settings.register(CONSTANTS.MODULE_ID, CONSTANTS.SHOW_REROLL_BUTTONS, {
    name: Logger.i18n(`${CONSTANTS.MODULE_ID}.Buttons.Reroll.Title`),
    hint: Logger.i18n(`${CONSTANTS.MODULE_ID}.Buttons.Reroll.Description`),
    scope: WORLD,
    group: GROUP_UI,
    config: true,
    default: false,
    type: Boolean
  });
  game.settings.register(CONSTANTS.MODULE_ID, CONSTANTS.SHOW_WARNING_BEFORE_REROLL, {
    name: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.ShowWarningBeforeReroll.Title`),
    hint: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.ShowWarningBeforeReroll.Description`),
    scope: WORLD,
    group: GROUP_UI,
    config: true,
    default: false,
    type: Boolean
  });
  game.settings.register(CONSTANTS.MODULE_ID, CONSTANTS.SHOW_OPEN_BUTTONS, {
    name: Logger.i18n(`${CONSTANTS.MODULE_ID}.Buttons.Open.Title`),
    hint: Logger.i18n(`${CONSTANTS.MODULE_ID}.Buttons.Open.Description`),
    scope: WORLD,
    group: GROUP_UI,
    config: true,
    default: false,
    type: Boolean
  });
  game.settings.register(CONSTANTS.MODULE_ID, CONSTANTS.ROLL_TABLE_FROM_JOURNAL, {
    name: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.RollTableFromJournal.Title`),
    hint: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.RollTableFromJournal.Description`),
    scope: WORLD,
    group: GROUP_UI,
    config: false,
    default: false,
    type: Boolean
  });
  game.settings.register(CONSTANTS.MODULE_ID, CONSTANTS.TAGS.USE, {
    name: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.Tags.Use.Title`),
    hint: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.Tags.Use.Description`),
    scope: WORLD,
    group: GROUP_TAGS,
    config: false,
    default: true,
    type: Boolean
  });
  game.settings.register(CONSTANTS.MODULE_ID, CONSTANTS.TAGS.DEFAULTS, {
    name: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.Tags.Defaults.Title`),
    hint: Logger.i18n(`${CONSTANTS.MODULE_ID}.Settings.Tags.Defaults.Description`),
    scope: WORLD,
    group: GROUP_TAGS,
    config: false,
    default: {},
    type: Object
  });
  game.settings.register(CONSTANTS.MODULE_ID, "forceNormalizeIfNoResultAreDrawn", {
    name: `${CONSTANTS.MODULE_ID}.Settings.forceNormalizeIfNoResultAreDrawn.name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.forceNormalizeIfNoResultAreDrawn.hint`,
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });
  game.settings.register(CONSTANTS.MODULE_ID, "headerActorListLabel", {
    name: `${CONSTANTS.MODULE_ID}.Settings.headerActorListLabel.name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.headerActorListLabel.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  game.settings.register(CONSTANTS.MODULE_ID, "debug", {
    name: `${CONSTANTS.MODULE_ID}.Settings.debug.name`,
    hint: `${CONSTANTS.MODULE_ID}.Settings.debug.hint`,
    scope: "client",
    config: true,
    default: false,
    type: Boolean
  });
}
__name(registerSettings, "registerSettings");
const _RichResultEdit = class _RichResultEdit extends DocumentSheet {
  /**
   * @param {TableResult} result
   */
  constructor(result, options2) {
    super(result, options2);
    this.options.id = `richedit-${result.uuid}`;
    this.options.title = game.i18n.format(`${CONSTANTS.MODULE_ID}.label.RichEdit.Title`, {
      table: result.parent.name,
      result: result.id
    });
    this.resolve = options2.resolve;
    result.parent.apps[this.appId] = this;
  }
  get template() {
    return `modules/${CONSTANTS.MODULE_ID}/templates/sheet/brt-result-editor.hbs`;
  }
  static get defaultOptions() {
    const _default = super.defaultOptions;
    return {
      ..._default,
      classes: [..._default.classes, `${CONSTANTS.MODULE_ID}-rolltable-result-richedit`],
      width: 540,
      height: 360,
      resizable: true,
      submitOnChange: true,
      closeOnSubmit: true,
      submitOnClose: false
    };
  }
  async getData() {
    const context = super.getData();
    context.result = this.document;
    return context;
  }
  close(options2) {
    delete this.document.parent.apps[this.appId];
    super.close(options2);
    this.resolve(this.result);
  }
  _updateObject(event, formData) {
    this.object.update(formData);
    this.close();
  }
  static open(result) {
    return new Promise((resolve) => new _RichResultEdit(result, { resolve }).render(true, { focus: true }));
  }
};
__name(_RichResultEdit, "RichResultEdit");
let RichResultEdit = _RichResultEdit;
const _BetterRollTableBetterConfig = class _BetterRollTableBetterConfig extends RollTableConfig {
  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["sheet", "roll-table-config", `${CONSTANTS.MODULE_ID}-roll-table-config`],
      template: `modules/${CONSTANTS.MODULE_ID}/templates/sheet/brt-roll-table-config.hbs`,
      width: 1e3,
      height: "auto",
      closeOnSubmit: false,
      viewPermission: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER,
      // scrollY: ["table.table-results"],
      // dragDrop: [{ dragSelector: null, dropSelector: null }],
      dragDrop: [
        // { dragSelector: null, dropSelector: null },
        {
          dragSelector: "section.results .table-results .table-result",
          dropSelector: "section.results .table-results"
        }
      ],
      scrollY: [".table-results"],
      resizable: true
    });
  }
  /* -------------------------------------------- */
  //  /** @inheritdoc */
  //  get title() {
  //    return `${game.i18n.localize("TABLE.SheetTitle")}: ${this.document.name}`;
  //  }
  /* -------------------------------------------- */
  /**
   * @override
   */
  async getData(options2 = {}) {
    const context = await super.getData(options2);
    context.descriptionHTML = await TextEditor.enrichHTML(this.object.description, {
      async: true,
      secrets: this.object.isOwner
    });
    const results2 = await Promise.all(
      this.document.results.map(async (result) => {
        const obj = await BRTBetterHelpers.updateTableResult(result);
        if (obj?.result) {
          return obj.result;
        }
      })
    );
    results2.sort((a, b) => a.range[0] - b.range[0]);
    let brtData = foundry.utils.mergeObject(context, {
      results: results2,
      resultTypes: Object.entries(CONST.TABLE_RESULT_TYPES).reduce((obj, v) => {
        obj[v[1]] = v[0].titleCase();
        return obj;
      }, {}),
      documentTypes: CONST.COMPENDIUM_DOCUMENT_TYPES,
      compendiumPacks: Array.from(game.packs.keys())
    });
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_BETTER) {
      await this.document.setFlag(
        CONSTANTS.MODULE_ID,
        CONSTANTS.FLAGS.TABLE_TYPE_KEY,
        CONSTANTS.TABLE_TYPE_BETTER
      );
    }
    brtData.usePercentage = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.GENERIC_USE_PERCENTAGE);
    brtData.useDynamicDc = false;
    brtData.tableType = CONSTANTS.TABLE_TYPE_BETTER;
    brtData.textType = Logger.i18n(`${CONSTANTS.MODULE_ID}.${"TypePrefixLabel"}`) + " " + Logger.i18n(`${CONSTANTS.MODULE_ID}.${"TypeLabel"}`);
    brtData = foundry.utils.mergeObject(brtData, duplicate(this.document.flags));
    brtData.disabled = !this.isEditable;
    brtData.uuid = this.document.uuid;
    brtData.owner = this.document.isOwner;
    this.canRoll = this.document.ownership[game.user.id] ? this.document.ownership[game.user.id] === CONST.DOCUMENT_PERMISSION_LEVELS.OWNER || this.document.ownership[game.user.id] === CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER : this.isEditable;
    return brtData;
  }
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */
  /**
   * @param {JQuery} jq
   */
  activateListeners(jq) {
    super.activateListeners(jq);
    const html = jq[0];
    if (this.canRoll) {
      html.querySelectorAll(".better-rolltables-roll-better").forEach((el) => {
        el.disabled = false;
        el.addEventListener("click", this._onBetterRollTablesRoll.bind(this));
      });
    }
    if (!this.isEditable) {
      return;
    }
    html.querySelector(".normalize-weights").addEventListener("click", this._onNormalizeWeights.bind(this));
    html.querySelectorAll("a.edit-result").forEach(
      (el) => el.addEventListener("click", this._onEditResult.bind(this))
    );
    html.querySelectorAll("a.rich-edit-result").forEach(
      (el) => el.addEventListener("click", this._openRichEditor.bind(this))
    );
    let selectPages = html.querySelector(".result-details .result-details-journal-page-id");
    selectPages?.addEventListener("change", this._onChangeResultJournalPageId.bind(this));
  }
  /* -------------------------------------------- */
  //   /**
  //    * Handle creating a TableResult in the RollTable document
  //    * @param {MouseEvent} event        The originating mouse event
  //    * @param {object} [resultData]     An optional object of result data to use
  //    * @returns {Promise}
  //    * @private
  //    */
  //   async _onCreateResult(event, resultData={}) {
  //     event.preventDefault();
  //     // Save any pending changes
  //     await this._onSubmit(event);
  //     // Get existing results
  //     const results = Array.from(this.document.results.values());
  //     let last = results[results.length - 1];
  //     // Get weight and range data
  //     let weight = last ? (last.weight || 1) : 1;
  //     let totalWeight = results.reduce((t, r) => t + r.weight, 0) || 1;
  //     let minRoll = results.length ? Math.min(...results.map(r => r.range[0])) : 0;
  //     let maxRoll = results.length ? Math.max(...results.map(r => r.range[1])) : 0;
  //     // Determine new starting range
  //     const spread = maxRoll - minRoll + 1;
  //     const perW = Math.round(spread / totalWeight);
  //     const range = [maxRoll + 1, maxRoll + Math.max(1, weight * perW)];
  //     // Create the new Result
  //     resultData = foundry.utils.mergeObject({
  //       type: last ? last.type : CONST.TABLE_RESULT_TYPES.TEXT,
  //       documentCollection: last ? last.documentCollection : null,
  //       weight: weight,
  //       range: range,
  //       drawn: false
  //     }, resultData);
  //     return this.document.createEmbeddedDocuments("TableResult", [resultData]);
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Submit the entire form when a table result type is changed, in case there are other active changes
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onChangeResultType(event) {
  //     event.preventDefault();
  //     const rt = CONST.TABLE_RESULT_TYPES;
  //     const select = event.target;
  //     const value = parseInt(select.value);
  //     const resultKey = select.name.replace(".type", "");
  //     let documentCollection = "";
  //     if ( value === rt.DOCUMENT ) documentCollection = "Actor";
  //     else if ( value === rt.COMPENDIUM ) documentCollection = game.packs.keys().next().value;
  //     const updateData = {[resultKey]: {documentCollection, documentId: null}};
  //     return this._onSubmit(event, {updateData});
  //   }
  /* -------------------------------------------- */
  /**
   * Handle deleting a TableResult from the RollTable document
   * @param {MouseEvent} event        The originating click event
   * @returns {Promise<TableResult>}   The deleted TableResult document
   * @private
   */
  async _onDeleteResult(event) {
    event.preventDefault();
    await this._onSubmit(event);
    const li = event.currentTarget.closest(".table-result");
    const result = this.object.results.get(li.dataset.resultId);
    return result.delete();
  }
  /* -------------------------------------------- */
  /** @inheritdoc */
  async _onDrop(event) {
    const json = TextEditor.getDragEventData(event);
    if (json.event === "sort") {
      const eel = event.target;
      const el = eel.dataset.resultId ? eel : eel.closest(".table-result[data-result-id]");
      if (!el) {
        Logger.warn("Drop target not found.", true);
        return;
      }
      return this.reorderIndex(event, json.result, el.dataset.resultId);
    } else {
      if (json.type === "JournalEntryPage") {
        const journalPage = await fromUuid(json.uuid);
        const data = await fromUuid(journalPage.parent.uuid);
        data.type = data.documentName;
        const allowed = Hooks.call("dropRollTableSheetData", this.document, this, data);
        if (allowed === false)
          return;
        if (!CONST.DOCUMENT_TYPES.includes(data.type))
          return;
        const document2 = data;
        if (!document2 || document2.isEmbedded)
          return;
        const isCompendium = !!document2.compendium;
        return await this._onCreateResult(event, {
          type: isCompendium ? CONST.TABLE_RESULT_TYPES.COMPENDIUM : CONST.TABLE_RESULT_TYPES.DOCUMENT,
          documentCollection: isCompendium ? document2.pack : document2.documentName,
          text: document2.name,
          documentId: document2.id,
          img: document2.img || null,
          flags: {
            [`${CONSTANTS.MODULE_ID}`]: {
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`]: json.uuid
            }
          }
        });
      } else {
        return super._onDrop(event);
      }
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle changing the actor profile image by opening a FilePicker
   * @param {Event} event
   * @private
   */
  _onEditImage(event) {
    const img = event.currentTarget;
    const isHeader = img.dataset.edit === "img";
    let current = this.document.img;
    if (!isHeader) {
      const li = img.closest(".table-result");
      const result = this.document.results.get(li.dataset.resultId);
      current = result.img;
    }
    const fp = new FilePicker({
      type: "image",
      current,
      callback: async (path) => {
        img.src = path;
        const resultImage = img.closest(".result-image");
        let resultImageInputs = resultImage.querySelectorAll("input");
        let inputCustomIcon = resultImageInputs[0].value || "";
        if (inputCustomIcon !== path) {
          resultImageInputs[0].value = path;
        }
        return this._onSubmit(event);
      },
      top: this.position.top + 40,
      left: this.position.left + 10
    });
    return fp.browse();
  }
  /* -------------------------------------------- */
  //   /**
  //    * Handle a button click to re-normalize dice result ranges across all RollTable results
  //    * @param {Event} event
  //    * @private
  //    */
  //   async _onNormalizeResults(event) {
  //     event.preventDefault();
  //     if ( !this.rendered || this._submitting) return false;
  //     // Save any pending changes
  //     await this._onSubmit(event);
  //     // Normalize the RollTable
  //     return this.document.normalize();
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Handle toggling the drawn status of the result in the table
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onLockResult(event) {
  //     event.preventDefault();
  //     const tableResult = event.currentTarget.closest(".table-result");
  //     const result = this.document.results.get(tableResult.dataset.resultId);
  //     return result.update({drawn: !result.drawn});
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Reset the Table to it's original composition with all options unlocked
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onResetTable(event) {
  //     event.preventDefault();
  //     return this.document.resetResults();
  //   }
  /* -------------------------------------------- */
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onRollTable(event) {
    return await super._onRollTable(event);
  }
  /* -------------------------------------------- */
  //   /**
  //    * Configure the update object workflow for the Roll Table configuration sheet
  //    * Additional logic is needed here to reconstruct the results array from the editable fields on the sheet
  //    * @param {Event} event            The form submission event
  //    * @param {Object} formData        The validated FormData translated into an Object for submission
  //    * @returns {Promise}
  //    * @private
  //    */
  //   async _updateObject(event, formData) {
  //     // Expand the data to update the results array
  //     const expanded = foundry.utils.expandObject(formData);
  //     expanded.results = expanded.hasOwnProperty("results") ? Object.values(expanded.results) : [];
  //     for (let r of expanded.results) {
  //       r.range = [r.rangeL, r.rangeH];
  //       switch (r.type) {
  //         // Document results
  //         case CONST.TABLE_RESULT_TYPES.DOCUMENT:
  //           const collection = game.collections.get(r.documentCollection);
  //           if (!collection) continue;
  //           // Get the original document, if the name still matches - take no action
  //           const original = r.documentId ? collection.get(r.documentId) : null;
  //           if (original && (original.name === r.text)) continue;
  //           // Otherwise, find the document by ID or name (ID preferred)
  //           const doc = collection.find(e => (e.id === r.text) || (e.name === r.text)) || null;
  //           r.documentId = doc?.id ?? null;
  //           r.text = doc?.name ?? null;
  //           r.img = doc?.img ?? null;
  //           r.img = doc?.thumb || doc?.img || null;
  //           break;
  //         // Compendium results
  //         case CONST.TABLE_RESULT_TYPES.COMPENDIUM:
  //           const pack = await getCompendiumCollectionAsync(result.documentCollection, true, false);
  //           if (pack) {
  //             // Get the original entry, if the name still matches - take no action
  //             const original = pack.index.get(r.documentId) || null;
  //             if (original && (original.name === r.text)) continue;
  //             // Otherwise, find the document by ID or name (ID preferred)
  //             const doc = pack.index.find(i => (i._id === r.text) || (i.name === r.text)) || null;
  //             r.documentId = doc?._id || null;
  //             r.text = doc?.name || null;
  //             r.img = doc?.thumb || doc?.img || null;
  //           }
  //           break;
  //         // Plain text results
  //         default:
  //           r.type = 0;
  //           r.documentCollection = null;
  //           r.documentId = null;
  //       }
  //     }
  //     // Update the object
  //     return this.document.update(expanded, {diff: false, recursive: false});
  //   }
  /* -------------------------------------------- */
  /**
   * MOD Modified copy of core _animateRoll to ensure it does not constantly break with the changed layout.
   * Display a roulette style animation when a Roll Table result is drawn from the sheet
   * @param {TableResult[]} results     An Array of drawn table results to highlight
   * @returns {Promise}                  A Promise which resolves once the animation is complete
   * @protected
   */
  async _animateRoll(results2) {
    const tableResults = this.element[0].querySelector(".table-results > tbody");
    const drawnIds = new Set(results2.map((r) => r.id));
    const drawnItems = Array.from(tableResults.children).filter((item2) => drawnIds.has(item2.dataset.resultId));
    const nResults = this.object.results.size;
    const maxTime = 2e3;
    let animTime = 50;
    let animOffset = Math.round(tableResults.offsetHeight / (tableResults.children[1].offsetHeight * 2));
    const nLoops = Math.min(Math.ceil(maxTime / (animTime * nResults)), 4);
    if (nLoops === 1)
      animTime = maxTime / nResults;
    await this._animateRoulette(tableResults, drawnIds, nLoops, animTime, animOffset);
    const flashes = drawnItems.map((li) => this._flashResult(li));
    return Promise.all(flashes);
  }
  /* -------------------------------------------- */
  //   /**
  //    * Animate a "roulette" through the table until arriving at the final loop and a drawn result
  //    * @param {HTMLOListElement} ol     The list element being iterated
  //    * @param {Set<string>} drawnIds    The result IDs which have already been drawn
  //    * @param {number} nLoops           The number of times to loop through the animation
  //    * @param {number} animTime         The desired animation time in milliseconds
  //    * @param {number} animOffset       The desired pixel offset of the result within the list
  //    * @returns {Promise}               A Promise that resolves once the animation is complete
  //    * @protected
  //    */
  //   async _animateRoulette(ol, drawnIds, nLoops, animTime, animOffset) {
  //     let loop = 0;
  //     let idx = 0;
  //     let item = null;
  //     return new Promise(resolve => {
  //       let animId = setInterval(() => {
  //         if (idx === 0) loop++;
  //         if (item) item.classList.remove("roulette");
  //         // Scroll to the next item
  //         item = ol.children[idx];
  //         ol.scrollTop = (idx - animOffset) * item.offsetHeight;
  //         // If we are on the final loop
  //         if ( (loop === nLoops) && drawnIds.has(item.dataset.resultId) ) {
  //           clearInterval(animId);
  //           return resolve();
  //         }
  //         // Continue the roulette and cycle the index
  //         item.classList.add("roulette");
  //         idx = idx < ol.children.length - 1 ? idx + 1 : 0;
  //       }, animTime);
  //     });
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Display a flashing animation on the selected result to emphasize the draw
  //    * @param {HTMLElement} item      The HTML &lt;li> item of the winning result
  //    * @returns {Promise}              A Promise that resolves once the animation is complete
  //    * @protected
  //    */
  //   async _flashResult(item) {
  //     return new Promise(resolve => {
  //       let count = 0;
  //       let animId = setInterval(() => {
  //         if (count % 2) item.classList.remove("roulette");
  //         else item.classList.add("roulette");
  //         if (count === 7) {
  //           clearInterval(animId);
  //           resolve();
  //         }
  //         count++;
  //       }, 50);
  //     });
  //   }
  /* ============================================== */
  /**
   * @param {DragEvent} event
   */
  _onDragStart(event) {
    const eel = event.target;
    const el = eel.dataset.resultId ? eel : eel.closest(".table-result[data-result-id]");
    event.dataTransfer?.setData(
      "text/plain",
      JSON.stringify({ event: "sort", index: el.dataset.index, result: el.dataset.resultId })
    );
  }
  /**
   * @param {String} source Source ID
   * @param {String} target Target ID
   */
  async reorderIndex(event, source, target) {
    if (!this.rendered || this._submitting)
      return false;
    await this._onSubmit(event);
    const results2 = this.document.results.map((result) => result.toObject(false));
    results2.sort((a, b) => a.range[0] - b.range[0]);
    const sourceIx = results2.findIndex((r) => r._id === source), targetIx = results2.findIndex((r) => r._id === target);
    if (sourceIx == targetIx) {
      Logger.warn("Can't move result onto itself.", true);
      return;
    }
    const [moved] = results2.splice(sourceIx, 1);
    results2.splice(targetIx, 0, moved);
    results2.forEach((r) => r.weight = r.range[1] - (r.range[0] - 1));
    let totalWeight = 1;
    const updates = [];
    for (const result of results2) {
      const w = result.weight;
      updates.push({ _id: result._id, weight: w, range: [totalWeight, totalWeight + w - 1] });
      totalWeight = totalWeight + w;
    }
    return this.document.updateEmbeddedDocuments("TableResult", updates);
  }
  /**
   * Sets weights based on ranges
   * @param {Event} event
   */
  async _onNormalizeWeights(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.rendered || this._submitting)
      return false;
    await this._onSubmit(event);
    const results2 = this.document.results.map((result) => result.toObject(false));
    const updates = results2.map((r) => ({ _id: r._id, weight: r.range[1] - (r.range[0] - 1) }));
    return this.document.updateEmbeddedDocuments("TableResult", updates);
  }
  /**
   * @param {Event} event
   */
  async _openRichEditor(event) {
    event.preventDefault();
    event.stopPropagation();
    await this._onSubmit(event);
    const parent = event.target.closest(".table-result[data-result-id]");
    const id = parent.dataset.resultId;
    const result = this.document.results.get(id);
    const uuid = `richedit-${result.uuid}`;
    const old = Object.values(ui.windows).find((app) => app.options.id === uuid);
    if (old)
      return old.render(true, { focus: true });
    await RichResultEdit.open(result);
  }
  /**
   * @param {Event} event
   */
  _toggleSimpleEditor(event, html) {
    event.preventDefault();
    event.stopPropagation();
    const simpleEditor = document.createElement("textarea");
    simpleEditor.name = "description";
    simpleEditor.innerHTML = this.object.description;
    const editor = html.querySelector(".description-editor");
    editor?.replaceChildren(simpleEditor);
    this.editors = {};
  }
  _getSubmitData(updateData) {
    const data = super._getSubmitData(updateData);
    if (data.description == "<p></p>")
      data.description = "";
    return data;
  }
  /* -------------------------------------------- */
  /**
   * Handle toggling the drawn status of the result in the table
   * @param {Event} event
   * @private
   */
  async _onEditResult(event) {
    event.preventDefault();
    const tableResult = event.currentTarget.closest(".table-result");
    const result = this.document.results.get(tableResult.dataset.resultId);
    let findDocument = await BRTBetterHelpers.retrieveDocumentFromResult(result, true);
    let isJournal = findDocument instanceof JournalEntry;
    let docJournalPageUuid = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`
    );
    if (isJournal && docJournalPageUuid) {
      findDocument = await fromUuid(docJournalPageUuid);
    }
    if (findDocument) {
      findDocument.sheet.render(true);
    } else {
      Logger.warn(`No document is been found to edit`, true);
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onBetterRollTablesRoll(event) {
    event.preventDefault();
    await this.submit({ preventClose: true, preventRender: true });
    if (event.currentTarget) {
      event.currentTarget.disabled = true;
    } else {
      event.target.disabled = true;
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_BETTER) {
      await this.document.setFlag(
        CONSTANTS.MODULE_ID,
        CONSTANTS.FLAGS.TABLE_TYPE_KEY,
        CONSTANTS.TABLE_TYPE_BETTER
      );
    }
    const tableEntity = this.document;
    await API$1.betterTableRoll(tableEntity);
    if (event.currentTarget) {
      event.currentTarget.disabled = false;
    } else {
      event.target.disabled = false;
    }
  }
  /* -------------------------------------------- */
  /**
   * Submit the entire form when a table result type is changed, in case there are other active changes
   * @param {Event} event
   * @private
   */
  async _onChangeResultJournalPageId(event) {
    event.preventDefault();
    const select = event.target;
    const value = select.value;
    select.name;
    const tableResult = event.currentTarget.closest(".table-result");
    const result = this.document.results.get(tableResult.dataset.resultId);
    setProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`, value);
    await this._onSubmit(event);
    await result.update({
      flags: {
        [`${CONSTANTS.MODULE_ID}`]: {
          [`${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`]: value ?? ""
        }
      }
    });
  }
  /* -------------------------------------------- */
};
__name(_BetterRollTableBetterConfig, "BetterRollTableBetterConfig");
let BetterRollTableBetterConfig = _BetterRollTableBetterConfig;
const _BetterRollTableLootConfig = class _BetterRollTableLootConfig extends RollTableConfig {
  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["sheet", "roll-table-config", `${CONSTANTS.MODULE_ID}-roll-table-config`],
      template: `modules/${CONSTANTS.MODULE_ID}/templates/sheet/brt-roll-table-config.hbs`,
      width: 1e3,
      height: "auto",
      closeOnSubmit: false,
      viewPermission: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER,
      // scrollY: ["table.table-results"],
      // dragDrop: [{ dragSelector: null, dropSelector: null }],
      dragDrop: [
        // { dragSelector: null, dropSelector: null },
        {
          dragSelector: "section.results .table-results .table-result",
          dropSelector: "section.results .table-results"
        }
      ],
      scrollY: [".table-results"],
      resizable: true
    });
  }
  /* -------------------------------------------- */
  //  /** @inheritdoc */
  //  get title() {
  //    return `${game.i18n.localize("TABLE.SheetTitle")}: ${this.document.name}`;
  //  }
  /* -------------------------------------------- */
  /**
   * @override
   */
  async getData(options2 = {}) {
    const context = await super.getData(options2);
    context.descriptionHTML = await TextEditor.enrichHTML(this.object.description, {
      async: true,
      secrets: this.object.isOwner
    });
    const results2 = await Promise.all(
      this.document.results.map(async (result) => {
        const obj = await BRTBetterHelpers.updateTableResult(result);
        if (obj?.result) {
          return obj.result;
        }
      })
    );
    results2.sort((a, b) => a.range[0] - b.range[0]);
    let brtData = foundry.utils.mergeObject(context, {
      results: results2,
      resultTypes: Object.entries(CONST.TABLE_RESULT_TYPES).reduce((obj, v) => {
        obj[v[1]] = v[0].titleCase();
        return obj;
      }, {}),
      documentTypes: CONST.COMPENDIUM_DOCUMENT_TYPES,
      compendiumPacks: Array.from(game.packs.keys())
    });
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_LOOT) {
      await this.document.setFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TABLE_TYPE_KEY, CONSTANTS.TABLE_TYPE_LOOT);
    }
    brtData.usePercentage = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.GENERIC_USE_PERCENTAGE);
    brtData.useDynamicDc = false;
    brtData.tableType = CONSTANTS.TABLE_TYPE_LOOT;
    brtData.textType = Logger.i18n(`${CONSTANTS.MODULE_ID}.${"TypePrefixLabel"}`) + " " + Logger.i18n(`${CONSTANTS.MODULE_ID}.${"TypeLoot"}`);
    brtData = foundry.utils.mergeObject(brtData, duplicate(this.document.flags));
    brtData.disabled = !this.isEditable;
    brtData.uuid = this.document.uuid;
    brtData.owner = this.document.isOwner;
    this.canRoll = this.document.ownership[game.user.id] ? this.document.ownership[game.user.id] === CONST.DOCUMENT_PERMISSION_LEVELS.OWNER || this.document.ownership[game.user.id] === CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER : this.isEditable;
    return brtData;
  }
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */
  /**
   * @param {JQuery} jq
   */
  activateListeners(jq) {
    super.activateListeners(jq);
    const html = jq[0];
    if (this.canRoll) {
      html.querySelectorAll(".better-rolltables-roll-loot").forEach((el) => {
        el.disabled = false;
        el.addEventListener("click", this._onBetterRollTablesRoll.bind(this));
      });
    }
    if (!this.isEditable) {
      return;
    }
    html.querySelector(".normalize-weights").addEventListener("click", this._onNormalizeWeights.bind(this));
    html.querySelectorAll("a.edit-result").forEach(
      (el) => el.addEventListener("click", this._onEditResult.bind(this))
    );
    html.querySelectorAll("a.rich-edit-result").forEach(
      (el) => el.addEventListener("click", this._openRichEditor.bind(this))
    );
    let selectPages = html.querySelector(".result-details .result-details-journal-page-id");
    selectPages?.addEventListener("change", this._onChangeResultJournalPageId.bind(this));
    html.querySelectorAll("#BRT-gen-loot").forEach(
      (el) => el.addEventListener("click", this._onBetterRollTablesGenerateLoot.bind(this))
    );
    html.querySelectorAll("#BRT-gen-loot-token").forEach(
      (el) => el.addEventListener("click", this._onBetterRollTablesGenerateLootToken.bind(this))
    );
  }
  /* -------------------------------------------- */
  //   /**
  //    * Handle creating a TableResult in the RollTable document
  //    * @param {MouseEvent} event        The originating mouse event
  //    * @param {object} [resultData]     An optional object of result data to use
  //    * @returns {Promise}
  //    * @private
  //    */
  //   async _onCreateResult(event, resultData={}) {
  //     event.preventDefault();
  //     // Save any pending changes
  //     await this._onSubmit(event);
  //     // Get existing results
  //     const results = Array.from(this.document.results.values());
  //     let last = results[results.length - 1];
  //     // Get weight and range data
  //     let weight = last ? (last.weight || 1) : 1;
  //     let totalWeight = results.reduce((t, r) => t + r.weight, 0) || 1;
  //     let minRoll = results.length ? Math.min(...results.map(r => r.range[0])) : 0;
  //     let maxRoll = results.length ? Math.max(...results.map(r => r.range[1])) : 0;
  //     // Determine new starting range
  //     const spread = maxRoll - minRoll + 1;
  //     const perW = Math.round(spread / totalWeight);
  //     const range = [maxRoll + 1, maxRoll + Math.max(1, weight * perW)];
  //     // Create the new Result
  //     resultData = foundry.utils.mergeObject({
  //       type: last ? last.type : CONST.TABLE_RESULT_TYPES.TEXT,
  //       documentCollection: last ? last.documentCollection : null,
  //       weight: weight,
  //       range: range,
  //       drawn: false
  //     }, resultData);
  //     return this.document.createEmbeddedDocuments("TableResult", [resultData]);
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Submit the entire form when a table result type is changed, in case there are other active changes
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onChangeResultType(event) {
  //     event.preventDefault();
  //     const rt = CONST.TABLE_RESULT_TYPES;
  //     const select = event.target;
  //     const value = parseInt(select.value);
  //     const resultKey = select.name.replace(".type", "");
  //     let documentCollection = "";
  //     if ( value === rt.DOCUMENT ) documentCollection = "Actor";
  //     else if ( value === rt.COMPENDIUM ) documentCollection = game.packs.keys().next().value;
  //     const updateData = {[resultKey]: {documentCollection, documentId: null}};
  //     return this._onSubmit(event, {updateData});
  //   }
  /* -------------------------------------------- */
  /**
   * Handle deleting a TableResult from the RollTable document
   * @param {MouseEvent} event        The originating click event
   * @returns {Promise<TableResult>}   The deleted TableResult document
   * @private
   */
  async _onDeleteResult(event) {
    event.preventDefault();
    await this._onSubmit(event);
    const li = event.currentTarget.closest(".table-result");
    const result = this.object.results.get(li.dataset.resultId);
    return result.delete();
  }
  /* -------------------------------------------- */
  /** @inheritdoc */
  async _onDrop(event) {
    const json = TextEditor.getDragEventData(event);
    if (json.event === "sort") {
      const eel = event.target;
      const el = eel.dataset.resultId ? eel : eel.closest(".table-result[data-result-id]");
      if (!el) {
        Logger.warn("Drop target not found.", true);
        return;
      }
      return this.reorderIndex(event, json.result, el.dataset.resultId);
    } else {
      if (json.type === "JournalEntryPage") {
        const journalPage = await fromUuid(json.uuid);
        const data = await fromUuid(journalPage.parent.uuid);
        data.type = data.documentName;
        const allowed = Hooks.call("dropRollTableSheetData", this.document, this, data);
        if (allowed === false)
          return;
        if (!CONST.DOCUMENT_TYPES.includes(data.type))
          return;
        const document2 = data;
        if (!document2 || document2.isEmbedded)
          return;
        const isCompendium = !!document2.compendium;
        return await this._onCreateResult(event, {
          type: isCompendium ? CONST.TABLE_RESULT_TYPES.COMPENDIUM : CONST.TABLE_RESULT_TYPES.DOCUMENT,
          documentCollection: isCompendium ? document2.pack : document2.documentName,
          text: document2.name,
          documentId: document2.id,
          img: document2.img || null,
          flags: {
            [`${CONSTANTS.MODULE_ID}`]: {
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`]: json.uuid
            }
          }
        });
      } else {
        return super._onDrop(event);
      }
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle changing the actor profile image by opening a FilePicker
   * @param {Event} event
   * @private
   */
  _onEditImage(event) {
    const img = event.currentTarget;
    const isHeader = img.dataset.edit === "img";
    let current = this.document.img;
    if (!isHeader) {
      const li = img.closest(".table-result");
      const result = this.document.results.get(li.dataset.resultId);
      current = result.img;
    }
    const fp = new FilePicker({
      type: "image",
      current,
      callback: async (path) => {
        img.src = path;
        const resultImage = img.closest(".result-image");
        let resultImageInputs = resultImage.querySelectorAll("input");
        let inputCustomIcon = resultImageInputs[0].value || "";
        if (inputCustomIcon !== path) {
          resultImageInputs[0].value = path;
        }
        return this._onSubmit(event);
      },
      top: this.position.top + 40,
      left: this.position.left + 10
    });
    return fp.browse();
  }
  /* -------------------------------------------- */
  //   /**
  //    * Handle a button click to re-normalize dice result ranges across all RollTable results
  //    * @param {Event} event
  //    * @private
  //    */
  //   async _onNormalizeResults(event) {
  //     event.preventDefault();
  //     if ( !this.rendered || this._submitting) return false;
  //     // Save any pending changes
  //     await this._onSubmit(event);
  //     // Normalize the RollTable
  //     return this.document.normalize();
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Handle toggling the drawn status of the result in the table
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onLockResult(event) {
  //     event.preventDefault();
  //     const tableResult = event.currentTarget.closest(".table-result");
  //     const result = this.document.results.get(tableResult.dataset.resultId);
  //     return result.update({drawn: !result.drawn});
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Reset the Table to it's original composition with all options unlocked
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onResetTable(event) {
  //     event.preventDefault();
  //     return this.document.resetResults();
  //   }
  /* -------------------------------------------- */
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onRollTable(event) {
    return await super._onRollTable(event);
  }
  /* -------------------------------------------- */
  //   /**
  //    * Configure the update object workflow for the Roll Table configuration sheet
  //    * Additional logic is needed here to reconstruct the results array from the editable fields on the sheet
  //    * @param {Event} event            The form submission event
  //    * @param {Object} formData        The validated FormData translated into an Object for submission
  //    * @returns {Promise}
  //    * @private
  //    */
  //   async _updateObject(event, formData) {
  //     // Expand the data to update the results array
  //     const expanded = foundry.utils.expandObject(formData);
  //     expanded.results = expanded.hasOwnProperty("results") ? Object.values(expanded.results) : [];
  //     for (let r of expanded.results) {
  //       r.range = [r.rangeL, r.rangeH];
  //       switch (r.type) {
  //         // Document results
  //         case CONST.TABLE_RESULT_TYPES.DOCUMENT:
  //           const collection = game.collections.get(r.documentCollection);
  //           if (!collection) continue;
  //           // Get the original document, if the name still matches - take no action
  //           const original = r.documentId ? collection.get(r.documentId) : null;
  //           if (original && (original.name === r.text)) continue;
  //           // Otherwise, find the document by ID or name (ID preferred)
  //           const doc = collection.find(e => (e.id === r.text) || (e.name === r.text)) || null;
  //           r.documentId = doc?.id ?? null;
  //           r.text = doc?.name ?? null;
  //           r.img = doc?.img ?? null;
  //           r.img = doc?.thumb || doc?.img || null;
  //           break;
  //         // Compendium results
  //         case CONST.TABLE_RESULT_TYPES.COMPENDIUM:
  //           const pack = await getCompendiumCollectionAsync(r.documentCollection, true, false);
  //           if (pack) {
  //             // Get the original entry, if the name still matches - take no action
  //             const original = pack.index.get(r.documentId) || null;
  //             if (original && (original.name === r.text)) continue;
  //             // Otherwise, find the document by ID or name (ID preferred)
  //             const doc = pack.index.find(i => (i._id === r.text) || (i.name === r.text)) || null;
  //             r.documentId = doc?._id || null;
  //             r.text = doc?.name || null;
  //             r.img = doc?.thumb || doc?.img || null;
  //           }
  //           break;
  //         // Plain text results
  //         default:
  //           r.type = 0;
  //           r.documentCollection = null;
  //           r.documentId = null;
  //       }
  //     }
  //     // Update the object
  //     return this.document.update(expanded, {diff: false, recursive: false});
  //   }
  /* -------------------------------------------- */
  /**
   * MOD Modified copy of core _animateRoll to ensure it does not constantly break with the changed layout.
   * Display a roulette style animation when a Roll Table result is drawn from the sheet
   * @param {TableResult[]} results     An Array of drawn table results to highlight
   * @returns {Promise}                  A Promise which resolves once the animation is complete
   * @protected
   */
  async _animateRoll(results2) {
    const tableResults = this.element[0].querySelector(".table-results > tbody");
    const drawnIds = new Set(results2.map((r) => r.id));
    const drawnItems = Array.from(tableResults.children).filter((item2) => drawnIds.has(item2.dataset.resultId));
    const nResults = this.object.results.size;
    const maxTime = 2e3;
    let animTime = 50;
    let animOffset = Math.round(tableResults.offsetHeight / (tableResults.children[1].offsetHeight * 2));
    const nLoops = Math.min(Math.ceil(maxTime / (animTime * nResults)), 4);
    if (nLoops === 1)
      animTime = maxTime / nResults;
    await this._animateRoulette(tableResults, drawnIds, nLoops, animTime, animOffset);
    const flashes = drawnItems.map((li) => this._flashResult(li));
    return Promise.all(flashes);
  }
  /* -------------------------------------------- */
  //   /**
  //    * Animate a "roulette" through the table until arriving at the final loop and a drawn result
  //    * @param {HTMLOListElement} ol     The list element being iterated
  //    * @param {Set<string>} drawnIds    The result IDs which have already been drawn
  //    * @param {number} nLoops           The number of times to loop through the animation
  //    * @param {number} animTime         The desired animation time in milliseconds
  //    * @param {number} animOffset       The desired pixel offset of the result within the list
  //    * @returns {Promise}               A Promise that resolves once the animation is complete
  //    * @protected
  //    */
  //   async _animateRoulette(ol, drawnIds, nLoops, animTime, animOffset) {
  //     let loop = 0;
  //     let idx = 0;
  //     let item = null;
  //     return new Promise(resolve => {
  //       let animId = setInterval(() => {
  //         if (idx === 0) loop++;
  //         if (item) item.classList.remove("roulette");
  //         // Scroll to the next item
  //         item = ol.children[idx];
  //         ol.scrollTop = (idx - animOffset) * item.offsetHeight;
  //         // If we are on the final loop
  //         if ( (loop === nLoops) && drawnIds.has(item.dataset.resultId) ) {
  //           clearInterval(animId);
  //           return resolve();
  //         }
  //         // Continue the roulette and cycle the index
  //         item.classList.add("roulette");
  //         idx = idx < ol.children.length - 1 ? idx + 1 : 0;
  //       }, animTime);
  //     });
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Display a flashing animation on the selected result to emphasize the draw
  //    * @param {HTMLElement} item      The HTML &lt;li> item of the winning result
  //    * @returns {Promise}              A Promise that resolves once the animation is complete
  //    * @protected
  //    */
  //   async _flashResult(item) {
  //     return new Promise(resolve => {
  //       let count = 0;
  //       let animId = setInterval(() => {
  //         if (count % 2) item.classList.remove("roulette");
  //         else item.classList.add("roulette");
  //         if (count === 7) {
  //           clearInterval(animId);
  //           resolve();
  //         }
  //         count++;
  //       }, 50);
  //     });
  //   }
  /* ============================================== */
  /**
   * @param {DragEvent} event
   */
  _onDragStart(event) {
    const eel = event.target;
    const el = eel.dataset.resultId ? eel : eel.closest(".table-result[data-result-id]");
    event.dataTransfer?.setData(
      "text/plain",
      JSON.stringify({ event: "sort", index: el.dataset.index, result: el.dataset.resultId })
    );
  }
  /**
   * @param {String} source Source ID
   * @param {String} target Target ID
   */
  async reorderIndex(event, source, target) {
    if (!this.rendered || this._submitting)
      return false;
    await this._onSubmit(event);
    const results2 = this.document.results.map((result) => result.toObject(false));
    results2.sort((a, b) => a.range[0] - b.range[0]);
    const sourceIx = results2.findIndex((r) => r._id === source), targetIx = results2.findIndex((r) => r._id === target);
    if (sourceIx == targetIx) {
      Logger.warn("Can't move result onto itself.", true);
      return;
    }
    const [moved] = results2.splice(sourceIx, 1);
    results2.splice(targetIx, 0, moved);
    results2.forEach((r) => r.weight = r.range[1] - (r.range[0] - 1));
    let totalWeight = 1;
    const updates = [];
    for (const result of results2) {
      const w = result.weight;
      updates.push({ _id: result._id, weight: w, range: [totalWeight, totalWeight + w - 1] });
      totalWeight = totalWeight + w;
    }
    return this.document.updateEmbeddedDocuments("TableResult", updates);
  }
  /**
   * Sets weights based on ranges
   * @param {Event} event
   */
  async _onNormalizeWeights(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.rendered || this._submitting)
      return false;
    await this._onSubmit(event);
    const results2 = this.document.results.map((result) => result.toObject(false));
    const updates = results2.map((r) => ({ _id: r._id, weight: r.range[1] - (r.range[0] - 1) }));
    return this.document.updateEmbeddedDocuments("TableResult", updates);
  }
  /**
   * @param {Event} event
   */
  async _openRichEditor(event) {
    event.preventDefault();
    event.stopPropagation();
    await this._onSubmit(event);
    const parent = event.target.closest(".table-result[data-result-id]");
    const id = parent.dataset.resultId;
    const result = this.document.results.get(id);
    const uuid = `richedit-${result.uuid}`;
    const old = Object.values(ui.windows).find((app) => app.options.id === uuid);
    if (old)
      return old.render(true, { focus: true });
    await RichResultEdit.open(result);
  }
  /**
   * @param {Event} event
   */
  _toggleSimpleEditor(event, html) {
    event.preventDefault();
    event.stopPropagation();
    const simpleEditor = document.createElement("textarea");
    simpleEditor.name = "description";
    simpleEditor.innerHTML = this.object.description;
    const editor = html.querySelector(".description-editor");
    editor?.replaceChildren(simpleEditor);
    this.editors = {};
  }
  _getSubmitData(updateData) {
    const data = super._getSubmitData(updateData);
    if (data.description == "<p></p>")
      data.description = "";
    return data;
  }
  /* -------------------------------------------- */
  /**
   * Handle toggling the drawn status of the result in the table
   * @param {Event} event
   * @private
   */
  async _onEditResult(event) {
    event.preventDefault();
    const tableResult = event.currentTarget.closest(".table-result");
    const result = this.document.results.get(tableResult.dataset.resultId);
    let findDocument = await BRTBetterHelpers.retrieveDocumentFromResult(result, true);
    let isJournal = findDocument instanceof JournalEntry;
    let docJournalPageUuid = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`
    );
    if (isJournal && docJournalPageUuid) {
      findDocument = await fromUuid(docJournalPageUuid);
    }
    if (findDocument) {
      findDocument.sheet.render(true);
    } else {
      Logger.warn(`No document is been found to edit`, true);
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onBetterRollTablesRoll(event) {
    event.preventDefault();
    await this.submit({ preventClose: true, preventRender: true });
    if (event.currentTarget) {
      event.currentTarget.disabled = true;
    } else {
      event.target.disabled = true;
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_LOOT) {
      await this.document.setFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TABLE_TYPE_KEY, CONSTANTS.TABLE_TYPE_LOOT);
    }
    const tableEntity = this.document;
    await API$1.generateChatLoot(tableEntity);
    if (event.currentTarget) {
      event.currentTarget.disabled = false;
    } else {
      event.target.disabled = false;
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onBetterRollTablesGenerateLoot(event) {
    event.preventDefault();
    await this.submit({ preventClose: true, preventRender: true });
    if (event.currentTarget) {
      event.currentTarget.disabled = true;
    } else {
      event.target.disabled = true;
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_LOOT) {
      await this.document.setFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TABLE_TYPE_KEY, CONSTANTS.TABLE_TYPE_LOOT);
    }
    const tableEntity = this.document;
    await API$1.generateLoot(tableEntity);
    if (event.currentTarget) {
      event.currentTarget.disabled = false;
    } else {
      event.target.disabled = false;
    }
  }
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onBetterRollTablesGenerateLootToken(event) {
    event.preventDefault();
    await this.submit({ preventClose: true, preventRender: true });
    if (event.currentTarget) {
      event.currentTarget.disabled = true;
    } else {
      event.target.disabled = true;
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_LOOT) {
      await this.document.setFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.TABLE_TYPE_KEY, CONSTANTS.TABLE_TYPE_LOOT);
    }
    const tableEntity = this.document;
    await API$1.generateLootOnSelectedToken(tableEntity);
    if (event.currentTarget) {
      event.currentTarget.disabled = false;
    } else {
      event.target.disabled = false;
    }
  }
  /* -------------------------------------------- */
  /**
   * Submit the entire form when a table result type is changed, in case there are other active changes
   * @param {Event} event
   * @private
   */
  async _onChangeResultJournalPageId(event) {
    event.preventDefault();
    const select = event.target;
    const value = select.value;
    select.name;
    const tableResult = event.currentTarget.closest(".table-result");
    const result = this.document.results.get(tableResult.dataset.resultId);
    setProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`, value);
    await this._onSubmit(event);
    await result.update({
      flags: {
        [`${CONSTANTS.MODULE_ID}`]: {
          [`${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`]: value ?? ""
        }
      }
    });
  }
  /* -------------------------------------------- */
};
__name(_BetterRollTableLootConfig, "BetterRollTableLootConfig");
let BetterRollTableLootConfig = _BetterRollTableLootConfig;
const _BetterRollTableStoryConfig = class _BetterRollTableStoryConfig extends RollTableConfig {
  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["sheet", "roll-table-config", `${CONSTANTS.MODULE_ID}-roll-table-config`],
      template: `modules/${CONSTANTS.MODULE_ID}/templates/sheet/brt-roll-table-config.hbs`,
      width: 1e3,
      height: "auto",
      closeOnSubmit: false,
      viewPermission: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER,
      // scrollY: ["table.table-results"],
      // dragDrop: [{ dragSelector: null, dropSelector: null }],
      dragDrop: [
        // { dragSelector: null, dropSelector: null },
        {
          dragSelector: "section.results .table-results .table-result",
          dropSelector: "section.results .table-results"
        }
      ],
      scrollY: [".table-results"],
      resizable: true
    });
  }
  /* -------------------------------------------- */
  //  /** @inheritdoc */
  //  get title() {
  //    return `${game.i18n.localize("TABLE.SheetTitle")}: ${this.document.name}`;
  //  }
  /* -------------------------------------------- */
  /**
   * @override
   */
  async getData(options2 = {}) {
    const context = await super.getData(options2);
    context.descriptionHTML = await TextEditor.enrichHTML(this.object.description, {
      async: true,
      secrets: this.object.isOwner
    });
    const results2 = await Promise.all(
      this.document.results.map(async (result) => {
        const obj = await BRTBetterHelpers.updateTableResult(result);
        if (obj?.result) {
          return obj.result;
        }
      })
    );
    results2.sort((a, b) => a.range[0] - b.range[0]);
    let brtData = foundry.utils.mergeObject(context, {
      results: results2,
      resultTypes: Object.entries(CONST.TABLE_RESULT_TYPES).reduce((obj, v) => {
        obj[v[1]] = v[0].titleCase();
        return obj;
      }, {}),
      documentTypes: CONST.COMPENDIUM_DOCUMENT_TYPES,
      compendiumPacks: Array.from(game.packs.keys())
    });
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_STORY) {
      await this.document.setFlag(
        CONSTANTS.MODULE_ID,
        CONSTANTS.FLAGS.TABLE_TYPE_KEY,
        CONSTANTS.TABLE_TYPE_STORY
      );
    }
    brtData.usePercentage = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.GENERIC_USE_PERCENTAGE);
    brtData.useDynamicDc = false;
    brtData.tableType = CONSTANTS.TABLE_TYPE_STORY;
    brtData.textType = Logger.i18n(`${CONSTANTS.MODULE_ID}.${"TypePrefixLabel"}`) + " " + Logger.i18n(`${CONSTANTS.MODULE_ID}.${"TypeStory"}`);
    brtData = foundry.utils.mergeObject(brtData, duplicate(this.document.flags));
    brtData.disabled = !this.isEditable;
    brtData.uuid = this.document.uuid;
    brtData.owner = this.document.isOwner;
    this.canRoll = this.document.ownership[game.user.id] ? this.document.ownership[game.user.id] === CONST.DOCUMENT_PERMISSION_LEVELS.OWNER || this.document.ownership[game.user.id] === CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER : this.isEditable;
    return brtData;
  }
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */
  /**
   * @param {JQuery} jq
   */
  activateListeners(jq) {
    super.activateListeners(jq);
    const html = jq[0];
    if (this.canRoll) {
      html.querySelectorAll(".better-rolltables-roll-story").forEach((el) => {
        el.disabled = false;
        el.addEventListener("click", this._onBetterRollTablesRoll.bind(this));
      });
    }
    if (!this.isEditable) {
      return;
    }
    html.querySelector(".normalize-weights").addEventListener("click", this._onNormalizeWeights.bind(this));
    html.querySelectorAll(".rich-edit-result").forEach(
      (el) => el.addEventListener("click", this._openRichEditor.bind(this))
    );
    html.querySelectorAll("a.edit-result").forEach(
      (el) => el.addEventListener("click", this._onEditResult.bind(this))
    );
    html.querySelectorAll("a.rich-edit-result").forEach(
      (el) => el.addEventListener("click", this._openRichEditor.bind(this))
    );
    let selectPages = html.querySelector(".result-details .result-details-journal-page-id");
    selectPages?.addEventListener("change", this._onChangeResultJournalPageId.bind(this));
  }
  /* -------------------------------------------- */
  //   /**
  //    * Handle creating a TableResult in the RollTable document
  //    * @param {MouseEvent} event        The originating mouse event
  //    * @param {object} [resultData]     An optional object of result data to use
  //    * @returns {Promise}
  //    * @private
  //    */
  //   async _onCreateResult(event, resultData={}) {
  //     event.preventDefault();
  //     // Save any pending changes
  //     await this._onSubmit(event);
  //     // Get existing results
  //     const results = Array.from(this.document.results.values());
  //     let last = results[results.length - 1];
  //     // Get weight and range data
  //     let weight = last ? (last.weight || 1) : 1;
  //     let totalWeight = results.reduce((t, r) => t + r.weight, 0) || 1;
  //     let minRoll = results.length ? Math.min(...results.map(r => r.range[0])) : 0;
  //     let maxRoll = results.length ? Math.max(...results.map(r => r.range[1])) : 0;
  //     // Determine new starting range
  //     const spread = maxRoll - minRoll + 1;
  //     const perW = Math.round(spread / totalWeight);
  //     const range = [maxRoll + 1, maxRoll + Math.max(1, weight * perW)];
  //     // Create the new Result
  //     resultData = foundry.utils.mergeObject({
  //       type: last ? last.type : CONST.TABLE_RESULT_TYPES.TEXT,
  //       documentCollection: last ? last.documentCollection : null,
  //       weight: weight,
  //       range: range,
  //       drawn: false
  //     }, resultData);
  //     return this.document.createEmbeddedDocuments("TableResult", [resultData]);
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Submit the entire form when a table result type is changed, in case there are other active changes
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onChangeResultType(event) {
  //     event.preventDefault();
  //     const rt = CONST.TABLE_RESULT_TYPES;
  //     const select = event.target;
  //     const value = parseInt(select.value);
  //     const resultKey = select.name.replace(".type", "");
  //     let documentCollection = "";
  //     if ( value === rt.DOCUMENT ) documentCollection = "Actor";
  //     else if ( value === rt.COMPENDIUM ) documentCollection = game.packs.keys().next().value;
  //     const updateData = {[resultKey]: {documentCollection, documentId: null}};
  //     return this._onSubmit(event, {updateData});
  //   }
  /* -------------------------------------------- */
  /**
   * Handle deleting a TableResult from the RollTable document
   * @param {MouseEvent} event        The originating click event
   * @returns {Promise<TableResult>}   The deleted TableResult document
   * @private
   */
  async _onDeleteResult(event) {
    event.preventDefault();
    await this._onSubmit(event);
    const li = event.currentTarget.closest(".table-result");
    const result = this.object.results.get(li.dataset.resultId);
    return result.delete();
  }
  /* -------------------------------------------- */
  /** @inheritdoc */
  async _onDrop(event) {
    const json = TextEditor.getDragEventData(event);
    if (json.event === "sort") {
      const eel = event.target;
      const el = eel.dataset.resultId ? eel : eel.closest(".table-result[data-result-id]");
      if (!el) {
        Logger.warn("Drop target not found.", true);
        return;
      }
      return this.reorderIndex(event, json.result, el.dataset.resultId);
    } else {
      if (json.type === "JournalEntryPage") {
        const journalPage = await fromUuid(json.uuid);
        const data = await fromUuid(journalPage.parent.uuid);
        data.type = data.documentName;
        const allowed = Hooks.call("dropRollTableSheetData", this.document, this, data);
        if (allowed === false)
          return;
        if (!CONST.DOCUMENT_TYPES.includes(data.type))
          return;
        const document2 = data;
        if (!document2 || document2.isEmbedded)
          return;
        const isCompendium = !!document2.compendium;
        return await this._onCreateResult(event, {
          type: isCompendium ? CONST.TABLE_RESULT_TYPES.COMPENDIUM : CONST.TABLE_RESULT_TYPES.DOCUMENT,
          documentCollection: isCompendium ? document2.pack : document2.documentName,
          text: document2.name,
          documentId: document2.id,
          img: document2.img || null,
          flags: {
            [`${CONSTANTS.MODULE_ID}`]: {
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`]: json.uuid
            }
          }
        });
      } else {
        return super._onDrop(event);
      }
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle changing the actor profile image by opening a FilePicker
   * @param {Event} event
   * @private
   */
  _onEditImage(event) {
    const img = event.currentTarget;
    const isHeader = img.dataset.edit === "img";
    let current = this.document.img;
    if (!isHeader) {
      const li = img.closest(".table-result");
      const result = this.document.results.get(li.dataset.resultId);
      current = result.img;
    }
    const fp = new FilePicker({
      type: "image",
      current,
      callback: async (path) => {
        img.src = path;
        const resultImage = img.closest(".result-image");
        let resultImageInputs = resultImage.querySelectorAll("input");
        let inputCustomIcon = resultImageInputs[0].value || "";
        if (inputCustomIcon !== path) {
          resultImageInputs[0].value = path;
        }
        return this._onSubmit(event);
      },
      top: this.position.top + 40,
      left: this.position.left + 10
    });
    return fp.browse();
  }
  /* -------------------------------------------- */
  //   /**
  //    * Handle a button click to re-normalize dice result ranges across all RollTable results
  //    * @param {Event} event
  //    * @private
  //    */
  //   async _onNormalizeResults(event) {
  //     event.preventDefault();
  //     if ( !this.rendered || this._submitting) return false;
  //     // Save any pending changes
  //     await this._onSubmit(event);
  //     // Normalize the RollTable
  //     return this.document.normalize();
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Handle toggling the drawn status of the result in the table
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onLockResult(event) {
  //     event.preventDefault();
  //     const tableResult = event.currentTarget.closest(".table-result");
  //     const result = this.document.results.get(tableResult.dataset.resultId);
  //     return result.update({drawn: !result.drawn});
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Reset the Table to it's original composition with all options unlocked
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onResetTable(event) {
  //     event.preventDefault();
  //     return this.document.resetResults();
  //   }
  /* -------------------------------------------- */
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onRollTable(event) {
    return await super._onRollTable(event);
  }
  /* -------------------------------------------- */
  //   /**
  //    * Configure the update object workflow for the Roll Table configuration sheet
  //    * Additional logic is needed here to reconstruct the results array from the editable fields on the sheet
  //    * @param {Event} event            The form submission event
  //    * @param {Object} formData        The validated FormData translated into an Object for submission
  //    * @returns {Promise}
  //    * @private
  //    */
  //   async _updateObject(event, formData) {
  //     // Expand the data to update the results array
  //     const expanded = foundry.utils.expandObject(formData);
  //     expanded.results = expanded.hasOwnProperty("results") ? Object.values(expanded.results) : [];
  //     for (let r of expanded.results) {
  //       r.range = [r.rangeL, r.rangeH];
  //       switch (r.type) {
  //         // Document results
  //         case CONST.TABLE_RESULT_TYPES.DOCUMENT:
  //           const collection = game.collections.get(r.documentCollection);
  //           if (!collection) continue;
  //           // Get the original document, if the name still matches - take no action
  //           const original = r.documentId ? collection.get(r.documentId) : null;
  //           if (original && (original.name === r.text)) continue;
  //           // Otherwise, find the document by ID or name (ID preferred)
  //           const doc = collection.find(e => (e.id === r.text) || (e.name === r.text)) || null;
  //           r.documentId = doc?.id ?? null;
  //           r.text = doc?.name ?? null;
  //           r.img = doc?.img ?? null;
  //           r.img = doc?.thumb || doc?.img || null;
  //           break;
  //         // Compendium results
  //         case CONST.TABLE_RESULT_TYPES.COMPENDIUM:
  //           const pack = await getCompendiumCollectionAsync(r.documentCollection, true, false);
  //           if (pack) {
  //             // Get the original entry, if the name still matches - take no action
  //             const original = pack.index.get(r.documentId) || null;
  //             if (original && (original.name === r.text)) continue;
  //             // Otherwise, find the document by ID or name (ID preferred)
  //             const doc = pack.index.find(i => (i._id === r.text) || (i.name === r.text)) || null;
  //             r.documentId = doc?._id || null;
  //             r.text = doc?.name || null;
  //             r.img = doc?.thumb || doc?.img || null;
  //           }
  //           break;
  //         // Plain text results
  //         default:
  //           r.type = 0;
  //           r.documentCollection = null;
  //           r.documentId = null;
  //       }
  //     }
  //     // Update the object
  //     return this.document.update(expanded, {diff: false, recursive: false});
  //   }
  /* -------------------------------------------- */
  /**
   * MOD Modified copy of core _animateRoll to ensure it does not constantly break with the changed layout.
   * Display a roulette style animation when a Roll Table result is drawn from the sheet
   * @param {TableResult[]} results     An Array of drawn table results to highlight
   * @returns {Promise}                  A Promise which resolves once the animation is complete
   * @protected
   */
  async _animateRoll(results2) {
    const tableResults = this.element[0].querySelector(".table-results > tbody");
    const drawnIds = new Set(results2.map((r) => r.id));
    const drawnItems = Array.from(tableResults.children).filter((item2) => drawnIds.has(item2.dataset.resultId));
    const nResults = this.object.results.size;
    const maxTime = 2e3;
    let animTime = 50;
    let animOffset = Math.round(tableResults.offsetHeight / (tableResults.children[1].offsetHeight * 2));
    const nLoops = Math.min(Math.ceil(maxTime / (animTime * nResults)), 4);
    if (nLoops === 1)
      animTime = maxTime / nResults;
    await this._animateRoulette(tableResults, drawnIds, nLoops, animTime, animOffset);
    const flashes = drawnItems.map((li) => this._flashResult(li));
    return Promise.all(flashes);
  }
  /* -------------------------------------------- */
  //   /**
  //    * Animate a "roulette" through the table until arriving at the final loop and a drawn result
  //    * @param {HTMLOListElement} ol     The list element being iterated
  //    * @param {Set<string>} drawnIds    The result IDs which have already been drawn
  //    * @param {number} nLoops           The number of times to loop through the animation
  //    * @param {number} animTime         The desired animation time in milliseconds
  //    * @param {number} animOffset       The desired pixel offset of the result within the list
  //    * @returns {Promise}               A Promise that resolves once the animation is complete
  //    * @protected
  //    */
  //   async _animateRoulette(ol, drawnIds, nLoops, animTime, animOffset) {
  //     let loop = 0;
  //     let idx = 0;
  //     let item = null;
  //     return new Promise(resolve => {
  //       let animId = setInterval(() => {
  //         if (idx === 0) loop++;
  //         if (item) item.classList.remove("roulette");
  //         // Scroll to the next item
  //         item = ol.children[idx];
  //         ol.scrollTop = (idx - animOffset) * item.offsetHeight;
  //         // If we are on the final loop
  //         if ( (loop === nLoops) && drawnIds.has(item.dataset.resultId) ) {
  //           clearInterval(animId);
  //           return resolve();
  //         }
  //         // Continue the roulette and cycle the index
  //         item.classList.add("roulette");
  //         idx = idx < ol.children.length - 1 ? idx + 1 : 0;
  //       }, animTime);
  //     });
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Display a flashing animation on the selected result to emphasize the draw
  //    * @param {HTMLElement} item      The HTML &lt;li> item of the winning result
  //    * @returns {Promise}              A Promise that resolves once the animation is complete
  //    * @protected
  //    */
  //   async _flashResult(item) {
  //     return new Promise(resolve => {
  //       let count = 0;
  //       let animId = setInterval(() => {
  //         if (count % 2) item.classList.remove("roulette");
  //         else item.classList.add("roulette");
  //         if (count === 7) {
  //           clearInterval(animId);
  //           resolve();
  //         }
  //         count++;
  //       }, 50);
  //     });
  //   }
  /* ============================================== */
  /**
   * @param {DragEvent} event
   */
  _onDragStart(event) {
    const eel = event.target;
    const el = eel.dataset.resultId ? eel : eel.closest(".table-result[data-result-id]");
    event.dataTransfer?.setData(
      "text/plain",
      JSON.stringify({ event: "sort", index: el.dataset.index, result: el.dataset.resultId })
    );
  }
  /**
   * @param {String} source Source ID
   * @param {String} target Target ID
   */
  async reorderIndex(event, source, target) {
    if (!this.rendered || this._submitting)
      return false;
    await this._onSubmit(event);
    const results2 = this.document.results.map((result) => result.toObject(false));
    results2.sort((a, b) => a.range[0] - b.range[0]);
    const sourceIx = results2.findIndex((r) => r._id === source), targetIx = results2.findIndex((r) => r._id === target);
    if (sourceIx == targetIx) {
      Logger.warn("Can't move result onto itself.", true);
      return;
    }
    const [moved] = results2.splice(sourceIx, 1);
    results2.splice(targetIx, 0, moved);
    results2.forEach((r) => r.weight = r.range[1] - (r.range[0] - 1));
    let totalWeight = 1;
    const updates = [];
    for (const result of results2) {
      const w = result.weight;
      updates.push({ _id: result._id, weight: w, range: [totalWeight, totalWeight + w - 1] });
      totalWeight = totalWeight + w;
    }
    return this.document.updateEmbeddedDocuments("TableResult", updates);
  }
  /**
   * Sets weights based on ranges
   * @param {Event} event
   */
  async _onNormalizeWeights(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.rendered || this._submitting)
      return false;
    await this._onSubmit(event);
    const results2 = this.document.results.map((result) => result.toObject(false));
    const updates = results2.map((r) => ({ _id: r._id, weight: r.range[1] - (r.range[0] - 1) }));
    return this.document.updateEmbeddedDocuments("TableResult", updates);
  }
  /**
   * @param {Event} event
   */
  async _openRichEditor(event) {
    event.preventDefault();
    event.stopPropagation();
    await this._onSubmit(event);
    const parent = event.target.closest(".table-result[data-result-id]");
    const id = parent.dataset.resultId;
    const result = this.document.results.get(id);
    const uuid = `richedit-${result.uuid}`;
    const old = Object.values(ui.windows).find((app) => app.options.id === uuid);
    if (old)
      return old.render(true, { focus: true });
    await RichResultEdit.open(result);
  }
  /**
   * @param {Event} event
   */
  _toggleSimpleEditor(event, html) {
    event.preventDefault();
    event.stopPropagation();
    const simpleEditor = document.createElement("textarea");
    simpleEditor.name = "description";
    simpleEditor.innerHTML = this.object.description;
    const editor = html.querySelector(".description-editor");
    editor?.replaceChildren(simpleEditor);
    this.editors = {};
  }
  _getSubmitData(updateData) {
    const data = super._getSubmitData(updateData);
    if (data.description == "<p></p>")
      data.description = "";
    return data;
  }
  /* -------------------------------------------- */
  /**
   * Handle toggling the drawn status of the result in the table
   * @param {Event} event
   * @private
   */
  async _onEditResult(event) {
    event.preventDefault();
    const tableResult = event.currentTarget.closest(".table-result");
    const result = this.document.results.get(tableResult.dataset.resultId);
    let findDocument = await BRTBetterHelpers.retrieveDocumentFromResult(result, true);
    let isJournal = findDocument instanceof JournalEntry;
    let docJournalPageUuid = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`
    );
    if (isJournal && docJournalPageUuid) {
      findDocument = await fromUuid(docJournalPageUuid);
    }
    if (findDocument) {
      findDocument.sheet.render(true);
    } else {
      Logger.warn(`No document is been found to edit`, true);
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onBetterRollTablesRoll(event) {
    event.preventDefault();
    await this.submit({ preventClose: true, preventRender: true });
    if (event.currentTarget) {
      event.currentTarget.disabled = true;
    } else {
      event.target.disabled = true;
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_STORY) {
      await this.document.setFlag(
        CONSTANTS.MODULE_ID,
        CONSTANTS.FLAGS.TABLE_TYPE_KEY,
        CONSTANTS.TABLE_TYPE_STORY
      );
    }
    const tableEntity = this.document;
    await API$1.generateChatStory(tableEntity);
    if (event.currentTarget) {
      event.currentTarget.disabled = false;
    } else {
      event.target.disabled = false;
    }
  }
  /* -------------------------------------------- */
  /**
   * Submit the entire form when a table result type is changed, in case there are other active changes
   * @param {Event} event
   * @private
   */
  async _onChangeResultJournalPageId(event) {
    event.preventDefault();
    const select = event.target;
    const value = select.value;
    select.name;
    const tableResult = event.currentTarget.closest(".table-result");
    const result = this.document.results.get(tableResult.dataset.resultId);
    setProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`, value);
    await this._onSubmit(event);
    await result.update({
      flags: {
        [`${CONSTANTS.MODULE_ID}`]: {
          [`${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`]: value ?? ""
        }
      }
    });
  }
  /* -------------------------------------------- */
};
__name(_BetterRollTableStoryConfig, "BetterRollTableStoryConfig");
let BetterRollTableStoryConfig = _BetterRollTableStoryConfig;
const _BetterRollTableHarvestConfig = class _BetterRollTableHarvestConfig extends RollTableConfig {
  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["sheet", "roll-table-config", `${CONSTANTS.MODULE_ID}-roll-table-config`],
      template: `modules/${CONSTANTS.MODULE_ID}/templates/sheet/brt-roll-table-config.hbs`,
      width: 1e3,
      height: "auto",
      closeOnSubmit: false,
      viewPermission: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER,
      // scrollY: ["table.table-results"],
      // dragDrop: [{ dragSelector: null, dropSelector: null }],
      dragDrop: [
        // { dragSelector: null, dropSelector: null },
        {
          dragSelector: "section.results .table-results .table-result",
          dropSelector: "section.results .table-results"
        }
      ],
      scrollY: [".table-results"],
      resizable: true
    });
  }
  /* -------------------------------------------- */
  //  /** @inheritdoc */
  //  get title() {
  //    return `${game.i18n.localize("TABLE.SheetTitle")}: ${this.document.name}`;
  //  }
  /* -------------------------------------------- */
  /**
   * @override
   */
  async getData(options2 = {}) {
    const context = await super.getData(options2);
    context.descriptionHTML = await TextEditor.enrichHTML(this.object.description, {
      async: true,
      secrets: this.object.isOwner
    });
    const results2 = await Promise.all(
      this.document.results.map(async (result) => {
        const obj = await BRTBetterHelpers.updateTableResult(result);
        if (obj?.result) {
          return obj.result;
        }
      })
    );
    results2.sort((a, b) => a.range[0] - b.range[0]);
    let brtData = foundry.utils.mergeObject(context, {
      results: results2,
      resultTypes: Object.entries(CONST.TABLE_RESULT_TYPES).reduce((obj, v) => {
        obj[v[1]] = v[0].titleCase();
        return obj;
      }, {}),
      documentTypes: CONST.COMPENDIUM_DOCUMENT_TYPES,
      compendiumPacks: Array.from(game.packs.keys())
    });
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_HARVEST) {
      await this.document.setFlag(
        CONSTANTS.MODULE_ID,
        CONSTANTS.FLAGS.TABLE_TYPE_KEY,
        CONSTANTS.TABLE_TYPE_HARVEST
      );
    }
    brtData.usePercentage = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.GENERIC_USE_PERCENTAGE);
    brtData.useDynamicDc = this.document.getFlag(CONSTANTS.MODULE_ID, CONSTANTS.FLAGS.HARVEST_USE_DYNAMIC_DC);
    brtData.tableType = CONSTANTS.TABLE_TYPE_HARVEST;
    brtData.textType = Logger.i18n(`${CONSTANTS.MODULE_ID}.${"TypePrefixLabel"}`) + " " + Logger.i18n(`${CONSTANTS.MODULE_ID}.${"TypeHarvest"}`);
    brtData = foundry.utils.mergeObject(brtData, duplicate(this.document.flags));
    brtData.disabled = !this.isEditable;
    brtData.uuid = this.document.uuid;
    brtData.owner = this.document.isOwner;
    this.canRoll = this.document.ownership[game.user.id] ? this.document.ownership[game.user.id] === CONST.DOCUMENT_PERMISSION_LEVELS.OWNER || this.document.ownership[game.user.id] === CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER : this.isEditable;
    return brtData;
  }
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */
  /**
   * @param {JQuery} jq
   */
  activateListeners(jq) {
    super.activateListeners(jq);
    const html = jq[0];
    if (this.canRoll) {
      html.querySelectorAll(".better-rolltables-roll-harvest").forEach((el) => {
        el.disabled = false;
        el.addEventListener("click", this._onBetterRollTablesRoll.bind(this));
      });
    }
    if (!this.isEditable) {
      return;
    }
    html.querySelector(".normalize-weights").addEventListener("click", this._onNormalizeWeights.bind(this));
    html.querySelectorAll("a.edit-result").forEach(
      (el) => el.addEventListener("click", this._onEditResult.bind(this))
    );
    html.querySelectorAll("a.rich-edit-result").forEach(
      (el) => el.addEventListener("click", this._openRichEditor.bind(this))
    );
    let selectPages = html.querySelector(".result-details .result-details-journal-page-id");
    selectPages?.addEventListener("change", this._onChangeResultJournalPageId.bind(this));
    html.querySelectorAll("#BRT-gen-harvest").forEach(
      (el) => el.addEventListener("click", this._onBetterRollTablesGenerateHarvest.bind(this))
    );
    html.querySelectorAll("#BRT-gen-harvest-token").forEach(
      (el) => el.addEventListener("click", this._onBetterRollTablesGenerateHarvestToken.bind(this))
    );
  }
  /* -------------------------------------------- */
  //   /**
  //    * Handle creating a TableResult in the RollTable document
  //    * @param {MouseEvent} event        The originating mouse event
  //    * @param {object} [resultData]     An optional object of result data to use
  //    * @returns {Promise}
  //    * @private
  //    */
  //   async _onCreateResult(event, resultData={}) {
  //     event.preventDefault();
  //     // Save any pending changes
  //     await this._onSubmit(event);
  //     // Get existing results
  //     const results = Array.from(this.document.results.values());
  //     let last = results[results.length - 1];
  //     // Get weight and range data
  //     let weight = last ? (last.weight || 1) : 1;
  //     let totalWeight = results.reduce((t, r) => t + r.weight, 0) || 1;
  //     let minRoll = results.length ? Math.min(...results.map(r => r.range[0])) : 0;
  //     let maxRoll = results.length ? Math.max(...results.map(r => r.range[1])) : 0;
  //     // Determine new starting range
  //     const spread = maxRoll - minRoll + 1;
  //     const perW = Math.round(spread / totalWeight);
  //     const range = [maxRoll + 1, maxRoll + Math.max(1, weight * perW)];
  //     // Create the new Result
  //     resultData = foundry.utils.mergeObject({
  //       type: last ? last.type : CONST.TABLE_RESULT_TYPES.TEXT,
  //       documentCollection: last ? last.documentCollection : null,
  //       weight: weight,
  //       range: range,
  //       drawn: false
  //     }, resultData);
  //     return this.document.createEmbeddedDocuments("TableResult", [resultData]);
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Submit the entire form when a table result type is changed, in case there are other active changes
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onChangeResultType(event) {
  //     event.preventDefault();
  //     const rt = CONST.TABLE_RESULT_TYPES;
  //     const select = event.target;
  //     const value = parseInt(select.value);
  //     const resultKey = select.name.replace(".type", "");
  //     let documentCollection = "";
  //     if ( value === rt.DOCUMENT ) documentCollection = "Actor";
  //     else if ( value === rt.COMPENDIUM ) documentCollection = game.packs.keys().next().value;
  //     const updateData = {[resultKey]: {documentCollection, documentId: null}};
  //     return this._onSubmit(event, {updateData});
  //   }
  /* -------------------------------------------- */
  /**
   * Handle deleting a TableResult from the RollTable document
   * @param {MouseEvent} event        The originating click event
   * @returns {Promise<TableResult>}   The deleted TableResult document
   * @private
   */
  async _onDeleteResult(event) {
    event.preventDefault();
    await this._onSubmit(event);
    const li = event.currentTarget.closest(".table-result");
    const result = this.object.results.get(li.dataset.resultId);
    return result.delete();
  }
  /* -------------------------------------------- */
  /** @inheritdoc */
  async _onDrop(event) {
    const json = TextEditor.getDragEventData(event);
    if (json.event === "sort") {
      const eel = event.target;
      const el = eel.dataset.resultId ? eel : eel.closest(".table-result[data-result-id]");
      if (!el) {
        Logger.warn("Drop target not found.", true);
        return;
      }
      return this.reorderIndex(event, json.result, el.dataset.resultId);
    } else {
      if (json.type === "JournalEntryPage") {
        const journalPage = await fromUuid(json.uuid);
        const data = await fromUuid(journalPage.parent.uuid);
        data.type = data.documentName;
        const allowed = Hooks.call("dropRollTableSheetData", this.document, this, data);
        if (allowed === false)
          return;
        if (!CONST.DOCUMENT_TYPES.includes(data.type))
          return;
        const document2 = data;
        if (!document2 || document2.isEmbedded)
          return;
        const isCompendium = !!document2.compendium;
        return await this._onCreateResult(event, {
          type: isCompendium ? CONST.TABLE_RESULT_TYPES.COMPENDIUM : CONST.TABLE_RESULT_TYPES.DOCUMENT,
          documentCollection: isCompendium ? document2.pack : document2.documentName,
          text: document2.name,
          documentId: document2.id,
          img: document2.img || null,
          flags: {
            [`${CONSTANTS.MODULE_ID}`]: {
              [`${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`]: json.uuid
            }
          }
        });
      } else {
        return super._onDrop(event);
      }
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle changing the actor profile image by opening a FilePicker
   * @param {Event} event
   * @private
   */
  _onEditImage(event) {
    const img = event.currentTarget;
    const isHeader = img.dataset.edit === "img";
    let current = this.document.img;
    if (!isHeader) {
      const li = img.closest(".table-result");
      const result = this.document.results.get(li.dataset.resultId);
      current = result.img;
    }
    const fp = new FilePicker({
      type: "image",
      current,
      callback: async (path) => {
        img.src = path;
        const resultImage = img.closest(".result-image");
        let resultImageInputs = resultImage.querySelectorAll("input");
        let inputCustomIcon = resultImageInputs[0].value || "";
        if (inputCustomIcon !== path) {
          resultImageInputs[0].value = path;
        }
        return this._onSubmit(event);
      },
      top: this.position.top + 40,
      left: this.position.left + 10
    });
    return fp.browse();
  }
  /* -------------------------------------------- */
  //   /**
  //    * Handle a button click to re-normalize dice result ranges across all RollTable results
  //    * @param {Event} event
  //    * @private
  //    */
  //   async _onNormalizeResults(event) {
  //     event.preventDefault();
  //     if ( !this.rendered || this._submitting) return false;
  //     // Save any pending changes
  //     await this._onSubmit(event);
  //     // Normalize the RollTable
  //     return this.document.normalize();
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Handle toggling the drawn status of the result in the table
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onLockResult(event) {
  //     event.preventDefault();
  //     const tableResult = event.currentTarget.closest(".table-result");
  //     const result = this.document.results.get(tableResult.dataset.resultId);
  //     return result.update({drawn: !result.drawn});
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Reset the Table to it's original composition with all options unlocked
  //    * @param {Event} event
  //    * @private
  //    */
  //   _onResetTable(event) {
  //     event.preventDefault();
  //     return this.document.resetResults();
  //   }
  /* -------------------------------------------- */
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onRollTable(event) {
    return await super._onRollTable(event);
  }
  /* -------------------------------------------- */
  //   /**
  //    * Configure the update object workflow for the Roll Table configuration sheet
  //    * Additional logic is needed here to reconstruct the results array from the editable fields on the sheet
  //    * @param {Event} event            The form submission event
  //    * @param {Object} formData        The validated FormData translated into an Object for submission
  //    * @returns {Promise}
  //    * @private
  //    */
  //   async _updateObject(event, formData) {
  //     // Expand the data to update the results array
  //     const expanded = foundry.utils.expandObject(formData);
  //     expanded.results = expanded.hasOwnProperty("results") ? Object.values(expanded.results) : [];
  //     for (let r of expanded.results) {
  //       r.range = [r.rangeL, r.rangeH];
  //       switch (r.type) {
  //         // Document results
  //         case CONST.TABLE_RESULT_TYPES.DOCUMENT:
  //           const collection = game.collections.get(r.documentCollection);
  //           if (!collection) continue;
  //           // Get the original document, if the name still matches - take no action
  //           const original = r.documentId ? collection.get(r.documentId) : null;
  //           if (original && (original.name === r.text)) continue;
  //           // Otherwise, find the document by ID or name (ID preferred)
  //           const doc = collection.find(e => (e.id === r.text) || (e.name === r.text)) || null;
  //           r.documentId = doc?.id ?? null;
  //           r.text = doc?.name ?? null;
  //           r.img = doc?.img ?? null;
  //           r.img = doc?.thumb || doc?.img || null;
  //           break;
  //         // Compendium results
  //         case CONST.TABLE_RESULT_TYPES.COMPENDIUM:
  //           const pack = await getCompendiumCollectionAsync(r.documentCollection, true, false);
  //           if (pack) {
  //             // Get the original entry, if the name still matches - take no action
  //             const original = pack.index.get(r.documentId) || null;
  //             if (original && (original.name === r.text)) continue;
  //             // Otherwise, find the document by ID or name (ID preferred)
  //             const doc = pack.index.find(i => (i._id === r.text) || (i.name === r.text)) || null;
  //             r.documentId = doc?._id || null;
  //             r.text = doc?.name || null;
  //             r.img = doc?.thumb || doc?.img || null;
  //           }
  //           break;
  //         // Plain text results
  //         default:
  //           r.type = 0;
  //           r.documentCollection = null;
  //           r.documentId = null;
  //       }
  //     }
  //     // Update the object
  //     return this.document.update(expanded, {diff: false, recursive: false});
  //   }
  /* -------------------------------------------- */
  /**
   * MOD Modified copy of core _animateRoll to ensure it does not constantly break with the changed layout.
   * Display a roulette style animation when a Roll Table result is drawn from the sheet
   * @param {TableResult[]} results     An Array of drawn table results to highlight
   * @returns {Promise}                  A Promise which resolves once the animation is complete
   * @protected
   */
  async _animateRoll(results2) {
    const tableResults = this.element[0].querySelector(".table-results > tbody");
    const drawnIds = new Set(results2.map((r) => r.id));
    const drawnItems = Array.from(tableResults.children).filter((item2) => drawnIds.has(item2.dataset.resultId));
    const nResults = this.object.results.size;
    const maxTime = 2e3;
    let animTime = 50;
    let animOffset = Math.round(tableResults.offsetHeight / (tableResults.children[1].offsetHeight * 2));
    const nLoops = Math.min(Math.ceil(maxTime / (animTime * nResults)), 4);
    if (nLoops === 1)
      animTime = maxTime / nResults;
    await this._animateRoulette(tableResults, drawnIds, nLoops, animTime, animOffset);
    const flashes = drawnItems.map((li) => this._flashResult(li));
    return Promise.all(flashes);
  }
  /* -------------------------------------------- */
  //   /**
  //    * Animate a "roulette" through the table until arriving at the final loop and a drawn result
  //    * @param {HTMLOListElement} ol     The list element being iterated
  //    * @param {Set<string>} drawnIds    The result IDs which have already been drawn
  //    * @param {number} nLoops           The number of times to loop through the animation
  //    * @param {number} animTime         The desired animation time in milliseconds
  //    * @param {number} animOffset       The desired pixel offset of the result within the list
  //    * @returns {Promise}               A Promise that resolves once the animation is complete
  //    * @protected
  //    */
  //   async _animateRoulette(ol, drawnIds, nLoops, animTime, animOffset) {
  //     let loop = 0;
  //     let idx = 0;
  //     let item = null;
  //     return new Promise(resolve => {
  //       let animId = setInterval(() => {
  //         if (idx === 0) loop++;
  //         if (item) item.classList.remove("roulette");
  //         // Scroll to the next item
  //         item = ol.children[idx];
  //         ol.scrollTop = (idx - animOffset) * item.offsetHeight;
  //         // If we are on the final loop
  //         if ( (loop === nLoops) && drawnIds.has(item.dataset.resultId) ) {
  //           clearInterval(animId);
  //           return resolve();
  //         }
  //         // Continue the roulette and cycle the index
  //         item.classList.add("roulette");
  //         idx = idx < ol.children.length - 1 ? idx + 1 : 0;
  //       }, animTime);
  //     });
  //   }
  /* -------------------------------------------- */
  //   /**
  //    * Display a flashing animation on the selected result to emphasize the draw
  //    * @param {HTMLElement} item      The HTML &lt;li> item of the winning result
  //    * @returns {Promise}              A Promise that resolves once the animation is complete
  //    * @protected
  //    */
  //   async _flashResult(item) {
  //     return new Promise(resolve => {
  //       let count = 0;
  //       let animId = setInterval(() => {
  //         if (count % 2) item.classList.remove("roulette");
  //         else item.classList.add("roulette");
  //         if (count === 7) {
  //           clearInterval(animId);
  //           resolve();
  //         }
  //         count++;
  //       }, 50);
  //     });
  //   }
  /* ============================================== */
  /**
   * @param {DragEvent} event
   */
  _onDragStart(event) {
    const eel = event.target;
    const el = eel.dataset.resultId ? eel : eel.closest(".table-result[data-result-id]");
    event.dataTransfer?.setData(
      "text/plain",
      JSON.stringify({ event: "sort", index: el.dataset.index, result: el.dataset.resultId })
    );
  }
  /**
   * @param {String} source Source ID
   * @param {String} target Target ID
   */
  async reorderIndex(event, source, target) {
    if (!this.rendered || this._submitting)
      return false;
    await this._onSubmit(event);
    const results2 = this.document.results.map((result) => result.toObject(false));
    results2.sort((a, b) => a.range[0] - b.range[0]);
    const sourceIx = results2.findIndex((r) => r._id === source), targetIx = results2.findIndex((r) => r._id === target);
    if (sourceIx == targetIx) {
      Logger.warn("Can't move result onto itself.", true);
      return;
    }
    const [moved] = results2.splice(sourceIx, 1);
    results2.splice(targetIx, 0, moved);
    results2.forEach((r) => r.weight = r.range[1] - (r.range[0] - 1));
    let totalWeight = 1;
    const updates = [];
    for (const result of results2) {
      const w = result.weight;
      updates.push({ _id: result._id, weight: w, range: [totalWeight, totalWeight + w - 1] });
      totalWeight = totalWeight + w;
    }
    return this.document.updateEmbeddedDocuments("TableResult", updates);
  }
  /**
   * Sets weights based on ranges
   * @param {Event} event
   */
  async _onNormalizeWeights(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.rendered || this._submitting)
      return false;
    await this._onSubmit(event);
    const results2 = this.document.results.map((result) => result.toObject(false));
    const updates = results2.map((r) => ({ _id: r._id, weight: r.range[1] - (r.range[0] - 1) }));
    return this.document.updateEmbeddedDocuments("TableResult", updates);
  }
  /**
   * @param {Event} event
   */
  async _openRichEditor(event) {
    event.preventDefault();
    event.stopPropagation();
    await this._onSubmit(event);
    const parent = event.target.closest(".table-result[data-result-id]");
    const id = parent.dataset.resultId;
    const result = this.document.results.get(id);
    const uuid = `richedit-${result.uuid}`;
    const old = Object.values(ui.windows).find((app) => app.options.id === uuid);
    if (old)
      return old.render(true, { focus: true });
    await RichResultEdit.open(result);
  }
  /**
   * @param {Event} event
   */
  _toggleSimpleEditor(event, html) {
    event.preventDefault();
    event.stopPropagation();
    const simpleEditor = document.createElement("textarea");
    simpleEditor.name = "description";
    simpleEditor.innerHTML = this.object.description;
    const editor = html.querySelector(".description-editor");
    editor?.replaceChildren(simpleEditor);
    this.editors = {};
  }
  _getSubmitData(updateData) {
    const data = super._getSubmitData(updateData);
    if (data.description == "<p></p>")
      data.description = "";
    return data;
  }
  /* -------------------------------------------- */
  /**
   * Handle toggling the drawn status of the result in the table
   * @param {Event} event
   * @private
   */
  async _onEditResult(event) {
    event.preventDefault();
    const tableResult = event.currentTarget.closest(".table-result");
    const result = this.document.results.get(tableResult.dataset.resultId);
    let findDocument = await BRTBetterHelpers.retrieveDocumentFromResult(result, true);
    let isJournal = findDocument instanceof JournalEntry;
    let docJournalPageUuid = getProperty(
      result,
      `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`
    );
    if (isJournal && docJournalPageUuid) {
      findDocument = await fromUuid(docJournalPageUuid);
    }
    if (findDocument) {
      findDocument.sheet.render(true);
    } else {
      Logger.warn(`No document is been found to edit`, true);
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onBetterRollTablesRoll(event) {
    event.preventDefault();
    await this.submit({ preventClose: true, preventRender: true });
    if (event.currentTarget) {
      event.currentTarget.disabled = true;
    } else {
      event.target.disabled = true;
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_HARVEST) {
      await this.document.setFlag(
        CONSTANTS.MODULE_ID,
        CONSTANTS.FLAGS.TABLE_TYPE_KEY,
        CONSTANTS.TABLE_TYPE_HARVEST
      );
    }
    const tableEntity = this.document;
    await API$1.generateChatHarvest(tableEntity);
    if (event.currentTarget) {
      event.currentTarget.disabled = false;
    } else {
      event.target.disabled = false;
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onBetterRollTablesGenerateHarvest(event) {
    event.preventDefault();
    await this.submit({ preventClose: true, preventRender: true });
    if (event.currentTarget) {
      event.currentTarget.disabled = true;
    } else {
      event.target.disabled = true;
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_HARVEST) {
      await this.document.setFlag(
        CONSTANTS.MODULE_ID,
        CONSTANTS.FLAGS.TABLE_TYPE_KEY,
        CONSTANTS.TABLE_TYPE_HARVEST
      );
    }
    const tableEntity = this.document;
    await API$1.generateHarvest(tableEntity);
    if (event.currentTarget) {
      event.currentTarget.disabled = false;
    } else {
      event.target.disabled = false;
    }
  }
  /**
   * Handle drawing a result from the RollTable
   * @param {Event} event
   * @private
   */
  async _onBetterRollTablesGenerateHarvestToken(event) {
    event.preventDefault();
    await this.submit({ preventClose: true, preventRender: true });
    if (event.currentTarget) {
      event.currentTarget.disabled = true;
    } else {
      event.target.disabled = true;
    }
    const brtTypeToCheck = BRTUtils.retrieveBRTType(this.document);
    if (brtTypeToCheck !== CONSTANTS.TABLE_TYPE_HARVEST) {
      await this.document.setFlag(
        CONSTANTS.MODULE_ID,
        CONSTANTS.FLAGS.TABLE_TYPE_KEY,
        CONSTANTS.TABLE_TYPE_HARVEST
      );
    }
    const tableEntity = this.document;
    await API$1.generateHarvestOnSelectedToken(tableEntity);
    if (event.currentTarget) {
      event.currentTarget.disabled = false;
    } else {
      event.target.disabled = false;
    }
  }
  /* -------------------------------------------- */
  /**
   * Submit the entire form when a table result type is changed, in case there are other active changes
   * @param {Event} event
   * @private
   */
  async _onChangeResultJournalPageId(event) {
    event.preventDefault();
    const select = event.target;
    const value = select.value;
    select.name;
    const tableResult = event.currentTarget.closest(".table-result");
    const result = this.document.results.get(tableResult.dataset.resultId);
    setProperty(result, `flags.${CONSTANTS.MODULE_ID}.${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`, value);
    await this._onSubmit(event);
    await result.update({
      flags: {
        [`${CONSTANTS.MODULE_ID}`]: {
          [`${CONSTANTS.FLAGS.GENERIC_RESULT_JOURNAL_PAGE_UUID}`]: value ?? ""
        }
      }
    });
  }
  /* -------------------------------------------- */
};
__name(_BetterRollTableHarvestConfig, "BetterRollTableHarvestConfig");
let BetterRollTableHarvestConfig = _BetterRollTableHarvestConfig;
const _BetterRolltableHooks = class _BetterRolltableHooks {
  // /**
  //  * Hooks on game hooks and attaches methods
  //  */
  // static init() {
  //   Hooks.once("init", BetterRolltableHooks.foundryInit);
  //   Hooks.once("ready", BetterRolltableHooks.foundryReady);
  //   Hooks.once("aipSetup", BetterRolltableHooks.onAIPSetup);
  //   Hooks.once("devModeReady", BetterRolltableHooks.onDevModeReady);
  //   Hooks.once("setup", BetterRolltableHooks.foundrySetup);
  // }
  static foundrySetup() {
    game.modules.get(CONSTANTS.MODULE_ID).api = API$1;
    game.betterTables = game.modules.get(CONSTANTS.MODULE_ID).api.betterTables;
    game.modules.get(CONSTANTS.MODULE_ID).public = {
      API: game.modules.get(CONSTANTS.MODULE_ID).api
    };
    Object.freeze(game.modules.get(CONSTANTS.MODULE_ID).public);
  }
  static async foundryReady() {
    Hooks.on("renderRollTableConfig", BetterTables.checkRenderDefaultRollTableConfig);
    Hooks.on("renderChatMessage", BetterTables.handleChatMessageButtons);
    Handlebars.registerHelper("ifcontain", function() {
      const options2 = arguments[arguments.length - 1];
      for (let i = 1; i < arguments.length - 1; i++) {
        if (arguments[0] === arguments[i]) {
          return options2.fn(this);
        }
      }
      return options2.inverse(this);
    });
    Handlebars.registerHelper("ifgt", function(a, b, options2) {
      return a > b ? options2.fn(this) : options2.inverse(this);
    });
    Handlebars.registerHelper("entity-icon", function(documentName) {
      return BRTUtils.getIconByEntityType(documentName);
    });
    Handlebars.registerHelper("format-currencies", function(currenciesData) {
      let currencyString = "";
      for (const key in currenciesData) {
        if (currencyString !== "")
          currencyString += ", ";
        currencyString += `${currenciesData[key]}${key}`;
      }
      return currencyString;
    });
    Handlebars.registerHelper("switch", function(value, options2) {
      this.switch_value = value;
      return options2.fn(this);
    });
    Handlebars.registerHelper("brt-isEmpty", function(value, options2) {
      return isEmptyObject(value) || value === "" ? options2.fn(this) : options2.inverse(this);
    });
    Handlebars.registerHelper("brt-unlessEmpty", function(value, options2) {
      return !isEmptyObject(value) && value !== "" ? options2.fn(this) : options2.inverse(this);
    });
    Handlebars.registerHelper("case", function(value, options2) {
      if (value == this.switch_value) {
        return options2.fn(this);
      }
    });
    CompendiumsHelpers.initializeCompendiumCache();
  }
  static foundryInit() {
    registerSettings();
    Hooks.on("getCompendiumDirectoryEntryContext", BetterTables.enhanceCompendiumContextMenu);
    Hooks.on("getRollTableDirectoryEntryContext", BetterTables.enhanceRolltableContextMenu);
    Hooks.once("aipSetup", _BetterRolltableHooks.onAIPSetup);
    Hooks.on("getActorSheetHeaderButtons", (app, array, options2) => {
      BRTActorList.initializeActorList(app, array);
    });
    RollTables.registerSheet(CONSTANTS.MODULE_ID, BetterRollTableBetterConfig, {
      label: "BRT - Better Rolltable",
      makeDefault: false
    });
    RollTables.registerSheet(CONSTANTS.MODULE_ID, BetterRollTableLootConfig, {
      label: "BRT - Loot Rolltable",
      makeDefault: false
    });
    RollTables.registerSheet(CONSTANTS.MODULE_ID, BetterRollTableStoryConfig, {
      label: "BRT - Story Rolltable",
      makeDefault: false
    });
    RollTables.registerSheet(CONSTANTS.MODULE_ID, BetterRollTableHarvestConfig, {
      label: "BRT - Harvest Rolltable",
      makeDefault: false
    });
  }
  /**
   * Register with AIP
   *
   * Register fields with autocomplete inline properties
   */
  static async onAIPSetup() {
    const autocompleteInlinePropertiesApi = game.modules.get("autocomplete-inline-properties").API;
    const DATA_MODE = autocompleteInlinePropertiesApi.CONST.DATA_MODE;
    const config = {
      packageName: CONSTANTS.MODULE_ID,
      sheetClasses: [
        {
          name: "RolltableConfig",
          // this _must_ be the class name of the `Application` you want it to apply to
          fieldConfigs: [
            {
              selector: `.tags .tagger input`,
              showButton: true,
              allowHotkey: true,
              dataMode: DATA_MODE.OWNING_ACTOR_DATA
            }
          ]
        }
      ]
    };
    autocompleteInlinePropertiesApi.PACKAGE_CONFIG.push(config);
  }
  //   static onDevModeReady({ registerPackageDebugFlag }) {
  //     registerPackageDebugFlag(CONSTANTS.MODULE_ID);
  //   }
};
__name(_BetterRolltableHooks, "BetterRolltableHooks");
let BetterRolltableHooks = _BetterRolltableHooks;
Hooks.once("init", async () => {
  BetterRolltableHooks.foundryInit();
});
Hooks.once("setup", () => {
  BetterRolltableHooks.foundrySetup();
});
Hooks.once("ready", async () => {
  setTimeout(() => {
    if (game.user.isGM) {
      if (!game.modules.get("socketlib")?.active && game.user?.isGM) {
        let word = "install and activate";
        if (game.modules.get("socketlib"))
          word = "activate";
        throw Logger.error(`Requires the 'socketlib' module. Please ${word} it.`);
      }
      if (!game.modules.get("item-piles")?.active && game.user?.isGM) {
        let word = "install and activate";
        if (game.modules.get("item-piles"))
          word = "activate";
        throw Logger.error(`Requires the 'item-piles' module. Please ${word} it.`);
      }
    }
    BetterRolltableHooks.foundryReady();
  }, 100);
});
Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(CONSTANTS.MODULE_ID);
});
Hooks.once("socketlib.ready", () => {
  registerSocket();
});
//# sourceMappingURL=module.js.map
