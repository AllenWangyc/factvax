const ID = 'device_id'

const setDeviceId = (deviceId) => {
  localStorage.setItem(ID, deviceId)
}

const getDeviceId = () => {
  return localStorage.getItem(ID)
}

const removeDeviceId = () => {
  localStorage.removeItem(ID)
}

export {
  setDeviceId,
  getDeviceId,
  removeDeviceId
}