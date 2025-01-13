import { Button } from "antd"

const visualization = () => {
  const onClick = () => {
    console.log(import.meta.env.VITE_BACKEND_PRODUCT_ENV)
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