/* eslint-disable react/prop-types */
import { useState } from "react"
import { useForm } from "react-hook-form"
import OutcomeMenu from "./outcomeOptionMenu/OutcomeMenu.jsx"
import { Button, Heading } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form';

import SavePage from './SavePage.jsx'

const AddKid = ({ handleGoBack }) => {
  const [kidName, setKidName] = useState('')
  const [outcomes, setOutcomes] = useState([])
  const [showOutcomes, setShowOutcomes] = useState(false)
  const [showSave, setShowSave] = useState(false)

  const { register, handleSubmit } = useForm()


  console.log('executing AddKid', kidName, outcomes)
  const nameLabel = "What's the kid's name?"

  const acceptHandler = () => {
    setShowOutcomes(false)
    setShowSave(true)
  }
  console.log({kidName})

  const submitName = (data) => {
    setKidName(data.name)
  }

  return (
    <div>
      {
        !kidName &&
        <Form.Root onSubmit={handleSubmit(submitName)}>
          <Form.Field>
            <Form.Label>{nameLabel}</Form.Label>
            <Form.Control asChild> 
              <input id='name' type='text' {...register('name')} required></input>
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <Button my='3'type='submit'>Continue</Button>
          </Form.Submit>
        </Form.Root>
      }
      {
        (kidName && showOutcomes == [] && !showSave) &&
        <>
          <Heading>Do you want to record how {kidName} responds to foods?</Heading>
          <Button onClick={() => {setShowOutcomes(true)}}>yes</Button>
          <Button mx='3' onClick={() => setShowSave(true)}>no</Button>
        </>
      }
      {
        showOutcomes &&
        <>
          <OutcomeMenu outcomes={outcomes} setOutcomes={ setOutcomes } showOutcomeHints={ true } />
          <Button mr='3' onClick={ acceptHandler }>Accept</Button>
        </>
      }
      {
        showSave && 
        <SavePage 
          kidName={kidName}
          outcomeOptions={outcomes}
          handleGoBack={handleGoBack}
        />
      }
      <Button onClick={ handleGoBack }>Cancel</Button>
    </div>
  )
}

export default AddKid