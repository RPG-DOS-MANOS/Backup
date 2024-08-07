class ApplySelfEffects5e {
  static MODULE_NAME = "apply-self-effects-5e";
  static MODULE_TITLE = "Apply Self Effects DnD5e";

  static log(...args) {
    if (game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.MODULE_NAME)) {
      console.log(this.MODULE_TITLE, '|', ...args);
    }
  }
  
  /**
   * When an item that targets self is used:
   * if the parent actor has any disabled temporary effects from this item, activate them
   * otherwise apply any temporary effects to the parent actor
   * @param {*} item 
   * @returns 
   */
   static handleUseItem = async (item) => {
    if (item.system.target?.type !== 'self' || !item.effects.size) {
      return;
    }

    const actor = item.parent;

    if (!(actor instanceof Actor)) {
      return;
    }

    this.log('apply this to the parent', item, actor);

    const existingDisabledEffects = actor.effects.filter((effect) => {
      const isFromThisItem = effect.origin === item.uuid;
      const isDisabled = effect.disabled;
      const isTemporary = effect.isTemporary;

      return isFromThisItem && isTemporary && isDisabled;
    })

    // if there are any temporary effects from this item on the parent actor which are disabled, enable those and do nothing else
    if (existingDisabledEffects.length) {
      // enable any effects currently disabled which we would otherwise create
      const actorEffectUpdates = existingDisabledEffects
      .map((effect) => {
        return {
          _id: effect.id,
          disabled: false,
        }
      });

      return actor.updateEmbeddedDocuments('ActiveEffect', actorEffectUpdates);
    }

    // otherwise, create new temporary effects from the item on the parent actor
    
    const effectsToApply = item.effects.filter((effect) => {
      return effect.isTemporary && !(effect.enabled && effect.transfer)
      // if the effect is enabled and transferred, we assume it already is on the actor
    });

    if (!effectsToApply.length) {
      return;
    }

    const effectsToCreate = effectsToApply
      .map((effect) => ({
        ...effect.toJSON(),
        id: effect.uuid,
        origin: item.uuid,
        disabled: false,
        flags: {
          core: {
            statusId: effect.uuid, // fake status id for temp-effects-as-statuses
          },
          [ApplySelfEffects5e.MODULE_NAME]: {
            sourceId: effect.uuid
          }
        }
      }));

    this.log('applySelfEffect', {
      creating: effectsToCreate
    });

    return actor.createEmbeddedDocuments('ActiveEffect', effectsToCreate);
  }
}

Hooks.on("ready", async () => {
  console.log(`${ApplySelfEffects5e.MODULE_NAME} | Initializing ${ApplySelfEffects5e.MODULE_TITLE}`);

  // initialize item hooks
  Hooks.on('dnd5e.useItem', ApplySelfEffects5e.handleUseItem);
});

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(ApplySelfEffects5e.MODULE_NAME);
});
