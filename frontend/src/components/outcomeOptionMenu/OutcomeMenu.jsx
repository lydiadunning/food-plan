/* eslint-disable react/prop-types */
import { useState } from "react"
import OutcomeList from './OutcomeList'
import { Button, Card, Flex, Box } from '@radix-ui/themes'
import { useForm } from "react-hook-form"
import * as Form from '@radix-ui/react-form'

const OutcomeMenu = ({ outcomes, setOutcomes, showOutcomeHints = false }) => {

  // keycounter prevents duplication of keys in new outcomes
  const [ keyCounter, setKeyCounter] = useState(outcomes.length + 1) 

  const {register, handleSubmit} = useForm()

  const submitHandler = (data) => {
    const outcome = {
      outcome: data.outcome, 
      id: keyCounter
    }
    setOutcomes([...outcomes, outcome])
    setKeyCounter(keyCounter + 1)
  }

  return (
    <Card size='1' my='3'>
      <Box >
        <OutcomeList outcomes={outcomes} setOutcomes={setOutcomes} showOutcomeHints={showOutcomeHints} />
        
        <Form.Root onSubmit={ handleSubmit(submitHandler) }>
          <Flex mt='3' justify='between' align='center'>
            <Form.Field>
              <Form.Label>Add an outcome: </Form.Label>
              <Form.Control asChild>
                <input type='text' name='outcome' {...register('outcome')} required></input>
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <Button type='submit'>submit</Button>
            </Form.Submit>
          </Flex>
        </Form.Root>    
      </Box>
    </Card>
  )
}

export default OutcomeMenu