import { Typography, Button, Input } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useState } from 'react'
import './register.styl'
import { useNavigate } from 'react-router-dom'
import { apiReqs } from '@/apis'

const Register = () => {
  const { Title } = Typography
  const { Password } = Input
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate()

  const onClickSignup = () => {
    /**
     * Encapulate data and invoke signup API
     */
    const username = firstName + ' ' + lastName
    apiReqs.signUp({
      data: {
        username,
        email,
        password: pwd
      },
      success: () => {
        navigate('/dashboard/login')
      }
    })
  }

  const onClickBack = () => {
    navigate('/dashboard/login')
  }

  return (
    <div className='P-register'>
      <div className='back-wrapper'>
        <LeftOutlined className='back'
          style={{ fontSize: 24 }}
          onClick={onClickBack}
        />
      </div>
      <div className='register-page-wrapper'>
        <div className='title-wrapper'>
          <Title level={1} className='title'>FactVax</Title>
        </div>
        <div className='content-wrapper'>
          <div className='content-info-wrapper'>
            <Title level={3} className='signup-title'>Create an account</Title>
            <span className='signup-prompt'>Enter the following information to sign up</span>
          </div>
          <div className='signup-content-wrapper'>
            <div className='signup-content'>
              <div className='username-wrapper'>
                <Input className='username'
                  size='large'
                  placeholder='First name'
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value) }}
                />
                <Input className='username'
                  size='large'
                  placeholder='Last name'
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value) }}
                />
              </div>
              <Input className='signup-input'
                size='large'
                placeholder='Email'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
              <Password className='signup-input'
                size='large'
                placeholder='Password'
                value={pwd}
                onChange={(e) => { setPwd(e.target.value) }}
              />
            </div>
            <Button className='signup-btn'
              size='large'
              onClick={() => onClickSignup()}
            >
              Sign up
            </Button>
          </div>
          <div className='term-info-wrapper'>
            <span className='term-info'>By clicking signup, you agree to our Terms of Service and Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register