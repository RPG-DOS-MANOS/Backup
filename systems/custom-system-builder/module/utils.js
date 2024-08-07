/*
 * Copyright 2024 Jean-Baptiste Louvet-Daniel
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { COMPARISON_OPERATOR, MODIFIER_OPERATOR } from './definitions.js';
/**
 * @ignore
 */
export const postCustomSheetRoll = async (messageText, alternative = false) => {
    const actor = (canvas.tokens.controlled[0]?.actor ?? game.user.character);
    if (actor && actor.testUserPermission(game.user, CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER)) {
        try {
            actor.roll(messageText, { alternative });
        }
        catch (err) {
            ui.notifications.error(err.message);
        }
    }
    else {
        ui.notifications.error('No suitable selected actor to roll for');
    }
};
/**
 * Posts a chat message with a computed phrase data
 * @ignore
 */
export const postAugmentedChatMessage = async (textContent, msgOptions, { rollMode, create } = { create: true }) => {
    rollMode = rollMode || game.settings.get('core', 'rollMode');
    // chat-roll is just the html template for computed formulas
    const template_file = `systems/${game.system.id}/templates/chat/chat-roll.html`;
    let phrase = textContent.buildPhrase;
    if (!phrase) {
        return;
    }
    const values = textContent.values;
    const rolls = [];
    // Render all formulas HTMLs
    for (const key in values) {
        let formattedValue = String(values[key].result);
        if (values[key].explanation) {
            formattedValue = await renderTemplate(template_file, {
                rollData: values[key],
                jsonRollData: JSON.stringify(values[key]).replaceAll(/\[\[/g, '[').replaceAll(/]]/g, ']'),
                rollMode: rollMode
            });
        }
        if (phrase.startsWith('/')) {
            formattedValue = formattedValue.replaceAll(/"/g, '\\"');
        }
        // Using function for replace to ignore problems linked to '$' character in replace function
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_the_replacement
        phrase = phrase.replace(key, () => formattedValue);
        for (const roll of values[key].rolls) {
            rolls.push(Roll.fromData(roll.roll));
        }
    }
    phrase = phrase.replaceAll(/\n/g, '').trim();
    let msgRoll = null;
    let chatRollData = {};
    if (rolls.length > 0) {
        const pool = PoolTerm.fromRolls(rolls);
        msgRoll = Roll.fromTerms([pool]);
        chatRollData = {
            roll: msgRoll,
            type: CONST.CHAT_MESSAGE_TYPES.ROLL
        };
    }
    let whisper = null;
    // If setting expandRollVisibility is checked, we apply the appropriate whispers to the message
    if (game.settings.get(game.system.id, 'expandRollVisibility')) {
        const gmList = ChatMessage.getWhisperRecipients('GM');
        if (rollMode !== CONST.DICE_ROLL_MODES.PUBLIC) {
            chatRollData.type = CONST.CHAT_MESSAGE_TYPES.WHISPER;
        }
        chatRollData.rollMode = CONST.DICE_ROLL_MODES.PUBLIC;
        switch (rollMode) {
            case CONST.DICE_ROLL_MODES.PRIVATE:
                whisper = gmList;
                break;
            case CONST.DICE_ROLL_MODES.BLIND:
                whisper = gmList;
                break;
            case CONST.DICE_ROLL_MODES.SELF:
                whisper = [game.user];
                break;
            default:
                break;
        }
    }
    else {
        chatRollData.rollMode = rollMode;
    }
    const chatData = foundry.utils.mergeObject(msgOptions, foundry.utils.mergeObject({
        content: phrase,
        whisper,
        sound: CONFIG.sounds.dice
    }, chatRollData));
    if (create) {
        // Final chat message creation
        if (Hooks.call('chatMessage', ui.chat, phrase, chatData) === false)
            return;
        return ChatMessage.create(chatData);
    }
    else {
        const msg = new ChatMessage(chatData);
        if (rollMode) {
            msg.applyRollMode(rollMode);
        }
        return msg.toObject();
    }
};
/**
 * @ignore
 */
export const applyModifiers = (value, modifiers = []) => {
    const filteredModifiers = modifiers
        .filter((modifier) => !!modifier.isSelected)
        .sort((mod1, mod2) => {
        const operatorOrder = ['set', 'multiply', 'divide', 'add', 'subtract'];
        let sortIndex = mod1.priority - mod2.priority;
        if (sortIndex === 0) {
            sortIndex = operatorOrder.indexOf(mod1.operator) - operatorOrder.indexOf(mod2.operator);
        }
        return sortIndex;
    });
    for (const modifier of filteredModifiers) {
        switch (modifier.operator) {
            case MODIFIER_OPERATOR.SET:
                if (String(modifier.value) !== '') {
                    value = isNaN(Number(modifier.value)) ? String(modifier.value) : Number(modifier.value);
                }
                break;
            case MODIFIER_OPERATOR.MULTIPLY:
                value = Number(value) * Number(modifier.value);
                break;
            case MODIFIER_OPERATOR.DIVIDE:
                value = Number(value) / Number(modifier.value);
                break;
            case MODIFIER_OPERATOR.SUBTRACT:
                value = Number(value) - Number(modifier.value);
                break;
            case MODIFIER_OPERATOR.ADD:
            default:
                value = Number(value) + Number(modifier.value);
                break;
        }
    }
    return value;
};
/**
 * @ignore
 */
export const removeEmpty = (obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] === Object(obj[key]))
            newObj[key] = removeEmpty(obj[key]);
        else if (obj[key] !== undefined)
            newObj[key] = obj[key];
    });
    return newObj;
};
/**
 * @param value
 */
