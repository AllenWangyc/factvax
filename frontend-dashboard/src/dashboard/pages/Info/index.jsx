import React from 'react';
import { useNavigate } from 'react-router-dom';
import './info.styl';
import { Button, ConfigProvider } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

const Info = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="info-container">
      <div className='back-wrapper'>
        <LeftOutlined
          className='back'
          style={{ fontSize: 24 }}
          onClick={handleBack}
        />
      </div>
      <h1 className="info-title">Welcome to FactVax</h1>
      <p className="info-intro">
        FactVax is your trusted companion in combating vaccine-related misinformation. Using advanced NLP models and real-time analytics, our platform empowers users with accurate, timely, and reliable information to make informed health decisions.
      </p>

      <section className="info-section">
        <h2 className="info-heading">How to Use FactVax</h2>
        <h3 className="info-subheading">Browser Extension</h3>
        <p>
          The FactVax browser extension allows you to verify vaccine-related claims directly on any webpage. Highlight text and click the extension icon to receive real-time feedback on its credibility, confidence score, and supporting explanations.
        </p>
        <h3 className="info-subheading">Dashboard</h3>
        <div>
          Access the FactVax dashboard for comprehensive data visualization. The dashboard provides:
          <ul>
            <li>Trends in vaccine misinformation across platforms.</li>
            <li>Geographic hotspots of misinformation activity.</li>
            <li>Analysis of misinformation types and frequencies.</li>
          </ul>
        </div>
        <h3 className="info-subheading">History Log</h3>
        <div>
          Review your past verification history in the History Log section. Each record includes:
          <ul>
            <li>Source platform of the text analyzed.</li>
            <li>Detected misinformation type.</li>
            <li>Date and time of analysis.</li>
          </ul>
        </div>
      </section>

      <section className="info-section">
        <h2 className="info-heading">Frequently Asked Questions (FAQ)</h2>
        <h3 className="info-subheading">1. How does FactVax ensure accuracy?</h3>
        <p>
          FactVax employs state-of-the-art NLP models, including fine-tuned GPT and BERT architectures, trained on diverse datasets to ensure high accuracy.
        </p>
        <h3 className="info-subheading">2. Is my data secure?</h3>
        <p>
          Yes, FactVax adheres to global data privacy standards. All user data is anonymized and stored securely in MongoDB databases.
        </p>
        <h3 className="info-subheading">3. Can I customize the detection settings?</h3>
        <p>
          Yes, the FactVax extension allows you to customize detection preferences, including language and detail levels in explanations.
        </p>
        <h3 className="info-subheading">4. What types of misinformation can FactVax detect?</h3>
        <p>
          FactVax specializes in vaccine-related misinformation, including false claims about vaccine safety, efficacy, and conspiracy theories.
        </p>
      </section>

      <section className="info-section">
        <h2 className="info-heading">Contact Us</h2>
        <p>
          If you have questions, feedback, or need assistance, please reach out to us at <strong>factvax_info@gmail.com</strong>.
        </p>
      </section>

      <div className='btn-wrapper'>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBg: '#000',
                defaultColor: '#fff',
                defaultBorderColor: '#000',
                defaultHoverBg: '#333',
                defaultHoverColor: '#fff',
                defaultActiveBg: '#333',
                defaultActiveColor: '#fff'
              },
            },
          }}
        >
          <Button className="info-back-button"
            // size='large'
            onClick={handleBack}
          >
            Back to Dashboard
          </Button>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Info;
