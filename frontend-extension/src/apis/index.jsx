/* global chrome */

import { apiFetch } from '@/apis/apiConfig.jsx'

// const API_DOMAIN = 'http://localhost:5050/'
const API_DOMAIN = 'https://fact-vax-app-e8d263b7267d.herokuapp.com/'

export const API_CODE = {
  // API success, data success
  OK: 200,
  // API success, data exception
  ERR_DATA: 403,
  // API success, data <empty></empty>
  ERR_NO_DATA: 301,
  // API success, login exception
  ERR_LOGOUT: 401
}

// Report content of API request error
export const API_FAILED = 'There is something wrong with net connection, please try again later.'

// API integration
export const apiReqs = {
  // Detect text
  detect: (config) => {
    return new Promise((resolve, reject) => {
      config.url = API_DOMAIN + 'api/detect_text/default/'
      config.method = 'post'
      config.success = (res) => {
        resolve(res)
      }
      apiFetch(config)
    })
  },
  getTokenByDeviceId: (config) => {
    console.log('The API url is: ' + API_DOMAIN + `api/user/device?deviceId=${config.deviceId}`)

    return new Promise((resolve, reject) => {
      config.url = API_DOMAIN + `api/user/device?deviceId=${config.deviceId}`
      config.method = 'get'
      config.success = (res) => {
        resolve(res)
      }
      apiFetch(config)
    })
  }
}
