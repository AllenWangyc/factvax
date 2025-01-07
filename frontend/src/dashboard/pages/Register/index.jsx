import { Typography, Button, Input, Form, message } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useState } from 'react'
import './register.styl'
import { useNavigate } from 'react-router-dom'
import { apiReqs, signUpAPI } from '@/apis'

const Register = () => {
  const { Title } = Typography
  const { Password } = Input
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate()

  const onClickSignup = async () => {
    /**
     * Encapulate data and invoke signup API
     */
    const username = firstName + ' ' + lastName
    const formData = {
      username,
      email,
      password: pwd
    }

    try {
      await signUpAPI(formData)
      message.success('Sign up successfully!')
      navigate('/dashboard/login') // Redirect only after success
    }
    catch (error) {
      message.error('An error occurred during sign up. Please try again.')
    }
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
            <Form className='signup-content-form'
              name="register"
              layout="vertical"
              onFinish={onClickSignup}
            >
              <div className='username-wrapper'>
                <Form.Item className='username-form-item'
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'First name is required.',
                    },
                    {
                      pattern: /^[a-zA-Z]+$/,
                      message: 'First name should only contain letters.',
                    },
                  ]}
                >
                  <Input className='username' size='large' placeholder='First name' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                </Form.Item>

                <Form.Item
                  className='username-form-item'
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: 'Last name is required.',
                    },
                    {
                      pattern: /^[a-zA-Z]+$/,
                      message: 'Last name should only contain letters.',
                    },
                  ]}
                >
                  <Input className='username' size='large' placeholder='Last name' value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                </Form.Item>
              </div>

              <Form.Item className='signup-input-item'
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Email is required.',
                  },
                  {
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email address.',
                  },
                ]}
              >
                <Input className='signup-input' size='large' placeholder='e.g. example@gmail.com' value={email} onChange={(e) => { setEmail(e.target.value) }} />
              </Form.Item>

              <Form.Item
                className='signup-input-item'
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Password is required.',
                  },
                  {
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: 'Password must be at least 8 characters long and include both letters and numbers.',
                  },
                ]}
              >
                <Password className='signup-input' size='large' placeholder='At least 8 characters, including both letters and numbers.' value={pwd} onChange={(e) => { setPwd(e.target.value) }} />
              </Form.Item>

              <Form.Item className='signup-btn-item'>
                <Button className='signup-btn' size='large' type="primary" htmlType="submit">
                  Sign up
                </Button>
              </Form.Item>
            </Form>
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