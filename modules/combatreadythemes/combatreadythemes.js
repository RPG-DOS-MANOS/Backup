import { registerLightMeter } from "./themes/light-meter/lightMeter.js";
import { registerVideoAnimation } from "./themes/video-animation/videoAnimation.js";
export function getCanvas() {
    if (!(canvas instanceof Canvas) || !canvas.ready) {
        throw new Error('Canvas Is Not Initialized');
    }
    return canvas;
}
export function getGame() {
    if (!(game instanceof Game)) {
        throw new Error('Game Is Not Initialized');
    }
    return game;
}
export function getCombats() {
    if (!(getGame().combats instanceof CombatEncounters)) {
        throw new Error('CombatEncounters Is Not Initialized');
    }
    return getGame().combats;
}
/**
 * Ready hook
 */
Hooks.on("ready", function () {
    //@ts-ignore
    if (!(game.modules.get("combatready")?.active ?? false)) {
        ui?.notifications?.notify('Please make sure you have the "Combat Ready!" module installed and enabled.', "error");
    }
});
Hooks.on("combatready.ready", (CombatReadyAnimationTheme, CombatReadyTimer) => {
    registerLightMeter(CombatReadyTimer);
    registerVideoAnimation(CombatReadyAnimationTheme);
});
//@ts-ignore
const gmodule = await import(`../../../../${ROUTE_PREFIX}/scripts/greensock/esm/all.js`);
export const gsap = gmodule.gsap;
