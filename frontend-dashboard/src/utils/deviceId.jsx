export function generateDeviceId() {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function () {
    const device_id = (Math.random() * 16 | 0).toString(16)
    return device_id
  })
}
