import ReactDOM from 'react-dom/client'
import './content.styl'
import { useState } from 'react'
import MainModal from './components/mainModal'


function Content() {
  const [mainModalVisible, setMainModalVisible] = useState(false)
  return (
    <div className='CRX-factvax-content'>
      <div
        className="content-entry"
        onClick={() => {
          setMainModalVisible(true)
        }}
      ></div>
      {mainModalVisible ? (
        <MainModal
          onClose={() => {
            setMainModalVisible(false)
          }}
        />
      ) : null}
    </div>
  )
}

// Create div dom whose id is CRX-container
const app = document.createElement('div')
app.id = 'CRX-container'
// Insert this div into the bottom of body
document.body.appendChild(app)
// Insert ReactDOM into this div
const crxContainer = ReactDOM.createRoot(document.getElementById('CRX-container'))
crxContainer.render(<Content />)