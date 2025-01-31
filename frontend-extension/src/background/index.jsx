/*global chrome*/

import { apiReqs } from "@/apis"

let messageQueue = []
let popupPort = null
let isContextMenuEnabled = true

/**
 * Set rules for extension execution
 */
chrome.runtime.onInstalled.addListener(function () {
  chrome.action.disable()
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Set rules
    let rule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            schemes: ['https'] // Match all pages with https
          },
        }),
      ],
      actions: [
        new chrome.declarativeContent.ShowAction()
      ],
    }
    // Integrate all the rules
    const rules = [rule]
    // Add rules
    chrome.declarativeContent.onPageChanged.addRules(rules)
  })
})

// Add extension function into the context menu once installed
chrome.runtime.onInstalled.addListener(() => {
  if (isContextMenuEnabled) {
    createContextMenu()
  }
})

// Detect vaccine information when click the item in the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "detect-text") {
    // Inject text into selected tabs
    chrome.tabs.sendMessage(tab.id, {
      type: "getText",
      text: info.selectionText
    })
  }
})

/**
 * Process login status synchronization relayed from content.js
 * @returns {true}, means the response is asynchronous
 */
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if (message.device_id) {
    const device_id = message.device_id
    console.log('Received device_id from content script:', device_id)

    // Store device_id in chrome.storage
    await chrome.storage.local.set({ device_id }, function () {
      console.log('device_id stored in chrome.storage.')
    })

    // Invoke API to get token by device_id
    const res = await apiReqs.getTokenByDeviceId({
      deviceId: device_id
    })
    console.log("The 'getTokenByDeviceId' response from backend is: ", res)

    if (res.accessToken) {
      const token = res.accessToken
      // Store token in chrome.storage
      await chrome.storage.local.set({ token }, function () {
        console.log('Token stored in chrome.storage:', token)
      })
    } else {
      console.error('Failed to retrieve token:', res)
    }
  }

  if (message.username) {
    const username = message.username
    await chrome.storage.local.set({ username }, function () {
      console.log('username stored in chrome storage')
    })
  }

  if (message.logout) {
    chrome.storage.local.remove(["token", "username"], () => {
      console.log("Token and username removed from background")
    })
  }
  return true
})

/**
 * Cached the message send from content script and relay to popup to increase counter
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'INCREMENT_COUNTER') {
    if (popupPort) {
      popupPort.postMessage(message)
      console.log('The message posted to popup.')
    } else {
      messageQueue.push(message)
      console.log('The message has been cached in messageQueue.')
    }
    sendResponse({ success: true })
  }

  if (message.type === "TOGGLE_CONTEXT_MENU") {
    isContextMenuEnabled = message.enabled
    updateContextMenu()

    // Broadcast all content tabs to switch enable status
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_CONTEXT_MENU", enabled: isContextMenuEnabled });
      });
    });

    sendResponse({ success: true })
  }
})

/**
 * Listen to the connection between background script and popup
 */
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    popupPort = port

    messageQueue.forEach((queuedMessage => popupPort.postMessage(queuedMessage)))
    messageQueue = []

    popupPort.onDisconnect.addListener(() => {
      popupPort = null
    })
  }
})

/**
 * Fetch token by device_id when extension starts up
 */
chrome.runtime.onStartup.addListener(function () {
  chrome.storage.local.get(['device_id'], async function (result) {
    if (result.device_id) {
      const device_id = result.device_id
      console.log('Device ID found on startup:', device_id)

      const res = await apiReqs.getTokenByDeviceId({
        deviceId: device_id
      })
      console.log("The 'getTokenByDeviceId' response from backend is: ", res)

      if (res.accessToken) {
        const token = res.accessToken
        await chrome.storage.local.set({ token })
        console.log('Token stored in chrome.storage on startup:', token)
      } else {
        console.error('Failed to retrieve token on startup:', res)
      }
    } else {
      console.warn('No device_id found in chrome.storage on startup.')
    }
  })
})

function createContextMenu() {
  chrome.contextMenus.create({
    id: "detect-text",
    title: "Detect vinccine information",
    contexts: ["selection"]
  })
}

function updateContextMenu() {
  chrome.contextMenus.removeAll(() => {
    if (isContextMenuEnabled) {
      createContextMenu()
    }
  })
}