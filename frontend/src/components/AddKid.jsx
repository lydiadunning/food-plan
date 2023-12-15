/* eslint-disable react/prop-types */
import { useState } from "react"
import TryMenu from "./outcomeMenu/OutcomeMenu.jsx"

import SavePage from './SavePage.jsx'

const AddKid = ({ closeAddKid }) => {
  const [kidName, setKidName] = useState('')
  const [kidNameForm, setKidNameForm] = useState('')
  const [tries, setTries] = useState([])
  const [showTries, setShowTries] = useState(false)
  const [showSave, setShowSave] = useState(false)

  console.log('executing AddKid', kidName, tries)
  const nameLabel = "What's the kid's name?"

  const acceptHandler = () => {
    setShowTries(false)
    setShowSave(true)
  }

  return (
    <div>
      {
        !kidName &&
        <form onSubmit={() => setKidName(kidNameForm)}>
          <label>{nameLabel}</label>
          <input onChange={(e) => setKidNameForm(e.target.value)} required></input>
          <button type='submit'>Continue</button>
        </form>
      }
      {
        (kidName && showTries == [] && !showSave) &&
        <>
          <h3>Do you want to record how {kidName} responds to foods?</h3>
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
          kidName={kidName}
          tries={tries}
          closeAddKid={closeAddKid}
        />
      }

    </div>
  )
}

export default AddKid