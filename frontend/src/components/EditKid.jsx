/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useUpdateKid } from '../serverStore/mutations.jsx'
import OutcomeMenu from './outcomeOptionMenu/OutcomeMenu.jsx'
import { useForm } from 'react-hook-form'
import { Button, Flex, IconButton, Dialog } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import { pencil } from '../assets/svgImages.jsx'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

const EditKid = ({ kid }) => {
  const [outcomes, setOutcomes] = useState([...kid.outcomeOptions])
  const [name, setName] = useState(kid.name)

  const { register, handleSubmit } = useForm()

  const updateKid = useUpdateKid(kid.id)

  const onNameUpdate = (data) => {
    setName(data.name)
  }

  const update = () => {
    const newKid = {
      name: name,
      outcomeOptions: outcomes.map((option) => {
        return { outcome: option.outcome }
      }),
    }
    updateKid.mutate(newKid)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton>{pencil}</IconButton>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex direction='column'>
          <Form.Root onSubmit={handleSubmit(onNameUpdate)}>
            <Form.Field>
              <Flex gap='3' justify='between' align='center'>
                <Flex gap='1'>
                  <VisuallyHidden.Root>
                    <Form.Label>Rename {name}:</Form.Label>
                  </VisuallyHidden.Root>
                  <Form.Control asChild>
                    <input
                      type='text'
                      required
                      placeholder={name}
                      {...register('name')}
                    />
                  </Form.Control>
                </Flex>
                <Form.Submit asChild>
                  <Button type='submit'>Change</Button>
                </Form.Submit>
              </Flex>
            </Form.Field>
          </Form.Root>

          <OutcomeMenu outcomes={outcomes} setOutcomes={setOutcomes} />
          <Flex justify='center'>
            <Dialog.Close>
              <Button mr='1' variant='soft' color='gray'>
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button ml='1' onClick={update}>
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default EditKid
