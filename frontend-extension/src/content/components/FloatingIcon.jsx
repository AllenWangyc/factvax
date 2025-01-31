import './FloatingIcon.styl'
import { createPanel } from '@/content/utils'

let cachedSelectedText = ''
let isFloatingIconEnabled = true

// Create floating-icon component
const floatingIcon = document.createElement('div')
floatingIcon.id = 'floating-icon'
floatingIcon.style.backgroundImage = `url(${chrome.runtime.getURL('images/vaccine_icon.png')})`
document.body.appendChild(floatingIcon)

// Listen to the event selecting text
document.addEventListener('mouseup', () => {
  if (!isFloatingIconEnabled)
    return // End execution when icon is unable

  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText) {
    cachedSelectedText = selectedText
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Set position of icon
    floatingIcon.style.top = `${window.scrollY + rect.top}px`;
    floatingIcon.style.left = `${window.scrollX + rect.right + 10}px`;
    floatingIcon.style.display = 'block';
  } else {
    // cachedSelectedText = ''
    floatingIcon.style.display = 'none'; // Hidden the icon
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "TOGGLE_CONTEXT_MENU") {
    console.log("Received message 'TOGGLE_CONTEXT_MENU'")
    isFloatingIconEnabled = message.enabled
    if (!isFloatingIconEnabled) {
      floatingIcon.style.display = 'none'
    }
  }
})

// Listen to the clicking event
floatingIcon.addEventListener('click', () => {

  if (cachedSelectedText) {
    createPanel(cachedSelectedText)
  }

  floatingIcon.style.display = 'none'; // Hidden the icon after clicking
});