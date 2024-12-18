import './detection.styl'
import { Input, Typography, ConfigProvider, Button } from "antd"
import { useNavigate } from 'react-router-dom'
import { runes } from 'runes2'

const Detection = () => {
  const { TextArea } = Input
  const { Title } = Typography
  const navigate = useNavigate()

  return (
    <div className="P-detection">
      <div className='before-detect-container'>
        <div className='detect-title-wrapper'>
          <Title level={1} className='detect-title'>FactVax Detection</Title>
        </div>
        <div className='detect-text-area-wrapper'>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  inputFontSize: 20
                },
              },
            }}
          >
            <TextArea
              className='detect-text-area'
              count={{
                show: true,
                max: 1000,
                strategy: (txt) => runes(txt).length
              }}
              placeholder="Message FactVax"
              style={{
                height: 120,
                resize: 'none',
              }}
              autoSize={{ minRows: 8, maxRows: 20 }}
            />
          </ConfigProvider>
        </div>
        <div className='detect-btn-container'>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: '#e6f4ff',
                  defaultColor: '#4081ff',
                  defaultBorderColor: '#4081ff'
                },
              },
            }}
          >
            <Button className='detect-btn'
              size='large'
              onClick={() => navigate('/dashboard/result')}
            >
              Detect
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default Detection