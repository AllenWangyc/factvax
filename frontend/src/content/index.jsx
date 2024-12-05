import './content.styl'
import { apiReqs } from '@/apis'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "showPopup") {
    const config = {
      data: {
        text: message.text
      },
      success: (res) => {
        const content = document.getElementById("popup-content")
        content.innerHTML = `
          <div id="result">Detection result: Credible</div>
          <div id="detection-text">Detection text: ${res.detectedText}</div>`
      },
    }

    apiReqs.detect(config)
    sendResponse({ status: "success" })
  }
})