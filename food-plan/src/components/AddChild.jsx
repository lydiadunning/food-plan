/* eslint-disable react/prop-types */
import { useState } from "react"
import TryMenu from "./tryMenu/TryMenu.jsx"

import SavePage from './SavePage.jsx'

const AddChild = ({ closeAddChild }) => {
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
          <TryMenu tries={tries} setTries={setTries} showTryHints={true} />
          <button onClick={ acceptHandler }>Accept</button>
        </>
      }
      {
        showSave && 
        <SavePage 
          childName={childName}
          tries={tries}
          closeAddChild={closeAddChild}
        />
      }

    </div>
  )
}

export default AddChild