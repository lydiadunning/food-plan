/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import OutcomeMenu from './outcomeOptionMenu/OutcomeMenu.jsx'
import { Button, Heading, Card, Box, Flex } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'

import SavePage from './SavePage.jsx'
import { useNavigate } from 'react-router-dom'

const AddKid = () => {
  const [kidName, setKidName] = useState('')
  const [outcomes, setOutcomes] = useState([])
  const [showOutcomes, setShowOutcomes] = useState(false)
  const [showSave, setShowSave] = useState(false)

  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  console.log('executing AddKid', kidName, outcomes)
  const nameLabel = "What's the kid's name?"

  const acceptHandler = () => {
    setShowOutcomes(false)
    setShowSave(true)
  }
  console.log({ kidName })

  const submitName = (data) => {
    setKidName(data.name)
  }

  return (
    <Card>
      <Box p='6'>
        {!kidName && (
          <Form.Root onSubmit={handleSubmit(submitName)}>
            <Form.Field>
              <Form.Label>{nameLabel}</Form.Label>
              <Form.Control asChild>
                <input type='text' {...register('name')} required></input>
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <Button size='3' my='3' type='submit'>
                Continue
              </Button>
            </Form.Submit>
          </Form.Root>
        )}
        {kidName && showOutcomes == [] && !showSave && (
          <Flex direction='column' gap='2' mb='3'>
            <Heading>
              Do you want to record how {kidName} responds to foods?
            </Heading>
            <p>
              Keeping track of how a child responds to foods can help you see whether offering your child new foods is having an impact. 
              Choosing not to record how a child responds can help keep the focus on your actions, which you can control. 
              You can add or remove these later.
            </p>
            <Flex gap='2'>
              <Button
                size='3'
                onClick={() => {
                  setShowOutcomes(true)
                }}
              >
                yes
              </Button>
              <Button size='3' mx='3' onClick={() => setShowSave(true)}>
                no
              </Button>
            </Flex>
          </Flex>
        )}
        {showOutcomes && (
          <>
            <Heading>Choose {kidName +"'s"} outcome options</Heading>
            <OutcomeMenu
              outcomes={outcomes}
              setOutcomes={setOutcomes}
              showOutcomeHints={true}
            />
            <Button size='3' mr='3' onClick={acceptHandler}>
              Accept
            </Button>
          </>
        )}
        {showSave && (
          <SavePage
            kidName={kidName}
            outcomeOptions={outcomes}
            handleGoBack={() => navigate('/kidlist')}
          />
        )}
        <Button size='3' onClick={() => navigate('/kidlist')}>
          Cancel
        </Button>
      </Box>
    </Card>
  )
}

export default AddKid
