import './detection.styl'
import { Input, Typography, ConfigProvider } from "antd"
import { runes } from 'runes2'

const Detection = () => {
  const { TextArea } = Input
  const { Title } = Typography

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
      </div>
    </div>
  )
}

export default Detection