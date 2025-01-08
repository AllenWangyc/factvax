import ReactDOM from 'react-dom/client'
import DetectionPanel from './pages/DetectionPanel'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "showPopup") {
    const text = message.text

    if (document.getElementById("popup-container")) {
      sendResponse({ status: "already-rendered" })
      return
    }

    // Create a div element with id 'popup-container'
    const popupContainer = document.createElement('div')
    popupContainer.id = 'popup-container'

    // Append this element to the end of document
    document.body.appendChild(popupContainer)

    const reactPopupContainer = ReactDOM.createRoot(popupContainer)
    reactPopupContainer.render(
      <DetectionPanel
        text={text}
        onClose={() => {
          // Unmount the ReactDOM and remove container when click button
          reactPopupContainer.unmount() // Unmount component
          popupContainer.remove() // Remove container
        }}
      />
    )

    sendResponse({ status: "success" })
  }
})