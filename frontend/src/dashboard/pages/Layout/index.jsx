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

const DashboardLayout = () => {
  const { Header, Sider, Content } = Layout
  const navigate = useNavigate()
  const location = useLocation()
  // Get the current pathname
  const selectedKey = location.pathname

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
          <Avatar className='avatar'>A</Avatar>
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