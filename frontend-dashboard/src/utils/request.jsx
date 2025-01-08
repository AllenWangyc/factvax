import axios from 'axios'
import router from '@/router'
import { getToken, removeToken } from '@/utils/token'

/**
 * axois encapsulation
 * 1. base url
 * 2. timeout
 * 3. request
 **/

// const request = axios.create({
//   baseURL: 'http://localhost:5050',
//   timeout: 5000
// })

const request = axios.create({
  baseURL: 'https://fact-vax-app-e8d263b7267d.herokuapp.com',
  withCredentials: true,
  timeout: 60000, // 60s
})

// Add some parameters before send a request
request.interceptors.request.use((config) => {
  // Inject token to request header
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Intercept response bofore return to client side, handle with response data
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  console.dir(error)
  if (error.response.status === 401) {
    removeToken()
    router.navigate('/dashboard/login')
    window.location.reload()
  }
  return Promise.reject(error)
})

export { request }