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
import Container from './Container.js';
/**
 * @ignore
 */
class Tab extends Container {
    /**
     * Tab constructor
     * @param {Object} data Component data
     * @param {string} [data.name=] Tab name
     * @param {string} data.key Tab key
     * @param {string|null} [data.tooltip] Tab tooltip
     * @param {string} data.templateAddress Component address in template, i.e. component path from entity.system object
     * @param {Array<Component>} [data.contents=[]] Container contents
     * @param {Number} [data.role=0] Component minimum role
     * @param {Number} [data.permission=0] Component minimum permission
     * @param {string|null} [data.visibilityFormula=null] Component visibility formula
     * @param {Container|null} [data.parent=null] Component's container
     */
    constructor({ name = '', key, tooltip = null, templateAddress, contents = [], role = 0, permission = 0, visibilityFormula = null, parent = null }) {
        super({
            key: key,
            tooltip: tooltip,
            templateAddress: templateAddress,
            contents: contents,
            droppable: true,
            role: role,
            permission: permission,
            visibilityFormula: visibilityFormula,
            parent: parent
        });
        this._name = name;
    }
    /**
     * Tab name getter
     * @return {string}
     */
    get name() {
        return this._name;
    }
    /**
     * Renders component
     * @override
     * @param {TemplateSystem} entity Rendered entity (actor or item)
     * @param {boolean} [isEditable=true] Is the component editable by the current user?
     * @param {ComputablePhraseOptions} [options={}]
     * @return {Promise<jQuery>} The jQuery element holding the component
     */
    async _getElement(entity, isEditable = true, options = {}) {
        let jQElement = await super._getElement(entity, isEditable, options);
        jQElement.addClass('tab');
        jQElement.attr('data-tab', this.key);
        jQElement.attr('data-group', 'primary');
        let mainPanelElement = $('<div></div>');
        mainPanelElement.addClass('flexcol flex-group-center');
        mainPanelElement.append(await this.renderContents(entity, isEditable, options));
        if (entity.isTemplate) {
            mainPanelElement.append(await this.renderTemplateControls(entity));
        }
        jQElement.append(mainPanelElement);
        return jQElement;
    }
    /**
     * Edits component
     * @param {TemplateSystem} entity Rendered entity (actor or item)
     * @param {Object} data Diff data
     */
    async update(entity, data) {
        let newComponentJSON = foundry.utils.mergeObject(this.toJSON(), data);
        let newComponent = Tab.fromJSON(newComponentJSON, this.templateAddress, this.parent);
        this.parent.replaceComponent(this, newComponent);
        // After actions have been taken care of, save entity
        await this.save(entity);
    }
    /**
     * @inheritdoc
     */
    getComponentMap() {
        const componentMap = {};
        for (const component of this.contents) {
            foundry.utils.mergeObject(componentMap, component.getComponentMap());
        }
        return componentMap;
    }
    /**
     * @typedef {ContainerJson} TabJson
     * @type {Object}
     * @property {string} name
     */
    /**
     * Returns serialized component
     * @override
     * @return {TabJson}
     */
    toJSON() {
        let jsonObj = super.toJSON();
        return {
            ...jsonObj,
            name: this.name,
            type: 'tab'
        };
    }
    /**
     * Creates Tab from JSON description
     * @override
     * @param {TabJson} json
     * @param {string} templateAddress
     * @param {Container|null} parent
     * @return {Tab}
     */
    static fromJSON(json, templateAddress, parent = null) {
        let tab = new Tab({
            name: json.name,
            key: json.key,
            tooltip: json.tooltip,
            templateAddress: templateAddress,
            contents: [],
            role: json.role,
            permission: json.permission,
            visibilityFormula: json.visibilityFormula,
            parent: parent
        });
        tab._contents = componentFactory.createMultipleComponents(json.contents, templateAddress + '-contents', tab);
        return tab;
    }
    /**
     * Gets pretty name for this component's type
     * @return {string} The pretty name
     * @throws {Error} If not implemented
     */
    static getPrettyName() {
        return 'Tab';
    }
}
Tab.addWrapperOnTemplate = false;
Tab.draggable = false;
/**
 * @ignore
 */
export default Tab;
