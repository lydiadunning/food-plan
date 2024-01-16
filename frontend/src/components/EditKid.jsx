/* eslint-disable react/prop-types */
import { useState } from "react"
import { useUpdateKid } from '../serverStore/mutations.jsx'
import OutcomeMenu from './outcomeOptionMenu/OutcomeMenu.jsx'

import { useForm } from "react-hook-form"
import { Button } from '@radix-ui/themes'

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
      <form onSubmit={ handleSubmit(onNameUpdate) }>
        <label>
          name: {name}
          <input id='name' type='text' required {...register('name')} />
        </label>
        <Button type='submit'>replace</Button>
      </form>
      <OutcomeMenu outcomes={outcomes} setOutcomes={setOutcomes} />
      <Button onClick={ update }>Save Changes</Button>
      {/* <Button onClick={ deleteKid }>delete</Button> */}
      <Button onClick={ handleGoBack }>Back</Button>
    </>
  )
}

export default EditKid