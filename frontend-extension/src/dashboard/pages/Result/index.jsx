import { Typography, Card, Button } from "antd"
import { CheckCircleTwoTone } from '@ant-design/icons'
import './result.styl'
import { useNavigate } from "react-router-dom"

const Result = () => {
  const { Title } = Typography
  const navigate = useNavigate()
  return (
    <div className="P-result">
      <div className="page-container">
        <div className="header">
          <div className="title-wrapper">
            <Title className="title" level={1}>Detection result</Title>
          </div>
          <div className="subtitle-wrapper">
            <Title className="subtitle" level={5}>Below are the analysis results</Title>
          </div>
        </div>
        <div className="result-section-wrapper">
          <Card className="result-card">
            <div className="result-content">
              {/* Harding coding */}
              <div className="detection-text-wrapper">
                <Title className="detection-text-title" level={4}>Detected text</Title>
                <span className="detection-text">Multiple large-scale studies have shown no link between vaccines and autism.</span>
              </div>
              {/* Harding coding */}
              <div className="result-status-wrapper">
                <Title className="result-status-title" level={4}>Status</Title>
                <div className="result-status-content-container">
                  <CheckCircleTwoTone className="credible-icon" twoToneColor='#6acc39' />
                  <div className="result-status-wrapper">
                    <span className="result-status">Credible</span>
                  </div>
                </div>
              </div>
              {/* Harding coding */}
              <div className="result-explanation-wrapper">
                <Title className="result-explanation-title" level={4}>Explanation</Title>
                <span className="result-explanation">
                  It's accurate and reflects the current scientific understanding.
                  Claims that vaccines cause autism are not supported by credible evidence
                  and have been widely discredited.
                </span>
              </div>
            </div>
            <hr className="line" />
            {/* Harding coding */}
            <div className="timestamp-wrapper">
              <span className="timestamp">Timestamp: 2024-12-18 12:00</span>
            </div>
          </Card>
          {/* Harding coding */}
          <div className="detailed-info-container">
            <div className="detailed-info-title-wrapper">
              <Title className="detailed-info-title" level={4}>Detailed Metrics</Title>
            </div>
            <div className="detailed-info-content-container">
              <div className="detailed-info-item-wrapper">
                <span className="detailed-info-item">Model Version: v1.0</span>
              </div>
              <div className="detailed-info-item-wrapper">
                <span className="detailed-info-item">Confidence Score: 95%</span>
              </div>
              <div className="detailed-info-item-wrapper">
                <span className="detailed-info-item">Other data: ...</span>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <Button className="redetect-btn"
            onClick={() => navigate('/dashboard')}
          >
            Re-detect
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Result