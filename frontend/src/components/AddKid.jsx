/* eslint-disable react/prop-types */
import { useState } from "react"
import OutcomeMenu from "./outcomeOptionMenu/OutcomeMenu.jsx"
import { Button } from '@radix-ui/themes'

import SavePage from './SavePage.jsx'

const AddKid = ({ handleGoBack }) => {
  const [kidName, setKidName] = useState('')
  const [kidNameForm, setKidNameForm] = useState('')
  const [outcomes, setOutcomes] = useState([])
  const [showOutcomes, setShowOutcomes] = useState(false)
  const [showSave, setShowSave] = useState(false)

  console.log('executing AddKid', kidName, outcomes)
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
          <Button type='submit'>Continue</Button>
        </form>
      }
      {
        (kidName && showOutcomes == [] && !showSave) &&
        <>
          <h3>Do you want to record how {kidName} responds to foods?</h3>
          <Button onClick={() => {setShowOutcomes(true)}}>yes</Button>
          <Button onClick={() => setShowSave(true)}>no</Button>
        </>
      }
      {
        showOutcomes &&
        <>
          <OutcomeMenu outcomes={outcomes} setOutcomes={ setOutcomes } showOutcomeHints={ true } />
          <Button onClick={ acceptHandler }>Accept</Button>
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
      <Button onClick={ handleGoBack }>Cancel</Button>
    </div>
  )
}

export default AddKid