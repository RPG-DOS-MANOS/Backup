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
export class CustomToken extends TokenDocument {
    getBarAttribute(barName, { alternative } = {}) {
        let barData = super.getBarAttribute(barName, { alternative });
        if (barData) {
            let barAttribute = barData.attribute;
            let actor = this.actor;
            let propPath = barAttribute;
            if (barAttribute.startsWith('attributeBar')) {
                let barDefinition = foundry.utils.getProperty(actor.system, barAttribute);
                propPath = 'props.' + barDefinition?.key;
            }
            let propValue = foundry.utils.getProperty(actor.system, propPath);
            if (propValue !== undefined) {
                barData.editable = true;
            }
        }
        return barData;
    }
}
