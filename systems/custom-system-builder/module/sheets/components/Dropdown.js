/*
 * Copyright 2024 Jean-Baptiste Louvet-Daniel
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * @ignore
 * @module
 */
import InputComponent from './InputComponent.js';
/**
 * Dropdown component
 * @ignore
 */
class Dropdown extends InputComponent {
    /**
     * Dropdown constructor
     * @param {Object} data Component data
     * @param {string} data.key Component key
     * @param {string|null} [data.tooltip] Component tooltip
     * @param {string} data.templateAddress Component address in template, i.e. component path from entity.system object
     * @param {string|null} [data.label=null] Field label
     * @param {string|null} [data.defaultValue=null] Field default value
     * @param {Array<Object>} [data.options=[]] Select options
     * @param {string|null} [data.tableKey=null] Select dynamic table source
     * @param {string|null} [data.tableKeyColumn=null] Select dynamic table source column to use as key
     * @param {string|null} [data.tableLabelColumn=null] Select dynamic table source column to use as labels
     * @param {string|null} [data.size=null] Field size. Can be full-size, small, medium or large.
     * @param {string|null} [data.cssClass=null] Additional CSS class to apply at render
     * @param {Number} [data.role=0] Component minimum role
     * @param {Number} [data.permission=0] Component minimum permission
     * @param {string|null} [data.visibilityFormula=null] Component visibility formula
     * @param {Container|null} [data.parent=null] Component's container
     * */
    constructor({ key, tooltip = null, templateAddress, label = null, defaultValue = null, options = [], tableKey = null, tableKeyColumn = null, tableLabelColumn = null, formulaKeyOptions = null, formulaLabelOptions = null, size = null, cssClass = null, role = 0, permission = 0, visibilityFormula = null, parent = null }) {
        super({
            key: key,
            tooltip: tooltip,
            templateAddress: templateAddress,
            label: label,
            defaultValue: defaultValue,
            size: size,
            cssClass: cssClass,
            role: role,
            permission: permission,
            visibilityFormula: visibilityFormula,
            parent: parent
        });
        this._options = options;
        this._tableKey = tableKey;
        this._tableKeyColumn = tableKeyColumn;
        this._tableLabelColumn = tableLabelColumn;
        this._formulaKeyOptions = formulaKeyOptions;
        this._formulaLabelOptions = formulaLabelOptions;
    }
    /**
     * Renders component
     * @override
     * @param {TemplateSystem} entity Rendered entity (actor or item)
     * @param {boolean} [isEditable=true] Is the component editable by the current user ?
     * @param {ComputablePhraseOptions} [options={}] Additional options usable by the final Component
     * @return {Promise<JQuery>} The jQuery element holding the component
     */
    async _getElement(entity, isEditable = true, options = {}) {
        let { reference = null } = options;
        let jQElement = await super._getElement(entity, isEditable, options);
        jQElement.addClass('custom-system-select');
        let selectElement = $('<select />');
        selectElement.attr('id', `${entity.uuid}-${this.key}`);
        if (!entity.isTemplate) {
            selectElement.attr('name', 'system.props.' + this.key);
        }
        if (!isEditable) {
            selectElement.attr('disabled', 'disabled');
        }
        if (!this.defaultValue) {
            let emptyOption = $('<option></option>');
            emptyOption.attr('value', '');
            selectElement.append(emptyOption);
        }
        let optionKeys = new Set();
        if (!entity.isTemplate) {
            if (this._tableKey !== null) {
                let baseProps = entity.system.props;
                let tableKey = this._tableKey;
                if (tableKey.startsWith('parent.')) {
                    baseProps = entity.entity.parent?.system.props;
                    tableKey = tableKey.split('.', 2)[1];
                }
                let dynamicProps = foundry.utils.getProperty(baseProps, tableKey);
                if (dynamicProps) {
                    for (let rowIndex in dynamicProps) {
                        if (dynamicProps.hasOwnProperty(rowIndex) && !dynamicProps[rowIndex]?.deleted) {
                            selectElement.append(this._addOption(optionKeys, dynamicProps[rowIndex][this._tableKeyColumn], this._tableLabelColumn
                                ? dynamicProps[rowIndex][this._tableLabelColumn]
                                : dynamicProps[rowIndex][this._tableKeyColumn]));
                        }
                    }
                }
            }
            else if (this._formulaKeyOptions !== null && !entity.isTemplate) {
                const keyOptions = (await ComputablePhrase.computeMessage(this._formulaKeyOptions, {
                    ...entity.system.props,
                    ...options.customProps
                }, {
                    ...options,
                    source: `${this.key}.keyOptions`,
                    reference,
                    defaultValue: '',
                    triggerEntity: entity
                })).result.split(',');
                const labelOptions = (await ComputablePhrase.computeMessage(this._formulaLabelOptions, {
                    ...entity.system.props,
                    ...options.customProps
                }, {
                    ...options,
                    source: `${this.key}.labelOptions`,
                    reference,
                    defaultValue: '',
                    triggerEntity: entity
                })).result.split(',');
                if (labelOptions[0] !== '' && keyOptions.length !== labelOptions.length) {
                    ui.notifications.error(`${this.key}: Key and Label-options are not of same length`);
                }
                else {
                    for (let i = 0; i < keyOptions.length; i++) {
                        selectElement.append(this._addOption(optionKeys, keyOptions[i], labelOptions[0] === '' ? keyOptions[i] : labelOptions[i]));
                    }
                }
            }
            else {
                for (let option of this._options) {
                    selectElement.append(this._addOption(optionKeys, option.key, option.value));
                }
            }
            let selectedValue = foundry.utils.getProperty(entity.system.props, this.key) ??
                ComputablePhrase.computeMessageStatic(this.defaultValue, entity.system.props, {
                    source: this.key,
                    reference,
                    defaultValue: '',
                    triggerEntity: entity
                }).result;
            selectElement.val(optionKeys.has(selectedValue) ? selectedValue : selectElement.find('option:first').val());
        }
        jQElement.append(selectElement);
        if (entity.isTemplate) {
            jQElement.addClass('custom-system-editable-component');
            selectElement.addClass('custom-system-editable-field');
            jQElement.on('click', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                this.editComponent(entity);
            });
        }
        return jQElement;
    }
    /**
     * @typedef {InputComponentJson} DropdownJson
     * @type {Object}
     * @property {Array<{key: string, value: string}>} options
     * @property {string | null} tableKey
     * @property {string | null} tableKeyColumn
     * @property {string | null} tableLabelColumn
     * @property {string | null} formulaKeyOptions
     * @property {string | null} formulaLabelOptions
     * @property {string} type
     */
    /**
     * Returns serialized component
     * @override
     * @return {DropdownJson}
     */
    toJSON() {
        let jsonObj = super.toJSON();
        return {
            ...jsonObj,
            options: this._options,
            tableKey: this._tableKey,
            tableKeyColumn: this._tableKeyColumn,
            tableLabelColumn: this._tableLabelColumn,
            formulaKeyOptions: this._formulaKeyOptions,
            formulaLabelOptions: this._formulaLabelOptions,
            type: 'select'
        };
    }
    /**
     * Creates Dropdown from JSON description
     * @override
     * @param {DropdownJson} json
     * @param {string} templateAddress
     * @param {Container|null} parent
     * @return {Dropdown}
     */
    static fromJSON(json, templateAddress, parent = null) {
        return new Dropdown({
            key: json.key,
            tooltip: json.tooltip,
            templateAddress: templateAddress,
            label: json.label,
            defaultValue: json.defaultValue,
            options: json.options,
            tableKey: json.tableKey,
            tableKeyColumn: json.tableKeyColumn,
            tableLabelColumn: json.tableLabelColumn,
            formulaKeyOptions: json.formulaKeyOptions,
            formulaLabelOptions: json.formulaLabelOptions,
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
     * @return {string} The pretty name
     * @throws {Error} If not implemented
     */
    static getPrettyName() {
        return 'Dropdown list';
    }
    /**
     * Get configuration form for component creation / edition
     * @param {DropdownJson?} existingComponent
     * @param {TemplateSystem} entity
     * @return {Promise<JQuery<HTMLElement>>} The jQuery element holding the component
     */
    static async getConfigForm(existingComponent, entity) {
        let customOptions = false;
        let dynamicTableOptions = false;
        let formulaOptions = false;
        if (existingComponent?.tableKey != null) {
            dynamicTableOptions = true;
        }
        else if (existingComponent?.formulaKeyOptions != null) {
            formulaOptions = true;
        }
        else {
            customOptions = true;
        }
        let mainElt = $('<div></div>');
        mainElt.append(await renderTemplate(`systems/${game.system.id}/templates/_template/components/dropdown.html`, {
            ...existingComponent,
            customOptions: customOptions,
            dynamicTableOptions: dynamicTableOptions,
            formulaOptions: formulaOptions
        }));
        return mainElt;
    }
    /**
     * Attaches event-listeners to the html of the config-form
     * @param {JQuery} html
     */
    static attachListenersToConfigForm(html) {
        const deleteOptionRow = (event) => {
            const target = $(event.currentTarget);
            let row = target.parents('tr');
            // Remove it from the DOM
            $(row).remove();
        };
        $(html)
            .find('.custom-system-delete-option')
            .on('click', (event) => deleteOptionRow(event));
        $(html)
            .find('#addOption')
            .on('click', (event) => {
            const target = $(event.currentTarget);
            // Last row contains only the add button
            const lastRow = target.parents('tr');
            // Create new row
            const newRow = $(`
<tr class="custom-system-dropdown-option">
    <td>
        <input type="text" class="custom-system-dropdown-option-key" />
    </td>
    <td>
        <input type="text" class="custom-system-dropdown-option-value" />
    </td>
    <td>
        <a class="custom-system-delete-option">
            <i class="fas fa-trash"></i>
        </a>
    </td>
</tr>`);
            $(newRow)
                .find('.custom-system-delete-option')
                .on('click', (event) => deleteOptionRow(event));
            // Insert new row before control row
            lastRow.before(newRow);
        });
        $(html)
            .find("input[name='dropdownOptionMode']")
            .on('click', (event) => {
            const target = $(event.currentTarget);
            const customOptions = $('.custom-system-custom-options');
            const dynamicTableOptions = $('.custom-system-dynamic-options');
            const formulaOptions = $('.custom-system-formula-options');
            const slideValue = 200;
            switch (target[0].id) {
                case 'customOptions':
                    customOptions.slideDown(slideValue);
                    dynamicTableOptions.slideUp(slideValue);
                    formulaOptions.slideUp(slideValue);
                    break;
                case 'dynamicTableOptions':
                    customOptions.slideUp(slideValue);
                    dynamicTableOptions.slideDown(slideValue);
                    formulaOptions.slideUp(slideValue);
                    break;
                case 'formulaOptions':
                    customOptions.slideUp(slideValue);
                    dynamicTableOptions.slideUp(slideValue);
                    formulaOptions.slideDown(slideValue);
                    break;
            }
        });
    }
    /**
     * Extracts configuration from submitted HTML form
     * @override
     * @param {JQuery} html The submitted form
     * @return {DropdownJson} The JSON representation of the component
     * @throws {Error} If configuration is not correct
     */
    static extractConfig(html) {
        let fieldData = super.extractConfig(html);
        if (!fieldData.key) {
            throw new Error('Component key is mandatory for dropdowns');
        }
        fieldData.label = html.find('#selectLabel').val();
        fieldData.defaultValue = html.find('#selectDefaultValue').val();
        fieldData.size = html.find('#selectSize').val();
        let optionRows = html.find('tr.custom-system-dropdown-option');
        fieldData.options = [];
        fieldData.tableKey = null;
        fieldData.tableKeyColumn = null;
        fieldData.tableLabelColumn = null;
        fieldData.formulaKeyOptions = null;
        fieldData.formulaLabelOptions = null;
        if (html.find('#customOptions').is(':checked')) {
            for (let optionRow of optionRows) {
                let optKey = $(optionRow).find('.custom-system-dropdown-option-key').val();
                let optVal = $(optionRow).find('.custom-system-dropdown-option-value').val();
                if (optKey === '') {
                    throw new Error('Every option must have a key');
                }
                if (optVal === '') {
                    optVal = optKey;
                }
                fieldData.options.push({
                    key: optKey,
                    value: optVal
                });
            }
        }
        if (html.find('#dynamicTableOptions').is(':checked')) {
            fieldData.tableKey = html.find('#selectDynamicTableKey').val();
            fieldData.tableKeyColumn = html.find('#selectDynamicTableKeyColumn').val();
            fieldData.tableLabelColumn = html.find('#selectDynamicTableLabelColumn').val();
            if (!fieldData.tableKey || !fieldData.tableKeyColumn) {
                throw new Error('Dynamic table key and column key must be entered.');
            }
        }
        if (html.find('#formulaOptions').is(':checked')) {
            fieldData.formulaKeyOptions = html.find('#formulaKeyOptions').val();
            fieldData.formulaLabelOptions = html.find('#formulaLabelOptions').val();
            if (!fieldData.formulaKeyOptions) {
                throw new Error('Formula for key-options must be entered');
            }
        }
        return fieldData;
    }
    /**
     * Adds an option to the provided collection
     * @param collection {Set}
     * @param key {String}
     * @param value {String}
     * @returns {JQuery}
     * @private
     */
    _addOption(collection, key, value) {
        let optionElement = $('<option></option>');
        collection.add(key);
        optionElement.attr('value', key);
        optionElement.text(value);
        return optionElement;
    }
}
/**
 * @ignore
 */
export default Dropdown;
