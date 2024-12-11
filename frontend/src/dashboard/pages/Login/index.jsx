import { Typography, Button, Input } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import './login.styl'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { Title } = Typography
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate()

  const onClickSignup = () => {
    navigate('/dashboard/register')
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
            <p className='signin-prompt'>Enter your email and password to sign in</p>
          </div>
          <div className='signin-content-wrapper'>
            <div className='signin-content'>
              <Input
                className='signin-input'
                size='large'
                placeholder='Email'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
              <Input
                className='signin-input'
                size='large'
                placeholder='Password'
                value={pwd}
                onChange={(e) => { setPwd(e.target.value) }}
              />
            </div>
            <Button className='signin-btn' size='large'>
              Sign in
            </Button>
          </div>
          <div className='signup-prompt-wrapper'>
            <p className='signup-prompt' onClick={onClickSignup}>Don't have an account? Sign up</p>
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
              >
                <GoogleOutlined />
                Google
              </Button>
            </div>
          </div>
          <div className='term-info-wrapper'>
            <p className='term-info'>By clicking signup, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login