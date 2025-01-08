import { Avatar, Layout, Menu, Popconfirm } from 'antd'
import { SearchOutlined, HistoryOutlined, LineChartOutlined, UserOutlined } from '@ant-design/icons'
import './layout.styl'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/store/modules/user'

const items = [
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
  }
]

const avatarFontColor = ['#FFFFFF', '#8B4513', '#FFFFFF', '#006400', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
const avatarBgColor = ['#FFB6C1', '#FFD700', '#87CEFA', '#90EE90', '#FFA07A', '#9370DB', '#4682B4', '#FF6347', '#2E8B57', '#FF4500']

const DashboardLayout = () => {
  const { Header, Sider, Content } = Layout
  const navigate = useNavigate()
  const location = useLocation()
  const { username, colorSeed } = useSelector(state => state.user)
  const dispatch = useDispatch()

  // Get the current pathname
  const selectedKey = location.pathname

  // Use token for checking if user has login
  const isLogin = useSelector(state => state.user.isLogin)

  // Randomly generate color assortment of avatar font color and bg color

  /**
   * 
   * @param {Object} route, An object that has all properties of the clickede menu item.
   */
  const onMenuClick = (route) => {
    navigate(route.key)
  }

  /**
   * 
   * @param {String} username, username stored in global state
   * @returns {String} A new string that consists of the first letter of each word in the username
   */
  const getInitialsFromUsername = (username) => {
    return username.split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/dashboard/login')
  }

  return (
    <div className="P-layout-wrapper">
      <Layout className='header-layout'>
        <Header className='header'>
          {isLogin ?
            <div className='status-container'>
              <div className='log-opt-wrapper'>
                <span className='log-opt' onClick={handleLogout}>Logout</span>
              </div>
              <Avatar
                className='avatar'
                style={{ backgroundColor: avatarBgColor[colorSeed], color: avatarFontColor[colorSeed] }}
              >
                {getInitialsFromUsername(username)}
              </Avatar>
            </div>
            :
            <div className='status-container'>
              <div className='log-opt-wrapper'>
                <span className='log-opt' onClick={handleLogout}>Login</span>
              </div>
              <Avatar className='avatar'
                icon={<UserOutlined />}
              />
            </div>
          }
        </Header>
      </Layout>
      <Layout className='main-layout'>
        <Sider className='sider'>
          <Menu className='menu'
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