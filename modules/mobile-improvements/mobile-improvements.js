const preloadTemplates = async function () {
    const templatePaths = [
        "modules/mobile-improvements/templates/window-selector.hbs",
        "modules/mobile-improvements/templates/navigation.hbs",
        "modules/mobile-improvements/templates/menu.hbs",
    ];
    return loadTemplates(templatePaths);
};

const MODULE_NAME = "mobile-improvements"; // TODO: Better handling
var settings;
(function (settings) {
    // In config
    settings["SIDEBAR_PAUSES_RENDER"] = "sideBarPausesRender";
    settings["SHOW_MOBILE_TOGGLE"] = "showMobileToggle";
    // Not in config
    settings["SHOW_PLAYER_LIST"] = "showPlayerList";
    settings["PIN_MOBILE_MODE"] = "pinMobileMode";
})(settings || (settings = {}));
const moduleSettings = [
    {
        setting: settings.SIDEBAR_PAUSES_RENDER,
        name: "MOBILEIMPROVEMENTS.SettingsPauseRendering",
        hint: "MOBILEIMPROVEMENTS.SettingsPauseRenderingHint",
        type: Boolean,
        default: false,
    },
    {
        setting: settings.SHOW_MOBILE_TOGGLE,
        name: "MOBILEIMPROVEMENTS.SettingsShowToggle",
        hint: "MOBILEIMPROVEMENTS.SettingsShowToggleHint",
        type: Boolean,
        default: false,
        scope: "world"
    },
    {
        setting: settings.SHOW_PLAYER_LIST,
        type: Boolean,
        default: false,
        config: false,
    },
    {
        setting: settings.PIN_MOBILE_MODE,
        type: Boolean,
        default: false,
        config: false,
    },
];
function registerSetting(callbacks, { setting, ...options }) {
    game.settings.register(MODULE_NAME, setting, {
        config: true,
        scope: "client",
        ...options,
        onChange: callbacks[setting] || undefined,
    });
}
function registerSettings(callbacks = {}) {
    moduleSettings.forEach((item) => {
        registerSetting(callbacks, item);
    });
}
function getSetting(setting) {
    return game.settings.get(MODULE_NAME, setting);
}
function setSetting(setting, value) {
    return game.settings.set(MODULE_NAME, setting, value);
}

// WindowManager is a singleton that allows management of application windows
function activate() {
    if (!window.WindowManager) {
        window.WindowManager = new WindowManager();
    }
}
class Window {
    constructor(app) {
        this.app = app;
    }
    get title() {
        return this.app.title;
    }
    get id() {
        return this.app.appId;
    }
    get minimized() {
        // @ts-ignore
        return this.app._minimized;
    }
    show() {
        if (this.minimized) {
            this.app.maximize();
        }
        this.app.bringToTop();
    }
    minimize() {
        this.app.minimize();
    }
    close() {
        this.app.close();
    }
}
class WindowManager {
    constructor() {
        // All windows
        this.windows = {};
        this.version = "1.0";
        this.windowChangeHandler = {
            set: (target, property, value) => {
                target[property] = value;
                this.windowAdded(parseInt(property));
                // Hook for new window being rendered
                Hooks.once("render" + value.constructor.name, this.newWindowRendered);
                return true;
            },
            deleteProperty: (target, property) => {
                const res = delete target[property];
                setTimeout(() => {
                    this.windowRemoved(parseInt(property));
                }, 1);
                return res;
            },
        };
        ui.windows = new Proxy(ui.windows, this.windowChangeHandler);
        // Override Application bringToTop
        const old = Application.prototype.bringToTop;
        const windowBroughtToTop = this.windowBroughtToTop.bind(this);
        Application.prototype.bringToTop = function () {
            old.call(this);
            windowBroughtToTop(this.appId);
        };
        // Override Application minimize
        const windowMinimized = this.windowMinimized.bind(this);
        const oldMinimize = Application.prototype.minimize;
        Application.prototype.minimize = function () {
            const r = oldMinimize.call(this);
            r.then(() => windowMinimized(this.appId));
            return r;
        };
        // Override Application maximize
        const windowMaximized = this.windowMaximized.bind(this);
        const oldMaximize = Application.prototype.maximize;
        Application.prototype.maximize = function () {
            const r = oldMaximize.call(this);
            r.then(() => windowMaximized(this.appId));
            return r;
        };
        console.info("Window Manager | Initiated");
        Hooks.call("WindowManager:Init");
    }
    newWindowRendered(app) {
        Hooks.call("WindowManager:NewRendered", app.appId);
    }
    windowAdded(appId) {
        this.windows[appId] = new Window(ui.windows[appId]);
        Hooks.call("WindowManager:Added", appId);
    }
    windowRemoved(appId) {
        delete this.windows[appId];
        Hooks.call("WindowManager:Removed", appId);
        this.checkEmpty();
    }
    windowBroughtToTop(appId) {
        Hooks.call("WindowManager:BroughtToTop", appId);
    }
    windowMinimized(appId) {
        Hooks.call("WindowManager:Minimized", appId);
        this.checkEmpty();
    }
    windowMaximized(appId) {
        Hooks.call("WindowManager:Maximized", appId);
    }
    checkEmpty() {
        const windows = Object.values(this.windows);
        if (windows.length === 0 || windows.every((w) => w.minimized)) {
            Hooks.call("WindowManager:NoneVisible");
        }
    }
    minimizeAll() {
        return Object.values(this.windows).reduce((didMinimize, window) => {
            didMinimize = didMinimize || !window.minimized;
            window.minimize();
            return didMinimize;
        }, false);
    }
    closeAll() {
        const closed = Object.keys(this.windows).length != 0;
        Object.values(this.windows).forEach((window) => {
            window.close();
        });
        return closed;
    }
}

