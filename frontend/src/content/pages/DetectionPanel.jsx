import { apiReqs } from '@/apis'
import { CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined, InfoCircleTwoTone } from "@ant-design/icons"
import { useEffect, useState } from 'react'
import './DetectionPanel.styl'

export default function DetectionPanel({ onClose, text }) {
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
    else return (<InfoCircleTwoTone className='result-icon' twoToneColor="#f6d33c" />)
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