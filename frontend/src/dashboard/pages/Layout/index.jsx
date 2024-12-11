import { Avatar, Layout, Menu, Popconfirm } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import './layout.styl'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

const items = [
  {
    label: 'Detection',
    key: '/dashboard',
    icon: <HomeOutlined />
  },
  {
    label: 'History',
    key: '/dashboard/history',
    icon: <HomeOutlined />
  },
  {
    label: 'Visualization',
    key: '/dashboard/visualization',
    icon: <HomeOutlined />
  }
]

const avatarFontColor = ['#FFFFFF', '#8B4513', '#FFFFFF', '#006400', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
const avatarBgColor = ['#FFB6C1', '#FFD700', '#87CEFA', '#90EE90', '#FFA07A', '#9370DB', '#4682B4', '#FF6347', '#2E8B57', '#FF4500']

const DashboardLayout = () => {
  const { Header, Sider, Content } = Layout
  const navigate = useNavigate()
  const location = useLocation()
  // Get the current pathname
  const selectedKey = location.pathname

  // Randomly generate color assortment of avatar font color and bg color
  const randomPickColor = () => Math.floor(Math.random() * 10)
  const colorSeed = randomPickColor()

  /**
   * 
   * @param {object} route, An object that has all properties of the clickede menu item.
   */
  const onMenuClick = (route) => {
    navigate(route.key)
  }

  return (
    <div className="P-layout-wrapper">
      <Layout className='header-layout'>
        <Header className='header'>
          <Avatar
            className='avatar'
            style={{ backgroundColor: avatarBgColor[colorSeed], color: avatarFontColor[colorSeed] }}
          >{colorSeed}</Avatar>
        </Header>
      </Layout>
      <Layout className='main-layout'>
        <Sider className='sider'>
          <Menu
            mode='inline'
            items={items} // Add items to Menu bar
            selectedKeys={selectedKey} // Show which item is selected
            onClick={onMenuClick}
          />
        </Sider>
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>
    </div>
  )
}

export default DashboardLayout