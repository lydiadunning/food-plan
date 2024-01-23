import { useCreateExposure } from "../../serverStore/mutations"
import { useForm } from "react-hook-form"
import { Button, Heading, Flex, Card } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form';
import OutcomeOptionPicker from './OutcomeOptionPicker'

const AddExposure = ({ kid, handleGoBack }) => {
  const today = new Date().toISOString().substring(0, 10)

  const {register, handleSubmit, watch} = useForm({
    defaultValues: {
      date: today
    }
  })

  const createExposure = useCreateExposure(kid.id)
  const submit = (data) => {
    createExposure.mutate(data)
    
    handleGoBack()
  }

  return (
    <Card>
      <Flex direction='column' p='6'>
        <Heading>{kid.name}</Heading>
          <Form.Root onSubmit={ handleSubmit(submit) }>
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
                    <textarea size='2' type='text' required {...register('description')} ></textarea>
                  </Form.Control>
                </Flex>
              </Form.Field>
              
              <Flex justify='between'>
                <Form.Field>
                  <Flex direction='column' justify='between'>
                    <Form.Label>meal</Form.Label>
                    <Form.Control asChild>
                      <input type='text' {...register('meal')}></input>
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
      </Flex>
    </Card>
  )
}

export default AddExposure