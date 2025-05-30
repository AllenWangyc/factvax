import ReactDOM from 'react-dom/client'
import DetectionPanel from '@/content/components/DetectionPanel'
import store from '@/store'
import { Provider } from 'react-redux'

export function createPanel(text) {
  const popupContainer = document.createElement('div')
  popupContainer.id = 'popup-container'

  // Append this element to the end of document
  document.body.appendChild(popupContainer)

  const reactPopupContainer = ReactDOM.createRoot(popupContainer)
  reactPopupContainer.render(
    <Provider store={store}>
      <DetectionPanel
        text={text}
        onClose={() => {
          // Unmount the ReactDOM and remove container when click button
          reactPopupContainer.unmount() // Unmount component
          popupContainer.remove() // Remove container
        }}
      />
    </Provider>

  )
}