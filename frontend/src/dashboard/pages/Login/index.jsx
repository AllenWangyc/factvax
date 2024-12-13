import { Typography, Button, Input } from 'antd'
import { GoogleOutlined, GithubFilled } from '@ant-design/icons'
import { useState } from 'react'
import './login.styl'
import { useNavigate } from 'react-router-dom'
import { apiReqs } from '@/apis'

const Login = () => {
  const { Title } = Typography
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate()

  const onClickSignup = () => {
    navigate('/dashboard/register')
  }

  const onClickLogin = () => {
    /**
     * Encapulate data and invoke login API
     */
    apiReqs.signIn({
      data: {
        email,
        password: pwd
      },
      success: () => {
        navigate('/dashboard')
      }
    })
  }

  const onClickGoogleLogin = () => {
    apiReqs.signInByGoggle({
      success: () => {
        navigate('/dashboard')
      }
    })
  }

  const onClickGithubLogin = () => {
    apiReqs.signInByGithub({
      success: () => {
        navigate('/dashboard')
      }
    })
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
            <Button className='signin-btn'
              size='large'
              onClick={() => onClickLogin()}
            >
              Sign in
            </Button>
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
                id='signin-google'
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