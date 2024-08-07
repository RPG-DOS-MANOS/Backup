import { getGame } from "../../combatreadythemes.js";
export function registerLightMeter(CombatReadyTimer) {
    class LightMeter extends CombatReadyTimer {
        constructor() {
            super(...arguments);
            this.name = "LightMeter";
        }
        initialize() {
            let body = document.getElementsByTagName("body")[0];
            let sidebar = document.getElementById("sidebar");
            let timebar = document.createElement("div");
            let timefill = document.createElement("div");
            let icon = document.createElement("div");
            timebar.id = "combatready-theme-dd-timebar";
            $(timebar).addClass("combatready-theme-dd-timebar");
            $(timefill).addClass("combatready-theme-dd-timebar-fill");
            $(icon).addClass("combatready-theme-dd-timebar-icon");
            timebar.appendChild(icon);
            timebar.appendChild(timefill);
            body.appendChild(timebar);
            // Ajust due to DOM elements
            timebar.style.width = `100%`;
            this.TIMEBAR = timebar;
            this.TIMEFILL = timefill;
            this.ICON = icon;
            this.adjustWidth();
            this.tick(); //Do a tick to redraw in case is a reload;
            this.ready = true;
        }
        destroy() {
            this.TIMEBAR?.remove();
            this.TIMEFILL?.remove();
            this.ICON?.remove();
            this.ready = false;
        }
        start() {
            if (!this.ready)
                return;
            this.TIMEBAR.style.display = "flex";
            this.TIMEFILL.style.width = "100%";
            this.TIMEFILL.style.transition = "none";
        }
        stop() {
            if (!this.ready)
                return;
            this.TIMEBAR.style.display = "none";
            this.TIMEFILL.style.width = "100%";
            this.TIMEFILL.style.transition = "none";
        }
        pause() {
            if (!this.ready)
                return;
            this.TIMEBAR.style.display = "flex";
        }
        resume() {
            if (!this.ready)
                return;
            this.TIMEBAR.style.display = "flex";
        }
        tick() {
            if (!this.ready)
                return;
            this.TIMEBAR.style.display = "flex";
            //@ts-ignore
            let width = 100 - ((getGame().modules.get("combatready")?.api?.getCurrentTime() / getGame().modules.get("combatready")?.api?.getMaxTime()) * 100);
            this.TIMEFILL.style.transition = "";
            this.TIMEFILL.style.width = `${width}%`;
        }
        adjustWidth() {
            let sidebar = document.getElementById("sidebar");
            let width = sidebar.offsetWidth;
            if ($(document.body).hasClass("mobile-improvements"))
                width = 0;
            this.TIMEBAR.style.width = `calc(100vw - ${width}px)`;
        }
        get settings() {
            return [];
        }
    }
    //@ts-ignore
    getGame().modules.get("combatready")?.api?.setupTimer(new LightMeter("CombatReadyLightMeter"));
}
