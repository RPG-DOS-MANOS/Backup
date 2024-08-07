import { CustomCardStackLoader } from './module/CustomCardStackLoader.js';
import { CARD_STACKS_DEFINITION } from './module/StackDefinition.js';
import { ShortcutForHand, ShortcutForRevealedCards } from './module/ShortcutPanel.js';
import { AvailableActionService } from './module/AvailableActionService.js';
import { ParameterParserService } from './module/ParameterParserService.js';
import { MigrationService } from './module/config/MigrationService.js';
import * as message  from './module/message.js';
import * as contextmenus  from './module/contextmenus.js';
import * as config  from './module/config/config.js';


/**
 * Initialization actions taken on Foundry Virtual Tabletop client init.
 */
 Hooks.once("init", () => {

  console.log('Ready-To-Use Cards | Module initializing ...');
  config.loadCardSettings();
  config.registerCardSystem();
  config.loadKeybindSettings();

  const module = game.modules.get('ready-to-use-cards');
  module.cardStacks = new CustomCardStackLoader();
  module.stacksDefinition = CARD_STACKS_DEFINITION;
  module.actionService = new AvailableActionService();
  module.parameterService = new ParameterParserService();
  module.migrationService = new MigrationService();
  module.shortcuts = {
    hand: new ShortcutForHand(),
    revealed: new ShortcutForRevealedCards()
  };
});

/**
 * Initialization actions taken on Foundry Virtual Tabletop client init.
 */
Hooks.once("ready", async () => {

  const module = game.modules.get('ready-to-use-cards');
  await module.migrationService.applyMigration();

  await module.cardStacks.loadCardStacks();

  module.shortcuts.hand.reload();
  module.shortcuts.revealed.reload();
  console.log('Ready-To-Use Cards | Module is ready');
});

Hooks.on("renderChatMessage", (chatMessage, html, messageData) => {

  if(message.isACardMessage(chatMessage) ) {
    message.alterCardMessage(chatMessage, html);
  }
});

Hooks.on("updateCustomCardsContent", (cards, options, user) => {
  const module = game.modules.get('ready-to-use-cards');
  module.shortcuts.hand.someStacksHaveChanged(cards);
  module.shortcuts.revealed.someStacksHaveChanged(cards);
  cards.sheet.render();
});

Hooks.on('getCardsDirectoryEntryContext', contextmenus.onGetCardsDirectoryEntryContext);



