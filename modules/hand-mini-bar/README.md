# Card Hand Mini Toolbar for FoundryVTT
[<img src="https://ko-fi.com/img/githubbutton_sm.svg">](https://ko-fi.com/pengrath)

Card Hand Mini Bar - a mini toolbar for FoundryVTT to display hands of cards

## What?

A module to display a players hand of cards on the FoundryVTT game screen in a small toolbar. Display multiple hands or piles in up to 10 mini bars for easy GM managment.

This module now also contains a window view feature for easily managing hands piles and decks.

## Usage

Enable the module.

![Toolbar Start](artwork/tutorial-start.png?raw=true)

The Module will display a single hand toolbar in the bottom left corner by default. Clicking the gear icon '⚙' will allow the player to select from the list of hands they have permission to use.

![Toolbar Cards](artwork/tutorial-cards.png?raw=true)

The toolbar has buttons to `draw cards`, `pass cards`, or `show hand` window. 

If the toolbars are in the way the arrow at the top will hide/show all the hands displayed.

Left clicking a card will pull up the play card dialog. 

Right clicking a card will flip the card to it's back. 

Right clicking 'Pass Cards' Button - Resets cards back to original deck

Right clicking gear icon '⚙' - Resets hand and player settings for this toobar

Dragging and dropping can be used to drop cards between toolbars or back and forth from the deck/hand/pile windows. 


## Settings and Game Master Usage

![Settings Panel](artwork/tutorial-settings.png?raw=true)

Advanced options are available to display up to 10 hands and their titles making the module more useful for a GM to track everyones hands. This is a per user setting.

### Display Hand Name

Shows the hand name above each toolbar with the player name and hand name. Useful for GMs but can also be set individually by players.

### Better Chat Messages

![Better Messages](artwork/better-messages.png?raw=true)

Includes card image, card name and description (if flipped to it's face else 'Hidden') when a card is played

### Draw Card Chat Messages

How you want better messages to show card values when drawn

Disable - Disable this type of message

Default - will display however the card is drawn

Always Face Down - Always display as down in chat so other players cannot see what is drawn

Always Face Up - Always display face up

### Pass Card Chat Messages

How you want better messages to show card values when played or passed

Disable - Disable this type of message

Default - will display however the card is drawn

Always Face Down - Always display as down in chat so other players cannot see what is drawn

Always Face Up - Always display face up

### Disable Messages

By Default the toolbar disables the default foundry messages to chat and uses Better Chat Messages. 
This can be re-enabled and Better Chat Messages turned off for original behavior.

### Face Up Mode

Always displays the card in the toolbar face up and disables right clicking cards to flip. This is more useful for 'token' management when tokens backs are the same as their fronts or flipping doesn't make sense.

### Show Player Names in Pile

![Pile Names](artwork/pile-names.png?raw=true)

This module tracks who played which card to the discard pile and can display their names along the top in "Window View". Useful when you need to track who played which cards, or each player needs their own discard pile but you don't want to create one for each player.

### Position Selection

Selecting position will change the location for all users. 

Three options to positions along the bottom of the screen.

Draggable - The bar can be moved anywhere on the screen using the handles

X Postition and Y Position are now available in settings for manual changing

### Display Stack Shortcut

![Stack Shortcut](artwork/quick-link.png?raw=true)

You can select any stack such as the "Discard" pile for a link that hovers above the toolbar for quick access.

### Player Selection

![Toolbar Cards](artwork/tutorial-gm.png?raw=true)

Clicking the gear icon '⚙' as the GM allows for player selection. This selection will match what the player has selected (first hand only) or will change based on the GMs hand selection. If the player selects a different hand that will also be reflected. The Title will contain both the players name and the hand name: "Player Name (Hand Name)". Also gives the player color aura around the toolbar.

## Window View

![Window View Button](artwork/window-button.png?raw=true)

Access the "Window View" by clicking on the "Stack" Icon in the pile list or in the mini toolbar

![Window View](artwork/window-view.png?raw=true)

Depending on the pile type, context buttons are available at the top and all cards are displayed in a larger format inside the window. Works with the PopOut! module

## Why?

There wasn't a module (that I knew of) in Foundry to display a hand of cards on the screen in a way that was concise and easy to use.

## Backstory

The project came out of a need in our Deadlands campaign to display multi colored tokens (Bennys) instead of the single colored ones provided by the SWADE System. The new cards feature is the perfect framework for pulling tokens out of a bag at random. Using the card system also allows the module to be used for keeping track of anything in a tabletop game that a player needs to keep track of (e.g. Hero Points).

