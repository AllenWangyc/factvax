import '@/mock'
/* global chrome */

// address of required server (mock address in dev env)
let API_DOMAIN = '/api/'

if (import.meta.env.MODE === 'production') {
  API_DOMAIN = 'http://localhost/api/'
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
}

function apiFetch(config) {
  if (config.background && import.meta.env.MODE === 'production') {
    sendRequestToBackground(config)
  }
  else {
    apiRequest(config)
  }
}


function apiRequest(config) {
  // config.data's default value is {}
  if (config.data === undefined) {
    config.data = {}
  }

  config.method = config.method || 'post'

  let headers = {}
  let data = null

  if (config.formData) {
    // Compatibility processing 
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

function sendRequestToBackground(config) {
  if (chorme && chrome.runtime) {
    chrome.runtime.sendMessage(
      {
        contentRequest: 'apiRequest',
        config: config,
      },
      (result) => {
        config.done && config.done()
        if (result.result === 'succ') {
          config.success && config.success(result)
        }
        else {
          config.fail && config.fail(result.msg)
        }
      }
    )
  }
  else {
    console.log('Cannot find out chrome API')
  }
}