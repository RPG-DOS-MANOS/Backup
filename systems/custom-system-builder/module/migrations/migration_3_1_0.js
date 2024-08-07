/*
 * Copyright 2024 Jean-Baptiste Louvet-Daniel
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Logger from '../Logger.js';
let itemContainerCounter = 1;
async function processMigration() {
    const versionNumber = '3.1.0';
    const actorsToMigrate = game.actors.filter((actor) => foundry.utils.isNewerVersion(versionNumber, actor.getFlag(game.system.id, 'version')));
    const itemsToMigrate = game.items.filter((item) => foundry.utils.isNewerVersion(versionNumber, item.getFlag(game.system.id, 'version')));
    if (actorsToMigrate.length + itemsToMigrate.length === 0) {
        return;
    }
    const templates = actorsToMigrate.filter((document) => document.isTemplate);
    const actors = actorsToMigrate.filter((document) => !document.isTemplate);
    const items = itemsToMigrate.filter((document) => !document.isTemplate);
    const itemTemplates = itemsToMigrate.filter((document) => document.isTemplate);
    for (let i = 0; i < templates.length; i++) {
        const template = templates[i];
        logProgress(template, versionNumber, i, templates.length);
        template.system.header = updateItemContainersInComponent(template.system.header);
        template.system.body = updateItemContainersInComponent(template.system.body);
        await template.update({
            system: {
                header: template.system.header,
                body: template.system.body,
                templateSystemUniqueVersion: (Math.random() * 0x100000000) >>> 0
            }
        });
        await template.setFlag(game.system.id, 'version', versionNumber);
    }
    for (let i = 0; i < actors.length; i++) {
        const actor = actors[i];
        logProgress(actor, versionNumber, i, actors.length);
        try {
            await actors[i].templateSystem.reloadTemplate();
        }
        catch (err) {
            Logger.error(err.message, err);
        }
        await actors[i].setFlag(game.system.id, 'version', versionNumber);
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        logProgress(item, versionNumber, i, items.length);
        try {
            await item.update({
                system: {
                    uniqueId: item.id
                }
            });
        }
        catch (err) {
            Logger.error(err.message, err);
        }
        await items[i].setFlag(game.system.id, 'version', versionNumber);
    }
    for (let i = 0; i < itemTemplates.length; i++) {
        const item = itemTemplates[i];
        logProgress(item, versionNumber, i, items.length);
        await itemTemplates[i].setFlag(game.system.id, 'version', versionNumber);
    }
    SceneNavigation.displayProgressBar({
        label: 'CSB: Migration finished',
        pct: 100
    });
}
const logProgress = (document, version, current, total) => {
    Logger.log('Processing migration ' + version + ' for ' + document.name + ' - ' + document.id);
    SceneNavigation.displayProgressBar({
        label: `CSB: Migration to Version ${version}. Updating ${document.constructor.name} ${current + 1} / ${total}`,
        pct: Math.round((current * 100) / total)
    });
};
const updateItemContainersInComponent = (component) => {
    if (component.type === 'itemContainer') {
        if (!component.key) {
            component.key = `itemContainer${itemContainerCounter}`;
            itemContainerCounter++;
        }
    }
    else {
        if (component.contents) {
            const container = component;
            container.contents = container.contents.map((subComp) => {
                if (Array.isArray(subComp)) {
                    const tableContents = subComp.map((subSubComp) => {
                        if (subSubComp) {
                            return updateItemContainersInComponent(subSubComp);
                        }
                    });
                    return tableContents;
                }
                else {
                    return updateItemContainersInComponent(subComp);
                }
            });
        }
    }
    return component;
};
export default {
    processMigration
};
