import React, { useState } from 'react'
import './popup.styl'
import { Layout, Switch, Button, Typography, Modal } from 'antd'
import { AntDesignOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';

const isGmailUser = () => {
  return (
    navigator.userAgent.toLowerCase().includes('chrome') &&
    !navigator.userAgent.toLowerCase().includes('edge')
  );
};

function Popup() {
  const { Content, Header, Footer } = Layout
  const { Title, Text } = Typography
  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false)
  const detectCounter = useSelector(state => state.user.detectCounter)

  const handlePrivacyClick = () => {
    setPrivacyModalVisible(true);
  };

  const handleModalClose = () => {
    setPrivacyModalVisible(false);
  };

  return (
    <Layout className="P-layout">
      {/* Header */}
      <Header className="header">
        <Title className="title">FactVax</Title>
        <div className="logo">
          <img src={"/images/vaccine_icon.png"} alt="Logo" />
        </div>
      </Header>

      {/* Content */}
      <Content className="content">
        <div className="switch-section">
          <div className="switch-item">
            <p className="text">Enable FactVax service</p>
            <Switch defaultChecked={false} />
          </div>
          <div className="switch-item">
            <p className="text">Switch to specific detection</p>
            <Switch defaultChecked={true} />
          </div>
        </div>
        <Text className="misinformation-text">
          FactVax has detected misinformation {detectCounter} times for you.
        </Text>
        <Button
          type="primary"
          block
          className="dashboard-button"
          icon={<AntDesignOutlined />}
          size="large"
          onClick={() => {
            chrome.tabs.create({
              url: import.meta.env.VITE_DASHBOARD_DEV_URL,
            });
          }}
        >
          Go to dashboard
        </Button>
      </Content>

      {/* Footer */}
      <Footer className="footer">
        <div className="footer-item" onClick={handlePrivacyClick}>
          <LockOutlined className="footer-icon" />
          Privacy
        </div>
        <div className="footer-item">
          {isGmailUser() ? (
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=clientservice@factvax.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MailOutlined className="footer-icon" />
              Contact
            </a>
          ) : (
            <a
              href="mailto:clientservice@factvax.com"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MailOutlined className="footer-icon" />
              Contact
            </a>
          )}
        </div>
      </Footer>

      {/* Privacy Modal */}
      <Modal
        title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Privacy Policy</div>}
        visible={isPrivacyModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
        bodyStyle={{
          maxHeight: '60vh', // 控制模态框内容最大高度
          overflowY: 'auto', // 启用滚动条
          padding: '15px 20px', // 添加适
          //当内边距
        }}
      >
        <div
          style={{
            lineHeight: '1.3', // 更紧凑的行高
            fontSize: '14px', // 文本字体大小
            textAlign: 'left', // 默认左对齐
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '10px', // 标题与内容的间距
            }}
          >
            Enhanced Privacy Policy for FactVax
          </h3>
          <p style={{ textAlign: 'center', margin: 0, marginBottom: '5px' }}>
            <strong>Last Updated:</strong> 01/21/2025
          </p>

          <h4
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '5px',
            }}
          >
            Introduction
          </h4>
          <p
            style={{
              textAlign: 'justify',
              margin: '0 0 5px 0', // 上、左、右无间距，下方 5px 间距
              lineHeight: '1.2', // 更紧凑的行距
              fontSize: '14px', // 确保字体大小统一
            }}
          >
            Welcome to <strong>FactVax</strong>. This privacy policy outlines our commitment to protecting
            the privacy and security of your personal information when using our extension. We aim to be
            transparent about our data practices and respect your privacy rights.
          </p>

          <h4
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '5px',
            }}
          >
            Information We Collect
          </h4>
          <ul
            style={{
              paddingLeft: '20px', // 符号缩进
              listStyleType: 'disc',
              margin: 0, // 去除外边距
            }}
          >
            <li style={{ marginBottom: '5px', lineHeight: '1.3' }}>
              <strong style={{ fontWeight: 'bold' }}>Engagement Data:</strong> Includes the phrases detected on web pages, the type of
              fact-check or scam warning triggered, and the timestamp of these events.
            </li>
            <li style={{ marginBottom: '5px', lineHeight: '1.3' }}>
              <strong style={{ fontWeight: 'bold' }}>Anonymized Location Data:</strong> General geographic location (city and country) to
              understand the regional use of our extension.
            </li>
            <li style={{ marginBottom: '5px', lineHeight: '1.3' }}>
              <strong style={{ fontWeight: 'bold' }}>Technical Data from Mixpanel:</strong> Browser type, browser version, and screen
              resolution to help us understand the technical environment and improve compatibility.
            </li>
            <li style={{ marginBottom: '5px', lineHeight: '1.3' }}>
              <strong style={{ fontWeight: 'bold' }}>Device and Usage Data:</strong> Information about the device and how our extension
              is used, which may include data collected by cookies and similar technologies.
            </li>
          </ul>

          <h4
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '5px',
            }}
          >
            How We Use Your Information
          </h4>
          <ul
            style={{
              paddingLeft: '20px',
              listStyleType: 'disc',
              margin: 0,
            }}
          >
            <li style={{ marginBottom: '5px', lineHeight: '1.3' }}>
              <strong style={{ fontWeight: 'bold' }}>Service Improvement:</strong> To enhance the effectiveness and efficiency of our extension.
            </li>
            <li style={{ marginBottom: '5px', lineHeight: '1.3' }}>
              <strong style={{ fontWeight: 'bold' }}>Analytics and Performance Monitoring:</strong> To analyze usage patterns and identify areas for improvement.
            </li>
            <li style={{ marginBottom: '5px', lineHeight: '1.3' }}>
              <strong style={{ fontWeight: 'bold' }}>Troubleshooting and Support:</strong> To resolve technical issues and provide user support.
            </li>
            <li style={{ marginBottom: '5px', lineHeight: '1.3' }}>
              <strong style={{ fontWeight: 'bold' }}>Legal Compliance and Protection:</strong> To comply with legal requirements and protect the rights and safety of our users and third parties.
            </li>
          </ul>

          <h4
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '5px',
            }}
          >
            Contact Information
          </h4>
          <p
            style={{
              textAlign: 'left', // 改为左对齐避免间距拉伸
              margin: '0 0 5px 0', // 减少段落上下间距
              lineHeight: '1.2', // 行距更紧凑
              fontSize: '14px', // 统一字体大小
            }}
          >
            For questions or concerns about our privacy practices, please contact us at:
            <a
              href="mailto:clientservice@factvax.com"
              style={{
                color: '#007bff',
                textDecoration: 'none', // 去掉默认下划线
                display: 'inline', // 确保链接和文字一致
              }}
            >
              carlfish666@gmail.com
            </a>.
          </p>


        </div>
      </Modal>


    </Layout>
  );
}

export default Popup;