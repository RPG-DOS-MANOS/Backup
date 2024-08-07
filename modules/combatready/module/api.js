import { debug } from "../combatready.js";
import { CombatReady } from "./combatReady.js";
import { MODULE_NAME } from "./settings.js";
import { SettingsAwareEntity } from "./settingsAwareEntity.js";
import { NativeAnimation } from "./animations.js";
import { NativeTimer } from "./timers.js";
/**
 * Stores all the available animations for the module
 *
 * @type {Array<CombatReadyAnimation>}
 */
export const availableAnimations = [];
/**
 * Stores all the available timers for the module
 *
 * @type {Array<CombatReadyTimer>}
 */
export const availableTimers = [];
/**
 * The current animation
 *
 * @type {CombatReadyAnimation}
 */
export var currentAnimation;
/**
 * The current timer
 *
 * @type {CombatReadyTimer}
 */
export var currentTimer;
/**
 * The API
 * isActive: Currently unused
 * setupAnimation: Function to setup a new animation
 * setupTimer: Function to setup a new timer
 * getCurrentTime: Function to get the current combat time
 * getMaxTime: Function to get the max time per combat
 *
 * @type {{
    isActive: boolean,
    setupAnimation: Function,
    setupTimer: Function,
    getCurrentTime: Function,
    getMaxTime: Function
}}
 */
export const CombatReadyApi = {
    isActive: false,
    setupAnimation,
    setupTimer,
    getCurrentTime,
    getMaxTime
};
/**
 * Initialize the API by setting the default animation and timer
 *
 * @export
 */
export function initApi() {
    //@ts-ignore
    game.modules.get(MODULE_NAME).api = CombatReadyApi;
    debug("Setting default animation and timer");
    setupAnimation(new NativeAnimation("native"));
    setupTimer(new NativeTimer("native"));
}
/**
 * Get the current time in the active combat in seconds
 *
 * @returns {number}
 */
function getCurrentTime() {
    return CombatReady.TIMECURRENT;
}
/**
 * Get the max time for the timer in seconds
 *
 * @returns {number}
 */
function getMaxTime() {
    return CombatReady.TIMEMAX;
}
/**
 * Create and register the settings for animations and timers
 *
 * @param {*} settingsAwareEntity
 */
function setupSettings(settingsAwareEntity) {
    if (settingsAwareEntity instanceof SettingsAwareEntity) {
        for (const setting of settingsAwareEntity.settings) {
            setting.setting.config = false;
            if (setting.setting.type == "Color") {
                setting.setting.type = String;
            }
            if (setting.setting.type == "Separator") {
                continue;
            }
            game.settings.register(MODULE_NAME, `${settingsAwareEntity.type}.${settingsAwareEntity.id}.setting.${setting.id}`, setting.setting);
        }
    }
}
/**
 * Register an animation in the module
 *
 * @param {*} animation
 */
function setupAnimation(animation) {
    if (availableAnimations[animation.id] != undefined) {
        throw new Error('You can not register an animation with an id that is already used');
    }
    setupSettings(animation);
    availableAnimations[animation.id] = animation;
    game.settings.settings.get(MODULE_NAME + ".selectedAnimation").default = getDefaultAnimation();
}
/**
 * Register a timer in the module
 *
 * @param {*} timer
 */
function setupTimer(timer) {
    if (availableTimers[timer.id] != undefined) {
        throw new Error('You can not register a timer with an id that is already used');
    }
    setupSettings(timer);
    availableTimers[timer.id] = timer;
    game.settings.settings.get(MODULE_NAME + ".selectedTimer").default = getDefaultTimer();
}
/**
 * Retrieve the default animation id
 *
 * @export
 * @returns {string}
 */
export function getDefaultAnimation() {
    const AnimationsIds = Object.keys(availableAnimations);
    return AnimationsIds[0];
}
/**
 * Retrieve the default timer id
 *
 * @export
 * @returns {string}
 */
export function getDefaultTimer() {
    const TimerId = Object.keys(availableTimers);
    return TimerId[0];
}
/**
 * Update the animation and initialize them, if it fails fallback to default
 *
 * @export
 * @async
 * @returns {Promise<void>}
 */
export async function updateAnimation() {
    const selectedAnimation = game.settings.get(MODULE_NAME, "selectedAnimation");
    currentAnimation?.destroy();
    //@ts-ignore
    currentAnimation = availableAnimations[selectedAnimation] ?? availableAnimations[game.settings?.settings?.get(MODULE_NAME + ".selectedAnimation").default];
    //@ts-ignore
    if (availableAnimations[selectedAnimation] == undefined) {
        await game.settings.set(MODULE_NAME, "selectedAnimation", currentAnimation.id);
    }
    currentAnimation?.initialize();
}
/**
 * Update the timer and initialize them, if it fails fallback to default
 *
 * @export
 * @async
 * @returns {Promise<void>}
 */
export async function updateTimer() {
    const selectedTimer = game.settings.get(MODULE_NAME, "selectedTimer");
    currentTimer?.destroy();
    //@ts-ignore
    currentTimer = availableTimers[selectedTimer] ?? availableTimers[game.settings?.settings?.get(MODULE_NAME + ".selectedTimer").default];
    //@ts-ignore
    if (availableTimers[selectedTimer] == undefined) {
        await game.settings.set(MODULE_NAME, "selectedTimer", currentTimer.id);
    }
    currentTimer?.initialize();
}
