import { useState } from 'react'
import { useForm } from "react-hook-form"
import CreateUserAccount from './CreateUserAccount'
// import { useLoginAccount } from '../../serverStore/mutations'
import { handleLogin } from './userHooks'
import Error from '../Error'
import * as Form from '@radix-ui/react-form';
import * as Popover from '@radix-ui/react-popover';
import { Button } from '@radix-ui/themes'

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
      <Form.Root onSubmit={handleSubmit(onSubmit)} className={'container-v'}>
        <Form.Field>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label>username: </Form.Label>
            <Form.Message className='form-message' match="valueMissing">
              Please enter your username
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input id='username' type='text' required {...register('username')}/>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label>password: </Form.Label>
            <Form.Message className='form-message' match="valueMissing">
                Please enter your password
              </Form.Message>
            </div>
          <Form.Control asChild>
            <input id='password' type='text' required {...register('password')}/>
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button type='submit'>submit</Button>
        </Form.Submit>
      </Form.Root>
      {errorMessage && <Error message={errorMessage}/>}
      <Popover.Root open={showCreateAccount} onOpenChange={setShowCreateAccount}>
        <Popover.Trigger asChild>
          <Button>{showCreateAccount ? 'close create account' : 'create account'}</Button>
        </Popover.Trigger>
        <Popover.Content className='popover'>
          <CreateUserAccount setShowCreateAccount={setShowCreateAccount} setErrorMessage={setErrorMessage}  />
          <Popover.Close>x</Popover.Close>
          <Popover.Arrow className='popover-arrow'/>
        </Popover.Content>
      </Popover.Root>


    </>
  )
}


