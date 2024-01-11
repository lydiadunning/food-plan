import { useForm } from "react-hook-form"
import { useState } from "react"
// import { useCreateAccount } from "../../serverStore/mutations"
import { handleCreateAccount } from "./userHooks"
import Error from "../Error"

const CreateUserAccount = ({ setShowCreateAccount }) => {
  const [ errorMessage, setErrorMessage ] = useState(null)

  const {register, handleSubmit} = useForm()
  console.log('CREATE USER ACCOUNT')

  // const createAccount = useCreateAccount()

  const onSubmit = async (data) => {
    console.log('Submit data', data)
    const created = await handleCreateAccount(data)
    console.log(created)
    if (created) {
      setShowCreateAccount(false)
    } else {
      setErrorMessage('Account creation failed')
    }
  }

  return (
    <>
      <h1>Create a new user account </h1>
      {errorMessage && <Error message={errorMessage}/>}
      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor='username'>username</label>
        <input id='username' type='text' required {...register('username')} />
        <label htmlFor='name'>name</label>
        <input id='name' type='text' required {...register('name')} />
        <label htmlFor='email'>email</label>
        <input id='email' type='text' required {...register('email')}></input>
        <label htmlFor='password'>password</label>
        <input id='password' type='text' required {...register('password')}></input>
        <button type='submit'>submit</button>
      </form>
    </>
  )
}

export default CreateUserAccount