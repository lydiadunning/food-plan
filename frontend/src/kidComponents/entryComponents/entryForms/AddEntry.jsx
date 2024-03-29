import { useCreateEntry } from '../../../serverStore/mutations'
import { useForm } from 'react-hook-form'
import { Button, Heading, Flex, Dialog, IconButton, Tooltip } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import OutcomeOptionPicker from './OutcomeOptionPicker'
import { x } from '../../../assets/svgImages'
import { useEffect } from 'react'

const AddEntry = ({ kid, makeMessage }) => {
  const today = new Date().toISOString()

  const { register, handleSubmit, watch, reset, formState:{isSubmitSuccessful}} = useForm({
    defaultValues: {
      date: today.slice(0, 10),
    },
  })

  const createEntry = useCreateEntry(kid.id)
  const submit = (data) => {
    data = !data.outcomes ? {...data, outcomes: []} : data
    createEntry.mutate(data)
    const foodCount = kid.entries.filter(entry => entry.food == data.food).length + 1 // acts on state before kid query returns new entry
    const message = foodCount === 1 ?  `${kid.name} tried ${data.food}!` : `${kid.name} has tried ${data.food} ${foodCount} times!`
    makeMessage(message)
  }
  useEffect(() => {
    reset(undefined, {keepDefaultValues: true})
  }, [isSubmitSuccessful, reset])

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size='3' my='3'>
          Add an Entry
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex direction='column' p='6'>
          <Flex direction='row' justify='between'>
            <Heading>{kid.name}</Heading>
            <Tooltip content='close'>
              <Dialog.Close asChild>
                <IconButton>{x}</IconButton>
              </Dialog.Close>
            </Tooltip>
          </Flex>
          <Form.Root onSubmit={handleSubmit(submit)}>
            <Flex direction='column' gap='2' align='stretch'>
              <Form.Field>
                <Flex direction='column' justify='between'>
                  <Form.Label>food</Form.Label>
                  <Form.Control asChild>
                    <input type='text' required {...register('food')}></input>
                  </Form.Control>
                </Flex>
              </Form.Field>

              <Form.Field>
                <Flex direction='column' justify='between'>
                  <Form.Label>description</Form.Label>
                  <Form.Control asChild>
                    <textarea
                      size='2'
                      type='text'
                      {...register('description')}
                    ></textarea>
                  </Form.Control>
                </Flex>
              </Form.Field>

              <Flex justify='between' wrap='wrap'>
                <Form.Field>
                  <Flex direction='column' justify='between'>
                    <Form.Label>meal</Form.Label>
                    <Form.Control asChild>
                      <input
                        size='10'
                        type='text'
                        {...register('meal')}
                      ></input>
                    </Form.Control>
                  </Flex>
                </Form.Field>

                <Form.Field>
                  <Flex direction='column' justify='between'>
                    <Form.Label>date</Form.Label>
                    <Form.Control asChild>
                      <input
                        type='date'
                        {...register('date', { valueAsDate: true })}
                      ></input>
                    </Form.Control>
                  </Flex>
                </Form.Field>
              </Flex>

              <OutcomeOptionPicker
                kid={kid}
                register={register}
                watch={watch}
              />
              <Dialog.Close>
                <Form.Submit asChild>
                  <Button type='submit'>submit</Button>
                </Form.Submit>
              </Dialog.Close >
            </Flex>
          </Form.Root>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default AddEntry
