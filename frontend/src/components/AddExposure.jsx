import { useCreateExposure } from "../serverStore/mutations"
import { useForm } from "react-hook-form"
import { Button, Heading, Flex } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form';

const AddExposure = ({ kid, handleGoBack }) => {
  const {register, handleSubmit} = useForm()

  const today = new Date().toISOString().substring(0, 10)
    
  const createExposure = useCreateExposure(kid.id)

  const submit = (data) => {
    createExposure.mutate(data)
    
    handleGoBack()
  }

  const formArray = kid.outcomeOptions.map(option => <label key={option.id} htmlFor={option.outcome}>{ option.outcome } <input type='checkbox' name='outcome' value={option.outcome} {...register('outcomes')}/></label>)

  return (
    <>
      <Flex justify='between'>
        <Heading>Add Intro</Heading>
        <Button onClick={ handleGoBack }>Back</Button>
      </Flex>
      <Form.Root onSubmit={ handleSubmit(submit) }>
        <Flex direction='column' gap='2' align='center'>
          <Form.Field>
            <Flex direction='column' justify='between'>
              <Form.Label>food</Form.Label>
              <Form.Control asChild>
                <input id='food' type='text' required {...register('food')} ></input>
              </Form.Control>
            </Flex>
          </Form.Field>
        
          <Form.Field>
            <Flex direction='column' justify='between'>
              <Form.Label>description</Form.Label>
              <Form.Control asChild>
                <input id='description' type='text' required {...register('description')} ></input>
              </Form.Control>
            </Flex>
          </Form.Field>
          
          What did {kid.name} do?
          {formArray}
          
          <Form.Field>
            <Flex direction='column' justify='between'>
              <Form.Label>meal</Form.Label>
              <Form.Control asChild>
                <input id='meal' type='text' {...register('meal')}></input>
              </Form.Control>
            </Flex>
          </Form.Field>
          
          <Form.Field>
            <Flex direction='column' justify='between'>
              <Form.Label>date</Form.Label>
              <Form.Control asChild>
                <input id='date' type='date' defaultValue={today} {...register("date", { valueAsDate: true })} ></input>
              </Form.Control>
            </Flex>
          </Form.Field>

          <Form.Submit asChild>
            <Button type='submit'>submit</Button>
          </Form.Submit>
        </Flex>
        
        

      </Form.Root>
      
    </>
  )
}

export default AddExposure