import "./detection.styl";
import {
  Input,
  Typography,
  ConfigProvider,
  Button,
  Select,
  Form,
  message,
  Tooltip,
} from "antd";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { detectAPI } from "@/apis";
import { AudioOutlined, LoadingOutlined, PauseOutlined } from "@ant-design/icons";

const source_options = [
  { value: "X", label: "X" },
  { value: "Meta", label: "Meta" },
  { value: "Reddit", label: "Reddit" },
];

const Detection = () => {
  const { TextArea } = Input;
  const { Title } = Typography;
  const { Item } = Form;
  const navigate = useNavigate();
  const formRef = useRef(null);
  const recognitionRef = useRef(null);

  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(true);

  // Initialize SpeechRecognition
  useEffect(() => {
    recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setText((prevText) => `${prevText} ${speechToText}`);
      setIsListening(false);
      message.success(`Recognized: "${speechToText}"`);
    };

    recognitionRef.current.onerror = (error) => {
      setIsListening(false);
      if (error.error === "no-speech") {
        console.warn("No speech detected.");
        return;
      }
      message.error(`Speech recognition error: ${error.error}`);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    };
  }, []);

  // Start listening
  const startListening = () => {
    setIsListening(true);
    recognitionRef.current.start();
  };

  // Stop listening
  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current.abort();
    message.info("Voice input paused and microphone released.");
  };

  // Handle detection
  const handleDetect = async (values) => {
    const { source } = values;
    if (!text.trim()) {
      message.warning("Please enter or speak text to detect.");
      return;
    }

    setIsDetecting(true);
    try {
      const data = { source, text };
      const res = await detectAPI(data);
      navigate(`/dashboard/result/${res.response._id}`);
    } catch (err) {
      message.error("Detection failed");
    } finally {
      setIsDetecting(false);
    }
  };

  // Placeholder text based on state
  const placeholderText = isListening
    ? "Listening for your input..."
    : isDetecting
      ? "Detecting text..."
      : "Please enter the vaccine information";

  return (
    <div className="P-detection">
      <ConfigProvider>
        <Form
          className="before-detect-container"
          onFinish={handleDetect}
          ref={formRef}
        >
          {/* Title */}
          <div className="detect-title-wrapper">
            <Title level={1} className="detect-title">
              FactVax Detection
            </Title>
          </div>

          {/* Source selection */}
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

          {/* Text Area and Voice Button */}
          <div className="detect-text-area-wrapper" style={{ position: "relative" }}>
            {/* 检测进度条 */}
            {isDetecting && (
              <div className="detect-progress-bar">
                <div className="progress" />
              </div>
            )}

            {/* 文本框 */}
            <TextArea
              className={`detect-text-area ${isListening ? "listening" : ""} ${isDetecting ? "detecting" : ""
                }`}
              placeholder={placeholderText}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Text hint */}
            {isInfoVisible && !text && !isListening && !isDetecting && (
              <div className="info-bubble" style={{ position: "absolute", bottom: "-35px", left: "0px" }}>
                <span>
                  💡 You can type or use voice input to enter the vaccine information!
                </span>
                {/* Close button */}
                <button
                  style={{
                    marginLeft: "10px",
                    background: "none",
                    border: "none",
                    color: "#888",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={() => setIsInfoVisible(false)} // Hidden hint box when button clicked
                >
                  ×
                </button>
              </div>
            )}

            {/* Voice button */}
            <div
              className="voice-btn-container"
              style={{ position: "absolute", right: "10px", bottom: "10px" }}
            >
              {isListening ? (
                <Button
                  className="voice-pause-btn"
                  icon={<PauseOutlined />}
                  onClick={stopListening}
                />
              ) : (
                <Button
                  className="voice-input-btn"
                  type="primary"
                  icon={<AudioOutlined />}
                  onClick={startListening}
                />
              )}
            </div>
          </div>

          {/* Detect Button */}
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
