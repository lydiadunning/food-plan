import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CreateUserAccount from './CreateUserAccount'
import { useLoginAccount } from '../serverStore/mutations'
import Error from '../components/Error'
import * as Form from '@radix-ui/react-form'
import { Button, Card, Flex, Box } from '@radix-ui/themes'
import { inputStyle } from '../assets/styles'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const loginAccount = useLoginAccount(
    () => navigate('/kidlist'),
    () => setErrorMessage('Login unsuccessful')
  )

  const onSubmit = async (data) => {
    loginAccount.mutate(data)
  }

  return (
    <>
      <Card>
        Log in with a demo account: <br /> username: Example, password: example
      </Card>
      <Card>
        {showCreateAccount ? (
          <Box p='6'>
            <CreateUserAccount
              setShowCreateAccount={setShowCreateAccount}
              setErrorMessage={setErrorMessage}
            />
          </Box>
        ) : (
          <Box p='6'>
            <Form.Root
              onSubmit={handleSubmit(onSubmit)}
              className={'container-v'}
            >
              <Flex direction='column' gap='3' align='start'>
                <Form.Field>
                  <Flex direction='column' justify='between'>
                    <Form.Label>username: </Form.Label>
                    <Form.Message className='form-message' match='valueMissing'>
                      Please enter your username
                    </Form.Message>
                  </Flex>
                  <Form.Control asChild>
                    <input
                      type='text'
                      required
                      {...register('username')}
                      style={inputStyle}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Flex direction='column' justify='between'>
                    <Form.Label>password: </Form.Label>
                    <Form.Message className='form-message' match='valueMissing'>
                      Please enter your password
                    </Form.Message>
                  </Flex>
                  <Form.Control asChild>
                    <input
                      type='text'
                      required
                      {...register('password')}
                      style={inputStyle}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                  <Button mt='2' size='3' type='submit'>
                    submit
                  </Button>
                </Form.Submit>
              </Flex>
            </Form.Root>
            {errorMessage && <Error message={errorMessage} />}
          </Box>
        )}
      </Card>
      <Flex justify='center' p='4'>
        <Button
          size='3'
          onClick={() => setShowCreateAccount(!showCreateAccount)}
        >
          {showCreateAccount ? 'log in' : 'create account'}
        </Button>
      </Flex>
    </>
  )
}
