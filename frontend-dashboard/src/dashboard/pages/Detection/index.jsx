import "./detection.styl";
import { Input, Typography, ConfigProvider, Button, Select, Form, message } from "antd";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { detectAPI } from "@/apis";
import { AudioOutlined, LoadingOutlined } from "@ant-design/icons";

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
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    setText(speechToText);
    setIsListening(false);
    message.success(`Recognized: "${speechToText}"`);
  };

  recognition.onerror = (error) => {
    message.error(`Speech recognition error: ${error.error}`);
    setIsListening(false);
  };

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

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
                placeholder="Message FactVax"
                style={{ height: 120, resize: "none" }}
                autoSize={{ minRows: 8, maxRows: 10 }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            )}
            {!isListening && !isDetecting && (
              <Button
                className="voice-input-btn"
                type="primary"
                icon={<AudioOutlined />}
                onClick={startListening}
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
