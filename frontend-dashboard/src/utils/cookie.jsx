function getCookieValue(name) {
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=')
    if (key === name) {
      return decodeURIComponent(value)
    }
  }
  return null
}

export function parseJsonCookies(name) {
  const value = getCookieValue(name)

  if (value) {
    try {
      return JSON.parse(value)
    }
    catch (error) {
      console.error("Failed to parse JSON cookie:", error)
    }
  }
  return null
}