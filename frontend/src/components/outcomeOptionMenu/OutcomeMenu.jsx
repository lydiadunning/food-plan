/* eslint-disable react/prop-types */
import { useState } from "react"
import OutcomeList from './OutcomeList'


const OutcomeMenu = ({ outcomes, setOutcomes, showOutcomeHints = false }) => {
  const [ newOutcome, setNewOutcome ] = useState('')
  // keycounter prevents duplication of keys in new outcomes
  const [ keyCounter, setKeyCounter] = useState(1) 

  const submitHandler = (e) => {
    e.preventDefault()
    const outcome = {
      outcome: newOutcome, 
      _id: keyCounter
    }
    setOutcomes([...outcomes, outcome])
    setNewOutcome('')
    setKeyCounter(keyCounter + 1)
  }

  return (
    <>
      <OutcomeList outcomes={outcomes} setOutcomes={setOutcomes} showOutcomeHints={showOutcomeHints} />

      <form onSubmit={ submitHandler }>
        <label htmlFor='outcome'>add an outcome</label>
          <input type='text' id='outcome' name='outcome' value={newOutcome} onChange={ (e) => {
            setNewOutcome(e.target.value)

          }} required></input>
        <button type='submit'>submit</button>
      </form>    
    </>
  )
}

export default OutcomeMenu