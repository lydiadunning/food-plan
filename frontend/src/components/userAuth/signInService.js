let token = ''

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const checkForLogin = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    setToken(user.token)
  }
}

const handleLogin = async (event) => {
  event.preventDefault()
  console.log('logging in with', username, password)

  try {
    const user = await loginService.login({
      username, password
    })

    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    setToken(user.token)
        
  } catch (exception) {
    setMessage({text: 'Wrong credentials', isError: true})
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
}

const handleLogout = (event) => {
  event.preventDefault()
  window.localStorage.removeItem('loggedUser')
  setUser(null)
  setMessage({text: `User logged out`, isError: false})
    setTimeout(() => {
      setMessage(null)
    }, 5000)  
}
