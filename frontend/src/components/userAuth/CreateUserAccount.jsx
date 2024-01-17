import { useForm } from "react-hook-form"
import { useState } from "react"
// import { useCreateAccount } from "../../serverStore/mutations"
import { handleCreateAccount } from "./userHooks"
import Error from "../Error"
import * as Form from '@radix-ui/react-form';
import { Button, Heading } from '@radix-ui/themes'


const CreateUserAccount = ({ setShowCreateAccount }) => {
  const [ errorMessage, setErrorMessage ] = useState(null)

  const {register, handleSubmit} = useForm()
  console.log('CREATE USER ACCOUNT')

  // const createAccount = useCreateAccount()

  const inputStyle = { 
    display: 'flex', 
    alignItems: 'baseline', 
    justifyContent: 'space-between' 
  }

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
      <Heading>Create a new user account </Heading>
      {errorMessage && <Error message={errorMessage}/>}
      {/* <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor='username'>username</label>
        <input id='username' type='text' required {...register('username')} />
        <label htmlFor='name'>name</label>
        <input id='name' type='text' required {...register('name')} />
        <label htmlFor='email'>email</label>
        <input id='email' type='text' required {...register('email')}></input>
        <label htmlFor='password'>password</label>
        <input id='password' type='text' required {...register('password')}></input>
        <Button type='submit'>submit</Button>
      </form> */}
      <Form.Root onSubmit={handleSubmit(onSubmit)} className='center'>
        <Form.Field>
          <div style={inputStyle}>
            <Form.Label>username: </Form.Label>
            <Form.Message className='form-message' match="valueMissing">
              Please enter your username
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input id='username' type='text' required {...register('username')} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <div style={inputStyle}>
            <Form.Label>name: </Form.Label>
            <Form.Message className='form-message' match="valueMissing">
              Please enter your name
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input id='name' type='text' required {...register('name')} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <div style={inputStyle}>
            <Form.Label>email: </Form.Label>
            <Form.Message className='form-message' match="valueMissing">
              Please enter your email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input id='email' type='text' required {...register('email')}></input>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <div style={inputStyle}>
            <Form.Label>password: </Form.Label>
            <Form.Message className='form-message' match="valueMissing">
              Please enter your password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input id='password' type='text' required {...register('password')}></input>
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button type='submit'>submit</Button>
        </Form.Submit>
      </Form.Root>
    </>
  )
}

export default CreateUserAccount