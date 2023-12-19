import { useState } from 'react'
import { useForm } from "react-hook-form"
import CreateUserAccount from './CreateUserAccount'
import { useLoginAccount } from '../serverStore/mutations'


export function Login({ closeLogin }) {
  const [ showCreateAccount, setShowCreateAccount ] = useState(false)

  const { register, handleSubmit } = useForm()


  const loginAccount = useLoginAccount()

  const onSubmit = (data) => {
    //login
    const response = loginAccount.mutate(data)
    console.log('data', data)
    console.log(response)
    closeLogin()
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
      <button onClick={ () => setShowCreateAccount(!showCreateAccount)}>{showCreateAccount ? 'close create account' : 'create account'}</button>
      { showCreateAccount && <CreateUserAccount/> }
      <button onClick={ closeLogin }>Back</button>

    </>
  )
}


