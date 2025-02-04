/* global chrome */
import { request } from '@/utils'

// Fetch all history records
export function historyFetchAPI() {
  return request({
    url: `/api/history/user_history`,
    method: 'GET'
  })
}

// Register
export function signUpAPI(data) {
  return request({
    url: '/api/user/register/',
    method: 'POST',
    data: data
  })
}

// Login
export function loginAPI(formData) {
  return request({
    url: '/api/user/login/',
    method: 'POST',
    data: formData
  })
}

// Login by google third party
export function loginByGoogleAPI() {
  return request({
    url: '/api/auth/google',
    method: 'GET'
  })
}

// Login by github third party
export function loginByGithubAPI() {
  return request({
    url: '/api/auth/github',
    method: 'GET'
  })
}

// Detect misinformation on dashboard
export function detectAPI(data) {
  return request({
    url: '/api/detect_text/',
    method: 'POST',
    data: data
  })
}

// Delete a particular record with record id
export function deleteRecordAPI(id) {
  return request({
    url: `/api/history/delete_record/${id}`,
    method: 'DELETE',
  })
}

// Get a particular record with record id
export function historyFetchByIDAPI(id) {
  return request({
    url: `/api/history/record/${id}`,
    method: 'GET',
  })
}

// Filter records by searching text
export function filterRecordsByText(text) {
  return request({
    url: `/api/history/text_search?text=${text}`,
    method: 'GET'
  })
}

// Filter records by multi conditions (dates, source, result)
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

// Logout
export function logoutAPI() {
  return request({
    url: `/api/user/logout`,
    method: 'GET'
  })
}

export function userPlatformMisinfoRatioFetchByIDAPI() {
  return request({
    url: `/api/history/platform_data`,
    method: 'GET',
  })
}

export function userVaccineMisinfoRatioFetchByIDAPI() {
  return request({
    url: `/api/history/vax_times`,
    method: 'GET',
  })
}

export function userMisinfoRatioInDaysFetchByIDAPI() {
  return request({
    url: `/api/history/misinfo_rate_day`,
    method: 'GET',
  })
}

export function getTokenByDeviceIdAPI(device_id) {
  return request({
    url: `/api/user/addId?deviceId=${device_id}`,
    method: 'GET'
  })
}

export function emailVerifyAPI(formData) {
  return request({
    url: '/api/user/verify/',
    method: 'POST',
    data: formData
  })
}


export function emailVerifyPasswordAPI(formData) {
  return request({
    url: '/api/user/code/',
    method: 'POST',
    data: formData
  })
}

// Change Password 
export function changePasswordAPI(data) {
  return request({
    url: '/api/user/change/',
    method: 'POST',
    data: data
  })
}

export function userMisinfoRatioFetchByIDAPI() {
  return request({
    url: `/api/history/misinfo`,
    method: 'GET',
  });
}

export function userVaccineCheckNumFetchByIDAPI() {
  return request({
    url: `/api/history/total_num`,
    method: 'GET',
  });
}

export function userVaccineMisinfoNumFetchByIDAPI() {
  return request({
    url: `/api/history/total_misinfo`,
    method: 'GET',
  });
}

export function userVaccineDataSourceFetchByIDAPI() {
  return request({
    url: `/api/history/data_source`,
    method: 'GET',
  });
}

export function globalMisinfoRatioFetchAPI() {
  return request({
    url: `/api/history_g/misinfo`,
    method: 'GET',
  });
}

export function globalPlatformMisinfoRatioFetchAPI() {
  return request({
    url: `/api/history_g/platform_data`,
    method: 'GET',
  });
}

export function globalVaccineMisinfoRatioFetchAPI() {
  return request({
    url: `/api/history_g/vax_times`,
    method: 'GET',
  });
}

export function globalVaccineCheckNumFetchAPI() {
  return request({
    url: `/api/history_g/total_num`,
    method: 'GET',
  });
}

export function globalVaccineMisinfoNumFetchAPI() {
  return request({
    url: `/api/history_g/total_misinfo`,
    method: 'GET',
  });
}

export function globalVaccineDataSourceFetchAPI() {
  return request({
    url: `/api/history_g/data_source`,
    method: 'GET',
  });
}

export function globalMisinfoRatioInDaysFetchAPI() {
  return request({
    url: `/api/history_g/misinfo_rate_day`,
    method: 'GET',
  });
}
