import axios from 'axios'
export const checkForLogin = () => {
  const foodUserJSON = window.localStorage.getItem('foodUser')
  if (foodUserJSON) {
    const user = JSON.parse(foodUserJSON)
    return user
  }
  return null
}

export const browserLogin = (userData) => {
  window.localStorage.setItem('foodUser', JSON.stringify(userData))
}

export const browserLogout = () => {
  window.localStorage.clear()
}

export const getUserConfig = () => {
  const user = checkForLogin()
  console.log({ user })

  return user
    ? {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    : null
}

export const handleLogin = async (credentials) => {
  try {
    const loggedInUser = await axios.post(
      'http://localhost:2002/api/login/',
      credentials
    )
    browserLogin(loggedInUser.data)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const handleCreateAccount = async (user) => {
  try {
    const response = await axios.post('http://localhost:2002/api/user/', user)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
