import { Typography, Button, Input, Form, message, ConfigProvider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailVerifyPasswordAPI, changePasswordAPI } from '@/apis';
import './password.styl';

const PasswordReset = () => {
  const { Title } = Typography;
  const { Password } = Input;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const email = Form.useWatch('email', form)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsVerifyDisabled(false);
    }
  }, [countdown]);

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const onClickVerify = async (email) => {
    if (!validateEmail(email)) {
      message.error('Please enter a valid email address.');
      return;
    }
    setIsVerifyDisabled(true);
    setCountdown(60);

    try {
      const response = await emailVerifyPasswordAPI({ email, flag: 'abcd111' });
      if (response.message === 'Email valid') {
        message.success('Verification code sent to your email.');
        setIsCodeVisible(true);
      }
    } catch (error) {
      console.error(error); // 打印错误以供调试
      message.error(error.response?.data?.message || 'Server Error. Try again later.');
      setIsVerifyDisabled(false);
      setCountdown(0);
    }
  };

  const onFinish = async (values) => {
    try {
      await changePasswordAPI({
        email: values.email,
        newPassword: values.newPassword,
        code: values.code,
      });
      message.success('Password changed successfully! Redirecting to login...');
      navigate('/dashboard/login');
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className='P-password-reset'>
      <div className='back-wrapper'>
        <LeftOutlined className='back' style={{ fontSize: 24 }} onClick={() => navigate('/dashboard')} />
      </div>
      <div className='password-reset-page-wrapper'>
        <div className='title-wrapper'>
          <Title level={1} className='title'>Reset Password</Title>
        </div>
        <div className='content-wrapper'>
          <Form
            form={form} // 绑定表单实例
            className='password-reset-form'
            name='reset'
            layout='vertical'
            onFinish={onFinish}
          >

            <Form.Item className='reset-input-item'
              name="email"
              label="Email"
              rules={[{ type: "email", message: "Please enter a valid email." }]}
            >
              <Input
                size="large"
                className="input-item"
                placeholder="e.g. example@gmail.com"
              />
            </Form.Item>

            <Form.Item className='reset-input-item'
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: "Password is required." },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: "At least 8 characters, including letters and numbers.",
                },
              ]}
            >
              <Input.Password
                size="large"
                className="input-item"
                placeholder="At least 8 characters, including letters and numbers."
              />
            </Form.Item>

            <Form.Item className='reset-input-item'
              name="confirmPassword"
              label="Re-enter New Password"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm your password." },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Please enter the same password."));
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                className="input-item"
                placeholder="Re-enter your new password."
              />
            </Form.Item>

            <div className='btn-wrapper'>
              <Form.Item >
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
                  <Button className='change-password-btn' size='large' htmlType='submit'>
                    Change Password
                  </Button>
                </ConfigProvider>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
