import { useState } from 'react'
import { useForm } from "react-hook-form"
import CreateUserAccount from './CreateUserAccount'


export function Login({ closeLogin }) {
const { register, handleSubmit } = useForm()
const { showCreateAccount, setShowCreateAccount } = useState(false)

const onSubmit = (data) => {
  //login
  console.log('data', data)
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
      </form>
      <button onClick={ () => setShowCreateAccount(!showCreateAccount)}>{showCreateAccount ? 'close create account' : 'create account'}</button>
      { showCreateAccount && <CreateUserAccount/> }
      <button onClick={ closeLogin }>Back</button>

    </>
  )
}


