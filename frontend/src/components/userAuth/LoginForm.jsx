import { useState } from 'react'
import { useForm } from "react-hook-form"
import CreateUserAccount from './CreateUserAccount'
// import { useLoginAccount } from '../../serverStore/mutations'
import { handleLogin } from './userHooks'
import Error from '../Error'
import * as Form from '@radix-ui/react-form';
import { Button, Card, Flex, Box } from '@radix-ui/themes'
import { inputStyle } from '../../assets/styles'

export function LoginForm({ handleGoTo }) {
  const [ showCreateAccount, setShowCreateAccount ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const { register, handleSubmit } = useForm()

// commenting out serverStore mutation solutions until I decide they're better than the approach I'm implementing here.
// one advantage is consistency with how other data is handled
// disadvantage is that increased abstraction makes the jwt login process more nebulous.
  // const loginAccount = useLoginAccount()

  const onSubmit = async (data) => {
    //login
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
      <Card>
        {showCreateAccount 
          ?
          <Box p='6'>
            <CreateUserAccount setShowCreateAccount={setShowCreateAccount} setErrorMessage={setErrorMessage}  />
          </Box>
          :
          <Box p='6'>        
            <Form.Root onSubmit={handleSubmit(onSubmit)} className={'container-v'}>
              <Flex direction='column' gap='3' align='start'>
                <Form.Field>
                  <Flex direction='column' justify='between'>
                    <Form.Label>username: </Form.Label>
                    <Form.Message className='form-message' match="valueMissing">
                      Please enter your username
                    </Form.Message>
                  </Flex>
                  <Form.Control asChild>
                    <input type='text' required {...register('username')} style={inputStyle}/>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Flex direction='column' justify='between'>
                    <Form.Label>password: </Form.Label>
                    <Form.Message className='form-message' match="valueMissing">
                        Please enter your password
                      </Form.Message>
                    </Flex>
                  <Form.Control asChild>
                    <input type='text' required {...register('password')} style={inputStyle}/>
                  </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                  <Button mt='2' size='3' type='submit'>submit</Button>
                </Form.Submit>
                </Flex>
            </Form.Root>
            {errorMessage && <Error message={errorMessage}/>}
          </Box>

        }
      </Card>
      <Flex justify='center' p='4'>
        <Button size='3' onClick={() => setShowCreateAccount(!showCreateAccount)}>{showCreateAccount ? 'log in' : 'create account'}</Button>
      </Flex>
    </>
  )
}


