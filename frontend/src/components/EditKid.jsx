/* eslint-disable react/prop-types */
import { useState } from "react"
import { useUpdateKid } from '../serverStore/mutations.jsx'
import OutcomeMenu from './outcomeOptionMenu/OutcomeMenu.jsx'
import { DeleteKid } from './DeleteKid.jsx'
import { useForm } from "react-hook-form"
import { Button, Card, Flex, Heading } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form';

const EditKid = ({ kid, handleGoBack, setKid }) => {
  const [outcomes, setOutcomes] = useState([...kid.outcomeOptions])
  const [name, setName] = useState(kid.name)

  const {register, handleSubmit} = useForm()

  const updateKid = useUpdateKid(kid.id)
  
  const onNameUpdate = (data) => {
    setName(data.name)
  }

  const update = () => {
    const newKid = {
      'name': name,
      outcomeOptions: outcomes.map(option => {
        return {outcome: option.outcome}
      })
    }
    updateKid.mutate(newKid)
    setKid({id: kid.id, ...newKid})
    handleGoBack()
  }

  return (
    <>
      <Flex my='4' justify='between'>
        <Heading>{ name }</Heading>
        <DeleteKid kid={kid} closeKid={handleGoBack}/>
      </Flex>
      
      <Card>
        <Flex direction='column'>
          <Form.Root onSubmit={ handleSubmit(onNameUpdate) }>
            <Form.Field>
              <Flex gap='3' justify='between' align='center'>
                <Flex gap='1'>
                  <Form.Label>Rename {name}:</Form.Label>
                  <Form.Control asChild>
                    <input id='name' type='text' required {...register('name')} />
                  </Form.Control>
                </Flex>
                <Form.Submit asChild>
                  <Button type='submit'>Change</Button>
                </Form.Submit>
              </Flex>
            </Form.Field>
          </Form.Root>
        
          <OutcomeMenu outcomes={outcomes} setOutcomes={setOutcomes} />
          <Button size='3' onClick={ update }>Save Changes</Button>
        </Flex>
      </Card>
    </>
  )
}

export default EditKid