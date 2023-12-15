/* eslint-disable react/prop-types */
import { useState } from "react"
import { useUpdateKid } from '../serverStore/mutations.jsx'
import TryMenu from './outcomeMenu/OutcomeMenu.jsx'

import { useForm } from "react-hook-form"


const EditKid = ({ kid, closeEditKid }) => {
  const [tries, setTries] = useState([...kid.tries])
  const [name, setName] = useState(kid.name)
  console.log('kid', kid)

  const {register, handleSubmit} = useForm()

  const updateKid = useUpdateKid(kid._id)
  
  const onNameUpdate = (data) => {
    setName(data.name)
  }

  const update = () => {
    updateKid.mutate({
      'name': name,
      'tries': tries
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
      <TryMenu tries={tries} setTries={setTries} />
      <button onClick={ update }>Save Changes</button>
      {/* <button onClick={ deleteKid }>delete</button> */}
      <button onClick={ closeEditKid }>Back</button>
    </>
  )
}

export default EditKid