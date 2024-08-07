'use strict';

const rootStyle = document.querySelector(':root').style;

const debouncedReload = debounce(() => window.location.reload(), 100);

class MinimalUIControls {

    static delayedProcessing = false;

    static cssControlsStandardWidth = '36px';
    static cssControlsStandardHeight = '36px';
    static cssControlsStandardLineHeight = '36px';
    static cssControlsStandardFontSize = '24px';

    static cssControlsSmallWidth = '25px';
    static cssControlsSmallHeight = '24px';
    static cssControlsSmallLineHeight = '25px';
    static cssControlsSmallFontSize = '15px';

    static positionControls() {
        const logoSettings = game.settings.get('minimal-ui', 'foundryLogoSize');
        const navSettings = game.settings.get('minimal-ui', 'sceneNavigation');
        const navSizeSettings = game.settings.get('minimal-ui', 'sceneNavigationSize');
        if (logoSettings === 'hidden' && navSettings === 'hidden') {
            rootStyle.setProperty('--controlstop', '-65px');
        } else if (navSizeSettings === 'big') {
            rootStyle.setProperty('--controlstop', '115px');
        } else if (navSizeSettings === 'standard') {
            rootStyle.setProperty('--controlstop', '100px');
        } else if (logoSettings !== 'standard') {
            rootStyle.setProperty('--controlstop', '75px');
        }
    }

    static showSubControls() {
        if (game.settings.get('minimal-ui', 'controlsSubHide') === 'autohide') {
            rootStyle.setProperty('--controlssubop', '0%');
        } else if (game.settings.get('minimal-ui', 'controlsSubHide') === 'autohide-plus') {
            rootStyle.setProperty('--controlssubdisna', 'none');
            rootStyle.setProperty('--controlssubopna', '0%');
        }
    }

    static sizeControls() {
        if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
            rootStyle.setProperty('--controlsw', MinimalUIControls.cssControlsSmallWidth);
            rootStyle.setProperty('--controlsh', MinimalUIControls.cssControlsSmallHeight);
            rootStyle.setProperty('--controlslh', MinimalUIControls.cssControlsSmallLineHeight);
            rootStyle.setProperty('--controlsfs', MinimalUIControls.cssControlsSmallFontSize);
        } else {
            rootStyle.setProperty('--controlsw', MinimalUIControls.cssControlsStandardWidth);
            rootStyle.setProperty('--controlsh', MinimalUIControls.cssControlsStandardHeight);
            rootStyle.setProperty('--controlslh', MinimalUIControls.cssControlsStandardLineHeight);
            rootStyle.setProperty('--controlsfs', MinimalUIControls.cssControlsStandardFontSize);
        }
    }

    static initSettings() {
        game.settings.register('minimal-ui', 'controlsSize', {
            name: game.i18n.localize("MinimalUI.ControlsSizeName"),
            hint: game.i18n.localize("MinimalUI.ControlsSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard")
            },
            default: "small",
            onChange: MinimalUIControls.sizeControls
        });
        game.settings.register('minimal-ui', 'controlsSubHide', {
            name: game.i18n.localize("MinimalUI.ControlsSubHideName"),
            hint: game.i18n.localize("MinimalUI.ControlsSubHideHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide"),
                "autohide-plus": game.i18n.localize("MinimalUI.SettingsAutoHidePlus"),
                "visible": game.i18n.localize("MinimalUI.SettingsAlwaysVisible")
            },
            default: "visible",
            onChange: debouncedReload
        });
    };
    static initHooks() {
        Hooks.once('renderSceneControls', function () {
            MinimalUIControls.positionControls();
            MinimalUIControls.showSubControls();
            MinimalUIControls.sizeControls();
        });
        Hooks.on('renderSceneControls', function() {
            function controlsSubHoverRefresh() {
                setTimeout(() => {
                    const activeElement = $('#controls');
                    if (activeElement.length && !activeElement.is(':hover')) {
                        rootStyle.setProperty('--controlssubdisna', 'none');
                        MinimalUIControls.delayedProcessing = false;
                    } else controlsSubHoverRefresh();
                }, 6000);
            }
            function controlsSubClickRefresh() {
                setTimeout(() => {
                    if (game.settings.get('minimal-ui', 'controlsSubHide') === 'autohide')
                        rootStyle.setProperty('--controlssubop', '0%');
                    else if (game.settings.get('minimal-ui', 'controlsSubHide') === 'autohide-plus') {
                        controlsSubHoverRefresh();
                    }
                    rootStyle.setProperty('--opacitycontrols', game.settings.get("minimal-ui", "transparencyPercentage") + '%');
                }, 3000);
            }
            if (['autohide', 'autohide-plus'].includes(game.settings.get('minimal-ui', 'controlsSubHide'))) {
                $('#controls li').click(() => {
                    rootStyle.setProperty('--controlssubop', '100%');
                    rootStyle.setProperty('--controlssubopna', '100%');
                    rootStyle.setProperty('--opacitycontrols', '100%');
                    rootStyle.setProperty('--controlssubdisna', 'block');
                    controlsSubClickRefresh();
                });
                if (game.settings.get('minimal-ui', 'controlsSubHide') === 'autohide-plus') {
                    $('#controls li').hover(() => {
                        if (MinimalUIControls.delayedProcessing) return;
                        MinimalUIControls.delayedProcessing = true;
                        rootStyle.setProperty('--controlssubdisna', 'block');
                        controlsSubHoverRefresh();
                    });
                }
            }
        });
    };
}

