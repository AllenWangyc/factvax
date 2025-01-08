const USERNAME = 'username'

const setUsername = (username) => {
  localStorage.setItem(USERNAME, username)
}

const getUsername = () => {
  return localStorage.getItem(USERNAME)
}

const removeUsername = () => {
  localStorage.removeItem(USERNAME)
}

export {
  setUsername,
  getUsername,
  removeUsername
}