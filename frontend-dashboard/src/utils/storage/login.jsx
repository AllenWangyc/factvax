const LOGIN = 'login'

const setLogin = (login) => {
  localStorage.setItem(LOGIN, login)
}

const getLogin = () => {
  return localStorage.getItem(LOGIN)
}

const removeLogin = () => {
  localStorage.removeItem(LOGIN)
}

export {
  setLogin,
  getLogin,
  removeLogin
}