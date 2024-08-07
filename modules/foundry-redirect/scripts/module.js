/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/scripts/logging.ts
function displayInfoMessageToUser(message) {
    var _a;
    message = "Foundry Redirect: " + message;
    (_a = ui.notifications) === null || _a === void 0 ? void 0 : _a.info(message);
    console.log(message);
}
function displayErrorMessageToUser(error) {
    var _a;
    error = "Foundry Redirect: " + error;
    (_a = ui.notifications) === null || _a === void 0 ? void 0 : _a.error(error);
    console.error(error);
}
function debugLog(msg) {
    if (CONFIG.debug.hasOwnProperty("redirect") && CONFIG.debug["redirect"]) {
        console.log(msg);
    }
}

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_browser_validate = (validate);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_browser_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = (stringify);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v1.js

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || esm_browser_stringify(b);
}

/* harmony default export */ const esm_browser_v1 = (v1);
;// CONCATENATED MODULE: ./src/scripts/foundryUtils.ts


const FOUNDRY_ID_FLAG = "foundry_redirect_id";
function getUser() {
    let g = game;
    return g.user;
}
function isGm() {
    let user = getUser();
    if (!user) {
        return false;
    }
    return user.isGM;
}
function getOrCreateFoundryId() {
    let user = getUser();
    let foundryId = user === null || user === void 0 ? void 0 : user.getFlag("core", FOUNDRY_ID_FLAG);
    if (!foundryId) {
        console.log("No foundry redirect ID found. Generating one...");
        foundryId = esm_browser_v1();
        user === null || user === void 0 ? void 0 : user.setFlag("core", FOUNDRY_ID_FLAG, foundryId);
    }
    debugLog("Foundry Redirect Id: " + foundryId);
    return foundryId;
}

;// CONCATENATED MODULE: ./src/scripts/server.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const TEST_SERVER_BASE_URL = "https://9fq01qzza7.execute-api.us-west-2.amazonaws.com/test";
const DEFAULT_SERVER_BASE_URL = "https://foundryredirect.com";
const SERVER_BASE_URL = DEFAULT_SERVER_BASE_URL;
const CUSTOMIZE_SERVER_URL = `${SERVER_BASE_URL}/api/customize`;
const FOUNDRY_ID_URL_PARAM = "foundry_id";
const EXTERNAL_ADDRESS_URL_PARAM = "external_address";
const INTERNAL_ADDRESS_URL_PARAM = "internal_address";
const PUBLIC_ID_URL_PARAM = "public_id";
function postFoundryInfo(foundryId, externalAddress, localAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`${SERVER_BASE_URL}?${FOUNDRY_ID_URL_PARAM}=${foundryId}&${EXTERNAL_ADDRESS_URL_PARAM}=${externalAddress}&${INTERNAL_ADDRESS_URL_PARAM}=${localAddress}`, {
            method: "POST"
        }).then(res => {
            debugLog("Foundry redirect: Successfully updated server address on server");
        }).catch(err => {
            displayErrorMessageToUser("Failed to post server address to redirect server");
            console.error(err);
        });
    });
}
function getRedirectAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        const foundryId = getOrCreateFoundryId();
        return fetch(`${SERVER_BASE_URL}?${FOUNDRY_ID_URL_PARAM}=${foundryId}`).then((res) => __awaiter(this, void 0, void 0, function* () {
            let responseText = yield res.text();
            debugLog("Fetch redirect address response: " + responseText);
            let redirect = {
                externalAddress: responseText,
                localAddress: responseText + "/local"
            };
            return redirect;
        })).catch(err => {
            displayErrorMessageToUser("Failed to fetch foundry redirect address from server");
            console.error(err);
            return undefined;
        });
    });
}
function checkCustomAddress(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAlphanumeric = address.match(/[0-9A-Za-z_\-]+/);
        if (!isAlphanumeric) {
            return {
                isAvailable: false,
                message: "Custom address must contain only letters, numbers, hyphens, and underscores",
            };
        }
        try {
            let response = yield fetch(`${CUSTOMIZE_SERVER_URL}?${PUBLIC_ID_URL_PARAM}=${address}`);
            let isAvailable = response.status === 200;
            let responseBody = yield response.text();
            return {
                isAvailable: isAvailable,
                message: responseBody
            };
        }
        catch (err) {
            console.error(err);
            return {
                isAvailable: false,
                message: "Could not check if address is available"
            };
        }
    });
}
function customizeRedirectAddress(newAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundryId = getOrCreateFoundryId();
        try {
            let response = yield fetch(`${CUSTOMIZE_SERVER_URL}?${FOUNDRY_ID_URL_PARAM}=${foundryId}&${PUBLIC_ID_URL_PARAM}=${newAddress}`, {
                method: "POST"
            });
            let success = response.status === 200;
            let responseBody = yield response.text();
            return {
                success: success,
                message: responseBody
            };
        }
        catch (err) {
            console.error(err);
            return {
                success: false,
                message: "Error connecting to server to change redirect address"
            };
        }
    });
}

