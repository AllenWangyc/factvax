/*global chrome*/

import { apiReqs } from "@/apis"
import { send } from "vite"

let globalState = {
  user: {
    userInfo: null,
    isLoggedIn: false,
  },
}

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
            // Match all pages with https
            schemes: ['https']
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
  chrome.contextMenus.create({
    id: "detect-text",
    title: "Detect vinccine information",
    contexts: ["selection"]
  })
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
 * @returns {true} means the response is asynchronous
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
    return true
  }
  // if (message.username) {
  //   const username = message.username
  //   console.log('Received username from content script:', username)
  // }
  // return true
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

/**
 * Synchronize the global state between content script and popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_STATE") {
    sendResponse(globalState) // Return current global state
  }

  if (message.type === 'SET_STATE') {
    const { module, state } = message.payload
    if (module in globalState) {
      globalState[module] = {
        ...globalState[module], // Update the specified module state
        ...state
      }
    }
    sendResponse({ success: true })
  }
})