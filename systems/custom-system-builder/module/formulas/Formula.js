/*
 * Copyright 2024 Jean-Baptiste Louvet-Daniel
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { UncomputableError } from '../errors/errors.js';
import Logger from '../Logger.js';
import Panel from '../sheets/components/Panel.js';
import { castToPrimitive } from '../utils.js';
const userInputDisplayRegex = /^(?<name>.+?)(:(?<displayName>.+?))?(\[(?<type>.+?)])?$/;
const userInputValuesRegex = /^(?<key>".+?"|.+?)(,(?<value>".+?"|.+?))?$/;
/**
 * @typedef {ComputablePhraseOptions} FormulaOptions
 * @type {Object}
 * @property {object} [localVars = {}] Local variables computed from previous formulas in the same ComputablePhrase
 */
/**
 * @typedef {FormulaOptions} StaticFormulaOptions
 * @type {Object}
 * @property {Object} [textVars = {}] Text variables pre-computed by compute method
 * @property {Array} [rolls = []] Rolls variables pre-computed by compute method
 * @property {string?} formula Formula override used by compute method
 */
/**
 * Class holding formula details, for explanation
 */
class Formula {
    /**
     * Construct a new formula from a string
     * @param {string} formula The formula to compute
     */
    constructor(formula) {
        /**
         * Indicates if formula should be hidden from players
         * @type {boolean}
         * @private
         */
        this._hidden = false;
        /**
         * Indicates if formula should be explained
         * @type {boolean}
         * @private
         */
        this._explanation = true;
        this._raw = formula;
    }
    /**
     * The raw uncomputed formula
     * @return {string}
     */
    get raw() {
        return this._raw;
    }
    /**
     * The formula's computed result
     * @return {string}
     */
    get result() {
        return this._result;
    }
    /**
     * Local variables used in the formula's computing
     * @return {Object}
     */
    get localVars() {
        return this._localVars;
    }
    /**
     * The parsed version of the formulas, with needed replacements of tokens with unique identifiers
     * @return {string}
     */
    get parsed() {
        return this._parsed;
    }
    /**
     * Indicates if the formula contains dice rolls
     * @return {boolean}
     */
    get hasDice() {
        return this._hasDice;
    }
    /**
     * All formulas computed variables, except for rolls
     * @return {Array<Object>}
     */
    get tokens() {
        return this._tokens;
    }
    /**
     * Formula computed rolls
     * @return {Object<Roll>}
     */
    get rolls() {
        return this._rolls;
    }
    /**
     * Indicates if formula should be hidden from players
     * @return {boolean}
     */
    get hidden() {
        return this._hidden;
    }
    /**
     * Indicates if formula should be hidden from players
     * @return {boolean}
     */
    get explanation() {
        return this._explanation;
    }
    /**
     * Returns a plain object describing the formula
     * @return {{result: string, hasDice: boolean, hidden: boolean, raw: string, parsed: string, tokens: Object<string>, rolls: Object<Roll>}}
     */
    toJSON() {
        return {
            raw: this.raw,
            result: this.result,
            parsed: this.parsed,
            hasDice: this.hasDice,
            tokens: this.tokens,
            rolls: this.rolls,
            hidden: this.hidden,
            explanation: this.explanation
        };
    }
    /**
     * Computes this formula with given props and options, computing dynamic data like rolls and user inputs
     * @param {Object} props Token attributes to replace inside the formula
     * @param {FormulaOptions} [options = {}] Computation options
     * @returns {Promise<Formula>} This formula
     * @throws {UncomputableError} If a variable can not be computed
     */
    async compute(props, options = {}) {
        // Reference is used to compute formulas in dynamic table, to reference a same-line data
        // Default value is used in case a token is not computable
        // Local vars are used to re-use previously defined vars in the phrase
        let { localVars = {}, reference = null } = options ?? {};
        Logger.debug('Computing rolls & user inputs in ${' + this._raw + '}$');
        let { formula, textVars } = handleTextVars(this._raw);
        // Rolls are formula-local tokens which hold the roll data
        let rolls = [];
        // If formula starts with #, it should not be visible by default
        if (formula.startsWith('#')) {
            this._hidden = true;
            formula = formula.substring(1);
        }
        // If formula starts with !, it should not be explained in the final chat message
        if (formula.startsWith('!')) {
            this._explanation = false;
            formula = formula.substring(1);
        }
        // Isolating user inputs templates, enclosed in ?#{} inside the formula
        let userInputTemplateTokens = formula.matchAll(/\?#{.*?}/g);
        let userInputTemplateToken = userInputTemplateTokens.next();
        while (!userInputTemplateToken.done) {
            // Removing ?#{} around the token
            let userInputTemplateName = userInputTemplateToken.value[0].substring(3).slice(0, -1);
            let templateItem = game.items.filter((item) => item.name === userInputTemplateName)[0];
            if (!templateItem) {
                const warnMsg = `User Input Template ${userInputTemplateName} was not found.`;
                Logger.warn(warnMsg);
                ui.notifications.warn(warnMsg);
            }
            else {
                const tmpPanelElt = await Panel.fromJSON(templateItem.system.body, 'body').render(options.triggerEntity, true, {
                    reference: reference
                });
                let userData = await new Promise((resolve) => {
                    Dialog.prompt({
                        content: '',
                        callback: (html) => {
                            let values = {};
                            let inputs = $(html).find('input,select');
                            let conditionalModifiers = options.triggerEntity.getSortedConditionalModifiers();
                            for (let groupKey of Object.keys(conditionalModifiers)) {
                                conditionalModifiers[groupKey].forEach((modifier) => {
                                    const modifierKey = ComputablePhrase.computeMessageStatic(modifier.key, modifier.originalEntity.entity.system.props, {
                                        source: `modifier.${modifier.key}.key`,
                                        defaultValue: 0,
                                        triggerEntity: modifier.originalEntity
                                    }).result;
                                    foundry.utils.setProperty(values, modifierKey, foundry.utils.getProperty(options.triggerEntity.system.props, modifierKey));
                                });
                            }
                            for (let elt of inputs) {
                                let eltName = $(elt).prop('name').replace('system.props.', '');
                                if (eltName) {
                                    if (elt.type === 'checkbox') {
                                        values[eltName] = $(elt).is(':checked');
                                    }
                                    else if (elt.type === 'radio') {
                                        if ($(elt).is(':checked')) {
                                            values[eltName] = $(elt).val();
                                        }
                                    }
                                    else {
                                        values[eltName] = $(elt).val();
                                    }
                                }
                            }
                            let labels = $(html).find('div[data-value]');
                            for (let elt of labels) {
                                let eltName = $(elt).data('name').replace('system.props.', '');
                                if (eltName) {
                                    values[eltName] = $(elt).data('value');
                                }
                            }
                            resolve(values);
                        },
                        render: (html) => {
                            $(html[0]).append(tmpPanelElt);
                        },
                        rejectClose: false,
                        options: {
                            width: undefined
                        }
                    });
                });
                localVars = { ...localVars, ...userData };
            }
            formula = formula.replace(userInputTemplateToken.value[0], `"${userInputTemplateName}"`);
            this._hidden = true;
            userInputTemplateToken = userInputTemplateTokens.next();
        }
        // Isolating user inputs, enclosed in ?{} inside the formula
        let userInputTokens = formula.matchAll(/\?{.*?}/g);
        let userInputToken = userInputTokens.next();
        let allUserVars = [];
        while (!userInputToken.done) {
            let userInputSettings = {};
            // Removing ?{} around the token
            let userInputData = userInputToken.value[0].substring(2).slice(0, -1);
            let userInputDisplaySettingsRaw = userInputData.split('|')[0];
            let userInputDisplaySettings = userInputDisplayRegex.exec(userInputDisplaySettingsRaw).groups;
            userInputSettings.name = userInputDisplaySettings.name;
            userInputSettings.displayName = userInputDisplaySettings.displayName
                ? (await new Formula(userInputDisplaySettings.displayName).compute(props, options)).result
                : userInputDisplaySettings.name;
            userInputSettings.type = userInputDisplaySettings.type ?? 'text';
            let userInputChoices = userInputData.split('|').splice(1);
            let values = [];
            for (let choice of userInputChoices) {
                let parsedChoice = userInputValuesRegex.exec(choice).groups;
                let name = (await new Formula(parsedChoice.key).compute(props, options)).result;
                let displayValue = parsedChoice.value
                    ? (await new Formula(parsedChoice.value).compute(props, options)).result
                    : name;
                let computedChoice = { name, displayValue };
                values.push(computedChoice);
            }
            if (values.length > 1) {
                userInputSettings.choices = true;
                userInputSettings.values = values;
            }
            else {
                userInputSettings.choices = false;
                userInputSettings.defaultValue = values[0]?.name;
            }
            allUserVars.push(userInputSettings);
            formula = formula.replace(userInputToken.value[0], userInputSettings.name);
            userInputToken = userInputTokens.next();
        }
        if (allUserVars.length > 0) {
            let content = await renderTemplate(`systems/${game.system.id}/templates/_template/dialogs/user-input.html`, { allUserVars: allUserVars });
            let userData = await new Promise((resolve) => {
                Dialog.prompt({
                    content: content,
                    callback: (html) => {
                        let values = {};
                        let inputs = $(html).find('.custom-system-user-input');
                        for (let elt of inputs) {
                            if (elt.type === 'checkbox') {
                                values[$(elt).data('var-name')] = $(elt).is(':checked');
                            }
                            else if (elt.type === 'radio') {
                                if ($(elt).is(':checked')) {
                                    values[$(elt).data('var-name')] = $(elt).val();
                                }
                            }
                            else {
                                values[$(elt).data('var-name')] = $(elt).val();
                            }
                        }
                        resolve(values);
                    },
                    render: (html) => {
                        $(html).find('input,select')[0]?.focus();
                        $(html).find('input')[0]?.select();
                        $(html)
                            .find('.custom-system-user-input-block button.custom-system-user-input-button')
                            .on('click', (ev) => {
                            const btn = $(ev.currentTarget);
                            const targetRef = btn.data('input-ref');
                            const action = btn.data('action');
                            const targetInput = $(html).find(`#${targetRef}`);
                            const targetVal = Number.isNaN(parseInt(targetInput.val()))
                                ? 0
                                : parseInt(targetInput.val());
                            const actionOperation = action.split('-')[0];
                            const actionAmount = parseInt(action.split('-')[1]);
                            switch (actionOperation) {
                                case 'add':
                                    targetInput.val(targetVal + actionAmount);
                                    break;
                                case 'sub':
                                    targetInput.val(targetVal - actionAmount);
                                    break;
                            }
                        });
                    },
                    rejectClose: false,
                    options: {
                        width: undefined
                    }
                });
            });
            localVars = { ...localVars, ...userData };
        }
        // Handling rolls - rolls are enclosed in brackets []
        let rollMessages = formula.matchAll(/\[(:?\[[^\[\]]+\]|.)+?\]/g);
        let roll = rollMessages.next();
        while (!roll.done) {
            // Evaluating roll with Foundry VTT Roll API
            let rollString = roll.value[0];
            Logger.debug('\tRolling ' + rollString);
            let rollResult = await this.evaluateRoll(rollString.substr(1).slice(0, -1), props, options);
            if (rollResult.results) {
                formula = formula.replace(rollString, () => "'" + rollResult.results.map((e) => e.getChatText()).join(', ') + "'");
            }
            else {
                // Replacing roll result in formula for computing and saving roll data for display in chat message
                formula = formula.replace(rollString, rollResult.roll.total);
                let rollFormula = rollString === '[' + rollResult.roll.formula + ']'
                    ? rollString
                    : rollString + ' → [' + rollResult.roll.formula + ']';
                rolls.push({ formula: rollFormula, roll: rollResult.roll.toJSON() });
            }
            roll = rollMessages.next();
        }
        return this.computeStatic({ ...props, ...options.triggerEntity?.props }, {
            ...options,
            localVars,
            textVars,
            rolls,
            computeExplanation: options.computeExplanation && this._explanation
        }, formula);
    }
    /**
     * Computes this formula with given props and options, computing only static data
     * @param {Object} props Token attributes to replace inside the formula
     * @param {StaticFormulaOptions} [options = {}] Computation options
     * @param {?string} [formula = null] Formula override used by compute method
     * @returns {Formula} This formula
     * @throws {UncomputableError} If a variable can not be computed
     */
    computeStatic(props, options = {}, formula = null) {
        formula = formula ?? this._raw;
        Logger.debug('Computing ${' + formula + '}$');
        let { source, reference, defaultValue, localVars = {}, textVars = {}, rolls = [], computeExplanation = false, availableKeys = [] } = options;
        const importMathFunctions = (mathInstance, allValues) => {
            const customMathFunctions = {
                sameRow: (columnName, fallbackValue = null) => {
                    let fullReference = `${reference}.${columnName}`;
                    // Fetching the value inside dynamic table's row
                    let returnValue = castToPrimitive(foundry.utils.getProperty(allValues, fullReference)) ??
                        fallbackValue ??
                        defaultValue;
                    if (returnValue === undefined) {
                        throw new UncomputableError(`Uncomputable token "sameRow('${columnName}')". Failed to obtain value from the same row in the column "${columnName}". Make sure, that the column-key is correct.`, source, formula, allValues);
                    }
                    computedTokens['sameRow("' + columnName + '")'] = returnValue;
                    return returnValue;
                },
                sameRowRef: (columnName) => {
                    return `${reference}.${columnName}`;
                },
                sameRowIndex: () => {
                    if (!reference) {
                        throw new UncomputableError('"sameRowIndex()" can only be used in referencable Tables', source, formula, allValues);
                    }
                    const referenceParts = reference.split('.');
                    const dynamicTableProps = foundry.utils.getProperty(allValues, referenceParts[0]);
                    const rowKeys = Object.entries(dynamicTableProps)
                        .filter(([_, row]) => !row.deleted)
                        .map(([key, _]) => key);
                    return Number(rowKeys.findIndex((row) => row === referenceParts[1]));
                },
                lookupRef: (extensibleTableKey, targetColumn, filterColumn, filterValue) => {
                    const extensibleTableProps = foundry.utils.getProperty(allValues, extensibleTableKey);
                    if (extensibleTableProps === undefined) {
                        throw new UncomputableError(`Uncomputable token "lookupRef('${extensibleTableKey}', '${targetColumn}', '${filterColumn}', '${filterValue}')"`, source, formula, allValues);
                    }
                    const result = Object.keys(extensibleTableProps).find((row) => !extensibleTableProps[row].deleted &&
                        extensibleTableProps[row][filterColumn] === filterValue);
                    return result ? `${extensibleTableKey}.${result}.${targetColumn}` : '';
                },
                lookup: (extensibleTableKey, targetColumn, filterColumn = null, filterValue = null, comparisonOperator = '===') => {
                    let values = [];
                    let filterFunction = (elt) => true;
                    if (filterColumn) {
                        filterFunction = (elt) => {
                            switch (comparisonOperator) {
                                case '===':
                                    return elt[filterColumn] === filterValue;
                                case '==':
                                    return elt[filterColumn] == filterValue;
                                case '>':
                                    return elt[filterColumn] > filterValue;
                                case '>=':
                                    return elt[filterColumn] >= filterValue;
                                case '<':
                                    return elt[filterColumn] < filterValue;
                                case '<=':
                                    return elt[filterColumn] <= filterValue;
                                case '!==':
                                    return elt[filterColumn] !== filterValue;
                                case '!=':
                                    return elt[filterColumn] != filterValue;
                                case '~':
                                    return String(elt[filterColumn]).match(filterValue);
                                default:
                                    Logger.error(`"${comparisonOperator}" is not a valid comparison operator.`);
                                    return false;
                            }
                        };
                    }
                    const extensibleTableProps = foundry.utils.getProperty(allValues, extensibleTableKey);
                    const extensibleTablePropsArray = Object.values(extensibleTableProps ?? {}).filter((row) => !row.deleted && Object.keys(row).length > 1);
                    if (extensibleTablePropsArray.length > 0 &&
                        !extensibleTablePropsArray.some((row) => row[targetColumn] !== undefined && row[targetColumn] !== null)) {
                        throw new UncomputableError(`Uncomputable token lookup("${extensibleTableKey}", "${targetColumn}", "${filterColumn}", "${filterValue}", "${comparisonOperator}")`, source, formula, allValues);
                    }
                    values = extensibleTablePropsArray
                        .filter((row) => !row.deleted && filterFunction(row))
                        .map((row) => {
                        return castToPrimitive(row[targetColumn]);
                    })
                        .filter((value) => value !== undefined && value !== null);
                    computedTokens['lookup("' +
                        extensibleTableKey +
                        '", "' +
                        targetColumn +
                        '", "' +
                        filterColumn +
                        '", "' +
                        filterValue +
                        '")'] = values;
                    return values;
                },
                first: (list = [], fallbackValue = null) => {
                    let returnValue = fallbackValue ?? defaultValue;
                    if (list.length > 0) {
                        returnValue = castToPrimitive(list[0]);
                    }
                    return returnValue;
                },
                consoleLog: (dataLog) => {
                    console.log(dataLog);
                },
                consoleTable: (dataLog) => {
                    console.table(dataLog);
                },
                ref: (valueRef, fallbackValue = null) => {
                    let returnValue = fallbackValue ?? defaultValue;
                    let realValue = undefined;
                    if (valueRef) {
                        realValue = foundry.utils.getProperty(allValues, valueRef);
                        returnValue = castToPrimitive(realValue) ?? returnValue;
                    }
                    if (returnValue === undefined || (realValue === undefined && availableKeys.includes(valueRef))) {
                        throw new UncomputableError('Uncomputable token ref(' + valueRef + ')', source, formula, allValues);
                    }
                    let fallbackValueString;
                    if (typeof fallbackValue === 'string') {
                        fallbackValueString = '"' + fallbackValue + '"';
                    }
                    else {
                        fallbackValueString = fallbackValue;
                    }
                    computedTokens['ref("' + valueRef + (fallbackValue !== null ? '", ' + fallbackValueString : '"') + ')'] = returnValue;
                    return returnValue;
                },
                replace: (text, pattern, replacement) => {
                    return castToPrimitive(text.replace(pattern, replacement));
                },
                replaceAll: (text, pattern, replacement) => {
                    return castToPrimitive(text.replaceAll(pattern, replacement));
                },
                recalculate: (userInputData) => {
                    return castToPrimitive(ComputablePhrase.computeMessageStatic(userInputData.toString(), props, options).result);
                },
                fetchFromActor: (actorName, formula, fallbackValue = null) => {
                    formula = formula.replaceAll('"', ' ');
                    let actor;
                    switch (actorName) {
                        case 'selected':
                            actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
                            break;
                        case 'target':
                            actor = game.user.targets.values().next().value?.actor;
                            break;
                        case 'attached':
                            actor = options?.triggerEntity.entity.parent;
                            break;
                        default:
                            actor = game.actors.filter((e) => e.name === actorName)[0];
                    }
                    // If actor was found
                    if (actor) {
                        let actorProps = actor.system.props;
                        const returnValue = castToPrimitive(new Formula(formula).computeStatic(actorProps, {
                            ...options,
                            defaultValue: fallbackValue ?? defaultValue
                        }).result);
                        importMathFunctions(mathInstance, allValues);
                        return returnValue;
                    }
                    return fallbackValue ?? defaultValue;
                },
                switchCase: (expression, ...args) => {
                    while (args.length > 1 && args.shift() !== expression) {
                        args.shift();
                    }
                    return args.shift() ?? null;
                },
                setPropertyInEntity: (entityName, propertyName, formula, fallbackValue = null) => {
                    formula = String(formula).replaceAll('"', ' ');
                    let entity;
                    switch (entityName) {
                        case 'self':
                            if (!options.triggerEntity) {
                                throw new UncomputableError(`Missing entity. Make sure, that you provide the triggering Entity in the Options of Formula or ComputablePhrase`, source, formula, props);
                            }
                            entity = options.triggerEntity.entity;
                            break;
                        case 'selected':
                            entity = canvas.tokens.controlled[0]?.actor ?? game.user.character;
                            break;
                        case 'target':
                            entity = game.user.targets.values().next().value?.actor;
                            break;
                        case 'attached':
                            entity = options?.triggerEntity.entity.parent;
                            break;
                        case 'item':
                            if (!options.linkedEntity) {
                                throw new UncomputableError(`Missing entity. Make sure, that you provide the linked Entity in the Options of Formula or ComputablePhrase`, source, formula, props);
                            }
                            entity = options.linkedEntity;
                            break;
                        default:
                            entity = game.actors.filter((e) => e.name === entityName)[0];
                    }
                    if (!entity) {
                        throw new UncomputableError(`Entity "${entityName}" not found`, source, formula, props);
                    }
                    let actorProps = entity.system.props;
                    let value = castToPrimitive(new Formula(formula).computeStatic({ ...props, target: actorProps }, {
                        ...options,
                        defaultValue: fallbackValue ?? defaultValue
                    }).result);
                    const propertyPath = `system.props.${propertyName}`;
                    options.updates[entity.collectionName][entity._id] = foundry.utils.mergeObject(options.updates[entity.collectionName][entity._id] ?? {
                        _id: entity._id,
                        _parent: entity.parent
                    }, {
                        [propertyPath]: value
                    });
                    importMathFunctions(mathInstance, allValues);
                    return value;
                },
                notify: (messageType, message) => {
                    const validTypes = ['info', 'warn', 'error'];
                    if (!validTypes.includes(messageType)) {
                        throw new UncomputableError(`Message-Type "${messageType}" is not valid`, source, formula, props);
                    }
                    ui.notifications[messageType](message);
                    return message;
                },
                escapeQuotes: (value) => {
                    return value.replaceAll("'", "\\'");
                }
            };
            customMathFunctions.getRefFromDynamicTable = customMathFunctions.lookupRef;
            customMathFunctions.fetchFromDynamicTable = customMathFunctions.lookup;
            mathInstance.import(customMathFunctions, { override: true });
        };
        let allValues = foundry.utils.mergeObject(props ?? {}, localVars ?? {}, { inplace: false });
        //const mathInstance = math.create(math.all, {});
        const mathInstance = math;
        importMathFunctions(mathInstance, allValues);
        // Detecting local variable to set
        let localVarName = null;
        let localVarDecomposed = `${formula}`.match(/^([a-zA-Z0-9_-]+):=(.*)$/);
        if (localVarDecomposed) {
            localVarName = localVarDecomposed[1];
            formula = localVarDecomposed[2];
        }
        // If text-vars exist, they have already been handled ; no need to do it again
        let textVarResult = handleTextVars(formula, textVars);
        formula = textVarResult.formula;
        textVars = textVarResult.textVars;
        // Stripping formula from remaining spaces to have a consistent parsable string
        let strippedFormula = formula.trim();
        let computedTokens = {};
        let mathTokens = { ...computedTokens, ...textVars, ...allValues };
        Logger.debug('Tokens for computation', { formula: strippedFormula, scope: mathTokens });
        let result;
        let explanation = [];
        let onUndefinedSymbol = mathInstance.SymbolNode.onUndefinedSymbol;
        try {
            mathInstance.SymbolNode.onUndefinedSymbol = (name) => {
                if (defaultValue !== undefined) {
                    return defaultValue;
                }
                else {
                    throw new UncomputableError(`Uncomputable token "${name}"`, source, formula, props);
                }
            };
            let node = mathInstance.parse(strippedFormula);
            result = node.evaluate(mathTokens);
            for (const [key, value] of Object.entries(textVars)) {
                result = result.replace(key, value);
            }
            if (computeExplanation) {
                explanation = this.getSymbolsInOrder(node, { children: [] }, mathTokens);
                Logger.debug(strippedFormula, {
                    name: strippedFormula,
                    children: [this.getSymbolTree(node)],
                    listInOrder: explanation
                });
            }
        }
        catch (err) {
            if (err instanceof UncomputableError) {
                throw err;
            }
            else {
                result = 'ERROR';
                Logger.error(err.message, err, { formula, props });
            }
        }
        finally {
            // Reset onUndefinedSymbol
            mathInstance.SymbolNode.onUndefinedSymbol = onUndefinedSymbol;
        }
        if (localVarName) {
            localVars[localVarName] = result;
        }
        // Save every detail of the computation
        this._result = result;
        this._localVars = localVars;
        this._parsed = strippedFormula;
        this._hasDice = rolls.length > 0;
        this._tokens = explanation;
        this._rolls = rolls;
        return this;
    }
    /**
     * Evaluates a roll expression through Foundry VTT Roll API
     * @param {string} rollText The FoundryVTT roll expression
     * @param {Object} props Token attributes to replace inside the formula
     * @param {ComputablePhraseOptions} options Computation options for replaceable variables in the roll expression
     * @returns {Roll}
     */
    async evaluateRoll(rollText, props, options) {
        const computeRollPhrase = async (text) => {
            // Roll can contain parameters delimited by colons (:)
            let textParamMatcher = text.matchAll(/:(.*?):/g);
            let textParam = textParamMatcher.next();
            // Start by building a temporary phrase with every found parameter
            // A roll like [1d100 + :STR:] will become [1d100 + ${STR}$], which can be computed like other formulas
            while (!textParam.done) {
                text = text.replace(textParam.value[0], () => `\${${textParam.value[1]}}\$`);
                textParam = textParamMatcher.next();
            }
            // Temporary phrase is computed to get a number & dice only phrase
            let finalText = new ComputablePhrase(text);
            await finalText.compute(props, options);
            return finalText;
        };
        let isRollTable = false;
        let selectValue = null;
        if (rollText.startsWith('#')) {
            isRollTable = true;
            let separatedRoll = rollText.substring(1).split('|', 2);
            rollText = separatedRoll[0];
            selectValue = separatedRoll[1] ?? null;
        }
        let finalRollText = await computeRollPhrase(rollText);
        if (isRollTable) {
            let rollTable = game.tables.filter((e) => e.name === finalRollText.result)[0];
            if (selectValue) {
                let finalSelectValue = await computeRollPhrase(selectValue);
                let roll = new Roll(finalSelectValue.result);
                await roll.evaluate({ async: true });
                return await rollTable.draw({ displayChat: false, roll });
            }
            else {
                return await rollTable.draw({ displayChat: false });
            }
        }
        else {
            // Roll evaluation
            let roll = new Roll(finalRollText.result);
            await roll.evaluate({ async: true });
            return { roll };
        }
    }
    getSymbolsInOrder(rootNode, currentSymbol, mathTokens) {
        if (rootNode.type === 'SymbolNode' && !math[rootNode.name] && !rootNode.name.startsWith('_')) {
            currentSymbol = {
                display: rootNode.name,
                handle: rootNode.name,
                children: [],
                value: rootNode.evaluate(mathTokens)
            };
        }
        else if (rootNode.type === 'FunctionNode' &&
            ['fetchFromDynamicTable', 'lookup', 'ref', 'sameRow'].includes(rootNode.name)) {
            let argsName = [];
            switch (rootNode.name) {
                case 'lookup':
                case 'fetchFromDynamicTable':
                    argsName = ['', 'Target', 'Where', 'Is'];
                    break;
                case 'ref':
                    argsName = ['', 'Default'];
                    break;
            }
            let functionHandle = rootNode.name +
                '(' +
                rootNode.args
                    .map((arg, idx) => (argsName[idx]
                    ? '<span class="custom-system-arg-tooltip">' + argsName[idx] + ' : </span>'
                    : '') + arg)
                    .join(', ') +
                ')';
            currentSymbol = {
                handle: rootNode.toString(),
                display: functionHandle,
                children: [],
                value: rootNode.evaluate(mathTokens)
            };
        }
        rootNode.forEach((node, path, parent) => {
            let subSymbol = this.getSymbolsInOrder(node, currentSymbol, mathTokens);
            if (subSymbol.display !== currentSymbol.display) {
                if (!currentSymbol.children.some((e) => e.display === subSymbol.display)) {
                    currentSymbol.children.push(subSymbol);
                }
            }
        });
        return currentSymbol;
    }
    getSymbolTree(rootNode) {
        let treeNode = {
            name: rootNode.type +
                ' (' +
                (rootNode.name ?? rootNode.op ?? rootNode.value ?? '') +
                ') --- ' +
                rootNode.toString(),
            children: []
        };
        rootNode.forEach((node, path, parent) => {
            treeNode.children.push(this.getSymbolTree(node));
        });
        return treeNode;
    }
}
/**
 * Handles text variables by extracting them and replacing them with tokens
 * @param formula
 * @param textVars Text vars are formula-local tokens which hold the texts
 * @returns {Object}
 * @ignore
 */
const handleTextVars = (formula, textVars = {}) => {
    formula = formula.toString();
    // Isolating text data, enclosed in '' inside the formula
    // The (?<!\\)' part means match quotes (') which are not preceded by \
    let textTokens = formula.matchAll(/(?<!\\)'.*?(?<!\\)'/g);
    let textToken = textTokens.next();
    while (!textToken.done) {
        let textValue = textToken.value[0].substring(1, textToken.value[0].length - 1);
        if (textValue.includes("'")) {
            let textRef = '_computedText_' + (Object.keys(textVars).length + 1);
            // Recreate apostrophes inside text + removing delimiters
            textVars[textRef] = textValue.replaceAll('\\', '');
            formula = formula.replace(textToken.value[0], textRef);
        }
        textToken = textTokens.next();
    }
    return { formula, textVars };
};
export default Formula;
