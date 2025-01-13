import { setToken, getToken, removeToken } from './storage/token'
import { setUsername, getUsername, removeUsername } from './storage/username'
import { setColorSeed, getColorSeed, removeColorSeed } from './storage/colorSeed'
import { setLogin, getLogin, removeLogin } from './storage/login'
import { request } from './request'
import { parseJsonCookies } from './cookie'

export {
  setLogin,
  getLogin,
  removeLogin,
  setToken,
  getToken,
  removeToken,
  setUsername,
  getUsername,
  removeUsername,
  setColorSeed,
  getColorSeed,
  removeColorSeed,
  request,
  parseJsonCookies,
}