/* global chrome */
import { request } from '@/utils'

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