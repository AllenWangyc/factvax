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
  // login
  signIn: (config) => {
    config.url = API_DOMAIN + 'login/'
    config.method = 'post'
    apiFetch(config)
  }
}
