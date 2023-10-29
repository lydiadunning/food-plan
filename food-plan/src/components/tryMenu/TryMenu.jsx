/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import TryList from './TryList'


const TryMenu = ({ tries, setTries }) => {
  const [ newTry, setNewTry ] = useState('')
  // keycounter prevents duplication of keys in new tries
  const [ keyCounter, setKeyCounter] = useState(1) 

  const submitHandler = (e) => {
    e.preventDefault()
    const tryObject = {try: newTry, id: keyCounter}
    setTries([...tries, tryObject])
    setNewTry('')
    setKeyCounter(keyCounter + 1)
  }

  return (
    <>
      <TryList tries={tries} setTries={setTries} />
      <form onSubmit={ submitHandler }>
        <label htmlFor='try'>add a try to the end</label>
          <input type='text' id='try' name='try' value={newTry} onChange={ (e) => {
            setNewTry(e.target.value)

          }} required></input>
        <button type='submit'>submit</button>
      </form>    
    </>
  )
}

export default TryMenu