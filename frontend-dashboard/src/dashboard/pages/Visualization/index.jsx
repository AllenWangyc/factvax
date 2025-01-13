import { Button } from "antd"
import { parseJsonCookies } from "@/utils"

const visualization = () => {
  const onClick = () => {
    console.log(parseJsonCookies('userInfo'))
  }
  return (
    <div>
      This is visualization page
      <Button onClick={onClick}>
        Click me
      </Button>
    </div>
  )
}

export default visualization