/* global chrome */

import { apiFetch } from '@/apis/apiConfig.jsx'

const API_DOMAIN = 'http://localhost:5050/'

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
    return new Promise((resolve, reject) => {
      config.url = API_DOMAIN + 'api/login/'
      config.method = 'post'
      config.success = (res) => {
        resolve(res)
      }
      apiFetch(config)
    })
  },
  // Login with Google account
  signInByGoggle: (config) => {
    return new Promise((resolve, reject) => {
      config.url = API_DOMAIN + 'auth/google/'
      config.method = 'get'
      apiFetch(config)
    })
  },
  // Login with Google account
  signInByGithub: (config) => {
    return new Promise((resolve, reject) => {
      config.url = API_DOMAIN + 'auth/github/'
      config.method = 'get'
      apiFetch(config)
    })
  },
  // Signup
  signUp: (config) => {
    return new Promise((resolve, reject) => {
      config.url = API_DOMAIN + 'api/register/'
      config.method = 'post'
      config.success = (res) => {
        resolve(res)
      }
      apiFetch(config)
    })
  },
  // Get data
  getHiesory: (config) => {
    return new Promise((resolve, reject) => {
      config.url = API_DOMAIN + 'api/getHistory/'
      config.method = 'get'
      apiFetch(config)
    })
  },
  // Detect text
  detect: (config) => {
    return new Promise((resolve, reject) => {
      config.url = API_DOMAIN + 'api/detectText/'
      config.method = 'post'

      config.success = (res) => {
        resolve(res)
      }
      apiFetch(config)
    })
  }
}