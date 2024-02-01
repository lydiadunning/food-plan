import { useUpdateExposure } from "../../serverStore/mutations"
import { useForm } from "react-hook-form"
import { Button, Flex, Heading, IconButton, Card } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form';
import { x } from "../../assets/svgImages";
import OutcomeOptionPicker from './OutcomeOptionPicker'

const EditExposure = ({ kid, exposure, closeEditExposure }) => {
  const {register, handleSubmit, watch} = useForm({
    defaultValues: {
      food: exposure.food,
      description: exposure.description,
      outcomes: exposure.outcomes,
      meal: exposure.meal,
      date: exposure.date?.slice(0, 10)
    }
  })
  
  const updateExposure = useUpdateExposure(kid.id, exposure.id)

  const onSubmit = (data) => {
    updateExposure.mutate(data)
    closeEditExposure()
  }

  return (
    <Card>
      <Flex justify='between'>
         <Heading>Editing</Heading>
         <IconButton onClick={closeEditExposure}>{x}</IconButton>
      </Flex>

      <Form.Root onSubmit={ handleSubmit(onSubmit) }>
        <Flex direction='column' gap='2' align='stretch' p='6'>
          <Form.Field>
            <Flex direction='column' justify='between'>
              <Form.Label>food</Form.Label>
              <Form.Control asChild>
                <input type='text' required {...register('food')} ></input>
              </Form.Control>
            </Flex>
          </Form.Field>
        
          <Form.Field>
            <Flex direction='column' justify='between'>
              <Form.Label>description</Form.Label>
              <Form.Control asChild>
                <textarea size='2' type='text' {...register('description')} ></textarea>
              </Form.Control>
            </Flex>
          </Form.Field>
          
          <Flex justify='between' wrap='wrap'>
            <Form.Field>
              <Flex direction='column' justify='between'>
                <Form.Label>meal</Form.Label>
                <Form.Control asChild>
                  <input size='10' type='text' {...register('meal')}></input>
                </Form.Control>
              </Flex>
            </Form.Field>
            
            <Form.Field>
              <Flex direction='column' justify='between'>
                <Form.Label>date</Form.Label>
                <Form.Control asChild>
                  <input type='date'  {...register("date", { valueAsDate: true })} ></input>
                </Form.Control>
              </Flex>
            </Form.Field>
          </Flex>

          <OutcomeOptionPicker kid={kid} register={register} watch={watch} />

          <Form.Submit asChild>
            <Button type='submit'>submit</Button>
          </Form.Submit>
        </Flex>
        
      </Form.Root>

    </Card>
  )
}

export default EditExposure