class MinimalUIPlayers {

    static cssPlayersHiddenWidth = '32px';
    static cssPlayersSmallFontSize = '12px';
    static cssPlayersSmallWidth = '175px';
    static cssPlayersStandardFontSize = 'inherit';
    static cssPlayersStandardWidth = '200px';

    static cssHotbarPlayerBottom = 5;
    static cssHotbarPlayerBottomAdj = 70;

    static initSettings() {
        game.settings.register('minimal-ui', 'playerList', {
            name: game.i18n.localize("MinimalUI.PlayersBehaviourName"),
            hint: game.i18n.localize("MinimalUI.PlayersBehaviourHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide"),
                "clicktoggle": game.i18n.localize("MinimalUI.SettingsClickToggle"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "clicktoggle",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'playerListSize', {
            name: game.i18n.localize("MinimalUI.PlayersSizeName"),
            hint: game.i18n.localize("MinimalUI.PlayersSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard")
            },
            default: "standard",
            onChange: debouncedReload
        });

        // User Latency (formerly Ping Logger) compatibility setting 
        if (game.modules.get('user-latency')?.active) {
            game.settings.register('minimal-ui', 'playerShowPing', {
                name: game.i18n.localize("MinimalUI.PlayersShowPingName"),
                hint: game.i18n.localize("MinimalUI.PlayersShowPingHint"),
                scope: 'world',
                config: true,
                type: String,
                choices: {
                    "showPing": game.i18n.localize("MinimalUI.PlayersShowPing"),
                    "hidePing": game.i18n.localize("MinimalUI.PlayersHidePing"),
                },
                default: "hidePing",
                onChange: debouncedReload
            });
        }
    }

    static positionPlayers() {
        if (!(game.modules.get('sidebar-macros')?.active && game.settings.get('sidebar-macros', 'hideMacroHotbar'))) {
            let playerbot = 0;

            if (!(game.settings.get('minimal-ui', 'hotbar') === 'hidden') && game.settings.get('minimal-ui', 'hotbarPosition') === 'extremeLeft')
                playerbot = MinimalUIPlayers.cssHotbarPlayerBottomAdj;
            else
                playerbot = MinimalUIPlayers.cssHotbarPlayerBottom;

            if (game.modules.get('window-controls')?.active &&
                game.settings.get('window-controls', 'organizedMinimize') === 'persistentTop')
                rootStyle.setProperty('--playerbot', (playerbot - 5) + 'px');
            else
                rootStyle.setProperty('--playerbot', playerbot + 'px');

        }
    }

    static initHooks() {

        Hooks.on('renderPlayerList', async function () {
            const players = $("#players");

            players[0].val = "";
            let plSize = game.settings.get('minimal-ui', 'playerListSize');
            let plSetting = game.settings.get('minimal-ui', 'playerList');
            if (game.webrtc?.mode > 0) {
                if (plSetting !== 'hidden' && !ui.webrtc?.hidden) {
                    plSize = 'standard';
                    plSetting = 'default';
                }
            }

            switch (plSetting) {
                case 'default': {
                    players.css('transition', 'ease-out 0.5s');
                    if (plSize === 'small') {
                        rootStyle.setProperty('--playerfsize', MinimalUIPlayers.cssPlayersSmallFontSize);
                        rootStyle.setProperty('--players-width', MinimalUIPlayers.cssPlayersSmallWidth);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersSmallWidth);
                        if (game.system.id === 'sfrpg')
                            rootStyle.setProperty('--topleft', '-184px');
                        else
                            rootStyle.setProperty('--topleft', '-175px');
                    } else {
                        rootStyle.setProperty('--playerfsize', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--players-width', MinimalUIPlayers.cssPlayersStandardWidth);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
                        if (game.system.id === 'sfrpg')
                            rootStyle.setProperty('--topleft', '-209px');
                        else
                            rootStyle.setProperty('--topleft', '-200px');
                    }
                    rootStyle.setProperty('--playervis', 'visible');
                    rootStyle.setProperty('--playerslh', '20px');
                    // DnD UI Special Compatibility
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        rootStyle.setProperty('--players-width', '200px');
                    }
                    // SWADE Special Compatibility
                    rootStyle.setProperty('--playerbennies', 'inline');
                    // ---
                    break;
                }
                case 'autohide': case 'clicktoggle': {
                    if (plSize === 'small') {
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersSmallFontSize);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersSmallWidth);
                    } else {
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
                    }
                    rootStyle.setProperty('--playerfsize', '0');
                    rootStyle.setProperty('--playervis', 'visible');
                    rootStyle.setProperty('--playerslh', '2px');
                    rootStyle.setProperty('--playerh3w', '0%');
                    // DnD UI Special Compatibility
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        players.css('border-image', 'none');
                        players.css('border-color', 'black');
                        players.hover(
                            function () {
                                players.css('border-image', '');
                                players.css('border-color', '');
                            },
                            function () {
                                players.css('border-image', 'none');
                                players.css('border-color', 'black');
                            }
                        );
                    }
                    let playerWidthPixel = parseInt(MinimalUIPlayers.cssPlayersHiddenWidth);

                    // Compatibility for User Latency (formerly Ping Logger) module
                    if (game.modules.get('user-latency')?.active) {
                        if (game.settings.get('minimal-ui', 'playerShowPing') === "showPing") {
                            // Increase width and height to display ping
                            rootStyle.setProperty('--playerpingdisplay', 'initial');
                            rootStyle.setProperty('--playerslh', '20px');
                            playerWidthPixel += 36;
                        } else {
                            // Hide the ping, and only display on hover
                            rootStyle.setProperty('--playerpingdisplay', 'none');
                            players.hover(
                                function () {
                                    $(".pingLogger_pingSpan").show();
                                },
                                function () {
                                    $(".pingLogger_pingSpan").hide();
                                }
                            );
                        }
                    }

                    rootStyle.setProperty('--players-width', `${playerWidthPixel}px`);
                    // SWADE Special Compatibility
                    rootStyle.setProperty('--playerbennies', 'none');
                    if (game.system.id === 'swade') {
                        players.hover(
                            function () {
                                $(".bennies-count").show();
                            },
                            function () {
                                $(".bennies-count").hide();
                            }
                        );
                    }
                    // ---
                    if (game.settings.get('minimal-ui', 'controlsSize') === 'small')
                        rootStyle.setProperty('--topleft', '-90px');
                    else
                        if (game.system.id === 'sfrpg')
                            rootStyle.setProperty('--topleft', '-110px');
                        else
                            rootStyle.setProperty('--topleft', '-101px');
                    if (plSetting === 'autohide') {
                        players.hover(
                          () => {
                              players.css('width', 'var(--playerwidthhv)');
                              players.css('font-size', 'var(--playerfsizehv)');
                              players.css('opacity', '100%');
                              $("#players ol li.player").css('line-height', '20px');
                              if (plSize === 'small')
                                if (game.system.id === 'sfrpg')
                                  rootStyle.setProperty('--topleft', '-184px');
                                else
                                    rootStyle.setProperty('--topleft', '-175px');
                              else
                                if (game.system.id === 'sfrpg')
                                    rootStyle.setProperty('--topleft', '-209px');
                                else
                                    rootStyle.setProperty('--topleft', '-200px');
                          },
                          () => {
                              players.css('width', '');
                              players.css('font-size', 'var(--playerfsize)');
                              players.css('opacity', 'var(--opacity)');
                              $("#players ol li.player").css('line-height', '2px');
                              if (game.settings.get('minimal-ui', 'controlsSize') === 'small')
                                rootStyle.setProperty('--topleft', '-90px');
                              else
                                if (game.system.id === 'sfrpg')
                                    rootStyle.setProperty('--topleft', '-110px');
                                else
                                    rootStyle.setProperty('--topleft', '-101px');
                          });
                    } else {
                        players.css('transition', 'ease-out 0.5s');
                        let state = 0;
                        $("#player-list").click(() => {
                            if (state === 0) {
                                players.css('transition', '');
                                players.css('width', 'var(--playerwidthhv)');
                                players.css('font-size', 'var(--playerfsizehv)');
                                players.css('opacity', '100%');
                                $("#players ol li.player").css('line-height', '20px');
                                if (plSize === 'small')
                                    if (game.system.id === 'sfrpg')
                                        rootStyle.setProperty('--topleft', '-184px');
                                    else
                                        rootStyle.setProperty('--topleft', '-175px');
                                else
                                    if (game.system.id === 'sfrpg')
                                        rootStyle.setProperty('--topleft', '-209px');
                                    else
                                        rootStyle.setProperty('--topleft', '-200px');
                                state = 1;
                                setTimeout(() => {if (state === 1 ) players.css('transition', 'ease-out 0.5s');}, 100);
                            } else {
                                players.css('transition', '');
                                players.css('width', '');
                                players.css('font-size', 'var(--playerfsize)');
                                players.css('opacity', 'var(--opacity)');
                                $("#players ol li.player").css('line-height', '2px');
                                if (game.settings.get('minimal-ui', 'controlsSize') === 'small')
                                    rootStyle.setProperty('--topleft', '-90px');
                                else
                                    if (game.system.id === 'sfrpg')
                                        rootStyle.setProperty('--topleft', '-110px');
                                    else
                                        rootStyle.setProperty('--topleft', '-101px');
                                state = 0;
                                setTimeout(() => {if (state === 0 ) players.css('transition', 'ease-out 0.5s');}, 100);
                            }
                        });
                        players.hover(
                          () => {
                              players.css('opacity', '100%');
                          },
                          () => {
                              players.css('opacity', 'var(--opacity)');
                          });
                    }
                    break;
                }
            }
            // DnD UI Special Compatibility
            if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
            }
            // ---
        });

    }

}

