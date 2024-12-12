export function apiFetch(config) {
  apiRequest(config)
}

/**
 * API request encapsulation
 * config.method: [must] request method
 * config.url: [must] request url
 * config.data: request data
 * config.formData: true/false
 * config.success(res): callback for request successed
 * config.fail(err): callback for request filed
 * config.done(): callback for request done
 */
function apiRequest(config) {
  // config.data's default value is {}
  if (config.data === undefined) {
    config.data = {}
  }

  config.method = config.method || 'post'

  let headers = {}
  let data = null

  if (config.formData) {
    // Compatibility process
    data = new FormData()
    Object.keys(config.data).forEach(function (key) {
      data.append(key, config.data([key]))
    })
  }
  else {
    headers['Content-Type'] = 'application/json;charset=UTF-8'
    data = JSON.stringify(config.data)
  }

  let axiosConfig = {
    method: config.method,
    headers,
    body: data,
  }

  fetch(config.url, axiosConfig)
    .then((res) => res.json())
    .then((result) => {
      config.done && config.done()
      config.success && config.success(result)
    })
    .catch(() => {
      config.done && config.done()
      config.fail && config.fail(API_FAILED)
    })
}