const icons = {
    "": "",
    combat: "fa-fist-raised",
    scenes: "fa-map",
    scene: "fa-map",
    actors: "fa-users",
    actor: "fa-users",
    items: "fa-suitcase",
    item: "fa-suitcase",
    weapon: "fa-suitcase",
    journal: "fa-book-open",
    tables: "fa-th-list",
    playlists: "fa-music",
    compendium: "fa-atlas",
    settings: "fa-cogs",
    npc: "fa-skull",
    character: "fa-user",
    spell: "fa-magic",
    equipment: "fa-tshirt",
    feat: "fa-hand-rock",
    class: "fa-user",
};
class WindowMenu extends Application {
    constructor(nav) {
        super({
            template: "modules/mobile-improvements/templates/window-selector.hbs",
            popOut: false,
        });
        this.list = null;
        this.newWindow = (win) => {
            const winIcon = this.winIcon(win.app);
            const windowButton = $(`<button class="window-select" title="${win.title}"><i class="fas ${winIcon}"></i> ${win.title}</button>`);
            const closeButton = $(`<button class="window-close" title="close"><i class="fas fa-times"></i></button>`);
            const row = $(`<li class="window-row"  data-id="${win.id}"></li>`);
            row.append(windowButton, closeButton);
            windowButton.on("click", (ev) => {
                ev.preventDefault();
                win.show();
                this.nav.closeDrawer();
            });
            closeButton.on("click", (ev) => {
                ev.preventDefault();
                win.close();
            });
            return row;
        };
        this.nav = nav;
        Hooks.on("WindowManager:NewRendered", this.windowAdded.bind(this));
        Hooks.on("WindowManager:Removed", this.windowRemoved.bind(this));
    }
    activateListeners(html) {
        this.list = html.find(".window-list");
    }
    // Attempt to discern the title and icon of the window
    winIcon(win) {
        let windowType = win.icon ||
            win.tabName ||
            win.object?.type ||
            win.object?.system?.type ||
            win.object?.system?.entity ||
            (win.metadata ? "compendium" : "") ||
            "";
        windowType = windowType.toLowerCase();
        const icon = icons[windowType] || windowType;
        return icon;
    }
    windowAdded(appId) {
        this.list?.append(this.newWindow(window.WindowManager.windows[appId]));
        this.update();
    }
    windowRemoved(appId) {
        this.list?.find(`li[data-id="${appId}"]`).remove();
        this.update();
    }
    update() {
        const winCount = Object.values(window.WindowManager.windows).length;
        this.nav.setWindowCount(winCount);
    }
}

class About extends Application {
    constructor() {
        super({
            template: "modules/mobile-improvements/templates/about.hbs",
            id: "mobile-improvements-about",
            title: "MOBILEIMPROVEMENTS.MenuAbout",
            width: 300,
            height: 260,
        });
    }
    activateListeners(html) {
        html.find(".close-about").on("click", (evt) => {
            this.close();
        });
    }
}

