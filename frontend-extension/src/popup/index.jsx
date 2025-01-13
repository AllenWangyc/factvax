import './popup.styl'
import React from "react";
import { Layout, Switch, Button, Typography, ConfigProvider } from "antd"
import { createStyles } from 'antd-style'
import { AntDesignOutlined } from '@ant-design/icons'

function Popup() {
  const { Content, Header, Footer } = Layout
  const { Title, Text, Link } = Typography

  // Create a button style
  const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        border-width: 0;
  
        > span {
          position: relative;
        }
  
        &::before {
          content: '';
          background: linear-gradient(135deg, #6253e1, #04befe);
          position: absolute;
          inset: 0;
          opacity: 1;
          transition: all 0.3s;
          border-radius: inherit;
        }
  
        &:hover::before {
          opacity: 0;
        }
      }
    `,
  }))
  const { styles } = useStyle()

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: "#f5f5f5",
            bodyBg: "#f5f5f5"
          },
        },
      }}
    >
      <Layout className="P-layout" >
        <Header className='header'>
          <Title className="title" level={1}>FactVax</Title>
        </Header>
        <Content className='content'>
          <div className="switch-section">
            <div className="switch-item">
              <p className='text'>Enable FactVax service</p>
              <Switch defaultChecked={false} />
            </div>
            <div className="switch-item">
              <p className='text'>Switch to specific detection</p>
              <Switch defaultChecked={true} />
            </div>
          </div>
          <Text className="misinformation-text">FactVax has detected misinformation xxx times for you.</Text>
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <Button
              type="primary"
              block
              className="dashboard-button"
              icon={<AntDesignOutlined />}
              size="large"
              onClick={() => {
                console.log(process.env.REACT_APP_DASHBOARD_URL);
                chrome.tabs.create({ url: import.meta.env.VITE_DASHBOARD_DEV_URL })
                // chrome.tabs.create({ url: 'https://localhost:3000/dashboard/login' })
              }}
            >
              Go to dashboard
            </Button>
          </ConfigProvider>
        </Content>
        <Footer className="footer">
          <Link href="#" className="link">
            Help
          </Link>
          <Link href="#" className="link">
            Donate
          </Link>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default Popup