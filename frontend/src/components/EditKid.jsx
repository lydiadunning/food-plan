/* eslint-disable react/prop-types */
import { useState } from "react"
import { useUpdateKid } from '../serverStore/mutations.jsx'
import OutcomeMenu from './outcomeOptionMenu/OutcomeMenu.jsx'

import { useForm } from "react-hook-form"
import { Button, Card, Flex } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form';

const EditKid = ({ kid, handleGoBack }) => {
  const [outcomes, setOutcomes] = useState([...kid.outcomeOptions])
  const [name, setName] = useState(kid.name)
  console.log('kid', kid)

  const {register, handleSubmit} = useForm()

  const updateKid = useUpdateKid(kid.id)
  console.log(kid.id)
  
  const onNameUpdate = (data) => {
    setName(data.name)
  }

  const update = () => {
    console.log({kid})
    updateKid.mutate({
      'name': name,
      outcomeOptions: outcomes.map(option => {
        return {outcome: option.outcome}
      })
    })
    handleGoBack()
  }

  return (
    <>
      <Card>
        <Form.Root onSubmit={ handleSubmit(onNameUpdate) }>
          <Form.Field>
            <Flex gap='3' align='center'>
              <Form.Label>name: {name}</Form.Label>
              <Form.Control asChild>
                <input id='name' type='text' required {...register('name')} />
              </Form.Control>
              <Form.Submit asChild>
                <Button type='submit'>replace</Button>
              </Form.Submit>
            </Flex>
            
          </Form.Field>
        </Form.Root>
      </Card>
      <OutcomeMenu outcomes={outcomes} setOutcomes={setOutcomes} />
      <Button mr='3' onClick={ update }>Save Changes</Button>
      {/* <Button onClick={ deleteKid }>delete</Button> */}
      <Button onClick={ handleGoBack }>Back</Button>
    </>
  )
}

export default EditKid