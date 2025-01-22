import { setDeviceId, getDeviceId, removeDeviceId } from './storage/device_id'
import { request } from './request'
import { parseJsonCookies } from './cookie'
import { generateDeviceId } from './deviceId'

export {
  setDeviceId, getDeviceId, removeDeviceId,
  request,
  parseJsonCookies,
  generateDeviceId
}