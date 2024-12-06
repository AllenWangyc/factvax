// import '@/mock'
/* global chrome */

// address of required server (mock address in dev env)
let API_DOMAIN = '/api/'

if (import.meta.env.MODE === 'production') {
  API_DOMAIN = 'http://localhost:5050/api/'
}

export const API_CODE = {
  // API success, data success
  OK: 200,
  // API success, data exception
  ERR_DATA: 403,
  // API success, data empty
  ERR_NO_DATA: 301,
  // API success, login exception
  ERR_LOGOUT: 401
}

// Report content of API request error
export const API_FAILED = 'There is something wrong with net connection, please try again later.'

// API integration
export const apiReqs = {
  // Login
  signIn: (config) => {
    config.url = API_DOMAIN + 'login/'
    config.method = 'post'
    apiFetch(config)
  },
  // Get data
  getData: (config) => {
    config.url = API_DOMAIN + 'getData/'
    config.method = 'get'
    apiFetch(config)
  },
  // Detect text
  detect: (config) => {
    config.url = API_DOMAIN + 'detectText/'
    config.method = 'post'

    createPopup()
    config.success = (res) => {
      const popupTitle = document.getElementById("popup-title")
      popupTitle.innerText = 'FactVax Detection:'
      const popupContent = document.getElementById("popup-content")
      popupContent.innerHTML = `
        <div id="result">Detection result: Credible</div>
        <div id="detection-text">Detection text: ${res.detectedText}</div>`
    }

    apiFetch(config)
  }
}

function apiFetch(config) {
  apiRequest(config)
}

/**
 * API request encapsulation
 * config.method: [must] request method
 * config.url: [must] request url
 * config.data: request data
 * config.formData: true/false
 * config.success(res): callback for request successed
 * config.fail(err): callback for request filed
 * config.done(): callback for request done
 */
function apiRequest(config) {
  // config.data's default value is {}
  if (config.data === undefined) {
    config.data = {}
  }

  config.method = config.method || 'post'

  let headers = {}
  let data = null

  if (config.formData) {
    // Compatibility process
    data = new FormData()
    Object.keys(config.data).forEach(function (key) {
      data.append(key, config.data([key]))
    })
  }
  else {
    headers['Content-Type'] = 'application/json;charset=UTF-8'
    data = JSON.stringify(config.data)
  }

  let axiosConfig = {
    method: config.method,
    headers,
    body: data,
  }

  fetch(config.url, axiosConfig)
    .then((res) => res.json())
    .then((result) => {
      config.done && config.done()
      config.success && config.success(result)
    })
    .catch(() => {
      config.done && config.done()
      config.fail && config.fail(API_FAILED)
    })
}

function createPopup() {
  // Create popup DOM element in the content
  const popup = document.createElement("div")
  popup.id = "popup"
  popup.innerHTML = `
    <div id="poopup-title-wrapper"><h2 id="popup-title">Loading analysis...</h2></div>
    <div id="popup-content">Loading...</div>
    <button id="close-popup">Close</button>
  `
  document.body.appendChild(popup)
  // Close popup 
  document.getElementById("close-popup").onclick = () => {
    popup.remove()
  }
}