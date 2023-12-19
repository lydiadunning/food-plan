import { useForm } from "react-hook-form"
import { useCreateAccount } from "../../serverStore/mutations"

const CreateUserAccount = () => {
  const {register, handleSubmit} = useForm()

  
  const createAccount = useCreateAccount()

  const onSubmit = (data) => {
    createAccount.mutate(data)
    console.log('data', data)
  }

  return (
    <>
      <h1>Create a new user account </h1>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor='username'>username</label>
        <input id='username' type='text' required {...register('username')} />
        <label htmlFor='name'>name</label>
        <input id='name' type='text' required {...register('name')} />
        <label htmlFor='email'>email</label>
        <input id='email' type='text' {...register('email')}></input>
        <label htmlFor='password'>password</label>
        <input id='password' type='text' {...register('password')}></input>
        <button type='submit'>submit</button>
      </form>
      <button onClick={ createAccount }>Back</button>
    </>
  )
}

export default CreateUserAccount