class MinimalUIHotbar {

    static hotbarLocked = false;

    static cssHotbarHidden = '-50px';
    static cssHotbarAutoHideHeight = '-5px';
    static cssHotbarAutoHideHeightWinTop = '1px';

    static cssHotbarLeftControlsLineHeight = '24px';
    static cssHotbarRightControlsLineHeight = '12px';
    static cssHotbarRightControlsLineHeightDnDUi = '10px';
    static cssHotbarControlsAutoHideHeight = '100%';
    static cssHotbarAutoHideShadow = '-1px';
    static cssHotbarControlsMargin = '0px';
    static cssHotbarCustomHotbarCompatHover = '10px';

    static htmlHotbarLockButton =
        `
        <a class="minui-lock" id="bar-lock">
          <i class="fas fa-lock-open"></i>
        </a>
        `

    static lockHotbar(unlock) {
        if ((game.modules.get("custom-hotbar")?.active) || (game.modules.get('monks-hotbar-expansion')?.active) || (game.webrtc.mode > 0 && game.webrtc.settings.client.dockPosition === 'bottom'))
            return;
        const barLock = $("#bar-lock > i");
        if (MinimalUIHotbar.hotbarLocked && unlock) {
            rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarHidden);
            barLock.removeClass("fa-lock");
            barLock.addClass("fa-lock-open");
            MinimalUIHotbar.hotbarLocked = false;
        } else if (game.settings.get('minimal-ui', 'hotbar') === 'autohide') {
            rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarAutoHideHeight);
            barLock.removeClass("fa-lock-open");
            barLock.addClass("fa-lock");
            MinimalUIHotbar.hotbarLocked = true;
        }
    }

    static positionHotbar() {
        let availableWidth = canvas.app?.screen.width;
        if (!availableWidth)
            return;
        let webrtcAdjust = 0;
        let webrtcVAdjust = 0;

        if (game.webrtc.mode > 0 && !ui.webrtc.element.hasClass('hidden')) {
            if (game.webrtc.settings.client.dockPosition === 'left')
                webrtcAdjust = (ui.webrtc.hidden ? 0 : ui.webrtc.position.width);
            if (game.webrtc.settings.client.dockPosition === 'bottom') {
                webrtcVAdjust = 187;
            }
        }

        const autoHideOrLock = !game.settings.get('minimal-ui', 'hotbar') === 'autohide' || ((game.webrtc.mode > 0 && game.webrtc.settings.client.dockPosition === 'bottom') ||
            (game.modules.get('window-controls')?.active &&
                game.settings.get('window-controls', 'organizedMinimize') === 'persistentBottom'));

        if (game.modules.get('window-controls')?.active && autoHideOrLock)
            if (game.settings.get('window-controls', 'organizedMinimize') === 'persistentBottom')
                rootStyle.setProperty('--hotbarypos', webrtcVAdjust + 40 + 'px');
            else if (game.settings.get('window-controls', 'organizedMinimize') === 'persistentTop')
                rootStyle.setProperty('--hotbarypos', webrtcVAdjust + 5 + 'px');
            else
                rootStyle.setProperty('--hotbarypos', webrtcVAdjust + 'px');

        switch (game.settings.get('minimal-ui', 'hotbarPosition')) {
            case 'default': {
                rootStyle.setProperty('--hotbarxpos', (330 + webrtcAdjust)+'px');
                break;
            }
            case 'extremeLeft': {
                if (
                  !(game.modules.get("custom-hotbar")?.active) &&
                  availableWidth >= 1200
                )
                    rootStyle.setProperty('--hotbarxpos', 8 + webrtcAdjust + 'px');
                break;
            }
            case 'left': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5) - (availableWidth / 9) - (availableWidth / 9) + webrtcAdjust) + 'px');
                break;
            }
            case 'center': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5) - (availableWidth / 9) + webrtcAdjust) + 'px');
                break;
            }
            case 'right': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5) + webrtcAdjust) + 'px');
                break;
            }
            case 'manual': {
                rootStyle.setProperty('--hotbarxpos', (parseInt(game.settings.get('minimal-ui', 'hotbarPixelPosition')) + webrtcAdjust) + 'px');
                break;
            }
        }
        MinimalUIPlayers.positionPlayers();
    }

    static configureHotbar() {
        const autoHideBlocked = (game.webrtc.mode > 0 && game.webrtc.settings.client.dockPosition === 'bottom') ||
            (game.modules.get('window-controls')?.active &&
            game.settings.get('window-controls', 'organizedMinimize') === 'persistentBottom');
        if (game.settings.get('minimal-ui', 'hotbar') === 'autohide' && !autoHideBlocked) {
            if (!(game.modules.get("custom-hotbar")?.active || game.modules.get('monks-hotbar-expansion')?.active)) {
                rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarHidden);
                rootStyle.setProperty('--hotbarlh1', MinimalUIHotbar.cssHotbarLeftControlsLineHeight);
                rootStyle.setProperty('--hotbarlh2', MinimalUIHotbar.cssHotbarRightControlsLineHeight);
                if (game.modules.get('dnd-ui')?.active) {
                    rootStyle.setProperty('--hotbarlh2', MinimalUIHotbar.cssHotbarRightControlsLineHeightDnDUi);
                }
                rootStyle.setProperty('--hotbarmg', MinimalUIHotbar.cssHotbarControlsMargin);
                rootStyle.setProperty('--hotbarhh', MinimalUIHotbar.cssHotbarControlsAutoHideHeight);
                if (game.modules.get('window-controls')?.active &&
                    game.settings.get('window-controls', 'organizedMinimize') === 'persistentTop')
                    rootStyle.setProperty('--hotbarhv', MinimalUIHotbar.cssHotbarAutoHideHeightWinTop);
                else
                    rootStyle.setProperty('--hotbarhv', MinimalUIHotbar.cssHotbarAutoHideHeight);
                rootStyle.setProperty('--hotbarshp', MinimalUIHotbar.cssHotbarAutoHideShadow);
                $("#hotbar-directory-controls").append(MinimalUIHotbar.htmlHotbarLockButton);
                $("#macro-directory").click(function () {
                    MinimalUIHotbar.lockHotbar(false);
                });
                $("#bar-lock").click(function () {
                    MinimalUIHotbar.lockHotbar(true);
                });
                $(".page-control").click(function () {
                    MinimalUIHotbar.lockHotbar(false);
                });
                if (MinimalUIHotbar.hotbarLocked) {
                    MinimalUIHotbar.lockHotbar(false);
                }
                $("#bar-toggle").remove();
            }
        }
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'hotbar', {
            name: game.i18n.localize("MinimalUI.HotbarStyleName"),
            hint: game.i18n.localize("MinimalUI.HotbarStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed"),
                "onlygm": game.i18n.localize("MinimalUI.SettingsOnlyGM"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "collapsed",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'hotbarPosition', {
            name: game.i18n.localize("MinimalUI.HotbarPositionName"),
            hint: game.i18n.localize("MinimalUI.HotbarPositionHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.HotbarPositionMaxLeft"),
                "extremeLeft": game.i18n.localize("MinimalUI.HotbarPositionExtremeLeft"),
                "left": game.i18n.localize("MinimalUI.HotbarPositionCenterLeft"),
                "center": game.i18n.localize("MinimalUI.HotbarPositionCenter"),
                "right": game.i18n.localize("MinimalUI.HotbarPositionCenterRight"),
                "manual": game.i18n.localize("MinimalUI.HotbarPositionManual")
            },
            default: "extremeLeft",
            onChange: MinimalUIHotbar.positionHotbar
        });

        game.settings.register('minimal-ui', 'hotbarPixelPosition', {
            name: game.i18n.localize("MinimalUI.HotbarPPositionName"),
            hint: game.i18n.localize("MinimalUI.HotbarPPositionHint"),
            scope: 'world',
            config: true,
            type: String,
            default: "400",
            onChange: MinimalUIHotbar.positionHotbar
        });
    }

    static initHooks() {
        Hooks.on('ready', async function() {
            MinimalUIHotbar.positionHotbar();
        });

        // Needs to be .on so changing hotbar pages also applies
        Hooks.on('renderHotbar', function () {
            MinimalUIHotbar.configureHotbar();
            if (game.modules.get('custom-hotbar')?.active) {
                rootStyle.setProperty('--hotbarhv', MinimalUIHotbar.cssHotbarCustomHotbarCompatHover);
                $("#hotbar").css('margin-bottom', '-5px');
            }
            if (game.modules.get('monks-hotbar-expansion')?.active) {
                $("#hotbar").css('position', 'fixed');
            }
        });

        Hooks.on('rtcSettingsChanged', function() {
            MinimalUIHotbar.positionHotbar();
        });

        Hooks.once('renderHotbar', function() {
            const hotbarSetting = game.settings.get('minimal-ui', 'hotbar');
            if (hotbarSetting === 'collapsed')
                ui.hotbar.collapse();
            else if (hotbarSetting === 'onlygm') {
                if (!game.user.isGM)
                    rootStyle.setProperty('--hotbarvis', 'hidden');
            } else if (hotbarSetting === 'hidden')
                rootStyle.setProperty('--hotbarvis', 'hidden');
        });

        Hooks.once('renderCustomHotbar', function() {
            if (game.modules.get("custom-hotbar")?.active && game.settings.get('minimal-ui', 'hotbar') === 'collapsed') {
                ui.customHotbar?.collapse();
            }
        });

        Hooks.on('renderCompendium', function(compendium) {
            if (compendium.metadata.type === 'Macro')
                MinimalUIHotbar.lockHotbar(false);
        });
    }

}

