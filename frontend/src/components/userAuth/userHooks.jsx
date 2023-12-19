
export const checkForLogin = () => {
  const foodUserJSON = window.localStorage.getItem('foodUser')
  if (foodUserJSON) {
    const user = JSON.parse(foodUserJSON)
    return user
  }
}

export const handleLogin = (userData) => {
  window.localStorage.setItem('foodUser', JSON.stringify(userData))
}

export const getUserConfig = () => {
  const user = checkForLogin()
  const auth = `Bearer ${user.token}`
  console.log({auth})
  return user ? {
    headers: { Authorization: auth }
  } : null
}