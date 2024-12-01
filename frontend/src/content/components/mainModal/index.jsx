import { useState } from "react";
import { Button, Input, Modal } from "antd";
import './mainModal.styl'

function MainModal(props) {
  const [text, setText] = useState(null)

  const { onClose } = props

  const handleIptChange = (e) => {
    setText(e.target.value)
  }

  return (
    <Modal
      className="CRX-mainModal"
      open={true}
      title="CRX-Chatbox"
      footer="null"
      makeClosable={false}
      onCancel={() => {
        onClose && onClose()
      }}
      width={600}
    >
      <div className="main-content-con">
        <div className="item-con">
          <Input
            placeholder="Type here"
            value={text}
            onChange={handleIptChange}
          />
        </div>
        <div>
          <Button type="primary" block>
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default MainModal