class MinimalUILogo {

    static hiddenInterface = false;

    static hideAll() {
        $('#logo').click(_ => {
            let alsoChat;
            switch (game.settings.get('minimal-ui', 'foundryLogoBehaviour')) {
                case 'toggleAll': {
                    alsoChat = true;
                    break;
                }
                case 'toggleButChat': {
                    alsoChat = false;
                    break;
                }
            }
            if (!MinimalUILogo.hiddenInterface) {
                if (alsoChat) {
                    $('#sidebar').hide();
                }
                $('#navigation').hide();
                $('#controls').hide();
                $('#players').hide();
                $('#hotbar').hide();
                MinimalUILogo.hiddenInterface = true;
            } else {
                if (alsoChat) {
                    $('#sidebar').show();
                }
                $('#navigation').show();
                $('#controls').show();
                $('#players').show();
                $('#hotbar').show();
                MinimalUILogo.hiddenInterface = false;
            }
        });
    }

    static updateImageSrc(srcimg) {
        const logoSetting = game.settings.get('minimal-ui', 'foundryLogoSize');
        if (!game.modules.get('mytab')?.active && logoSetting !== 'hidden') {
            $("#logo")
                .attr('src', srcimg)
                .on('error', function () {
                    if (game.user.isGM)
                        ui.notifications.warn(
                            "Minimal UI: Your Logo Image could not be found. Restoring to Default Foundry Logo"
                        );
                    MinimalUILogo.updateImageSrc("icons/fvtt.png");
                });
        }
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'foundryLogoSize', {
            name: game.i18n.localize("MinimalUI.LogoStyleName"),
            hint: game.i18n.localize("MinimalUI.LogoStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "hidden": game.i18n.localize("MinimalUI.SettingsHide"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard")
            },
            default: "hidden",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'foundryLogoBehaviour', {
            name: game.i18n.localize("MinimalUI.LogoBehaviourName"),
            hint: game.i18n.localize("MinimalUI.LogoBehaviourHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "toggleAll": game.i18n.localize("MinimalUI.LogoBehaviourToggle"),
                "toggleButChat": game.i18n.localize("MinimalUI.LogoBehaviourToggleNoChat")
            },
            default: "toggleButChat"
        });