;// CONCATENATED MODULE: ./src/scripts/customization.ts
var customization_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function displayCustomizationDialogue(callback) {
    return customization_awaiter(this, void 0, void 0, function* () {
        let content = yield renderTemplate("modules/foundry-redirect/templates/customizationDialogue.html", {});
        let dialogue = new Dialog({
            title: "Foundry Redirect Customization",
            buttons: {},
            render: (html) => { onRender(html, dialogue); },
            content: content,
            default: "cancel",
            close: () => callback(),
        }, {
            width: 575
        });
        dialogue.render(true);
    });
}
function submitChanges(target, event, dialogue) {
    return customization_awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        let formElement = findCustomizationFormFromClickTarget(target);
        if (!formElement) {
            return;
        }
        let inputElement = findInputElement(formElement);
        if (!inputElement) {
            return;
        }
        let newAddress = inputElement.value;
        let response = yield customizeRedirectAddress(newAddress);
        if (response.success) {
            displayInfoMessageToUser("Successfully updated invitation links");
        }
        else {
            displayErrorMessageToUser(response.message);
        }
        dialogue.close();
    });
}
function cancel(dialogue, ev) {
    ev.preventDefault();
    dialogue.close();
}
function testAddress(ev) {
    return customization_awaiter(this, void 0, void 0, function* () {
        ev.preventDefault();
        let formElement = findCustomizationFormFromClickTarget(this);
        if (!formElement) {
            return;
        }
        let statusMessage = findStatusMessage(formElement);
        if (!statusMessage) {
            return;
        }
        let inputElement = findInputElement(formElement);
        if (!inputElement) {
            return;
        }
        setLoadingState(formElement);
        let customAddress = inputElement.value;
        let available = yield checkCustomAddress(customAddress);
        setAddressAvailableStatus(formElement, available);
    });
}
function onRender(html, dialogue) {
    return customization_awaiter(this, void 0, void 0, function* () {
        // find current redirect address and load data into dialogue
        let currentAddress = yield getRedirectAddress();
        if (!currentAddress) {
            displayErrorMessageToUser("Failed to find redirect address when loading customization dialogue");
            return;
        }
        if (!currentAddress.externalAddress.startsWith(DEFAULT_SERVER_BASE_URL)) {
            displayInfoMessageToUser("Server address has unexpected prefix " + currentAddress);
            return;
        }
        let publicId = currentAddress.externalAddress.substring(DEFAULT_SERVER_BASE_URL.length + 1);
        let redirectElement = findInputElement(html);
        let testButton = findTestAddressButton(html);
        let submitButton = findSubmitButton(html);
        let cancelButton = findCancelButton(html);
        if (!redirectElement || !testButton || !cancelButton || !submitButton) {
            displayErrorMessageToUser("Error rendering Foundry Redirect Customization");
            return;
        }
        redirectElement.value = publicId;
        // add listeners to the various buttons
        testButton.onclick = testAddress;
        submitButton.onclick = (ev) => submitChanges(submitButton, ev, dialogue);
        cancelButton.onclick = (ev) => cancel(dialogue, ev);
        // allow address to be edited, and test to be clicked
        hideStatusMessageSection(html, true);
        testButton.disabled = false;
        redirectElement.disabled = false;
    });
}
function hideStatusMessageSection(html, hide) {
    let statusMessageIcon = findStatusMessageIcon(html);
    if (statusMessageIcon) {
        statusMessageIcon.style.visibility = hide ? "hidden" : "visible";
    }
    let statusMessage = findStatusMessage(html);
    if (statusMessage) {
        statusMessage.style.visibility = hide ? "hidden" : "visible";
    }
}
function findStatusMessage(html) {
    let statusMessage = findElementById(html, "redirect-status-message");
    if (!statusMessage || !(statusMessage instanceof HTMLElement)) {
        debugLog("Redirect status message element could not be found");
        debugLog(statusMessage);
        return;
    }
    return statusMessage;
}
function findStatusMessageIcon(html) {
    let statusIcon = findElementById(html, "redirect-status-icon");
    if (!statusIcon || !(statusIcon instanceof HTMLElement)) {
        debugLog("Redirect status message element could not be found");
        debugLog(statusIcon);
        return;
    }
    return statusIcon;
}
function findTestAddressButton(html) {
    let testButton = findElementById(html, "test-redirect-address");
    if (!testButton || !(testButton instanceof HTMLButtonElement)) {
        debugLog("Test Redirect element could not be found");
        debugLog(testButton);
        return;
    }
    return testButton;
}
function findInputElement(html) {
    let redirectElement = findElementById(html, "redirect-value");
    if (!redirectElement || !(redirectElement instanceof HTMLInputElement)) {
        debugLog("Redirect value element could not be found");
        debugLog(redirectElement);
        return;
    }
    return redirectElement;
}
function findSubmitButton(html) {
    let button = findElementById(html, "submit-redirect");
    if (!button || !(button instanceof HTMLButtonElement)) {
        debugLog("Submit redirect button could not be found");
        debugLog(button);
        return;
    }
    return button;
}
function findCancelButton(html) {
    let button = findElementById(html, "cancel-redirect");
    if (!button || !(button instanceof HTMLButtonElement)) {
        debugLog("Cancel redirect button could not be found");
        debugLog(button);
        return;
    }
    return button;
}
function setLoadingState(form) {
    let statusMessage = findStatusMessage(form);
    if (!statusMessage) {
        return;
    }
    let statusIcon = findStatusMessageIcon(form);
    if (!statusIcon) {
        return;
    }
    let testAddressButton = findTestAddressButton(form);
    if (!testAddressButton) {
        return;
    }
    statusMessage.textContent = "Loading...";
    let classesToRemove = [];
    statusIcon.classList.forEach(c => {
        if (c.startsWith("fa-")) {
            classesToRemove.push(c);
        }
    });
    classesToRemove.forEach(c => {
        statusIcon === null || statusIcon === void 0 ? void 0 : statusIcon.classList.remove(c);
    });
    statusIcon.classList.add("fa-spin");
    statusIcon.classList.add("fa-spinner");
    statusIcon.style.color = "";
    testAddressButton.disabled = true;
    hideStatusMessageSection(form, false);
}
function setAddressAvailableStatus(form, available) {
    let statusMessage = findStatusMessage(form);
    if (!statusMessage) {
        return;
    }
    let statusIcon = findStatusMessageIcon(form);
    if (!statusIcon) {
        return;
    }
    let testAddressButton = findTestAddressButton(form);
    if (!testAddressButton) {
        return;
    }
    let submitButton = findSubmitButton(form);
    if (!submitButton) {
        return;
    }
    let message = available.message;
    if (message.startsWith('"')) {
        message = message.substring(1);
    }
    if (message.endsWith('"')) {
        message = message.substring(0, message.length - 1);
    }
    statusMessage.textContent = message;
    let classesToRemove = [];
    statusIcon.classList.forEach(c => {
        if (c.startsWith("fa-")) {
            classesToRemove.push(c);
        }
    });
    classesToRemove.forEach(c => {
        statusIcon === null || statusIcon === void 0 ? void 0 : statusIcon.classList.remove(c);
    });
    statusIcon.classList.add(available.isAvailable ? "fa-check" : "fa-times-circle");
    statusIcon.style.color = available.isAvailable ? "#006400" : "#8B0000";
    testAddressButton.disabled = false;
    hideStatusMessageSection(form, false);
    submitButton.disabled = !available.isAvailable;
}
function findElementById(html, id) {
    if (html instanceof HTMLElement) {
        return html.querySelector(`#${id}`);
    }
    else {
        let q = html.find(`#${id}`);
        if (q.length < 1) {
            return null;
        }
        return q.get()[0];
    }
}
// recurses from the target of an onclick event, to the top level
// form defined for this dialog based on its ID
function findCustomizationFormFromClickTarget(target) {
    if (!(target instanceof HTMLElement)) {
        debugLog("Target of click was not an HTMLElement");
        debugLog(target);
        return;
    }
    let formElement = target;
    while (formElement && formElement.id !== "redirect-customization-form") {
        formElement = formElement.parentElement;
    }
    if (!formElement) {
        debugLog("Could not locate customization form from onclick action handler");
        return;
    }
    return formElement;
}

