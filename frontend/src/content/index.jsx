import './content.styl'
import { apiReqs } from '@/apis'
import ReactDOM from 'react-dom/client'
import { CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined } from "@ant-design/icons"
import { useEffect, useState } from 'react'

function DetectionPanel({ onClose, text }) {
  const [result, setResult] = useState('')
  const [explaination, setExplaination] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetection = async () => {
      try {
        const response = await apiReqs.detect({
          data: {
            text,
          },
        })
        // Update the information
        setResult(response.data.result)
        setExplaination(response.data.explaination)
      }
      catch (error) {
        console.error("Error during API request:", error)
        setResult("Error fetching result")
      }
      finally {
        setLoading(false)
      }
    }

    fetchDetection()
  }, [text])

  const checkIcon = () => {
    if (result === 'correct') return (<CheckCircleTwoTone className='result-icon' id='correct-icon' twoToneColor="#52c41a" />)
    else if (result === 'incorrect') return (<CloseCircleTwoTone className='result-icon' id='incorrect-icon' twoToneColor="#ff4d4f" />)
  }

  return (
    <div id='popup'>
      <div id="poopup-title-wrapper">
        <h2 id="popup-title" >
          {loading ? "Loading analysis..." : "FactVax Detection"}
        </h2>
      </div>
      <div id="popup-content">
        {loading ? (
          <p><LoadingOutlined /></p>
        ) : (
          <div>
            <p id='detection-result'>
              Detection result: {result}
              {checkIcon()}
            </p>
            <p id='detection-text'>Explaination: {explaination}</p>
          </div>
        )}
      </div>
      <button id="close-popup" onClick={onClose}>
        Close
      </button>
    </div>
  )
}

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