        game.settings.register('minimal-ui', 'foundryLogoImage', {
            name: game.i18n.localize("MinimalUI.LogoImageName"),
            hint: game.i18n.localize("MinimalUI.LogoImageHint"),
            scope: 'world',
            config: true,
            type: String,
            filePicker: 'file',
            default: "icons/fvtt.png",
            onChange: _ => {
                MinimalUILogo.updateImageSrc(game.settings.get('minimal-ui', 'foundryLogoImage'));
            }
        });
    }

    static initHooks() {

        Hooks.once('renderSceneNavigation', async function () {
            MinimalUILogo.updateImageSrc(game.settings.get('minimal-ui', 'foundryLogoImage'));
        });

        Hooks.once('ready', async function () {

            if (game.settings.get('minimal-ui', 'foundryLogoSize') !== 'hidden') {
                MinimalUILogo.hideAll();
            }

            switch (game.settings.get('minimal-ui', 'foundryLogoSize')) {
                case 'standard': {
                    rootStyle.setProperty('--logovis', 'visible');
                    break;
                }
            }

        });

    }

}

class MinimalUINavigation {

    static cssSceneNavNoLogoStart = 0;
    static cssSceneNavLogoStart = 110;

    static async collapseNavigation() {
        await ui.nav.collapse();
    }

