/* eslint-disable react/prop-types */
import { useState } from "react"
import { useUpdateKid } from '../serverStore/mutations.jsx'
import OutcomeMenu from './outcomeMenu/OutcomeMenu.jsx'

import { useForm } from "react-hook-form"


const EditKid = ({ kid, closeEditKid }) => {
  const [outcomes, setOutcomes] = useState([...kid.outcomeOptions])
  const [name, setName] = useState(kid.name)
  console.log('kid', kid)

  const {register, handleSubmit} = useForm()

  const updateKid = useUpdateKid(kid._id)
  
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
    closeEditKid()
  }

  return (
    <>
      <form onSubmit={ handleSubmit(onNameUpdate) }>
        <label>
          name: {name}
          <input id='name' type='text' required {...register('name')} />
        </label>
        <button type='submit'>replace</button>
      </form>
      <OutcomeMenu outcomes={outcomes} setOutcomes={setOutcomes} />
      <button onClick={ update }>Save Changes</button>
      {/* <button onClick={ deleteKid }>delete</button> */}
      <button onClick={ closeEditKid }>Back</button>
    </>
  )
}

export default EditKid