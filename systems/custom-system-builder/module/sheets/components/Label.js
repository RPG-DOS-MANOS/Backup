/*
 * Copyright 2024 Jean-Baptiste Louvet-Daniel
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { applyModifiers } from '../../utils.js';
import InputComponent from './InputComponent.js';
import Logger from '../../Logger.js';
/**
 * Label component
 * @ignore
 */
class Label extends InputComponent {
    /**
     * Label constructor
     */
    constructor(props) {
        super(props);
        this._icon = props.icon;
        this._value = props.value;
        this._prefix = props.prefix;
        this._suffix = props.suffix;
        this._rollMessage = props.rollMessage;
        this._altRollMessage = props.altRollMessage;
        this._rollMessageToChat = props.rollMessageToChat;
        this._altRollMessageToChat = props.altRollMessageToChat;
        this._style = props.style;
    }
    /**
     * Renders component
     * @override
     * @param entity Rendered entity (actor or item)
     * @param isEditable Is the component editable by the current user ?
     * @param options Additional options usable by the final Component
     * @return The jQuery element holding the component
     */
    async _getElement(entity, isEditable = true, options = { computeExplanation: false, availableKeys: [] }) {
        const { customProps = {}, linkedEntity, reference } = options;
        const formulaProps = foundry.utils.mergeObject(entity.system?.props ?? {}, customProps, { inplace: false });
        let jQElement;
        switch (this._style) {
            case 'title':
                jQElement = $('<h3></h3>');
                break;
            case 'subtitle':
                jQElement = $('<h4></h4>');
                break;
            case 'bold':
                jQElement = $('<b></b>');
                break;
            case 'button':
                jQElement = $('<button></button>');
                jQElement.attr('type', 'button');
                break;
            case 'label':
            default:
                jQElement = $('<span></span>');
                break;
        }
        let content = '';
        let labelValue = '';
        if (entity.isTemplate) {
            if (this._prefix) {
                content += this._prefix;
            }
            content += this._value === '' ? '&#9744;' : this._value;
            if (this._suffix) {
                content += this._suffix;
            }
        }
        else {
            if (this._prefix) {
                content += (await ComputablePhrase.computeMessage(this._prefix, formulaProps, {
                    source: `${this.key}.prefix`,
                    reference,
                    defaultValue: '',
                    triggerEntity: entity,
                    linkedEntity
                })).result;
            }
            // If Label has a key, it was computed with the derivedData of the entity, no need to recompute it
            if (this.key &&
                foundry.utils.getProperty(formulaProps, this.key) !== null &&
                foundry.utils.getProperty(formulaProps, this.key) !== undefined) {
                labelValue = foundry.utils.getProperty(formulaProps, this.key);
                Logger.debug('Using precomputed value for ' + this.key + ' : ' + labelValue);
            }
            else {
                try {
                    labelValue = (await ComputablePhrase.computeMessage(this._value ?? '', formulaProps, {
                        source: `${this.key}`,
                        reference,
                        defaultValue: '',
                        triggerEntity: entity,
                        linkedEntity
                    })).result;
                }
                catch (err) {
                    Logger.error(err.message, err);
                    labelValue = 'ERROR';
                }
            }
            content += labelValue;
            if (this._suffix) {
                content += (await ComputablePhrase.computeMessage(this._suffix, formulaProps, {
                    source: `${this.key}.suffix`,
                    reference,
                    defaultValue: '',
                    triggerEntity: entity,
                    linkedEntity
                })).result;
            }
        }
        const baseElement = await super._getElement(entity, isEditable, options);
        jQElement.addClass('custom-system-label-root');
        const iconDiv = $('<div></div>');
        iconDiv.addClass('custom-system-label-icons');
        if (this._icon) {
            const iconElement = $('<i></i>');
            iconElement.addClass('custom-system-roll-icon fas fa-' + this._icon);
            iconDiv.append(iconElement);
        }
        jQElement.append(iconDiv);
        const contentDiv = $('<div></div>');
        contentDiv.addClass('custom-system-label');
        if (this._style) {
            contentDiv.addClass('custom-system-label-' + this._style);
        }
        contentDiv.append(content);
        contentDiv.attr('data-value', labelValue);
        contentDiv.attr('data-name', this.key ?? '');
        jQElement.append(contentDiv);
        if (isEditable && this._rollMessage) {
            const rollElement = $('<a></a>');
            rollElement.addClass('custom-system-rollable');
            rollElement.append(jQElement);
            const rollIcon = game.settings.get(game.system.id, 'rollIcon');
            if (rollIcon) {
                const rollIconElement = $('<i></i>');
                rollIconElement.addClass('custom-system-roll-icon fas fa-' + rollIcon);
                iconDiv.prepend(rollIconElement);
            }
            if (!entity.isTemplate) {
                rollElement.on('click', async (ev) => {
                    let rollMessage, postMessage, source;
                    if (ev.shiftKey) {
                        rollMessage = this._altRollMessage;
                        postMessage = this._altRollMessageToChat;
                        source = 'alternativeLabelRollMessage';
                    }
                    else {
                        rollMessage = this._rollMessage;
                        postMessage = this._rollMessageToChat;
                        source = 'labelRollMessage';
                    }
                    if (rollMessage) {
                        this._generateChatFunction(rollMessage, entity, {
                            source: `${this.key}.${source}`,
                            reference,
                            customProps: options.customProps,
                            linkedEntity
                        })(postMessage);
                    }
                });
                if (this.key) {
                    rollElement.on('contextmenu', (ev) => {
                        const contextMenuElement = $('<nav></nav>');
                        contextMenuElement.attr('id', `context-menu`);
                        contextMenuElement.addClass('custom-system-roll-context');
                        const contextActionList = $('<ol></ol>');
                        contextActionList.addClass('context-items');
                        const contextActions = [
                            {
                                name: 'Add as macro',
                                icon: '<i class="fas fa-scroll"></i>',
                                callback: () => {
                                    const rollCode = this.getRollCode(entity);
                                    if (!rollCode) {
                                        return;
                                    }
                                    const chatCommand = '/sheetRoll ' + rollCode;
                                    new Dialog({
                                        title: 'Add macro',
                                        content: '<div>' +
                                            "<label for='macroName'>Macro Name : </label><input id='macroName' type='text' />" +
                                            '</div>' +
                                            "<p>Macro slot :</p><div style='margin-bottom: 24px'>" +
                                            "<div style='width: 50%;display: inline-block;'>" +
                                            "<label for='macroPage'>Page : </label><input id='macroPage' type='number' />" +
                                            "</div><div style='width: 50%;display: inline-block;'>" +
                                            "<label for='macroSlot'>Slot : </label><input id='macroSlot' type='number' />" +
                                            '</div></div>',
                                        buttons: {
                                            save: {
                                                label: 'Save',
                                                callback: (html) => {
                                                    const macroName = $(html).find('#macroName').val()?.toString() ?? '';
                                                    if (macroName === '') {
                                                        throw new Error('Please enter a name');
                                                    }
                                                    const pageNumber = parseInt($(html).find('#macroPage').val()?.toString() ?? '0') - 1;
                                                    let slotNumber = parseInt($(html).find('#macroSlot').val()?.toString() ?? '-1');
                                                    if (pageNumber < 0 || pageNumber > 4) {
                                                        throw new Error('Please enter a page number between 1 and 5');
                                                    }
                                                    if (slotNumber < 0 || slotNumber > 9) {
                                                        throw new Error('Please enter a slot number between 0 and 9');
                                                    }
                                                    if (slotNumber === 0) {
                                                        slotNumber = 10;
                                                    }
                                                    const finalSlotNumber = String(pageNumber * 10 + slotNumber);
                                                    Macro.create({
                                                        name: macroName,
                                                        type: CONST.MACRO_TYPES.CHAT,
                                                        user: game.user.id,
                                                        command: chatCommand,
                                                        folder: null
                                                    }).then((newMacro) => {
                                                        game.user.assignHotbarMacro(newMacro, parseInt(finalSlotNumber));
                                                        newMacro.sheet.render(true);
                                                    });
                                                }
                                            },
                                            cancel: {
                                                label: 'Cancel',
                                                callback: () => { }
                                            }
                                        }
                                    }, {
                                        width: undefined
                                    }).render(true);
                                    contextMenuElement.slideUp(200, () => {
                                        contextMenuElement.remove();
                                    });
                                }
                            },
                            {
                                name: 'Copy chat command',
                                icon: '<i class="fas fa-comment"></i>',
                                callback: () => {
                                    const rollCode = this.getRollCode(entity);
                                    if (!rollCode) {
                                        return;
                                    }
                                    const chatCommand = '/sheetRoll ' + rollCode;
                                    navigator.clipboard
                                        .writeText(chatCommand)
                                        .then(() => {
                                        ui.notifications.info('Chat command copied in clipboard ! You can now paste it in the chat or use it in a chat macro !');
                                    })
                                        .catch(() => {
                                        Dialog.prompt({
                                            title: 'Copy chat command',
                                            content: `<p>Please copy the command in the text box below. You can then paste it in the chat or use it in a chat macro.</p><input type="text" value="${chatCommand}" />`,
                                            label: 'Close',
                                            render: (html) => {
                                                const input = $(html).find('input');
                                                input.on('click', () => {
                                                    input.trigger('select');
                                                });
                                                input.trigger('click');
                                            },
                                            callback: () => { },
                                            options: {
                                                width: undefined
                                            }
                                        });
                                    });
                                    contextMenuElement.slideUp(200, () => {
                                        contextMenuElement.remove();
                                    });
                                }
                            },
                            {
                                name: 'Copy macro script',
                                icon: '<i class="fas fa-cogs"></i>',
                                callback: () => {
                                    Logger.log('Copying script for ' + this.key);
                                    const rollCode = this.getRollCode(entity);
                                    if (!rollCode) {
                                        return;
                                    }
                                    const chatCommand = 'let rollMessage = await actor.roll(\n' +
                                        "    '" +
                                        rollCode +
                                        "',\n" +
                                        '    { postMessage: false}\n' +
                                        ');\n\n' +
                                        'let speakerData = ChatMessage.getSpeaker({\n' +
                                        '    actor: actor,\n' +
                                        '    token: actor.getActiveTokens()?.[0]?.document,\n' +
                                        '    scene: game.scenes.current\n' +
                                        '});\n\n' +
                                        'rollMessage.postMessage({speaker: speakerData});';
                                    navigator.clipboard
                                        .writeText(chatCommand)
                                        .then(() => {
                                        ui.notifications.info('Macro script copied in clipboard ! You can now use it in a script macro !');
                                    })
                                        .catch(() => {
                                        Dialog.prompt({
                                            title: 'Copy chat command',
                                            content: `<p>Please copy the script in the text box below. You can then use it in a script macro.</p><input type="text" value="${chatCommand}" />`,
                                            label: 'Close',
                                            render: (html) => {
                                                const input = $(html).find('input');
                                                input.on('click', () => {
                                                    input.trigger('select');
                                                });
                                                input.trigger('click');
                                            },
                                            callback: () => { },
                                            options: {
                                                width: undefined
                                            }
                                        });
                                    });
                                    contextMenuElement.slideUp(200, () => {
                                        contextMenuElement.remove();
                                    });
                                }
                            }
                        ];
                        if (this._altRollMessage) {
                            contextActions.push({
                                name: 'Add alternative as macro',
                                icon: '<i class="fas fa-scroll"></i>',
                                callback: () => {
                                    const rollCode = this.getRollCode(entity);
                                    if (!rollCode) {
                                        return;
                                    }
                                    const chatCommand = '/sheetAltRoll ' + rollCode;
                                    new Dialog({
                                        title: 'Add macro',
                                        content: '<div>' +
                                            "<label for='macroName'>Macro Name : </label><input id='macroName' type='text' />" +
                                            '</div>' +
                                            "<p>Macro slot :</p><div style='margin-bottom: 24px'>" +
                                            "<div style='width: 50%;display: inline-block;'>" +
                                            "<label for='macroPage'>Page : </label><input id='macroPage' type='number' />" +
                                            "</div><div style='width: 50%;display: inline-block;'>" +
                                            "<label for='macroSlot'>Slot : </label><input id='macroSlot' type='number' />" +
                                            '</div></div>',
                                        buttons: {
                                            save: {
                                                label: 'Save',
                                                callback: (html) => {
                                                    const macroName = $(html).find('#macroName').val()?.toString() ?? '';
                                                    if (macroName === '') {
                                                        throw new Error('Please enter a name');
                                                    }
                                                    const pageNumber = parseInt($(html).find('#macroPage').val()?.toString() ?? '0') - 1;
                                                    let slotNumber = parseInt($(html).find('#macroSlot').val()?.toString() ?? '-1');
                                                    if (pageNumber < 0 || pageNumber > 4) {
                                                        throw new Error('Please enter a page number between 1 and 5');
                                                    }
                                                    if (slotNumber < -1 || slotNumber > 9) {
                                                        throw new Error('Please enter a slot number between 0 and 9');
                                                    }
                                                    if (slotNumber === 0) {
                                                        slotNumber = 10;
                                                    }
                                                    const finalSlotNumber = String(pageNumber * 10 + slotNumber);
                                                    Macro.create({
                                                        name: macroName,
                                                        type: CONST.MACRO_TYPES.CHAT,
                                                        user: game.user.id,
                                                        command: chatCommand,
                                                        folder: null
                                                    }).then((newMacro) => {
                                                        game.user.assignHotbarMacro(newMacro, parseInt(finalSlotNumber));
                                                        newMacro.sheet.render(true);
                                                    });
                                                }
                                            },
                                            cancel: {
                                                label: 'Cancel',
                                                callback: () => { }
                                            }
                                        }
                                    }, {
                                        width: undefined
                                    }).render(true);
                                    contextMenuElement.slideUp(200, () => {
                                        contextMenuElement.remove();
                                    });
                                }
                            }, {
                                name: 'Copy alternative chat command',
                                icon: '<i class="fas fa-comment"></i>',
                                callback: () => {
                                    const rollCode = this.getRollCode(entity);
                                    if (!rollCode) {
                                        return;
                                    }
                                    const chatCommand = '/sheetAltRoll ' + rollCode;
                                    navigator.clipboard
                                        .writeText(chatCommand)
                                        .then(() => {
                                        ui.notifications.info('Chat command copied in clipboard ! You can now paste it in the chat or use it in a chat macro !');
                                    })
                                        .catch(() => {
                                        Dialog.prompt({
                                            title: 'Copy chat command',
                                            content: `<p>Please copy the command in the text box below. You can then paste it in the chat or use it in a chat macro.</p><input type="text" value="${chatCommand}" />`,
                                            label: 'Close',
                                            render: (html) => {
                                                const input = $(html).find('input');
                                                input.on('click', () => {
                                                    input.trigger('select');
                                                });
                                                input.trigger('click');
                                            },
                                            callback: () => { },
                                            options: {
                                                width: undefined
                                            }
                                        });
                                    });
                                    contextMenuElement.slideUp(200, () => {
                                        contextMenuElement.remove();
                                    });
                                }
                            }, {
                                name: 'Copy alternative macro script',
                                icon: '<i class="fas fa-cogs"></i>',
                                callback: () => {
                                    Logger.log('Copying script for ' + this.key);
                                    const rollCode = this.getRollCode(entity);
                                    if (!rollCode) {
                                        return;
                                    }
                                    const chatCommand = 'let rollMessage = await actor.roll(\n' +
                                        "    '" +
                                        rollCode +
                                        "',\n" +
                                        '    { postMessage: false, alternative: true}\n' +
                                        ');\n\n' +
                                        'let speakerData = ChatMessage.getSpeaker({\n' +
                                        '    actor: actor,\n' +
                                        '    token: actor.getActiveTokens()?.[0]?.document,\n' +
                                        '    scene: game.scenes.current\n' +
                                        '});\n\n' +
                                        'rollMessage.postMessage({speaker: speakerData});';
                                    navigator.clipboard
                                        .writeText(chatCommand)
                                        .then(() => {
                                        ui.notifications.info('Macro script copied in clipboard ! You can now use it in a script macro !');
                                    })
                                        .catch(() => {
                                        Dialog.prompt({
                                            title: 'Copy chat command',
                                            content: `<p>Please copy the script in the text box below. You can then use it in a script macro.</p><input type="text" value="${chatCommand}" />`,
                                            label: 'Close',
                                            render: (html) => {
                                                const input = $(html).find('input');
                                                input.on('click', () => {
                                                    input.trigger('select');
                                                });
                                                input.trigger('click');
                                            },
                                            callback: () => { },
                                            options: {
                                                width: undefined
                                            }
                                        });
                                    });
                                    contextMenuElement.slideUp(200, () => {
                                        contextMenuElement.remove();
                                    });
                                }
                            });
                        }
                        for (const action of contextActions) {
                            const actionBullet = $('<li></li>');
                            actionBullet.addClass('context-item');
                            actionBullet.html(action.icon + action.name);
                            actionBullet.on('click', action.callback);
                            contextActionList.append(actionBullet);
                        }
                        contextMenuElement.append(contextActionList);
                        $('body').append(contextMenuElement);
                        // Set the position
                        const locationX = ev.pageX;
                        const locationY = ev.pageY;
                        contextMenuElement.css('left', `${Math.min(locationX, window.innerWidth - ((contextMenuElement.width() ?? 0) + 3))}px`);
                        contextMenuElement.css('top', `${Math.min(locationY + 3, window.innerHeight - ((contextMenuElement.height() ?? 0) + 3))}px`);
                        $('body').one('mousedown', (ev) => {
                            if (contextMenuElement.has($(ev.target)[0]).length === 0) {
                                contextMenuElement.slideUp(200, () => {
                                    contextMenuElement.remove();
                                });
                            }
                        });
                    });
                }
            }
            jQElement = rollElement;
        }
        if (entity.isTemplate) {
            jQElement.addClass('custom-system-editable-component');
            jQElement.on('click', () => {
                this.editComponent(entity);
            });
        }
        baseElement.append(jQElement);
        return baseElement;
    }
    getRollCode(entity) {
        let rollCode = this.key;
        if (this.key?.includes('.')) {
            const [dynamicTable, rowNum, targetRoll] = this.key.split('.');
            const propRowData = foundry.utils.getProperty(entity.system.props, dynamicTable + '.' + rowNum);
            let rowFilter = null;
            for (const prop in propRowData) {
                if (typeof propRowData[prop] === 'string' && propRowData[prop].length > 0) {
                    rowFilter = `(${prop}=${propRowData[prop]})`;
                    break;
                }
            }
            if (rowFilter) {
                rollCode = dynamicTable + rowFilter + '.' + targetRoll;
            }
            else {
                ui.notifications.error('Could not create chat command.');
                rollCode = undefined;
            }
        }
        return rollCode;
    }
    getComputeFunctions(entity, modifiers, options, keyOverride) {
        const computationKey = keyOverride ?? this.key;
        if (!computationKey) {
            return {};
        }
        return {
            [computationKey]: (additionalProps) => {
                const formulaProps = foundry.utils.mergeObject(foundry.utils.mergeObject(entity.system.props ?? {}, options?.customProps, {
                    inplace: false
                }), additionalProps, {
                    inplace: false
                });
                let value = ComputablePhrase.computeMessageStatic(this._value ?? '', formulaProps, {
                    ...options,
                    source: computationKey,
                    availableKeys: Object.keys(formulaProps),
                    triggerEntity: entity
                }).result;
                if (modifiers[computationKey]) {
                    value = applyModifiers(value, modifiers[computationKey]);
                }
                return value;
            }
        };
    }
    getSendToChatFunctions(entity, options = {}) {
        if (!this.key) {
            return undefined;
        }
        const res = {};
        if (this._rollMessage) {
            res.main = this._generateChatFunction(this._rollMessage, entity, options);
        }
        if (this._altRollMessage) {
            res.alternative = this._generateChatFunction(this._altRollMessage, entity, options);
        }
        if (Object.keys(res).length === 0) {
            return undefined;
        }
        return {
            [this.key]: res
        };
    }
    _generateChatFunction(rollMessage, entity, options = {}) {
        return async (postMessage = true, overrideOptions = {}) => {
            const phrase = new ComputablePhrase(rollMessage);
            await phrase.compute({
                ...entity.system.props,
                ...options.customProps,
                ...overrideOptions.customProps
            }, {
                ...options,
                ...overrideOptions,
                computeExplanation: true,
                triggerEntity: entity
            });
            if (postMessage) {
                let speakerEntity;
                switch (entity.entityType) {
                    case 'actor':
                        speakerEntity = entity.entity;
                        break;
                    case 'item':
                        speakerEntity = entity.entity.parent;
                        break;
                    default:
                        speakerEntity = null;
                }
                const speakerData = ChatMessage.getSpeaker({
                    actor: speakerEntity,
                    token: speakerEntity?.getActiveTokens()?.[0]?.document ?? null,
                    scene: game.scenes.current
                });
                phrase.postMessage({
                    speaker: speakerData
                });
            }
            return phrase;
        };
    }
    /**
     * Returns serialized component
     * @override
     */
    toJSON() {
        const jsonObj = super.toJSON();
        return {
            ...jsonObj,
            icon: this._icon,
            value: this._value ?? '',
            prefix: this._prefix ?? '',
            suffix: this._suffix ?? '',
            rollMessage: this._rollMessage,
            altRollMessage: this._altRollMessage,
            rollMessageToChat: this._rollMessageToChat,
            altRollMessageToChat: this._altRollMessageToChat,
            style: this._style,
            type: 'label'
        };
    }
    /**
     * Creates label from JSON description
     * @override
     */
    static fromJSON(json, templateAddress, parent) {
        return new Label({
            key: json.key,
            tooltip: json.tooltip,
            templateAddress: templateAddress,
            icon: json.icon,
            value: json.value,
            prefix: json.prefix,
            suffix: json.suffix,
            rollMessage: json.rollMessage,
            altRollMessage: json.altRollMessage,
            rollMessageToChat: json.rollMessageToChat,
            altRollMessageToChat: json.altRollMessageToChat,
            style: json.style,
            size: json.size,
            cssClass: json.cssClass,
            role: json.role,
            permission: json.permission,
            visibilityFormula: json.visibilityFormula,
            parent: parent
        });
    }
    /**
     * Gets pretty name for this component's type
     * @return The pretty name
     * @throws {Error} If not implemented
     */
    static getPrettyName() {
        return 'Label';
    }
    /**
     * Get configuration form for component creation / edition
     * @return The jQuery element holding the component
     */
    static async getConfigForm(existingComponent, _entity) {
        const mainElt = $('<div></div>');
        const predefinedValuesComponent = { ...existingComponent };
        if (predefinedValuesComponent.rollMessageToChat === undefined) {
            predefinedValuesComponent.rollMessageToChat = true;
        }
        if (predefinedValuesComponent.altRollMessageToChat === undefined) {
            predefinedValuesComponent.altRollMessageToChat = true;
        }
        mainElt.append(await renderTemplate(`systems/${game.system.id}/templates/_template/components/label.html`, predefinedValuesComponent));
        return mainElt;
    }
    /**
     * Attaches event-listeners to the html of the config-form
     * @param html
     */
    static attachListenersToConfigForm(html) {
        const richTextAreaSelectorsByCheckboxId = new Map([
            ['labelRichText', 'textarea#labelText'],
            ['rollRichText', 'textarea#labelRollMessage'],
            ['altRollRichText', 'textarea#labelAltRollMessage']
        ]);
        $(html)
            .find("input[name='editorToggle']")
            .on('click', (event) => {
            const checkbox = $(event.currentTarget);
            const checkboxId = checkbox[0].id;
            if (!richTextAreaSelectorsByCheckboxId.has(checkboxId)) {
                throw new Error(`Failed to map Checkbox-ID to an RTA. Unexpected Element-ID "${checkboxId}"`);
            }
            const rtaSelector = richTextAreaSelectorsByCheckboxId.get(checkboxId);
            if (rtaSelector) {
                tinymce.remove(rtaSelector);
            }
            if (checkbox.is(':checked')) {
                tinymce.init({
                    ...CONFIG.TinyMCE,
                    selector: rtaSelector
                });
            }
        });
    }
    /**
     * Extracts configuration from submitted HTML form
     * @override
     * @param html The submitted form
     * @return The JSON representation of the component
     * @throws {Error} If configuration is not correct
     */
    static extractConfig(html) {
        const superFieldData = super.extractConfig(html);
        const fieldData = {
            ...superFieldData,
            type: 'label',
            style: html.find('#labelStyle').val()?.toString() ?? '',
            size: html.find('#labelSize').val()?.toString() ?? 'full-size',
            value: html.find('#labelText').val()?.toString() ?? '',
            prefix: html.find('#labelPrefix').val()?.toString() ?? '',
            suffix: html.find('#labelSuffix').val()?.toString() ?? '',
            icon: html.find('#labelIcon').val()?.toString() ?? '',
            rollMessage: html.find('#labelRollMessage').val()?.toString() ?? '',
            altRollMessage: html.find('#labelAltRollMessage').val()?.toString() ?? '',
            rollMessageToChat: html.find('#labelRollMessageToChat').is(':checked'),
            altRollMessageToChat: html.find('#labelAltRollMessageToChat').is(':checked')
        };
        return fieldData;
    }
}
Label.valueType = 'none';
/**
 * @ignore
 */
export default Label;
