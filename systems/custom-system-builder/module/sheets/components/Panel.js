/*
 * Copyright 2024 Jean-Baptiste Louvet-Daniel
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Container from './Container.js';
const defaultFlow = 'vertical';
const defaultTitleStyle = 'default';
/**
 * Panel component
 * @ignore
 */
class Panel extends Container {
    /**
     * Constructor
     */
    constructor(props) {
        super({ ...props, droppable: true });
        this._flow = props.flow ?? defaultFlow;
        this._align = props.align ?? '';
        this._collapsible = props.collapsible ?? false;
        this._defaultCollapsed = props.defaultCollapsed ?? true;
        this._title = props.title ?? '';
        this._titleStyle = props.titleStyle ?? defaultTitleStyle;
    }
    /**
     * Renders component
     * @override
     * @param entity Rendered entity (actor or item)
     * @param isEditable Is the component editable by the current user?
     * @param options
     * @return The jQuery element holding the component
     */
    async _getElement(entity, isEditable = true, options = {}) {
        let jQElement = await super._getElement(entity, isEditable, options);
        const internalContents = jQElement.hasClass('custom-system-component-contents')
            ? jQElement
            : jQElement.find('.custom-system-component-contents');
        let layoutClass = '';
        switch (this._flow) {
            case 'vertical':
                layoutClass = '';
                break;
            case 'horizontal':
                layoutClass = 'flexrow';
                break;
            default:
                if (/^grid-([1-9]$|1[0-2]$)/.test(this._flow)) {
                    layoutClass = 'grid grid-' + this._flow.substring(5) + 'col';
                }
                break;
        }
        internalContents.addClass(layoutClass);
        let alignClass;
        switch (this._align) {
            case 'center':
                alignClass = 'flex-group-center';
                break;
            case 'left':
                alignClass = 'flex-group-left';
                break;
            case 'right':
                alignClass = 'flex-group-right';
                break;
            case 'justify':
                alignClass = 'flex-between';
                break;
            default:
                alignClass = '';
                break;
        }
        internalContents.addClass(alignClass);
        internalContents.addClass('custom-system-panel');
        internalContents.append(await this.renderContents(entity, isEditable, options));
        if (entity.isTemplate) {
            internalContents.append(await this.renderTemplateControls(entity));
        }
        if (this._collapsible) {
            const isExtended = game.user.getFlag(game.system.id, entity.uuid + '.' + this.templateAddress + '.extended') ??
                !this._defaultCollapsed;
            const detailsElt = $('<details></details>');
            if (this.key) {
                detailsElt.addClass(`custom-system-details-${this.key}`);
            }
            detailsElt.on('toggle', (e) => {
                game.user.setFlag(game.system.id, entity.uuid + '.' + this.templateAddress + '.extended', e.currentTarget.open);
            });
            if (isExtended) {
                detailsElt.attr('open', 'open');
            }
            const summaryElt = $('<summary></summary>');
            let titleStyleTag = 'span';
            switch (this._titleStyle) {
                case 'title':
                    titleStyleTag = 'h3';
                    break;
                default:
                    break;
            }
            const titleElt = $(`<${titleStyleTag}></${titleStyleTag}>`);
            titleElt.addClass('custom-system-panel-' + this._titleStyle);
            titleElt.append(this._title ?? '');
            summaryElt.append(titleElt);
            summaryElt.on('click', (e) => {
                e.preventDefault();
                if (e.currentTarget.parentElement.open) {
                    internalContents.slideUp(100, () => {
                        $(e.currentTarget.parentElement).removeAttr('open');
                    });
                }
                else {
                    $(e.currentTarget.parentElement).attr('open', 'open');
                    internalContents.slideUp(0, () => {
                        internalContents.slideDown(100);
                    });
                }
            });
            detailsElt.append(summaryElt);
            detailsElt.append('<hr>');
            detailsElt.append(internalContents);
            if (internalContents === jQElement) {
                jQElement = detailsElt;
            }
            else {
                jQElement.append(detailsElt);
            }
        }
        return jQElement;
    }
    /**
     * Returns serialized component
     * @override
     */
    toJSON() {
        const jsonObj = super.toJSON();
        return {
            ...jsonObj,
            flow: this._flow,
            align: this._align,
            collapsible: this._collapsible,
            defaultCollapsed: this._defaultCollapsed,
            title: this._title,
            titleStyle: this._titleStyle,
            type: 'panel'
        };
    }
    /**
     * Creates Panel from JSON description
     */
    static fromJSON(json, templateAddress, parent) {
        const panel = new Panel({
            key: json.key,
            tooltip: json.tooltip,
            templateAddress: templateAddress,
            flow: json.flow,
            align: json.align,
            collapsible: json.collapsible,
            defaultCollapsed: json.defaultCollapsed,
            title: json.title,
            titleStyle: json.titleStyle,
            contents: [],
            cssClass: json.cssClass,
            role: json.role,
            permission: json.permission,
            visibilityFormula: json.visibilityFormula,
            parent: parent
        });
        panel._contents = componentFactory.createMultipleComponents(json.contents, templateAddress + '-contents', panel);
        return panel;
    }
    /**
     * Gets pretty name for this component's type
     * @return The pretty name
     * @throws {Error} If not implemented
     */
    static getPrettyName() {
        return 'Panel';
    }
    /**
     * Get configuration form for component creation / edition
     * @return The jQuery element holding the component
     */
    static async getConfigForm(existingComponent, _entity) {
        const predefinedValuesComponent = { ...existingComponent };
        predefinedValuesComponent.collapsible = predefinedValuesComponent.collapsible ?? false;
        predefinedValuesComponent.notCollapsible = !predefinedValuesComponent.collapsible;
        predefinedValuesComponent.defaultCollapsed = predefinedValuesComponent.defaultCollapsed ?? false;
        predefinedValuesComponent.defaultExpanded = !predefinedValuesComponent.defaultCollapsed;
        predefinedValuesComponent.title = predefinedValuesComponent.title ?? '';
        predefinedValuesComponent.titleStyle = predefinedValuesComponent.titleStyle ?? defaultTitleStyle;
        const mainElt = $('<div></div>');
        mainElt.append(await renderTemplate(`systems/${game.system.id}/templates/_template/components/panel.html`, predefinedValuesComponent));
        return mainElt;
    }
    /**
     * @inheritdoc
     */
    static attachListenersToConfigForm(html) {
        const toggleCollapsibleOption = () => {
            if (panelCollapsibleYes.is(':checked')) {
                html.find('#collapsiblePanelOptions').show();
            }
            else {
                html.find('#collapsiblePanelOptions').hide();
            }
        };
        const panelCollapsibleYes = html.find('#panelCollapsibleYes');
        const panelCollapsibleNo = html.find('#panelCollapsibleNo');
        panelCollapsibleYes.on('change', toggleCollapsibleOption);
        panelCollapsibleNo.on('change', toggleCollapsibleOption);
        toggleCollapsibleOption();
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
            flow: html.find('#panelFlow').val()?.toString() ?? defaultFlow,
            align: html.find('#panelAlign').val()?.toString() ?? '',
            collapsible: html.find('#panelCollapsibleYes').is(':checked'),
            defaultCollapsed: html.find('#panelDefaultCollapsed').is(':checked'),
            title: html.find('#panelTitle').val()?.toString(),
            titleStyle: html.find('#panelTitleStyle').val()?.toString()
        };
        return fieldData;
    }
}
/**
 * @ignore
 */
export default Panel;
