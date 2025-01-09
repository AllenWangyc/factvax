import { apiReqs } from '@/apis'
import { Typography } from 'antd'
import { CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined, InfoCircleTwoTone } from "@ant-design/icons"
import { useEffect, useState } from 'react'
import './DetectionPanel.styl'

export default function DetectionPanel({ onClose, text }) {
  const MISLEADING = 'Misleading'
  const CREDIBLE = 'Credible'
  const [result, setResult] = useState('')
  const [explaination, setExplaination] = useState('')
  const [loading, setLoading] = useState(true)
  const [related, setRelated] = useState(false)

  const { Title } = Typography

  useEffect(() => {
    const fetchDetection = async () => {
      try {
        const res = await apiReqs.detect({
          data: {
            text
          }
        })
        console.log(res)

        // Update the information
        setLoading(false)

        // Receive response and response including result property
        if (res.response) {
          // The selected text is related to vaccine info
          if (res.response.related) {
            setRelated(true)
            // Selected text are credible
            if (res.response.classification === 'accurate') {
              setResult(CREDIBLE)
            }
            // Selected text is misleading
            else {
              setResult(MISLEADING)
              setExplaination(res.response.correction)
            }
          }
          // Selected text is not related to vaccine info
          else {
            // setResult(response.result.message)
            setResult('The text is not related to vaccines')
          }
        }
      }
      catch (error) {
        console.error("Error during API request:", error)
        setResult("Error fetching result")
      }
    }

    fetchDetection()
  }, [text])

  const checkIcon = () => {
    if (result === CREDIBLE) return (<CheckCircleTwoTone className='result-icon' id='correct-icon' twoToneColor="#52c41a" />)
    else if (result === MISLEADING) return (<CloseCircleTwoTone className='result-icon' id='incorrect-icon' twoToneColor="#ff4d4f" />)
    else return (<InfoCircleTwoTone className='result-icon' twoToneColor="#f6d33c" />)
  }

  return (
    <div id='popup'>
      <div id="poopup-title-wrapper">
        <Title level={3} id="popup-title" >
          {loading ? "Loading analysis..." : "FactVax Detection"}
        </Title>
      </div>
      <div id="popup-content">
        {loading ? (
          <div className='loading-wrapper'>
            <div><LoadingOutlined className='loading' /></div>
          </div>
        ) : (
          <div className='display-wrapper'>
            {related ?
              (<div className='detection-result'>
                <span className='detection-label' style={{ fontWeight: 'bold' }}>Detection result: </span>
                <span style={{ marginLeft: 5 }}> {result}</span>
                {checkIcon()}
              </div>) :
              (<div className='detection-result'>
                {checkIcon()} {result}
              </div>)}
            {result === MISLEADING &&
              <div className='detection-text'>
                <span className='detection-label' style={{ fontWeight: 'bold' }}>Explaination: </span>
                <span>{explaination}</span>
              </div>}
          </div>
        )}
      </div>
      <button id="close-popup" onClick={onClose}>
        Close
      </button>
    </div>
  )
}