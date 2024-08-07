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
 * Checkbox component
 * @ignore
 */
class RadioButton extends InputComponent {
    /**
     * RadioButton constructor
     * @param {Object} data Component data
     * @param {string} data.key Component key
     * @param {string|null} [data.tooltip] Component tooltip
     * @param {string} data.templateAddress Component address in template, i.e. component path from actor.system object
     * @param {string|null} [data.label=null] Field label
     * @param {string|null} [data.size=null] Field size. Can be full-size, small, medium or large.
     * @param {string} data.group Radio button group. Mandatory.
     * @param {string} data.value Radio button value. Mandatory.
     * @param {boolean} [data.defaultChecked=false] Radio button default state.
     * @param {string|null} [data.cssClass=null] Additional CSS class to apply at render
     * @param {Number} [data.role=0] Component minimum role
     * @param {Number} [data.permission=0] Component minimum permission
     * @param {string|null} [data.visibilityFormula=null] Component visibility formula
     * @param {Container|null} [data.parent=null] Component's container
     */
    constructor({ key, tooltip = null, templateAddress, label = null, size = null, group, value, defaultChecked = false, cssClass = null, role = 0, permission = 0, visibilityFormula = null, parent = null }) {
        super({
            key: key,
            tooltip: tooltip,
            templateAddress: templateAddress,
            label: label,
            defaultValue: null,
            size: size,
            cssClass: cssClass,
            role: role,
            permission: permission,
            visibilityFormula: visibilityFormula,
            parent: parent
        });
        this._group = group;
        this._value = value;
        this._defaultChecked = defaultChecked;
    }
    /**
     * Component property key
     * @override
     * @return {string|null}
     */
    get propertyKey() {
        return this._group;
    }
    /**
     * Component default value
     * @returns {string | null}
     */
    get defaultValue() {
        if (this._defaultChecked) {
            return this._value;
        }
        else {
            return null;
        }
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
        jQElement.addClass('custom-system-radio');
        let value = ComputablePhrase.computeMessageStatic(this._value, entity.system.props, {
            source: this.key,
            reference,
            defaultValue: '',
            triggerEntity: entity
        }).result;
        let inputElement = $('<input />');
        inputElement.attr('type', 'radio');
        inputElement.attr('id', `${entity.uuid}-${this.key}`);
        inputElement.attr('value', value);
        const radioGroupValue = foundry.utils.getProperty(entity.system.props, this._group);
        if (radioGroupValue === value || (radioGroupValue === undefined && this._defaultChecked)) {
            inputElement.attr('checked', 'checked');
            if (!entity.isTemplate) {
                foundry.utils.setProperty(entity.system.props, this.propertyKey, this._value);
            }
        }
        if (!entity.isTemplate) {
            inputElement.attr('name', 'system.props.' + this._group);
            foundry.utils.setProperty(entity.system.props, this.key, this._value);
        }
        if (!isEditable) {
            inputElement.attr('disabled', 'disabled');
        }
        jQElement.append(inputElement);
        if (entity.isTemplate) {
            jQElement.addClass('custom-system-editable-component');
            inputElement.addClass('custom-system-editable-field');
            jQElement.on('click', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                this.editComponent(entity);
            });
        }
        return jQElement;
    }
    /**
     * @typedef {InputComponentJson} RadioButtonJson
     * @type {Object}
     * @property {string} group
     * @property {string} value
     * @property {boolean} defaultChecked
     */
    /**
     * Returns serialized component
     * @override
     * @return {RadioButtonJson}
     */
    toJSON() {
        let jsonObj = super.toJSON();
        return {
            ...jsonObj,
            group: this._group,
            value: this._value,
            defaultChecked: this._defaultChecked,
            type: 'radioButton'
        };
    }
    /**
     * Creates component from JSON description
     * @override
     * @param {RadioButtonJson} json
     * @param {string} templateAddress
     * @param {Container|null} parent
     * @return {RadioButton}
     */
    static fromJSON(json, templateAddress, parent = null) {
        return new RadioButton({
            key: json.key,
            tooltip: json.tooltip,
            templateAddress: templateAddress,
            label: json.label,
            size: json.size,
            group: json.group,
            value: json.value,
            defaultChecked: json.defaultChecked,
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
        return 'Radio Button';
    }
    /**
     * Get configuration form for component creation / edition
     * @param {RadioButtonJson?} existingComponent
     * @param {TemplateSystem} entity
     * @return {Promise<JQuery>} The jQuery element holding the component
     */
    static async getConfigForm(existingComponent, entity) {
        let mainElt = $('<div></div>');
        mainElt.append(await renderTemplate(`systems/${game.system.id}/templates/_template/components/radioButton.html`, existingComponent));
        return mainElt;
    }
    /**
     * Extracts configuration from submitted HTML form
     * @override
     * @param {JQuery} html The submitted form
     * @return {RadioButtonJson} The JSON representation of the component
     * @throws {Error} If configuration is not correct
     */
    static extractConfig(html) {
        let fieldData = super.extractConfig(html);
        if (!fieldData.key) {
            throw new Error('Component key is mandatory for radio buttons');
        }
        fieldData.label = html.find('#radioButtonLabel').val();
        fieldData.size = html.find('#radioButtonSize').val();
        fieldData.group = html.find('#radioButtonGroup').val();
        fieldData.value = html.find('#radioButtonValue').val();
        fieldData.defaultChecked = html.find('#radioButtonDefaultChecked').is(':checked');
        if (!fieldData.group) {
            throw new Error('Group is mandatory for radio buttons.');
        }
        else if (!fieldData.group.match(/^[a-zA-Z0-9_]+$/)) {
            throw new Error('Radio group must be a string composed of upper and lowercase letters and underscores only.');
        }
        return fieldData;
    }
}
RadioButton.valueType = 'string';
/**
 * @ignore
 */
export default RadioButton;