class MobileMenu extends Application {
    constructor(nav) {
        super({
            template: "modules/mobile-improvements/templates/menu.hbs",
            popOut: false,
        });
        this.nav = nav;
        this.aboutApp = new About();
    }
    activateListeners(html) {
        html.find("li").on("click", (evt) => {
            const [firstClass] = evt.currentTarget.className.split(" ");
            const [, name] = firstClass.split("-");
            this.selectItem(name);
        });
    }
    toggleOpen() {
        this.element.toggleClass("open");
    }
    selectItem(name) {
        switch (name) {
            case "about":
                this.aboutApp.render(true);
                break;
            case "fullscreen":
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                else {
                    document.documentElement.requestFullscreen();
                }
                break;
            case "players":
                setSetting(settings.SHOW_PLAYER_LIST, !getSetting(settings.SHOW_PLAYER_LIST));
                break;
            case "canvas":
                game.settings.set("core", "noCanvas", !game.settings.get("core", "noCanvas"));
                //@ts-ignore
                SettingsConfig.reloadConfirm();
                break;
            case "exit":
                setSetting(settings.PIN_MOBILE_MODE, false);
                break;
            default:
                console.log("Unhandled menu item", name);
                break;
        }
        this.nav.closeDrawer();
    }
}

var ViewState;
(function (ViewState) {
    ViewState[ViewState["Unloaded"] = 0] = "Unloaded";
    ViewState[ViewState["Map"] = 1] = "Map";
    ViewState[ViewState["App"] = 2] = "App";
})(ViewState || (ViewState = {}));
var DrawerState;
(function (DrawerState) {
    DrawerState[DrawerState["None"] = 0] = "None";
    DrawerState["Macros"] = "macros";
    DrawerState["Menu"] = "menu";
    DrawerState["Windows"] = "windows";
})(DrawerState || (DrawerState = {}));
function isTabletMode() {
    return globalThis.MobileMode.enabled && window.innerWidth > 900;
}
class MobileUI extends Application {
    constructor() {
        super({
            template: "modules/mobile-improvements/templates/navigation.hbs",
            popOut: false,
        });
        this.state = ViewState.Unloaded;
        this.drawerState = DrawerState.None;
        this.noCanvas = false;
        this.windowMenu = new WindowMenu(this);
        this.mobileMenu = new MobileMenu(this);
        // Ensure HUD shows on opening a new window
        Hooks.on("WindowManager:NewRendered", () => this._onShowWindow());
        Hooks.on("WindowManager:BroughtToTop", () => this._onShowWindow());
        Hooks.on("WindowManager:NoneVisible", () => this._onHideAllWindows());
    }
    _onShowWindow() {
        $(document.body).removeClass("hide-hud");
        $(document.body).addClass("windows-open");
        if (isTabletMode()) {
            this.showSidebar();
        }
    }
    _onHideAllWindows() {
        $(document.body).removeClass("windows-open");
    }
    render(force, ...arg) {
        this.noCanvas = game.settings.get("core", "noCanvas");
        this.state = this.noCanvas ? ViewState.App : ViewState.Map;
        //@ts-ignore
        const r = super.render(force, ...arg);
        this.windowMenu.render(force);
        this.mobileMenu.render(force);
        return r;
    }
    activateListeners(html) {
        html.find("li").on("click", (evt) => {
            const [firstClass] = evt.currentTarget.className.split(" ");
            const [, name] = firstClass.split("-");
            this.selectItem(name);
        });
        this.updateMode();
        html.before(`<div id="show-mobile-navigation"><i class="fas fa-chevron-up"></i></div>`);
        html.siblings("#show-mobile-navigation").on("click", () => {
            $(document.body).toggleClass("hide-hud");
        });
        if (this.noCanvas) {
            this.element.find(".navigation-map").detach();
        }
    }
    closeDrawer() {
        this.setDrawerState(DrawerState.None);
    }
    showMap() {
        const minimized = window.WindowManager.minimizeAll();
        if (!minimized && this.state == ViewState.Map) {
            $(document.body).toggleClass("hide-hud");
        }
        this.state = ViewState.Map;
        canvas.ready && canvas.app?.start();
        this.setDrawerState(DrawerState.None);
        this.updateMode();
    }
    showSidebar() {
        this.state = ViewState.App;
        $(document.body).removeClass("hide-hud");
        ui.sidebar?.expand();
        if (!isTabletMode())
            window.WindowManager.minimizeAll();
        if (getSetting(settings.SIDEBAR_PAUSES_RENDER) === true) ;
        this.setDrawerState(DrawerState.None);
        this.updateMode();
    }
    showHotbar() {
        $(document.body).addClass("show-hotbar");
        ui.hotbar.expand();
    }
    hideHotbar() {
        $(document.body).removeClass("show-hotbar");
    }
    setWindowCount(count) {
        this.element.find(".navigation-windows .count").html(count.toString());
        if (count === 0) {
            this.element.find(".navigation-windows").addClass("disabled");
        }
        else {
            this.element.find(".navigation-windows").removeClass("disabled");
        }
        if (this.drawerState == DrawerState.Windows) {
            this.setDrawerState(DrawerState.None);
        }
    }
    setDrawerState(state) {
        $(`body > .drawer`).removeClass("open");
        this.element.find(".toggle.active").removeClass("active");
        this.hideHotbar();
        if (state == DrawerState.None || state == this.drawerState) {
            this.drawerState = DrawerState.None;
            return;
        }
        this.drawerState = state;
        if (state == DrawerState.Macros) {
            this.showHotbar();
        }
        else {
            $(`body > .drawer.drawer-${state}`).addClass("open");
        }
        this.element.find(`.navigation-${state}`).addClass("active");
    }
    selectItem(name) {
        switch (name) {
            case "map":
                this.showMap();
                break;
            case "sidebar":
                this.showSidebar();
                break;
            default:
                this.setDrawerState(name);
        }
    }
    updateMode() {
        this.element.find(".active:not(.toggle)").removeClass("active");
        $(document.body).removeClass("mobile-app");
        $(document.body).removeClass("mobile-map");
        switch (this.state) {
            case ViewState.Map:
                this.element.find(".navigation-map").addClass("active");
                $(document.body).addClass("mobile-map");
                break;
            case ViewState.App:
                this.element.find(".navigation-sidebar").addClass("active");
                $(document.body).addClass("mobile-app");
                break;
        }
    }
}

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
function viewHeight() {
    document.documentElement.style.setProperty("--vh", `${Math.min(window.innerHeight, window.outerHeight) * 0.01}px`);
}

