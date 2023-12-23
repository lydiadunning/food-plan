import { useState } from 'react'
import { useForm } from "react-hook-form"
import CreateUserAccount from './CreateUserAccount'
// import { useLoginAccount } from '../../serverStore/mutations'
import { handleLogin } from './userHooks'
import Error from '../Error'


export function Login({ handleGoTo }) {
  const [ showCreateAccount, setShowCreateAccount ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const { register, handleSubmit } = useForm()

// commenting out serverStore mutation solutions until I decide they're better than the approach I'm implementing here.
// one advantage is consistency with how other data is handled
// disadvantage is that increased abstraction makes the jwt login process more nebulous.
  // const loginAccount = useLoginAccount()

  const onSubmit = async (data) => {
    //login
    console.log('data', data)
    const isLoggedIn = await handleLogin(data)
    // const something = loginAccount.mutate(data)
    if (isLoggedIn) {
      handleGoTo('kidList')
    } else {
      // display an error message saying the login credentials weren't accepted/ the user doesn't exist
      setErrorMessage('Login unsuccessful')
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>username: </label>
        <input id='username' type='text' required {...register('username')}></input>
        <label>password: </label>
        <input id='password' type='text' required {...register('password')}></input>
        <button type='submit'>submit</button>
      </form>
      {errorMessage && <Error message={errorMessage}/>}
      <button onClick={ () => setShowCreateAccount(!showCreateAccount)}>{showCreateAccount ? 'close create account' : 'create account'}</button>
      { showCreateAccount && <CreateUserAccount/> }
    </>
  )
}


