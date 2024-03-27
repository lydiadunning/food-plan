import './App.css'
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useKids } from './serverStore/queries'
import TopBar from './components/TopBar.jsx'
import { Container } from '@radix-ui/themes'
import AddKid from './kidComponents/AddKid.jsx'
import { KidList } from './kidComponents/KidList'
import { LoginForm } from './userComponents/LoginForm.jsx'
import { checkForLogin } from './userComponents/userAuthHooks.jsx'
import MessageToast from './components/Toast.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import UserData from './userComponents/UserData.jsx'

function App() {
  const [message, setMessage] = useState(null)

  // react-query used here. Comments stay until I'm more familiar with using the technology.
  // using react-query and axios to simplify state management for values retrieved from the server.
  // gets result of query with useKids
  // delay loading kids until after a user is signed in.
  const { isLoading, error, data } = useKids()

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  // after getting the data and confirming it has loaded without errors, use the data.
  const kids = data.data
  // end of react-query behavior

  console.log({message})

  const makeMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    },
    10000)
  }

  return (
    <Container
      style={{ backgroundColor: 'var(--sand-3)'}}
      size='1'
      className='app'
      py='1'
      px='1'
    >
      <TopBar />

      <Routes>
        <Route
          path='/'
          element={
            checkForLogin() ? (
              <Navigate to='/kidlist' replace={true} />
            ) : (
              <Navigate to='/login' replace={true} />
            )
          }
        />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/addkid' element={<AddKid />} />
        <Route
          path='/kidlist'
          element={<KidList kidData={kids} makeMessage={makeMessage} />}
        />
        <Route path='/userdata' element={<UserData kidData={kids} />} />
        <Route path='/404' element={<PageNotFound />} />
        <Route path='*' element={<Navigate to='/404' replace={true} />} />
      </Routes>
    {message && <MessageToast message={message} />}
    </Container>
  )
}

export default App
