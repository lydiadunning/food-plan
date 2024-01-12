/* eslint-disable react/prop-types */
import { useState } from "react"
import OutcomeMenu from "./outcomeOptionMenu/OutcomeMenu.jsx"

import SavePage from './SavePage.jsx'

const AddKid = ({ handleGoBack }) => {
  const [kidName, setKidName] = useState('')
  const [kidNameForm, setKidNameForm] = useState('')
  const [outcomes, setOutcomes] = useState([])
  const [showOutcomes, setShowOutcomes] = useState(false)
  const [showSave, setShowSave] = useState(false)

  // console.log('executing AddKid', kidName, outcomes)
  const nameLabel = "What's the kid's name?"

  const acceptHandler = () => {
    setShowOutcomes(false)
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
        (kidName && showOutcomes == [] && !showSave) &&
        <>
          <h3>Do you want to record how {kidName} responds to foods?</h3>
          <button onClick={() => {setShowOutcomes(true)}}>yes</button>
          <button onClick={() => setShowSave(true)}>no</button>
        </>
      }
      {
        showOutcomes &&
        <>
          <OutcomeMenu outcomes={outcomes} setOutcomes={ setOutcomes } showOutcomeHints={ true } />
          <button onClick={ acceptHandler }>Accept</button>
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
      <button onClick={ handleGoBack }>Cancel</button>
    </div>
  )
}

export default AddKid