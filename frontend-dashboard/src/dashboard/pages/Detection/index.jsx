import "./detection.styl"
import { Input, Typography, ConfigProvider, Button, Select, Form, message } from "antd"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { detectAPI } from "@/apis"
import { AudioOutlined, LoadingOutlined, PauseOutlined } from "@ant-design/icons"

{/* <PauseCircleFilled /> */ }
const source_options = [
  { value: "X", label: "X" },
  { value: "Meta", label: "Meta" },
  { value: "Reddit", label: "Reddit" },
];

const Detection = () => {
  const { TextArea } = Input
  const { Title } = Typography
  const { Item } = Form
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [text, setText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isDetecting, setIsDetecting] = useState(false)

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
  recognition.lang = "en-US"
  recognition.interimResults = false

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript
    setText(speechToText)
    setIsListening(false)
    message.success(`Recognized: "${speechToText}"`)
  }

  recognition.onerror = (error) => {
    if (error.error === "no-speech") {
      console.warn("No speech detected. Microphone may have been idle.")
      return // Ignore no-speech error
    }
    message.error(`Speech recognition error: ${error.error}`)
    setIsListening(false);
  }

  recognition.onend = () => {
    console.log("Speech recognition ended and microphone released.")
  }

  const startListening = () => {
    setIsListening(true)
    recognition.start()
  }

  const stopListening = () => {
    setIsListening(false)
    recognition.onresult = null; // Clear onresult event
    recognition.onerror = null; // Clear onerror event
    recognition.onend = null; // Clear onend event
    recognition.abort(); // Interupt incognition and release resource
    message.info("Voice input paused and microphone released.")
  }

  useEffect(() => {
    return () => {
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null; // Unbind event
      recognition.abort(); // Forcedly release resource
      message.info("Speech recognition stopped.");
    }
  }, [])

  const handleDetect = async (values) => {
    const { source } = values
    if (!text.trim()) {
      message.warning("Please enter or speak text to detect.")
      return
    }

    setIsDetecting(true)
    try {
      const data = { source, text }
      const res = await detectAPI(data)
      navigate(`/dashboard/result/${res.response._id}`)
    } catch (err) {
      message.error("Detection failed")
    } finally {
      setIsDetecting(false)
    }
  };

  return (
    <div className="P-detection">
      <ConfigProvider>
        <Form
          className="before-detect-container"
          onFinish={handleDetect}
          ref={formRef}
        >
          <div className="detect-title-wrapper">
            <Title level={1} className="detect-title">FactVax Detection</Title>
          </div>
          <div className="datasource-wrapper">
            <Item
              className="datasource-item"
              name="source"
              label="Info Source"
              colon={false}
              layout="vertical"
              rules={[{ required: true, message: "Please select a source" }]}
            >
              <Select
                className="datasource"
                size="large"
                placeholder="Select a source"
                options={source_options}
              />
            </Item>
          </div>
          <div className="detect-text-area-wrapper">
            {isListening ? (
              <div className="listening-animation">Listening...</div>
            ) : isDetecting ? (
              <div className="listening-animation">Detecting...</div>
            ) : (
              <TextArea
                className="detect-text-area"
                placeholder="Please enter the vaccine information"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            )}

            {/**
             * Voice input button displayed when neither listening nor detecting
             */}
            {!isListening && !isDetecting && (
              <Button
                className="voice-input-btn"
                type="primary"
                icon={<AudioOutlined />}
                onClick={startListening}
                style={{ position: "absolute", right: "10px", bottom: "10px" }}
              />
            )}

            {/**
             * Voice pause button displayed when neither listening nor detecting
             */}
            {isListening && !isDetecting && (
              <Button
                className="voice-pause-btn"
                icon={<PauseOutlined />}
                onClick={stopListening}
                style={{ position: "absolute", right: "10px", bottom: "10px" }}
              />
            )}
          </div>
          <div className="detect-btn-container">
            <Button
              className="detect-btn"
              size="large"
              htmlType="submit"
              disabled={isListening || isDetecting}
            >
              {isDetecting ? <LoadingOutlined /> : "Detect"}
            </Button>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default Detection;