export const castToPrimitive = (value) => {
    if (typeof value === 'string') {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        const numericValue = parseInt(value);
        if (!Number.isNaN(numericValue) && /^[-+]?\d+$/.test(value)) {
            return numericValue;
        }
    }
    return value;
};
export const getSortOrder = (a, b, value, operator) => {
    switch (operator) {
        case COMPARISON_OPERATOR.GREATER_THAN:
            if (typeof a === 'string' && typeof b === 'string') {
                return -a.localeCompare(b);
            }
            else {
                return a > b ? -1 : a < b ? 1 : 0;
            }
        case COMPARISON_OPERATOR.LESSER_THAN:
            if (typeof a === 'string' && typeof b === 'string') {
                return a.localeCompare(b);
            }
            else {
                return a < b ? -1 : a > b ? 1 : 0;
            }
        case COMPARISON_OPERATOR.NOT_EQUALS:
            return a !== value && b !== value ? 0 : a !== value ? -1 : 1;
        case COMPARISON_OPERATOR.EQUALS:
            return a === value && b === value ? 0 : a === value ? -1 : 1;
        default:
            return 0;
    }
};
export const getGameCollectionAsTemplateSystems = (collectionType) => {
    switch (collectionType) {
        case 'actor':
            return game.actors.map((actor) => actor.templateSystem);
        case 'item':
            return game.items.map((item) => item.templateSystem);
        default:
            throw new Error(`Unknown entity type ${collectionType}`);
    }
};
export const getGameCollection = (collectionType) => {
    switch (collectionType) {
        case 'actor':
            return game.actors;
        case 'item':
            return game.items;
        default:
            throw new Error(`Unknown entity type ${collectionType}`);
    }
};
export const getLocalizedRoleList = (keyType) => {
    return Object.fromEntries(Object.entries(CONST.USER_ROLES).map(([key, value]) => [
        keyType == 'number' ? value : key,
        game.i18n.localize(`USER.Role${key.toLowerCase().capitalize()}`)
    ]));
};
export const getLocalizedPermissionList = (keyType) => {
    return Object.fromEntries(Object.entries(CONST.DOCUMENT_PERMISSION_LEVELS).map(([key, value]) => [
        keyType == 'number' ? value : key,
        game.i18n.localize(`OWNERSHIP.${key}`)
    ]));
};
export const updateKeysOnCopy = (components, availableKeys) => {
    for (const component of components) {
        //TODO remove this check once Table is composed of sub Components for Rows
        if (component) {
            if (component.key && availableKeys.has(component.key)) {
                let suffix = 1;
                const originalKey = component.key;
                do {
                    component.key = originalKey + '_copy' + suffix;
                    suffix++;
                } while (availableKeys.has(component.key));
            }
            if (component.contents && component.contents.length > 0) {
                if (Array.isArray(component.contents[0])) {
                    //TODO remove this once Table is composed of sub Components for Rows
                    component.contents = component.contents.map((row) => {
                        return updateKeysOnCopy(row, availableKeys);
                    });
                }
                else {
                    component.contents = updateKeysOnCopy(component.contents, availableKeys);
                }
            }
        }
    }
    return components;
};
