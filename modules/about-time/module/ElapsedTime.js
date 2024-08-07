import { FastPriorityQueue, Quentry } from "./FastPirorityQueue.js";
import { PseudoClock, PseudoClockMessage, _addEvent } from "./PseudoClock.js";
import { currentWorldTime, dateToTimestamp, intervalATtoSC, intervalSCtoAT } from "./calendar/DateTime.js";
const _moduleSocket = "module.about-time";
const _updateClock = "updateClock";
let _userId = "";
let _isGM = false;
let warn = (...args) => {
    if (ElapsedTime.debug)
        console.warn("about-time | ", ...args);
};
let log = (...args) => {
    console.log("about-time | ", ...args);
};
export class ElapsedTime {
    get eventQueue() { return ElapsedTime._eventQueue; }
    set eventQueue(queue) { ElapsedTime._eventQueue = queue; }
    static currentTimeString() {
        //@ts-ignore game.time
        const datetime = globalThis.SimpleCalendar.api.timestampToDate(game.time.worldTime);
        return `${datetime.hour}:${datetime.minute}:${datetime.second}`;
    }
    static timeString(duration) {
        const datetime = globalThis.SimpleCalendar.api.timestampToDate(duration);
        return `${datetime.hour}:${datetime.minute}:${datetime.second}`;
    }
    static currentTime() {
        //@ts-ignore
        return intervalSCtoAT(globalThis.SimpleCalendar.api.timestampToDate(game.time.worldTime));
    }
    static currentTimeSeconds() {
        //@ts-ignore
        return game.time.worlTime;
    }
    static status() {
        console.log(ElapsedTime._eventQueue.array, ElapsedTime._eventQueue.size, ElapsedTime._saveInterval);
    }
    static _displayCurrentTime() {
        //@ts-ignore
        console.log(`Elapsed time ${window.SimpleCalendar.api.timestampToDate(game.time.worldTime)}`);
    }
    // These will all have to change to the SC versions
    static setClock(timeInSeconds) {
        console.error(`about-time | setTime() deprecated please use game.settings.set( game.settings.set("core", "time", timeInSeconds))`);
    }
    static advanceClock(timeIncrement) {
        console.error("about-time | advanceClock() deprecated please use game.time.advance(increment)");
    }
    static advanceTime(spec = {}) {
        console.error(`about-time | advanceTime() deprecated please use
      const newTime = SimpleCalendar.api.timestampPlusInterval(game.time.worldTime, spec)
      game.settings.set("core", "time", newTime)
    `);
    }
    /**
     * Set the time of day.
     * @param spec {hours=0, minutes=0, seconds=0}
     */
    static setTime(spec) {
        console.error(`about-time | setTime() deprecated please use
    const newTime = window.SimpleCalendar.api.dateToTimestamp(spec);
    game.settings.set("core", "time", newTime)`);
    }
    /**
     * Set the clock to the given date time | date time assumed to be a full date time
     * @param dt DateTIme
     */
    static setDateTime(dt) {
        console.error(`about-time | setDateTime() deprecated please use
    game.settings.set("core", "time", timestamp)
  `);
    }
    /**
     * set specif
     * @param param0
     */
    static setAbsolute(spec = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }) {
        console.error(`about-time | setAbsolute() deprecated please use
    const newTime = window.SimpleCalendar.api.dateToTimestamp(newSpec);
    game.settings.set("core", "time", timestamp)
  `);
    }
    /**
     * callback handling
     * do - call the supplied handler or macro
     * notify - broadcast an event message to all game clients
     * reminder - log a message to the console.
     *
     * Each has
     * At - run at the specified time
     * In - run after the specified interval
     * Every - run every specified interval
     *
     */
    static doAt(when, handler, ...args) {
        if (typeof when === "number") { // assume it is already a timestamp
        }
        else {
            when = intervalATtoSC(when);
            when = dateToTimestamp(when);
        }
        return ElapsedTime.gsetTimeoutAt(when, handler, ...args);
    }
    static doIn(when, handler, ...args) {
        if (typeof when !== "number") {
            when = intervalATtoSC(when);
            //@ts-ignore
            when = window.SimpleCalendar.api.timestampPlusInterval(0, when);
        }
        return ElapsedTime.gsetTimeoutIn(when, handler, ...args);
    }
    static doEvery(when, handler, ...args) {
        // this needs to add in the current time spec
        if (typeof when !== "number")
            when = intervalATtoSC(when);
        return ElapsedTime.gsetInterval(when, handler, ...args);
    }
    static reminderAt(when, ...args) {
        when = intervalATtoSC(when);
        //@ts-ignore
        return this.doAt(when, (...args) => game.Gametime.ElapsedTime.message(...args), ...args);
    }
    static reminderIn(when, ...args) {
        //@ts-ignore
        return this.doIn(when, (...args) => game.Gametime.ElapsedTime.message(...args), ...args);
    }
    static reminderEvery(interval, ...args) {
        //@ts-ignore
        return this.doEvery(interval, (...args) => game.Gametime.ElapsedTime.message(...args), ...args);
    }
    static notifyAt(when, eventName, ...args) {
        if (ElapsedTime.debug)
            ElapsedTime.log("notifyAt", eventName, ...args);
        //@ts-ignore
        return this.doAt(when, (eventName, ...args) => game.Gametime._notifyEvent(eventName, ...args), eventName, ...args);
    }
    static notifyIn(when, eventName, ...args) {
        //@ts-ignore
        return this.doIn(when, (eventName, ...args) => game.Gametime._notifyEvent(eventName, ...args), eventName, ...args);
    }
    static notifyEvery(when, eventName, ...args) {
        if (ElapsedTime.debug)
            ElapsedTime.log("notifyAt", eventName, ...args);
        //@ts-ignore
        return this.doEvery(when, (eventName, ...args) => game.Gametime._notifyEvent(eventName, ...args), eventName, ...args);
    }
    /* These are the base level routines - exist for analogy to normal real time clock */
    static gsetTimeout(when, handler, ...args) {
        let timeout;
        if (typeof when !== "number") {
            when = intervalATtoSC(when);
            //TODO make sure this is right
            ///@ts-ignore
            timeout = window.SimpleCalendar.api.timestampPlusInterval(currentWorldTime(), when);
        }
        else
            timeout = when;
        if (ElapsedTime.debug)
            ElapsedTime.log("gsetTimeout", timeout, handler, ...args);
        return ElapsedTime._addEVent(timeout, false, null, handler, ...args);
    }
    static gsetTimeoutAt(when, handler, ...args) {
        let eventTime;
        if (typeof when === "number")
            eventTime = when;
        else {
            when = intervalATtoSC(when);
            eventTime = dateToTimestamp(when);
        }
        return ElapsedTime._addEVent(eventTime, false, null, handler, ...args);
    }
    static gsetTimeoutIn(when, handler, ...args) {
        let timeoutSeconds;
        if (typeof when === "number")
            timeoutSeconds = when + currentWorldTime();
        else {
            when = intervalATtoSC(when);
            //@ts-ignore
            timeoutSeconds = window.SimpleCalendar.api.timestampPlusInterval(currentWorldTime(), when);
        }
        return ElapsedTime._addEVent(timeoutSeconds, false, null, handler, ...args);
    }
    static gsetInterval(when, handler, ...args) {
        // TODO look at when.rounds solution
        let futureTime;
        if (typeof when !== "number") {
            //@ts-ignore
            futureTime = window.SimpleCalendar.api.timestampPlusInterval(currentWorldTime(), when);
        }
        else
            futureTime = currentWorldTime() + when;
        // let timeout = futureTime - currentWorldTime();
        // let timeout = DateTime.now().add(when).toSeconds() - DateTime.now().toSeconds();;
        return ElapsedTime._addEVent(futureTime, true, when, handler, ...args);
    }
    static gclearTimeout(uid) {
        return ElapsedTime._eventQueue.removeId(uid);
    }
    static doAtEvery(when, every, handler, ...args) {
        return ElapsedTime._addEVent(when, true, every, handler, ...args);
    }
    static reminderAtEvery(when, every, ...args) {
        //@ts-ignore
        return ElapsedTime._addEVent(when, true, every, (...args) => game.Gametime.ElapsedTime.message(...args), ...args);
    }
    static notifyAtEvery(when, every, eventName, ...args) {
        //@ts-ignore
        return ElapsedTime._addEVent(when, true, every, (eventName, ...args) => game.Gametime._notifyEvent(eventName, ...args), eventName, ...args);
    }
    static _addEVent(time, recurring, increment = null, handler, ...args) {
        // only allow macros to be run - TODO fix this
        //@ts-ignore
        // if (!game.macros.get(handler) && !game.macros.entities.find(m=>m.name === handler)) return undefined;
        let finalTime;
        if (typeof time === "number") {
            finalTime = time;
        }
        else
            finalTime = dateToTimestamp(time);
        let handlerString;
        if (time < 0) {
            ui.notifications.warn("Cannot set event in the past");
            time = 1;
        }
        // Check that the function will work post saving
        if (typeof handler === "function") {
            try {
                handlerString = handler.toString();
                eval(handlerString);
            }
            catch (err) {
                let name = handlerString.match(/[^\{\()]*/);
                warn(`about-time | handler not valid ${name}`);
                console.log(`try wrapping in (<arglist>) => func(<arglist>)`);
                return undefined;
            }
        }
        let uid = null;
        if (ElapsedTime.debug)
            ElapsedTime.log("add event", handler);
        // if the increment is just data upgrade it to a DTmod
        const entry = new Quentry(finalTime, recurring, increment, handler, uid, game.user.id, ...args);
        if (PseudoClock.isMaster) {
            ElapsedTime._eventQueue.add(entry);
            ElapsedTime._save(true);
            ElapsedTime._increment = increment;
            return entry._uid;
        }
        else {
            const eventMessage = new PseudoClockMessage({ action: _addEvent, userId: game.user.id, newTime: 0 }, entry.exportToJson());
            PseudoClock._notifyUsers(eventMessage);
        }
    }
    /**
     * call and if required reschedule events due to execute at the new time
     * @param newTime passed by the clock update
     */
    static async pseudoClockUpdate(newTime) {
        var _a, _b, _c, _d;
        if (!PseudoClock.isMaster)
            return;
        if (ElapsedTime.debug)
            ElapsedTime.log(ElapsedTime.currentTimeString());
        let needSave = false;
        // Check the event queue for activities to fire.
        const q = ElapsedTime._eventQueue;
        if (ElapsedTime.debug && q.size) {
            ElapsedTime.log("pseudoClockUpdate", q);
            ElapsedTime.log("pseudoClockUpdate", currentWorldTime(), q.peek()._time);
        }
        while (q.peek() && q.peek()._time <= currentWorldTime()) {
            let qe = q.poll();
            if (ElapsedTime.debug)
                ElapsedTime.log("pseudoClockUpdate - doing event ", qe);
            try {
                // Assume string handlers refer to macros id or name
                if (typeof qe._handler === "string") {
                    let macro;
                    let args;
                    if (qe._handler === "DynamicEffects-Item-Macro") {
                        let itemData = qe._args[0];
                        args = qe._args.splice(1);
                        let macroCommand = ((_b = (_a = itemData.flags.itemacro) === null || _a === void 0 ? void 0 : _a.macro) === null || _b === void 0 ? void 0 : _b.command) || "";
                        if (macroCommand)
                            macro = await (_d = (_c = CONFIG.Macro.documentClass) === null || _c === void 0 ? void 0 : _c.create, (_d !== null && _d !== void 0 ? _d : CONFIG.Macro.entityClass.create))({
                                name: "dynamiceffects-item-macro",
                                type: "script",
                                img: itemData.img,
                                command: macroCommand,
                                flags: { "dnd5e.itemMacro": true }
                            }, { displaySheet: false, temporary: true });
                    }
                    else {
                        // @ts-ignore
                        macro = game.macros.get(qe._handler) || game.macros.getName(qe._handler);
                        args = qe._args;
                    }
                    if (ElapsedTime.debug)
                        ElapsedTime.log("Executing macro", macro, args);
                    // Ship this back to whoever queued it to execute.
                    if (macro)
                        macroExecute(macro, ...args);
                }
                else {
                    if (ElapsedTime.debug)
                        ElapsedTime.log("clock update ", ...qe._args);
                    // Ship this back to whoever queued it to execute
                    await qe._handler(...qe._args);
                }
                if (qe._recurring) {
                    if (ElapsedTime.debug)
                        ElapsedTime.log("recurring event", qe._increment, qe._handler, qe._time);
                    // let newTime = DateTime.now().add(qe._increment).toSeconds() - DateTime.now().toSeconds() + PseudoClock.currentTime;
                    // Do via date creation and add so things like +1 year work correctly
                    // let execTime = DateTime.createFromSeconds(qe._time);
                    let execTime = qe._time;
                    let seconds = globalThis.SimpleCalendar.api.timestampPlusInterval(execTime, qe._increment);
                    if (seconds <= qe._time) {
                        // attempting to schedule recurring event in the past
                        console.error("about-time | Event time not increasing event reschedule rejected", qe);
                    }
                    else {
                        qe._time = seconds;
                        q.add(qe);
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                needSave = true;
            }
        }
        if (needSave)
            ElapsedTime._save(true); // force a save as the queue has changed.
    }
    /**
     * housekeeping and initialisation
     */
    static _flushQueue() {
        if (PseudoClock.isMaster) {
            ElapsedTime._eventQueue = new FastPriorityQueue();
            ElapsedTime._save(true);
        }
    }
    static _load() {
        let saveData = game.settings.get("about-time", "store");
        if (ElapsedTime.debug)
            ElapsedTime.log("_load", saveData);
        if (!saveData) {
            if (ElapsedTime.debug)
                ElapsedTime.log("ElapsedTime - no saved data re-initializing");
            ElapsedTime._initialize();
        }
        else {
            if (ElapsedTime.debug)
                ElapsedTime.log("ElapsedTime - loaded saved Data. ", saveData);
            ElapsedTime._createFromData(saveData);
        }
    }
    ;
    static _save(force = false) {
        if (PseudoClock.isMaster) {
            let newSaveTime = Date.now();
            if ((newSaveTime - ElapsedTime._lastSaveTime > ElapsedTime._saveInterval) || force) {
                if (ElapsedTime.debug)
                    ElapsedTime.log("_save saving", new Date(), ElapsedTime.currentTimeString());
                let saveData = {
                    _eventQueue: ElapsedTime._eventQueue.exportToJSON(),
                };
                // put something in to throttle saving
                game.settings.set("about-time", "store", saveData);
                ElapsedTime._lastSaveTime = newSaveTime;
            }
        }
    }
    static init() {
        _userId = game.user.id;
        //@ts-ignore
        _isGM = game.user.isGM;
        ElapsedTime._lastSaveTime = Date.now();
        // find a better way to do this.
        ElapsedTime._fetchParams();
        ElapsedTime._load();
        Hooks.on("updateWorldTime", ElapsedTime.pseudoClockUpdate);
    }
    static _initialize(currentTime = 0) {
        ElapsedTime._eventQueue = new FastPriorityQueue();
        if (PseudoClock.isMaster)
            ElapsedTime._save(true);
    }
    static _createFromData(data) {
        // ElapsedTime._eventQueue = FastPriorityQueue.createFromData(data._eventQueue);
        ElapsedTime._eventQueue = FastPriorityQueue.createFromJson(data._eventQueue);
        ElapsedTime._fetchParams();
    }
    static _fetchParams() {
        ElapsedTime.debug = game.settings.get("about-time", "debug") || false;
    }
    static showQueue() {
        if (ElapsedTime._eventQueue.size === 0) {
            console.log("Empty Queue");
        }
        for (let i = 0; i < ElapsedTime._eventQueue.size; i++) {
            ElapsedTime.log(`queue [${i}]`, ElapsedTime._eventQueue.array[i]._uid, globalThis.SimpleCalendar.api.timestampToDate(ElapsedTime._eventQueue.array[i]._time), ElapsedTime._eventQueue.array[i]._recurring, ElapsedTime._eventQueue.array[i]._increment, ElapsedTime._eventQueue.array[i]._handler, ElapsedTime._eventQueue.array[i]._args);
        }
    }
    static chatQueue({ showArgs = false, showUid = false, showDate = false, gmOnly = true } = { showArgs: false, showUid: false, showDate: false, gmOnly: true }) {
        let content = "";
        for (let i = 0; i < ElapsedTime._eventQueue.size; i++) {
            if (showUid)
                content += ElapsedTime._eventQueue.array[i]._uid + " ";
            let eventDate = globalThis.SimpleCalendar.api.formatDateTime(globalThis.SimpleCalendar.api.timestampToDate(ElapsedTime._eventQueue.array[i]._time));
            if (showDate)
                content += eventDate.date + " ";
            content += eventDate.time + " ";
            let handlerString = typeof ElapsedTime._eventQueue.array[i]._handler === "string" ? ElapsedTime._eventQueue.array[i]._handler : "[function]";
            content += handlerString + " ";
            if (showArgs)
                content += ElapsedTime._eventQueue.array[i]._args;
            content += "\n";
        }
        let chatData = {};
        if (gmOnly) {
            //chatData.isWhisper = true;
            //@ts-ignore
            chatData.whisper = ChatMessage.getWhisperRecipients("GM").filter(u => u.active);
        }
        //@ts-ignore
        if (content === "")
            chatData.content = "Empty Queue";
        //@ts-ignore
        else
            chatData.content = content;
        //@ts-ignore
        ChatMessage.create(chatData);
    }
    static message(content, alias = null, targets = null, ...args) {
        //@ts-ignore
        let chatMessage = CONFIG.ChatMessage.documentClass;
        let chatData = {
            //@ts-ignore
            user: game.user.id,
            //@ts-ignore
            // speaker: { actor: game.user.actor },
            content: content,
            //@ts-ignore
            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
            flags: {}
        };
        //@ts-ignore
        if (alias)
            chatData.speaker = { alias };
        if (targets) {
            let whisperTargets = [];
            if (typeof targets === "object") {
                for (let id of targets) {
                    whisperTargets = whisperTargets.concat(chatMessage.getWhisperRecipients(id));
                }
            }
            else if (typeof targets === "string")
                whisperTargets = chatMessage.getWhisperRecipients(targets);
            if (whisperTargets.length > 0) {
                chatData["whisper"] = whisperTargets;
            }
        }
        //@ts-ignore
        chatMessage.create(chatData);
    }
}
ElapsedTime.debug = true;
ElapsedTime.log = (...args) => {
    console.log("about-time | ", ...args);
};
ElapsedTime._saveInterval = 1 * 60 * 1000; // only save every minute real time.
function macroExecute(macro, ...args) {
    //@ts-ignore
    if (isNewerVersion(game.version, "11.0")) {
        return macro.execute({ args });
    }
    else {
        const speaker = CONFIG.ChatMessage.documentClass.speaker;
        const actor = undefined;
        const token = undefined;
        const character = null;
        const body = `return (async () => {
    ${macro.command}
  })()`;
        const fn = Function("{speaker, actor, token, character, item, args}={}", body);
        return fn.call(this, { speaker, actor, token, character, undefined, args });
    }
}