class TouchInput {
    constructor() {
        this.cancelled = false;
        this.tapMaxTime = 400;
        this.tapStart = -1;
        this.tapStartPos = { x: 0, y: 0 };
        this.touches = 0;
    }
    getTarget(evt) {
        let target = evt.target;
        while (!target?.document && target?.parent) {
            target = target.parent;
        }
        if (!target.document) {
            return null;
        }
        return target;
    }
    hook() {
        if (!canvas.ready)
            return;
        canvas.stage?.on("touchstart", (evt) => {
            this.touches++;
            this.tapStart = Date.now();
            this.tapStartPos = evt.client;
            if (this.touches > 1) {
                this.cancelled = true;
            }
        });
        canvas.stage?.on("touchmove", (evt) => {
            if (evt.client.x != this.tapStartPos.x || evt.client.y != this.tapStartPos.y) {
                this.cancelled = true;
            }
        });
        canvas.stage?.on("touchend", (evt) => {
            if (this.touches > 0)
                this.touches--;
            if (!this.cancelled && Date.now() - this.tapStart < this.tapMaxTime) {
                const target = this.getTarget(evt);
                if (!target) {
                    $(document.body).toggleClass("hide-hud");
                }
            }
            this.cancelled = false;
        });
        console.log("Mobile Improvements | Touch tap hooked");
    }
}