;// CONCATENATED MODULE: ./src/scripts/module.ts
var module_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




function refreshIpData() {
    return module_awaiter(this, void 0, void 0, function* () {
        debugLog("Foundry Redirect: Refreshing foundry link data");
        let invitationLinks = new InvitationLinks();
        let invitationData = yield invitationLinks.getData();
        debugLog(invitationData);
        let localAddress = invitationData.local;
        let externalAddress = invitationData.remote;
        if (!localAddress) {
            displayErrorMessageToUser("Foundry Redirect: Failed to determine local IP address from Foundry");
            return;
        }
        if (!externalAddress) {
            displayErrorMessageToUser("Foundry Redirect: Failed to determine external IP address from Foundry");
            return;
        }
        // check if there is a stored foundry id. If not, generate one
        let foundryId = getOrCreateFoundryId();
        // submit the foundry info to AWS
        const p = postFoundryInfo(foundryId, externalAddress, localAddress);
        setTimeout(refreshIpData, 1000 * 60 * 60);
        return p;
    });
}
Hooks.on("ready", function () {
    if (!isGm()) {
        console.log("Foundry Redirect: Current user is not the GM. Not setting up foundry redirects");
        return;
    }
    // post server IP to the redirect server
    refreshIpData();
});
Hooks.on("renderInvitationLinks", (links, html) => {
    return getRedirectAddress().then((address) => module_awaiter(void 0, void 0, void 0, function* () {
        debugLog("Inserting redirect address into invitation links");
        if (!address) {
            return;
        }
        const invitationPosition = links.position;
        invitationPosition.height = 235;
        links.setPosition(invitationPosition);
        // find then window content
        const windowContent = html.get(0);
        if (!windowContent) {
            debugLog("Could not get base window content");
            console.error("Foundry redirect: Invitation links page does not match expected layout");
            return;
        }
        // When the window is opened from closed, the content of the Jquery argument
        // is the whole window
        // If the window was reloaded, the JQuery is the Form
        let formHtml;
        if (windowContent.classList.contains("window-app") && windowContent instanceof HTMLDivElement) {
            let queriedForm = windowContent.querySelector("form");
            if (queriedForm) {
                formHtml = queriedForm;
            }
        }
        else if (windowContent instanceof HTMLFormElement) {
            formHtml = windowContent;
        }
        if (!formHtml || formHtml.childElementCount < 3) {
            debugLog("Could not locate input form in invitation window");
            debugLog(formHtml);
            debugLog(windowContent.lastElementChild);
            console.error("Foundry redirect: Invitation links page does not match expected layout");
            return;
        }
        const initialNotes = formHtml.children.item(0);
        if (!initialNotes || !(initialNotes instanceof HTMLParagraphElement)) {
            debugLog("Initial form element was not the expected paragraph");
            debugLog(initialNotes);
            return;
        }
        const divToInsert = document.createElement("div");
        const foundryDivId = "foundry-redirect-data";
        divToInsert.id = foundryDivId;
        let htmlToInsert = yield renderTemplate("modules/foundry-redirect/templates/invitationInsertion.html", Object.assign(Object.assign({}, address), { isGm: isGm() }));
        divToInsert.innerHTML = htmlToInsert;
        formHtml.prepend(divToInsert);
        formHtml.prepend(initialNotes);
        let customizeRedirectLink = formHtml.querySelector("#customize-redirect-link");
        if (customizeRedirectLink && customizeRedirectLink instanceof HTMLAnchorElement) {
            customizeRedirectLink.onclick = () => {
                displayCustomizationDialogue(() => {
                    links.render();
                });
            };
        }
        else {
            debugLog("Could not locate customize redirect link in invitations window");
        }
        // we need to re-activate the listeners to ensure that the copy functionality works on our new links
        links.activateListeners(html.find(divToInsert));
    }));
});

/******/ })()
;