const COLORSEED = 'color seed'

const setColorSeed = (colorSeed) => {
  localStorage.setItem(COLORSEED, colorSeed)
}

const getColorSeed = () => {
  return localStorage.getItem(COLORSEED)
}

const removeColorSeed = () => {
  localStorage.removeItem(COLORSEED)
}

export {
  setColorSeed,
  getColorSeed,
  removeColorSeed
}