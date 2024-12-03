// import { globalRouters } from "@/popup/router"
import './popup.styl'
import React from "react";
import { Layout, Card, Switch, Button, Typography } from "antd";

function Popup() {
  const { Content } = Layout;
  const { Title, Text, Link } = Typography;
  return (
    <Layout className="layout" >
      <Card className="card" >
        <Title level={3}>FactVax</Title>
        <div className="switch-section">
          <div className="switch-item">
            <Text>Enable FactVax service</Text>
            <Switch defaultChecked={false} />
          </div>
          <div className="switch-item">
            <Text>Switch to specific detection</Text>
            <Switch defaultChecked={true} />
          </div>
        </div>
        <Text className="misinformation-text">FactVax has detected misinformation xxx times for you.</Text>
        <Button type="primary" block className="dashboard-button">
          Dashboard
        </Button>
        <div className="link-section">
          <Link href="#" className="link">
            Help
          </Link>
          <Link href="#" className="link">
            Donate
          </Link>
        </div>
      </Card>
    </Layout>
  )
}

export default Popup