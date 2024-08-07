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
class Checkbox extends InputComponent {
    /**
     * Checkbox constructor
     * @param {Object} data Component data
     * @param {string} data.key Component key
     * @param {string|null} [data.tooltip] Component tooltip
     * @param {string} data.templateAddress Component address in template, i.e. component path from actor.system object
     * @param {string|null} [data.label=null] Field label
     * @param {string|null} [data.size=null] Field size. Can be full-size, small, medium or large.
     * @param {boolean} [data.defaultChecked=false] Checkbox default state.
     * @param {string|null} [data.cssClass=null] Additional CSS class to apply at render
     * @param {Number} [data.role=0] Component minimum role
     * @param {Number} [data.permission=0] Component minimum permission
     * @param {string|null} [data.visibilityFormula=null] Component visibility formula
     * @param {Container|null} [data.parent=null] Component's container
     */
    constructor({ key, tooltip = null, templateAddress, label = null, size = null, defaultChecked = false, cssClass = null, role = 0, permission = 0, visibilityFormula = null, parent = null }) {
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
        this._defaultChecked = defaultChecked;
    }
    /**
     * Renders component
     * @override
     * @param {TemplateSystem} entity Rendered entity (actor or item)
     * @param {boolean} [isEditable=true] Is the component editable by the current user ?
     * @param {ComputablePhraseOptions} [options = {}] Additional options usable by the final Component
     * @return {Promise<JQuery>} The jQuery element holding the component
     */
    async _getElement(entity, isEditable = true, options = {}) {
        let jQElement = await super._getElement(entity, isEditable, options);
        jQElement.addClass('custom-system-checkbox');
        let inputElement = $('<input />');
        inputElement.attr('type', 'checkbox');
        inputElement.attr('id', `${entity.uuid}-${this.key}`);
        if (!entity.isTemplate) {
            inputElement.attr('name', 'system.props.' + this.key);
        }
        let checkedStatus = foundry.utils.getProperty(entity.system.props, this.key);
        const checked = checkedStatus || (checkedStatus === undefined && this._defaultChecked);
        if (checked) {
            inputElement.attr('checked', 'checked');
        }
        if (!entity.isTemplate) {
            foundry.utils.setProperty(entity.system.props, this.key, checked);
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
     * @typedef {InputComponentJson} CheckboxJson
     * @type {Object}
     * @property {string} type
     * @property {boolean} defaultChecked
     */
    /**
     * Returns serialized component
     * @override
     * @return {CheckboxJson}
     */
    toJSON() {
        let jsonObj = super.toJSON();
        return {
            ...jsonObj,
            type: 'checkbox',
            defaultChecked: this._defaultChecked
        };
    }
    /**
     * Creates checkbox from JSON description
     * @override
     * @param {CheckboxJson} json
     * @param {string} templateAddress
     * @param {Container | null} parent
     * @return {Checkbox}
     */
    static fromJSON(json, templateAddress, parent = null) {
        return new Checkbox({
            key: json.key,
            tooltip: json.tooltip,
            templateAddress: templateAddress,
            label: json.label,
            size: json.size,
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
        return 'Checkbox';
    }
    /**
     * Get configuration form for component creation / edition
     * @param {CheckboxJson?} existingComponent
     * @param {TemplateSystem} entity
     * @return {Promise<JQuery>} The jQuery element holding the component
     */
    static async getConfigForm(existingComponent, entity) {
        let mainElt = $('<div></div>');
        mainElt.append(await renderTemplate(`systems/${game.system.id}/templates/_template/components/checkbox.html`, existingComponent));
        return mainElt;
    }
    /**
     * Extracts configuration from submitted HTML form
     * @override
     * @param {JQuery} html The submitted form
     * @return {CheckboxJson} The JSON representation of the component
     * @throws {Error} If configuration is not correct
     */
    static extractConfig(html) {
        let fieldData = super.extractConfig(html);
        if (!fieldData.key) {
            throw new Error('Component key is mandatory for checkboxes');
        }
        fieldData.label = html.find('#checkboxLabel').val();
        fieldData.size = html.find('#checkboxSize').val();
        fieldData.defaultChecked = html.find('#checkboxDefaultChecked').is(':checked');
        return fieldData;
    }
}
Checkbox.valueType = 'boolean';
/**
 * @ignore
 */
export default Checkbox;
