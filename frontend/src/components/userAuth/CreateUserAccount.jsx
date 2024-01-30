import { useForm } from "react-hook-form"
import { useState } from "react"
// import { useCreateAccount } from "../../serverStore/mutations"
import { handleCreateAccount } from "./userHooks"
import Error from "../Error"
import * as Form from '@radix-ui/react-form';
import { Button, Heading, Flex } from '@radix-ui/themes'
import { inputStyle } from "../../assets/styles";

const CreateUserAccount = ({ setShowCreateAccount }) => {
  const [ errorMessage, setErrorMessage ] = useState(null)

  const {register, handleSubmit} = useForm()

  // const createAccount = useCreateAccount()

  const formStyle = { 
    display: 'flex', 
    alignItems: 'baseline', 
    justifyContent: 'space-between' 
  }

  const onSubmit = async (data) => {
    const created = await handleCreateAccount(data)
    if (created) {
      setShowCreateAccount(false)
    } else {
      setErrorMessage('Account creation failed')
    }
  }

  return (
    <>
      <Heading>Create a new account: </Heading>
      {errorMessage && <Error message={errorMessage}/>}
      <Form.Root onSubmit={handleSubmit(onSubmit)} className='center'>
        <Flex direction='column' gap='3' pt='3' align='start'>
          <Form.Field>
            <div style={formStyle}>
              <Form.Label>username: </Form.Label>
              <Form.Message className='form-message' match="valueMissing">
                Please enter your username
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input type='text' required {...register('username')} style={inputStyle} />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <div style={formStyle}>
              <Form.Label>name: </Form.Label>
              <Form.Message className='form-message' match="valueMissing">
                Please enter your name
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input type='text' required {...register('name')} style={inputStyle}/>
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <div style={formStyle}>
              <Form.Label>email: </Form.Label>
              <Form.Message className='form-message' match="valueMissing">
                Please enter your email
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input type='text' required {...register('email')}style={inputStyle}></input>
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <div style={formStyle}>
              <Form.Label>password: </Form.Label>
              <Form.Message className='form-message' match="valueMissing">
                Please enter your password
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input  type='text' required {...register('password')} style={inputStyle}></input>
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <Button size='3' type='submit'>submit</Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
     </>
  )
}

export default CreateUserAccount