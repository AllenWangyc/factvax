/* global chrome */

import { apiFetch } from '@/apis/apiConfig.jsx'
import { request } from '@/utils'

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
}

export function historyFetchAPI() {
  return request({
    url: `/api/history/user_history`,
    method: 'GET'
  })
}

export function signUpAPI(formData) {
  return request({
    url: '/api/user/register/',
    method: 'POST',
    data: formData
  })
}

export function loginAPI(formData) {
  return request({
    url: '/api/user/login/',
    method: 'POST',
    data: formData
  })
}

export function loginByGoogleAPI() {
  return request({
    url: '/api/auth/google',
    method: 'GET'
  })
}

export function detectAPI(data) {
  return request({
    url: '/api/detect_text/',
    method: 'POST',
    data: data
  })
}

export function deleteRecordAPI(id) {
  return request({
    url: `/api/history/delete_record/${id}`,
    method: 'DELETE',
  })
}

export function historyFetchByIDAPI(id) {
  return request({
    url: `/api/history/record/${id}`,
    method: 'GET',
  })
}

export function filterRecordsByText(text) {
  return request({
    url: `/api/history/text_search?text=${text}`,
    method: 'GET'
  })
}

export function filterRecordsByMultiCons(filterForm) {
  const { dates, source, result } = filterForm
  const params = []

  if (dates && dates[0] !== '' && dates[1] !== '')
    params.push(`date=${dates[0]},${dates[1]}`)

  if (source)
    params.push(`source=${source}`)

  if (result)
    params.push(`result=${result}`)

  return request({
    url: `/api/history/filter?${params.join('&')}`,
    method: 'GET'
  })
}

export function logoutAPI() {
  return request({
    url: ``,
    method: 'GET'
  })
}