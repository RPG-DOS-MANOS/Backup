/*
 * Copyright 2024 Jean-Baptiste Louvet-Daniel
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { applyModifiers } from '../../utils.js';
/**
 * Simple computable element class, used initially to compute hidden attributes in the sheet
 */
export default class SimpleComputableElement {
    /**
     * @param key The key of the computable element, used to set it into the props
     * @param phrase The formula to compute
     */
    constructor(key, phrase) {
        this.key = key;
        this.phrase = phrase;
    }
    /**
     * Get the function to compute the value of the component
     * @param entity The entity to compute the element from
     * @param modifiers The modifiers of the entity to eventually apply to the computed value
     * @param options Options to compute the value
     * @param keyOverride An optional key to override the initial key of the prop
     * @returns The anonymous function to compute the property
     */
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
                let value = ComputablePhrase.computeMessageStatic(this.phrase, formulaProps, {
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
}