    static positionNav() {
        let navixpos = game.settings.get('minimal-ui', 'foundryLogoSize') === 'hidden' ? MinimalUINavigation.cssSceneNavNoLogoStart : MinimalUINavigation.cssSceneNavLogoStart;
        if (game.webrtc.mode > 0 && !ui.webrtc.element.hasClass('hidden'))
            if (game.webrtc.settings.client.dockPosition === 'left')
                navixpos += ui.webrtc.position.width;
        rootStyle.setProperty('--navixpos', navixpos + 'px');
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'sceneNavigation', {
            name: game.i18n.localize("MinimalUI.NavigationStyleName"),
            hint: game.i18n.localize("MinimalUI.NavigationStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsStartVisible"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "collapsed",
            onChange: MinimalUINavigation.positionNav
        });

        game.settings.register('minimal-ui', 'sceneNavigationSize', {
            name: game.i18n.localize("MinimalUI.NavigationSizeName"),
            hint: game.i18n.localize("MinimalUI.NavigationSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard"),
                "big": game.i18n.localize("MinimalUI.SettingsBig")
            },
            default: "small",
            onChange: debouncedReload
        });

        if (game.system.id === 'sfrpg')
            rootStyle.setProperty('--navileft', '-1px');
            rootStyle.setProperty('--naviright', '5px');

    }

    static initHooks() {

        Hooks.once('renderSceneNavigation', async function () {

            switch (game.settings.get('minimal-ui', 'foundryLogoSize')) {
                case 'small': {
                    rootStyle.setProperty('--navixmg', '25px');
                    break;
                }
                case 'hidden': {
                    rootStyle.setProperty('--navixmg', '10px');
                    break;
                }
            }

            switch (game.settings.get('minimal-ui', 'sceneNavigation')) {
                case 'collapsed': {
                    MinimalUINavigation.collapseNavigation();
                    rootStyle.setProperty('--navivis', 'visible');
                    break;
                }
                case 'shown': {
                    rootStyle.setProperty('--navivis', 'visible');
                    break;
                }
            }

            switch (game.settings.get('minimal-ui', 'sceneNavigationSize')) {
                case 'standard': {
                    rootStyle.setProperty('--navilh', '32px');
                    rootStyle.setProperty('--navifs', '16px');
                    rootStyle.setProperty('--navilisttop', '24px');
                    rootStyle.setProperty('--navibuttonsize', '34px');
                    break;
                }
                case 'big': {
                    rootStyle.setProperty('--navilh', '40px');
                    rootStyle.setProperty('--navifs', '20px');
                    rootStyle.setProperty('--navilisttop', '30px');
                    rootStyle.setProperty('--navibuttonsize', '43px');
                    break;
                }
            }

        });

        Hooks.on('renderSceneNavigation', async function () {
            MinimalUINavigation.positionNav();
        });

        Hooks.on('rtcSettingsChanged', function () {
            MinimalUINavigation.positionNav();
        });

    }

}

