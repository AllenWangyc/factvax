import { Button, Input } from "antd"
import { useState } from "react"
import { apiReqs } from "@/apis"
import imgLogo from './logo.png'
import './login.styl'
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => {
    apiReqs.signIn({
      data: {
        account,
        password,
      },
      success: (res) => {
        console.log(res)
        navigate('/home')
      },
      fail: (res) => {
        alert(res)
      }
    })
  }

  return (
    <div className="P-login">
      <img src={imgLogo} alt="" className="logo" />
      <div className="ipt-con">
        <Input placeholder="Account" value={account} onChange={(e) => { setAccount(e.target.value) }} />
      </div>
      <div className="ipt-con">
        <Input placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
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