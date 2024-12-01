import { Button, Input } from "antd"
import imgLogo from './logo.png'
import './login.styl'
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const onLogin = () => {
    navigate('/home')
  }

  return (
    <div className="P-login">
      <img src={imgLogo} alt="" className="ogo" />
      <div className="ipt-con">
        <Input placeholder="Account" />
      </div>
      <div className="ipt-con">
        <Input placeholder="Password" />
      </div>
      <div className="ipt-con">
        <Button type="primary" block={true} onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login