class MinimalUISidebar {

    static initSettings() {

        game.settings.register('minimal-ui', 'rightcontrolsBehaviour', {
            name: game.i18n.localize("MinimalUI.SidebarStyleName"),
            hint: game.i18n.localize("MinimalUI.SidebarStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsStartVisible"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed")
            },
            default: "shown"
        });
    }

    static initHooks() {
        Hooks.once('renderChatLog', async function () {
            const sidebarElem = $("#sidebar-tabs");
            const newHeight = parseInt(sidebarElem.css('--sidebar-tab-height')) / 1.25;
            sidebarElem.css('--sidebar-tab-height', newHeight + 'px');
            switch (game.settings.get('minimal-ui', 'rightcontrolsBehaviour')) {
                case 'shown': {
                    rootStyle.setProperty('--fpsvis', 'unset');
                    rootStyle.setProperty('--controlsvis', 'visible');
                    break;
                }
                case 'collapsed': {
                    ui.sidebar.element.hide();
                    ui.sidebar.collapse();
                    // wait for animation to finish
                    await new Promise(waitABit => setTimeout(waitABit, 600));
                    rootStyle.setProperty('--controlsvis', 'visible');
                    ui.sidebar.element.fadeIn('slow');
                    break;
                }
                default: {
                    rootStyle.setProperty('--fpsvis', 'unset');
                    rootStyle.setProperty('--controlsvis', 'visible');
                    break;
                }
            }
        });
        Hooks.on('collapseSidebar', function(_, isCollapsing) {
            if (isCollapsing) {
                rootStyle.setProperty('--fpsposx', '-5px');
                rootStyle.setProperty('--fpsvis', 'unset');
            } else {
                rootStyle.setProperty('--fpsposx', '300px');
                rootStyle.setProperty('--fpsvis', 'unset');
            }
        });
    }
}

class MinimalUITheme {

    static initSettings() {
        new window.Ardittristan.ColorSetting("minimal-ui", "borderColor", {
            name: game.i18n.localize("MinimalUI.BorderColorName"),
            hint: game.i18n.localize("MinimalUI.BorderColorHint"),
            label: game.i18n.localize("MinimalUI.ColorPicker"),
            scope: "world",
            restricted: true,
            defaultColor: "#00000080",
            onChange: _ => {
                rootStyle.setProperty('--bordercolor', game.settings.get('minimal-ui', 'borderColor'));
                if (game.modules.get('minimal-window-controls')?.active) {
                    rootStyle.setProperty('--wcbordercolor', game.settings.get('minimal-ui', 'borderColor'));
                }
                if (game.modules.get('scene-preview')?.active) {
                    rootStyle.setProperty('--spbordercolor', game.settings.get('minimal-ui', 'borderColor'));
                }
            }
        });

        new window.Ardittristan.ColorSetting("minimal-ui", "shadowColor", {
            name: game.i18n.localize("MinimalUI.ShadowColorName"),
            hint: game.i18n.localize("MinimalUI.ShadowColorHint"),
            label: game.i18n.localize("MinimalUI.ColorPicker"),
            scope: "world",
            restricted: true,
            defaultColor: "#7c7c7c40",
            type: String,
            onChange: _ => {
                rootStyle.setProperty('--shadowcolor', game.settings.get('minimal-ui', 'shadowColor'));
                if (game.modules.get('minimal-window-controls')?.active) {
                    rootStyle.setProperty('--wcshadowcolor', game.settings.get('minimal-ui', 'borderColor'));
                }
                if (game.modules.get('scene-preview')?.active) {
                    rootStyle.setProperty('--spshadowcolor', game.settings.get('minimal-ui', 'borderColor'));
                }
            }
        });

        game.settings.register("minimal-ui", "shadowStrength", {
            name: game.i18n.localize("MinimalUI.ShadowStrengthName"),
            hint: game.i18n.localize("MinimalUI.ShadowStrengthHint"),
            scope: "world",
            config: true,
            default: "5",
            type: String,
            onChange: _ => {
                rootStyle.setProperty('--shadowstrength', game.settings.get('minimal-ui', 'shadowStrength') + 'px');
                if (game.modules.get('minimal-window-controls')?.active) {
                    rootStyle.setProperty('--wcshadowstrength', game.settings.get('minimal-ui', 'borderColor'));
                }
                if (game.modules.get('scene-preview')?.active) {
                    rootStyle.setProperty('--spshadowstrength', game.settings.get('minimal-ui', 'borderColor'));
                }
            }
        });

        game.settings.register("minimal-ui", "transparencyPercentage", {
            name: game.i18n.localize("MinimalUI.TransparencyPercentageName"),
            hint: game.i18n.localize("MinimalUI.TransparencyPercentageHint"),
            scope: "world",
            config: true,
            default: 100,
            type: Number,
            onChange: _ => {
                const transparency = game.settings.get('minimal-ui', 'transparencyPercentage');
                if (transparency >= 0 && transparency <= 100) {
                    rootStyle.setProperty('--opacity', transparency.toString() + '%');
                    // Need one separate for controls to handle some click events - there is probably a better way
                    rootStyle.setProperty('--opacitycontrols', transparency.toString() + '%');
                }
            }
        });
    }

