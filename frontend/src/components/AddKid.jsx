/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import OutcomeMenu from './outcomeOptionMenu/OutcomeMenu.jsx'
import { Button, Card, Box, Flex, Heading } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'

import { useCreateKid } from '../serverStore/mutations'
import { useNavigate } from 'react-router-dom'

const AddKid = () => {
  const [outcomes, setOutcomes] = useState([])
  const [showOutcomes, setShowOutcomes] = useState(false)

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
    <>
      <Heading align='center' mt='3' mb='6'>
        Add A Kid
      </Heading>
      <Card>
        <Box p='6'>
          <Form.Root onSubmit={handleSubmit(saveHandler)}>
            <Flex direction='column' gap='4' align='start'>

              <Form.Field>
                <Form.Label>{"name: "}</Form.Label>
                <Form.Control asChild>
                  <input type='text' {...register('name')} required></input>
                </Form.Control>
              </Form.Field>
              { !showOutcomes 
                ?
                  <Button variant='outline' size='3' mr='3' onClick={showOutcomeOptionsMenu}>add outcome options</Button>
                :
                <OutcomeMenu
                  outcomes={outcomes}
                  setOutcomes={setOutcomes}
                  showOutcomeHints={true}
                />
              }
              <Form.Submit asChild style={{alignSelf: 'center'}}>
                <Button size='3' mr='3'>
                  Save
                </Button>
              </Form.Submit>
            </Flex>
          </Form.Root>      
        </Box>
      </Card>
    </>
    
  )
}

export default AddKid
