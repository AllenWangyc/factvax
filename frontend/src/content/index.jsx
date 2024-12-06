import './content.styl'
import { apiReqs } from '@/apis'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "showPopup") {
    // const config = {
    //   data: {
    //     text: message.text
    //   }
    // }
    apiReqs.detect({
      data: {
        text: message.text
      }
    })
    sendResponse({ status: "success" })
  }
})