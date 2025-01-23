import { Typography, Button, Input, Form, message } from 'antd'
import { GoogleOutlined, GithubFilled } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import './login.styl'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, fetchLoginByGoogle, fetchLoginByGithub } from '@/store/modules/user'
import { getTokenByDeviceIdAPI } from '@/apis'

const Login = () => {
  const { Title } = Typography
  const { Password } = Input
  const { Item } = Form
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [loginError, setLoginError] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const device_id = useSelector(state => state.user.device_id)

  // Handle with sending message to extension content.js when device_id updated
  useEffect(() => {
    async function sendDeviceId(device_id) {
      await getTokenByDeviceIdAPI(device_id)
      msgToExtension(device_id)
    }
    if (device_id) {
      sendDeviceId(device_id)
    }
  }, [device_id])

  const msgToExtension = (device_id) => {
    console.log(`The device id is ${device_id} in 'msgToExtension'`)
    if (device_id) {
      const event = new CustomEvent('sendMessageToExtension', {
        detail: { device_id },
      })
      window.dispatchEvent(event)
    }
  }

  const onClickSignup = () => {
    navigate('/dashboard/register')
  }

  const onClickLogin = async () => {
    /**
     * Encapulate data and invoke login API
     */
    const loginForm = {
      email,
      password: pwd
    }

    try {
      await dispatch(fetchLogin(loginForm))
      message.success('Log in successfully!')
      navigate('/dashboard')
    }
    catch (error) {
      message.error('Log in failed. Please try again.')
    }
  }

  const onClickGoogleLogin = async () => {
    try {
      await dispatch(fetchLoginByGoogle())
      message.success('Log in successfully!')
      navigate('/dashboard')
    }
    catch (error) {
      message.error('Log in failed. Please try again.')
    }
  }

  const onClickGithubLogin = async () => {
    try {
      await dispatch(fetchLoginByGithub())
      message.success('Log in successfully!')
      navigate('/dashboard')
    }
    catch (error) {
      setLoginError(true)
      message.error('Log in failed. Please try again.')
    }
  }

  return (
    <div className="P-login">
      <div className='login-page-wrapper'>
        <div className='title-wrapper'>
          <Title level={1} className='title'>FactVax</Title>
        </div>
        <div className='content-wrapper'>
          <div className='content-info-wrapper'>
            <Title level={3} className='signin-title'>Sign in</Title>
            <span className='signin-prompt'>Enter your email and password to sign in</span>
          </div>
          <div className='signin-content-wrapper'>
            <Form className='signin-content'
              onFinish={onClickLogin}
            >
              <Item className='signin-input-item'
                name='email'
                rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Enter a valid email!' }]}
              >
                <Input
                  className='signin-input'
                  size='large'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setLoginError(false)
                  }}
                />
              </Item>
              <Item className='signin-input-item'
                name='password'
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Password
                  className='signin-input'
                  size='large'
                  placeholder='Password'
                  value={pwd}
                  onChange={(e) => {
                    setPwd(e.target.value)
                    setLoginError(false)
                  }}
                />
              </Item>
              {loginError && (
                <div className='error-message'>Email and password do not match</div>
              )}
              <Item>
                <Button className='signin-btn'
                  size='large'
                  htmlType='submit'
                >
                  Sign in
                </Button>
              </Item>
            </Form>

          </div>
          <div className='signup-prompt-wrapper'>
            <p className='signup-prompt' onClick={onClickSignup}>Don't have an account? Sign up here</p>
          </div>
          <div className='third-party-signin-wrapper'>
            <div className='third-party-signin-prompt-wrapper'>
              <hr className="line" />
              <span className='third-party-signin-prompt'>or sign with</span>
              <hr className="line" />
            </div>
            <div className='third-party-signin-opt-wrapper'>
              <Button className='third-party-signin-opt'
                id='signin-google'
                size='large'
                onClick={onClickGoogleLogin}
              >
                <GoogleOutlined />
                Google
              </Button>
              <Button className='third-party-signin-opt'
                id='signin-github'
                size='large'
                onClick={onClickGithubLogin}
              >
                <GithubFilled />
                Github
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login