    static initHooks() {
        Hooks.once('renderSceneControls', async function () {
            rootStyle.setProperty('--bordercolor', game.settings.get('minimal-ui', 'borderColor'));
            rootStyle.setProperty('--shadowcolor', game.settings.get('minimal-ui', 'shadowColor'));
            rootStyle.setProperty('--shadowstrength', game.settings.get('minimal-ui', 'shadowStrength') + 'px');
            const transparency = game.settings.get('minimal-ui', 'transparencyPercentage');
            if (transparency >= 0 && transparency <= 100) {
                rootStyle.setProperty('--opacity', transparency.toString() + '%');
                // Need one separate for controls to handle some click events - there is probably a better way
                rootStyle.setProperty('--opacitycontrols', transparency.toString() + '%');
            }
        });
    }
}

class MinimalUIPatch {

    static initSettings() {

    }

    static initHooks() {
        Hooks.on('changeSidebarTab', function (app) {
            const target = Object.values(ui.windows).find(a => a.tabName === app.tabName);
            if (ui.sidebar._collapsed && target?._minimized)
                target.maximize();
            else if (ui.sidebar._collapsed && target?.popOut)
                target.bringToTop();
        });

        Hooks.on('renderSidebarTab', function (app) {
            if (app?.popOut)
                app.bringToTop();
        });

        Hooks.on('ready', function(app) {
            // For some reason, the chat pop out does not trigger a changeSidebarTab nor renderSidebarTab. Apply exceptionally.
            const chatTab = ui.sidebar.element.find('[data-tab="chat"]');
            if (chatTab?.length) {
                chatTab.click(() => {
                    if (ui.sidebar._collapsed)
                        ui.chat._popout?.bringToTop();
                });
                chatTab.contextmenu(() => {
                    ui.chat._popout?.bringToTop();
                });
            }
            $("#sidebar-tabs > a").contextmenu((e) => {
                const tab = ui[$(e.currentTarget).attr('data-tab')];
                if (tab?._popout?._minimized)
                    tab._popout.maximize();
            });
        });
    }

}

class MinimalUI {
    static noColorSettings = false;
}

Hooks.once('init', () => {

    /** Initialize settings for Theme Functionality */
    if (game.modules.get('colorsettings')?.active) {
        MinimalUITheme.initSettings();
        MinimalUITheme.initHooks();
    } else {
        MinimalUI.noColorSettings = true;
    }
    /** ------------------------- */

    /** Initialize settings for Core Component Functionality */
    MinimalUILogo.initSettings();
    MinimalUINavigation.initSettings();
    MinimalUIControls.initSettings();
    MinimalUIHotbar.initSettings();
    MinimalUISidebar.initSettings();
    MinimalUIPlayers.initSettings();
    /** ------------------------- */

    /** Initialize hooks for Core Component Functionality */
    MinimalUILogo.initHooks();
    MinimalUINavigation.initHooks();
    MinimalUIControls.initHooks();
    MinimalUIHotbar.initHooks();
    MinimalUISidebar.initHooks();
    MinimalUIPlayers.initHooks();
    /** ------------------------- */

    /** Initialize Foundry UI Patches */
    MinimalUIPatch.initSettings();
    MinimalUIPatch.initHooks();
    /** ------------------------- */

});

Hooks.once('ready', () => {

    if (MinimalUI.noColorSettings && game.user.isGM)
        ui.notifications.error("Minimal UI: Disabled color features because 'lib - colorsettings' module is not active.");

});
