import './components/FloatingIcon'
import { createPanel } from './utils'

/**
 * Handle the event when the item in the context menu is clicked
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getText") {
    const text = message.text

    if (document.getElementById("popup-container")) {
      sendResponse({ status: "already-rendered" })
      return
    }

    createPanel(text)

    sendResponse({ status: "success" })
  }
})

/**
 * Listen to customized event sent from dashboard 
 */
window.addEventListener('sendMessageToExtension', function (event) {
  const data = event.detail
  if (data.device_id) {
    // Relay data to background 
    chrome.runtime.sendMessage({ device_id: data.device_id })
  }
})
