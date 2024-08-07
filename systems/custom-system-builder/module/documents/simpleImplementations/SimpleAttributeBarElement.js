/*
 * Copyright 2024 Jean-Baptiste Louvet-Daniel
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * Simple attribute bar class, used initially to compute custom attribute bars in sheets
 */
export default class SimpleAttributeBarElement {
    /**
     * @param key Attribute bar key
     * @param valueFormula Formula for the value of the Attribute bar
     * @param maxFormula Formula for the maximum of the Attribute bar
     */
    constructor(key, valueFormula, maxFormula) {
        this.key = key;
        this.valueFormula = valueFormula;
        this.maxFormula = maxFormula;
    }
    /**
     * @param entity The Template System to get the maximum from
     * @param options Options to compute the maximum
     * @param keyOverride An optional key to override the initial key of the attribute bar
     * @returns The maximum of the Attribute Bar
     */
    getMaxValue(entity, options, keyOverride) {
        return Number(ComputablePhrase.computeMessageStatic(this.maxFormula, entity.system.props, {
            ...options,
            source: keyOverride ?? this.key,
            availableKeys: Object.keys(entity.system.props),
            triggerEntity: entity,
            defaultValue: 0
        }).result);
    }
    /**
     * @param entity The Template System to get the value from
     * @param options Options to compute the value
     * @param keyOverride An optional key to override the initial key of the attribute bar
     * @returns The value of the Attribute Bar
     */
    getValue(entity, options, keyOverride) {
        return Number(ComputablePhrase.computeMessageStatic(this.valueFormula, entity.system.props, {
            ...options,
            source: keyOverride ?? this.key,
            availableKeys: Object.keys(entity.system.props),
            triggerEntity: entity,
            defaultValue: 0
        }).result);
    }
}
