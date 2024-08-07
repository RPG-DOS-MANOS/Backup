/*
 * Copyright 2024 Jean-Baptiste Louvet-Daniel
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export var TABLE_SORT_OPTION;
(function (TABLE_SORT_OPTION) {
    TABLE_SORT_OPTION["AUTO"] = "auto";
    TABLE_SORT_OPTION["COLUMN"] = "column";
    TABLE_SORT_OPTION["MANUAL"] = "manual";
    TABLE_SORT_OPTION["DISABLED"] = "disabled";
})(TABLE_SORT_OPTION || (TABLE_SORT_OPTION = {}));
export var COMPARISON_OPERATOR;
(function (COMPARISON_OPERATOR) {
    COMPARISON_OPERATOR["GREATER_THAN"] = "gt";
    COMPARISON_OPERATOR["GREATER_EQUALS"] = "geq";
    COMPARISON_OPERATOR["EQUALS"] = "eq";
    COMPARISON_OPERATOR["NOT_EQUALS"] = "neq";
    COMPARISON_OPERATOR["LESSER_THAN"] = "lt";
    COMPARISON_OPERATOR["LESSER_EQUALS"] = "leq";
    COMPARISON_OPERATOR["FORMULA"] = "formula";
})(COMPARISON_OPERATOR || (COMPARISON_OPERATOR = {}));
export var MODIFIER_OPERATOR;
(function (MODIFIER_OPERATOR) {
    MODIFIER_OPERATOR["SET"] = "set";
    MODIFIER_OPERATOR["ADD"] = "add";
    MODIFIER_OPERATOR["SUBTRACT"] = "subtract";
    MODIFIER_OPERATOR["MULTIPLY"] = "multiply";
    MODIFIER_OPERATOR["DIVIDE"] = "divide";
})(MODIFIER_OPERATOR || (MODIFIER_OPERATOR = {}));
