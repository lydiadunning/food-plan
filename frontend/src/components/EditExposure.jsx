import { useUpdateExposure } from "../serverStore/mutations"
import { useForm } from "react-hook-form"
import { Button, Flex, Heading } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form';

const EditExposure = ({ kid, exposure, closeEditExposure }) => {
  const {register, handleSubmit} = useForm({
    defaultValues: {
      food: exposure.food,
      description: exposure.description,
      outcomes: exposure.outcomes,
      meal: exposure.meal,
      date: exposure.date.slice(0, 10)
    }
  })
  
  const updateExposure = useUpdateExposure(kid.id, exposure.id)

  const onSubmit = (data) => {
    updateExposure.mutate(data)
    closeEditExposure()
  }

  const formArray = kid.outcomeOptions.map(option => <label key={option.id} htmlFor={option.outcome}>{ option.outcome } <input type='checkbox' name='outcome' value={option.outcome} {...register('outcomes')}/></label>)

  return (
    <>
      <Flex justify='between'>
        <Heading>Edit Exposure</Heading>
      </Flex>
      <Form.Root onSubmit={ handleSubmit(onSubmit) }>
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
                <input id='date' type='date' {...register("date", { valueAsDate: true })} ></input>
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

export default EditExposure