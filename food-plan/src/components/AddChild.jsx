/* eslint-disable react/prop-types */
import { useState } from "react"
import TryMenu from "./tryMenu/TryMenu.jsx"
import {CreateChild} from '../serverStore/mutations'

const AddChild = ({ setShowAddChild }) => {
  const [childName, setChildName] = useState('')
  const [childNameForm, setChildNameForm] = useState('')
  const [tries, setTries] = useState([])
  const [showTries, setShowTries] = useState(false)
  const [showSave, setShowSave] = useState(false)

  console.log('executing AddChild', childName, tries)
  const nameLabel = "What's the child's name?"

  const acceptHandler = () => {
    setShowTries(false)
    setShowSave(true)
  }

  const saveHandler = () => {
    const child = {
      name: childName,
      tries: tries
    }
    console.log('save')
    console.log(child)
    // const created = CreateChild(child)
    console.log('pretend it was created')
    setShowAddChild(false)
  }

  return (
    <div>
      {
        !childName &&
        <form onSubmit={() => setChildName(childNameForm)}>
          <label>{nameLabel}</label>
          <input onChange={(e) => setChildNameForm(e.target.value)} required></input>
          <button type='submit'>Continue</button>
        </form>
      }
      {
        (childName && showTries == [] && !showSave) &&
        <>
          <h3>Do you want to record how {childName} responds to foods?</h3>
          <button onClick={() => {setShowTries(true)}}>yes</button>
          <button onClick={() => setShowSave(true)}>no</button>
        </>
      }
      {
        showTries &&
        <>
          <TryMenu tries={tries} setTries={setTries} />
          <button onClick={ acceptHandler }>Accept</button>
        </>
      }
      {
        showSave && 
        <>
          <h3>{childName}</h3>
          {tries?.map( x => <p key={x.id}>{x.try}</p>)}
          <button onClick={saveHandler}>Save</button>
        </>
      }

    </div>
  )
}

export default AddChild