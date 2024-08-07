/*
 * Copyright 2024 Jean-Baptiste Louvet-Daniel
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Container from './Container.js';
import templateFunctions from '../template-functions.js';
import Logger from '../../Logger.js';
/**
 * ExtensibleTable abstract class
 * @abstract
 */
class ExtensibleTable extends Container {
    /**
     * Component key
     */
    get key() {
        return this._key;
    }
    /**
     * Constructor
     * @param props Component data
     */
    constructor(props) {
        super(props);
        this._key = props.key;
        this._head = props.head;
        this._rowLayout = props.rowLayout;
        this._deleteWarning = props.deleteWarning;
    }
    /**
     * Component property key
     * @override
     */
    get propertyKey() {
        return this.key;
    }
    /**
     * Swaps two dynamic table elements
     * @param entity Rendered entity (actor or item)
     * @param rowIdx1 Index of the first row to swap
     * @param rowIdx2 Index of the second row to swap
     */
    _swapElements(entity, rowIdx1, rowIdx2) {
        const tableProps = foundry.utils.getProperty(entity.system.props, this.key);
        const tmpRow = {
            ...tableProps[rowIdx1]
        };
        tableProps[rowIdx1] = tableProps[rowIdx2];
        tableProps[rowIdx2] = tmpRow;
        entity.entity.update({
            system: {
                props: entity.system.props
            }
        });
    }
    /**
     * Deletes a row from the Table
     * @param entity Entity containing the row
     * @param rowIdx Index of the row to delete
     */
    async _deleteRow(entity, rowIdx) {
        const keyPath = 'system.props.' + this.key;
        const tableProps = foundry.utils.getProperty(entity.system.props, this.key);
        if (!(rowIdx in tableProps)) {
            Logger.error('Row index does not exist.');
            return;
        }
        delete tableProps[rowIdx];
        const updatedTablePropsArray = Object.values(tableProps);
        const updatedEntity = await entity.entity.update({ [keyPath]: updatedTablePropsArray });
        if (!updatedEntity?.system.props[this.key]) {
            return;
        }
        // Reindexing the entries of the Table
        await entity.entity.update({
            [keyPath]: Object.fromEntries(updatedTablePropsArray.map((value, i) => [i, value]))
        });
    }
    /**
     * Opens component editor
     * @param entity Rendered entity (actor or item)
     * @param options Component options
     */
    openComponentEditor(entity, options = {}) {
        // Open dialog to edit new component
        templateFunctions.component((_action, component) => {
            // This is called on dialog validation
            this.addNewComponent(entity, component, options);
        }, {
            allowedComponents: options.allowedComponents,
            isDynamicTable: true,
            entity
        });
    }
    /**
     * Adds new component to container, handling rowLayout
     * @override
     * @param entity Rendered entity (actor or item)
     * @param component New component
     */
    async addNewComponent(entity, component, _options = {}) {
        if (!Array.isArray(component)) {
            component = [component];
        }
        for (const aComp of component) {
            if (this._rowLayout[aComp.key]) {
                throw new Error("Component keys should be unique in the component's columns.");
            }
        }
        for (const aComponent of component) {
            // Add component
            this.contents.push(componentFactory.createOneComponent(aComponent));
            this._rowLayout[aComponent.key] = {
                align: aComponent.align,
                colName: aComponent.colName
            };
        }
        await this.save(entity);
    }
    /**
     *  @inheritdoc
     */
    replaceComponent(oldComponent, newComponent) {
        super.replaceComponent(oldComponent, newComponent);
        this._rowLayout[newComponent.key] = {
            align: newComponent.align,
            colName: newComponent.colName
        };
        if (oldComponent.key !== newComponent.key) {
            delete this._rowLayout[oldComponent.key];
        }
    }
    /**
     * @inheritdoc
     */
    getComponentMap() {
        const componentMap = {};
        if (this.key) {
            componentMap[this.key] = this;
        }
        return componentMap;
    }
    /**
     * @inheritdoc
     */
    getAllProperties(_entity) {
        const properties = {};
        if (this.propertyKey) {
            properties[this.propertyKey] = undefined;
        }
        return properties;
    }
    /**
     * Returns serialized component
     * @override
     */
    toJSON() {
        const jsonObj = super.toJSON();
        const rowLayout = [];
        for (const component of jsonObj.contents) {
            rowLayout.push({
                ...component,
                align: this._rowLayout?.[component.key].align ?? 'left',
                colName: this._rowLayout?.[component.key].colName ?? ''
            });
        }
        return {
            ...jsonObj,
            key: this.key,
            rowLayout: rowLayout,
            head: this._head,
            deleteWarning: this._deleteWarning,
            contents: [],
            type: 'extensibleTable'
        };
    }
    /**
     * Extracts configuration from submitted HTML form
     * @override
     * @param html The submitted form
     * @return The JSON representation of the component
     * @throws {Error} If configuration is not correct
     */
    static extractConfig(html) {
        const fieldData = super.extractConfig(html);
        fieldData.head = html.find('#tableHead').is(':checked');
        fieldData.deleteWarning = html.find('#tableDeleteWarning').is(':checked');
        return fieldData;
    }
}
/**
 * @ignore
 */
export default ExtensibleTable;
