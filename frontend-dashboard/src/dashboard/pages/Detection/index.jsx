import './detection.styl'
import { Input, Typography, ConfigProvider, Button, Select, Form } from "antd"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { runes } from 'runes2'
import { detectAPI } from '@/apis'

const source_options = [
  {
    value: 'X',
    label: 'X',
  },
  {
    value: 'Meta',
    label: 'Meta',
  },
  {
    value: 'Reddit',
    label: 'Reddit',
  },
]

const Detection = () => {
  const { TextArea } = Input
  const { Title } = Typography
  const { Item } = Form
  const navigate = useNavigate()
  const [text, setText] = useState('')

  const handleDetect = async (values) => {
    // console.log(values)
    // console.log(text)
    const { source } = values
    const data = {
      source,
      text
    }
    const res = await detectAPI(data)
    console.log(res)
  }

  return (
    <div className="P-detection">
      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelFontSize: 18
            },
          },
        }}
      >
        <Form className='before-detect-container'
          onFinish={(values) => handleDetect(values)}
        >
          <div className='detect-title-wrapper'>
            <Title level={1} className='detect-title'>FactVax Detection</Title>
          </div>
          <div className='datasource-wrapper'>
            <Item className='datasource-item'
              name='source'
              label='Info Source'
              colon={false}
              layout='vertical'
            >
              <Select className='datasource'
                size='large'
                placeholder='Select a source'
                options={source_options}
              />
            </Item>
          </div>
          <div className='detect-text-area-wrapper'>
            <Item className='detect-text-area-item'
              name='text'
            >
              <ConfigProvider
                theme={{
                  components: {
                    Input: {
                      inputFontSize: 18
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
                  autoSize={{ minRows: 8, maxRows: 10 }}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </ConfigProvider>
            </Item>
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
                htmlType='submit'
              // onClick={() => navigate('/dashboard/result')}
              >
                Detect
              </Button>
            </ConfigProvider>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  )
}

export default Detection