function setMeta() {
    const meta = document.querySelector(`meta[name="viewport"]`);
    if (meta) {
        meta.setAttribute("content", `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0`);
    }
}
class MobileMode {
    static enter() {
        if (MobileMode.enabled)
            return;
        MobileMode.enabled = true;
        document.body.classList.add("mobile-improvements");
        setMeta();
        ui.nav?.collapse();
        viewHeight();
        Hooks.call("mobile-improvements:enter");
    }
    static leave() {
        if (!MobileMode.enabled)
            return;
        MobileMode.enabled = false;
        document.body.classList.remove("mobile-improvements");
        Hooks.call("mobile-improvements:leave");
    }
    static viewResize() {
        if (MobileMode.enabled)
            viewHeight();
        if (game.settings && getSetting(settings.PIN_MOBILE_MODE))
            return MobileMode.enter();
        if (localStorage.getItem("mobile-improvements.pinMobileMode") === "true")
            return MobileMode.enter();
        if (window.innerWidth <= 800) {
            MobileMode.enter();
        }
        else {
            MobileMode.leave();
        }
    }
}
MobileMode.enabled = false;
document.body.addEventListener("scroll", () => {
    document.body.scroll(0, 0);
});
function togglePlayerList(show) {
    if (show) {
        document.getElementById("players")?.classList.add("mobile-hidden");
    }
    else {
        document.getElementById("players")?.classList.remove("mobile-hidden");
    }
}
function showToggleModeButton(show) {
    if (!show) {
        $("#mobile-improvements-toggle").detach();
        return;
    }
    const button = $(`<a id="mobile-improvements-toggle"><i class="fas fa-mobile-alt"></i> ${game.i18n.localize("MOBILEIMPROVEMENTS.EnableMobileMode")}</a>`);
    $("body").append(button);
    button.on("click", () => {
        setSetting(settings.PIN_MOBILE_MODE, true);
    });
}
// Trigger the recalculation of viewheight often. Not great performance,
// but required to work on different mobile browsers
document.addEventListener("fullscreenchange", () => setTimeout(MobileMode.viewResize, 100));
window.addEventListener("resize", MobileMode.viewResize);
window.addEventListener("scroll", MobileMode.viewResize);
MobileMode.viewResize();
Hooks.once("init", async function () {
    console.log("Mobile Improvements | Initializing Mobile Improvements");
    activate();
    if (MobileMode.navigation === undefined) {
        MobileMode.navigation = new MobileUI();
    }
    registerSettings({
        [settings.SHOW_PLAYER_LIST]: togglePlayerList,
        [settings.SHOW_MOBILE_TOGGLE]: showToggleModeButton,
        [settings.PIN_MOBILE_MODE]: (enabled) => {
            if (enabled)
                MobileMode.enter();
            else
                MobileMode.leave();
        },
    });
    await preloadTemplates();
});
Hooks.on("ready", () => {
    MobileMode.navigation.render(true);
    showToggleModeButton(getSetting(settings.SHOW_MOBILE_TOGGLE));
});
Hooks.once("renderChatLog", (app) => {
    let touchWhenFocused = false;
    const form = app.element.find("#chat-form");
    const textarea = form.find("#chat-message").get(0);
    const btn = $(`<button id="chat-form--send"><i class="fas fa-paper-plane"></i></button>`);
    btn.on("touchstart", () => {
        if (document.activeElement === textarea) {
            touchWhenFocused = true;
        }
    });
    btn.on("touchend", () => {
        setTimeout(() => (touchWhenFocused = false), 100);
    });
    btn.on("click", (evt) => {
        evt.preventDefault();
        if (touchWhenFocused) {
            textarea?.focus();
        }
        //@ts-ignore
        app._onChatKeyDown({
            code: "Enter",
            originalEvent: {},
            preventDefault: () => { },
            currentTarget: textarea,
        });
    });
    form.append(btn);
});
Hooks.once("renderSceneNavigation", () => {
    if (MobileMode.enabled)
        ui.nav?.collapse();
});
Hooks.once("renderPlayerList", () => togglePlayerList(getSetting(settings.SHOW_PLAYER_LIST)));
Hooks.on("createChatMessage", (message) => {
    if (!MobileMode.enabled || !message.isAuthor)
        return;
    const shouldBloop = MobileMode.navigation.state === ViewState.Map ||
        window.WindowManager.minimizeAll() ||
        ui.sidebar.activeTab !== "chat";
    MobileMode.navigation.showSidebar();
    ui.sidebar.activateTab("chat");
    if (shouldBloop) {
        Hooks.once("renderChatMessage", (obj, html) => {
            if (obj.id !== message.id)
                return; // Avoid possible race condition?
            html.addClass("bloop");
            setTimeout(() => html.removeClass("bloop"), 10000);
        });
    }
});
const notificationQueueProxy = {
    get: function (target, key) {
        if (key === "__isProxy")
            return true;
        if (key === "push") {
            return (...arg) => {
                if (Hooks.call("queuedNotification", ...arg)) {
                    target.push(...arg);
                }
            };
        }
        return target[key];
    },
};
Hooks.once("renderNotifications", (app) => {
    if (!app.queue.__isProxy) {
        app.queue = new Proxy(app.queue, notificationQueueProxy);
    }
});
const touchInput = new TouchInput();
Hooks.on("canvasReady", () => touchInput.hook());
Hooks.on("queuedNotification", (notif) => {
    if (typeof notif.message === "string") {
        const regex = /\s.+px/g;
        const message = notif.message?.replace(regex, "");
        //@ts-ignore
        const match = game.i18n.translations.ERROR.LowResolution.replace(regex, "");
        if (message == match) {
            console.log("notification suppressed", notif);
            return false;
        }
    }
});
globalThis.MobileMode = MobileMode;
//# sourceMappingURL=mobile-improvements.js.map
