/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import OutcomeMenu from './outcomeOptionMenu/OutcomeMenu.jsx'
import { Button, Card, Box, Flex } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'

import { useCreateKid } from '../serverStore/mutations'
import { useNavigate } from 'react-router-dom'

const AddKid = () => {
  const [outcomes, setOutcomes] = useState([])
  const [showOutcomes, setShowOutcomes] = useState(false)

  console.log('addkid outcomes', outcomes)
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const showOutcomeOptionsMenu = () => {
    setShowOutcomes(true)
  }

  const createKid = useCreateKid()

  const saveHandler = (data) => {
    const kid = {
      name: data.name,
      outcomeOptions: outcomes.map((option) => {
        return { outcome: option.outcome }
      }),
    }
    createKid.mutate(kid)
    navigate('/kidlist')
  }

  return (
    <Card>
      <Box p='6'>
        <Form.Root onSubmit={handleSubmit(saveHandler)}>
          <Flex direction='column' gap='4'>

            <Form.Field>
              <Form.Label>{"name: "}</Form.Label>
              <Form.Control asChild>
                <input type='text' {...register('name')} required></input>
              </Form.Control>
            </Form.Field>
            { !showOutcomes 
              ?
              <Flex>
                <Button variant='outline' size='3' mr='3' onClick={showOutcomeOptionsMenu}>add outcome options</Button>
              </Flex>
              :
              <OutcomeMenu
                outcomes={outcomes}
                setOutcomes={setOutcomes}
                showOutcomeHints={true}
              />
            }
            <Form.Submit asChild>
              <Button size='3' mr='3'>
                Save
              </Button>
            </Form.Submit>
          </Flex>
        </Form.Root>      
      </Box>
    </Card>
  )
}

export default AddKid
