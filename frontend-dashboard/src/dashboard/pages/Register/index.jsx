import { Typography, Button, Input, Form, message, ConfigProvider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './register.styl';
import { useNavigate } from 'react-router-dom';
import { emailVerifyAPI, signUpAPI } from '@/apis';

const Register = () => {
  const { Title } = Typography;
  const { Password } = Input;
  const [firstName, setFirstName] = useState('');;//
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [code, setVerificationCode] = useState('');
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
  };

  const onClickVerify = async () => {
    if (!validateEmail(email)) {
      message.error('Please enter a valid email address.');
      return;
    }

    // 立即禁用按钮并开始倒计时
    setIsVerifyDisabled(true);
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsVerifyDisabled(false); // 倒计时结束时解冻按钮
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const data = { email };

    try {
      const response = await emailVerifyAPI(data);
      console.log(response);

      if (response.message === 'Email valid') {
        message.success('Verification code sent to your email.');
        setIsCodeVisible(true); // 显示验证码输入框
      }
    } catch (error) {
      console.error('Error verifying email:', error);

      // 停止倒计时并立即解冻按钮
      setCountdown(0);
      setIsVerifyDisabled(false);

      if (error.response && error.response.status === 500) {
        message.error('Email Already Exist. Try Another Email.');
      } else {
        message.error('Server Error. Try again later.');
      }
    }
  };




  const onClickSignup = async () => {
    if (!isChecked) {
      setErrorMessage('Please Read the Agreement Firstly and Ticking the Checkbox to Finish the Sign Up');
      return;
    }

    if (!isCodeVisible) {
      message.error('Please verify your email first.');
      return;
    }

    const username = `${firstName} ${lastName}`;
    const formData = {
      username,
      email,
      password: pwd,
      code,
    };

    try {
      await signUpAPI(formData);
      message.success('Sign up successfully!');
      navigate('/dashboard/login');
    } catch (error) {
      message.error('An error occurred during sign up. Please try again.');
    }
  };

  const onClickBack = () => {
    navigate('/dashboard/login');
  };

  return (
    <div className='P-register'>
      <div className='back-wrapper'>
        <LeftOutlined
          className='back'
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
            <Form
              className='signup-content-form'
              name='register'
              layout='vertical'
              onFinish={(values) => {
                console.log('Submitted values:', values);
                onClickSignup();
              }}
            >

              <div className='username-wrapper'>
                <Form.Item
                  className='username-form-item'
                  label='First Name'
                  name='firstName'
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
                  <Input
                    className='username'
                    size='large'
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  className='username-form-item'
                  label='Last Name'
                  name='lastName'
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
                  <Input
                    className='username'
                    size='large'
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Item>
              </div>

              <Form.Item
                className='signup-input-item'
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Email is required.',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address.',
                  },
                ]}
              >
                <Input.Group compact>
                  <Input
                    className='signup-input'
                    size='large'
                    placeholder='e.g. example@gmail.com'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    style={{ width: 'calc(100% - 100px)' }}
                  />
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultBg: '#000',
                          defaultColor: '#fff',
                          defaultBorderColor: '#000',
                          defaultHoverBg: '#333',
                          defaultHoverColor: '#fff',
                          defaultActiveBg: '#333',
                          defaultActiveColor: '#fff'
                        },
                      },
                    }}
                  >
                    <Button className='verify-btn'
                      size='large'
                      onClick={() => { onClickVerify }}
                      disabled={isVerifyDisabled}
                      style={{ width: '100px' }}
                    >
                      {isVerifyDisabled ? `${countdown}s` : 'Verify'}
                    </Button>
                  </ConfigProvider>
                </Input.Group>
              </Form.Item>

              {isCodeVisible && (
                <Form.Item
                  className='signup-input-item'
                  label='Verification Code'
                  name='code'
                  rules={[
                    {
                      required: true,
                      message: 'Verification code is required.',
                    },
                    {
                      pattern: /^\d{6}$/,
                      message: 'Verification code must be 6 digits.',
                    },
                  ]}
                >
                  <Input
                    className='signup-input'
                    size='large'
                    placeholder='Enter the verification code'
                    value={code}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </Form.Item>
              )}

              <Form.Item
                className='signup-input-item'
                label='Password'
                name='password'
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
                <Password
                  className='signup-input'
                  size='large'
                  placeholder='At least 8 characters, including both letters and numbers.'
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                className='signup-input-item'
                label='Confirm Password'
                name='confirmPassword'
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password.',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Password
                  className='signup-input'
                  size='large'
                  placeholder='Re-enter your password'
                />
              </Form.Item>


              <Form.Item>
                <div className='term-info-wrapper'>
                  <input
                    type='checkbox'
                    id='agreement'
                    className='term-checkbox'
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <label htmlFor='agreement' className='term-info'>
                    By ticking the checkbox, you agree to our{' '}
                    <a href='/dashboard/term&condition' target='_blank' rel='noopener noreferrer'>
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href='/dashboard/term&condition' target='_blank' rel='noopener noreferrer'>
                      Privacy Policy
                    </a>.
                  </label>
                </div>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
              </Form.Item>

              <Form.Item className='signup-btn-item'>
                <Button className='signup-btn' size='large' type='primary' htmlType='submit'>
                  Sign up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
