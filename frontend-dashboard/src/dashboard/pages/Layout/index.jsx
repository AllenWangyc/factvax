import { Avatar, Layout, Menu, Popconfirm, Dropdown } from 'antd'
import {
  ShrinkOutlined, ArrowsAltOutlined, SearchOutlined, HistoryOutlined, LineChartOutlined,
  InfoCircleOutlined, SolutionOutlined, LogoutOutlined, EditOutlined
} from '@ant-design/icons'
import './layout.styl'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogout } from '@/store/modules/user'
import { useState } from 'react'

const top_items = [
  {
    label: 'Detection',
    key: '/dashboard',
    icon: <SearchOutlined />
  },
  {
    label: 'History',
    key: '/dashboard/history',
    icon: <HistoryOutlined />
  },
  {
    label: 'Visualization',
    key: '/dashboard/visualization',
    icon: <LineChartOutlined />
  },

]

const bottom_items = [
  {
    label: 'Info',
    key: '/dashboard/info',
    icon: <InfoCircleOutlined />
  },
  {
    label: 'Term and Condition',
    key: '/dashboard/term&condition',
    icon: <SolutionOutlined />
  }
]

const avatarFontColor = ['#FFFFFF', '#8B4513', '#FFFFFF', '#006400', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
const avatarBgColor = ['#FFB6C1', '#FFD700', '#87CEFA', '#90EE90', '#FFA07A', '#9370DB', '#4682B4', '#FF6347', '#2E8B57', '#FF4500']

const DashboardLayout = () => {
  const { Header, Sider, Content } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { username, colorSeed } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const msgToExtensionLogout = () => {
    console.log('Logout event registered')
    const event = new CustomEvent('sendMessageToExtensionLogout')
    window.dispatchEvent(event)
  }

  // Get the current pathname
  const selectedKey = location.pathname
  const isLogin = useSelector(state => state.user.isLogin)

  /**
   * @param {Object} route, An object that has all properties of the clickede menu item.
   */
  const onMenuClick = (route) => {
    navigate(route.key)
  }

  /**
   * @param {String} username, username stored in global state
   * @returns {String} A new string that consists of the first letter of each word in the username
   */
  const getInitialsFromUsername = (username) => {
    return username.split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
  }

  const handleLogout = async () => {
    await dispatch(fetchLogout())
    msgToExtensionLogout()
    navigate('/dashboard/login')
  }

  const handleLogin = () => {
    navigate('/dashboard/login')
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const onClickChangePassword = () => {
    navigate('/dashboard/password')
  }

  // User drop down menu items at top right corner
  const signedInUserMenuItems = [
    {
      key: 'username',
      label: <span style={{ fontWeight: 'bold', color: '#333' }}>{username}</span>,
      disabled: true
    },
    {
      key: 'change-password',
      label: (
        <span
          onClick={(e) => {
            e.stopPropagation()
            setDropdownVisible(false)
            onClickChangePassword()
          }}
        >
          <EditOutlined style={{ marginRight: 5 }} />
          Change Password
        </span>
      ),
    },
    {
      key: 'logout',
      label: <span
        onClick={(e) => {
          e.stopPropagation()
          handleLogout()
        }}>
        <LogoutOutlined style={{ marginRight: 5 }} />
        Logout
      </span>,
    }
  ]

  const unsignedInUserMenuItems = [
    {
      key: 'login',
      label: <span onClick={handleLogin}>Login</span>,
    }
  ]

  return (
    <div className="P-layout-wrapper">
      <Layout className='header-layout'>
        <Header className='header'>
          {/* {isLogin ? */}
          <div className='status-container'>
            <Dropdown
              menu={{ items: (isLogin ? signedInUserMenuItems : unsignedInUserMenuItems) }}
              trigger={['click']}
              open={dropdownVisible}
              onOpenChange={(open) => setDropdownVisible(open)}
            >
              {isLogin ?
                (<Avatar
                  className="avatar"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: avatarBgColor[colorSeed],
                    color: avatarFontColor[colorSeed]
                  }}
                >
                  {getInitialsFromUsername(username)}
                </Avatar>)
                :
                (
                  <Avatar className='avatar'
                    icon={<UserOutlined />}
                  />
                )
              }

            </Dropdown>
          </div>
        </Header>
      </Layout>
      <Layout className='main-layout'>
        <Sider className={`sider ${collapsed ? 'collapsed' : ''}`}
          collapsible={false}
          collapsed={collapsed}
        >
          <div className="menu-header">
            <span className="menu-title">Menu</span>
            <div className="toggle-icon" onClick={toggleCollapsed}>
              {collapsed ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
            </div>
          </div>
          <div className='menu-container'>
            <Menu className='menu'
              mode='inline'
              items={top_items} // Add items to Menu bar
              selectedKeys={selectedKey} // Show which item is selected
              onClick={onMenuClick}
            />
            <Menu className='menu'
              mode='inline'
              items={bottom_items} // Add items to Menu bar
              selectedKeys={selectedKey} // Show which item is selected
              onClick={onMenuClick}
            />
          </div>
        </Sider>
        <Content className={`content ${collapsed ? 'without-sider' : 'with-sider'}`}>
          <Outlet />
        </Content>
      </Layout>
    </div>
  )
}

export default DashboardLayout