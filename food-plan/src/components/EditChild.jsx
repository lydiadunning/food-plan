/* eslint-disable react/prop-types */
import { useState } from "react"
import { useDeleteChild, useUpdateChild } from '../serverStore/mutations.jsx'
import TryMenu from './tryMenu/tryMenu.jsx'

import { useForm } from "react-hook-form"


const EditChild = ({ child, closeEditChild }) => {
  const [tries, setTries] = useState([...child.tries])
  const [name, setName] = useState(child.name)
  console.log('child', child.name, child._id)

  const {register, handleSubmit} = useForm()

  const updateChild = useUpdateChild(child._id)
  
  const onNameUpdate = (data) => {
    setName(data.name)
  }

  const update = () => {
    updateChild.mutate({
      'name': name,
      'tries': tries
    })
    closeEditChild()
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
      {/* <button onClick={ deleteChild }>delete</button> */}
      <button onClick={ closeEditChild }>Back</button>
    </>
  )
}

export default EditChild