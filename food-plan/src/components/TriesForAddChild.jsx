/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import {useTryHints} from '../serverStore/queries'


const Tries = ({ tries, setTries }) => {
  const [ newTry, setNewTry ] = useState('')
  const [ keyCounter, setKeyCounter] = useState(1)

  console.log('tries executing', tries, newTry)

  const {isLoading, error, data} = useTryHints()
  
  useEffect(() => {
    console.log('in useEffect')
    console.log('isLoading', isLoading)
    // console.log('tries.length', tries.length, 'data', data.data)
    if(tries.length == 0 && data) {
      console.log(data)
      const convertedTries = data.data.tries.map(x => {
        return {
          id: x._id,
          try: x.try,
          tryId: x._id
        }
      })
      setTries(convertedTries)
    } else if (error) {
      return {
        try: 'error: hints not available.',
        id: 0
      }
    }
  }, [isLoading]) // executes the effect when loading state changes.

  const removeTryHandler = (id) => {
    setTries(tries.filter(x => x._id !== id))
  }

  const moveDown = (tryToMove) => {
    const index = tries.indexOf(tryToMove)
    const reordered = tries.slice(0, index).concat(tries[index + 1], tries[index], ...tries.slice(index + 2))

    setTries(reordered)
  }

  const moveUp = (tryToMove) => {
    const index = tries.indexOf(tryToMove)
    const reordered = tries.slice(0, index - 1).concat(tries[index], tries[index - 1], ...tries.slice(index + 1))
    setTries(reordered)
  }  

  const submitHandler = (e) => {
    e.preventDefault()
    const tryObject = {try: newTry, id: keyCounter}
    console.log('in submit handler')
    setTries([...tries, tryObject])
    setNewTry('')
    setKeyCounter(keyCounter + 1)
  }

  return (
    <>
      <ul>
        { tries && tries.map((x, i) => {
          return <li key={x.id}>{ x.try } { i !== 0 && <button onClick={ () => moveUp(x) }>^</button> } { i !== tries.length - 1 && <button onClick={ () => moveDown(x) }>v</button> } { <button onClick={() => removeTryHandler(x._id)}>x</button> } </li>
          })
        }
      </ul>
      <form onSubmit={ submitHandler }>
        <label htmlFor='try'>add a try to the end</label>
          <input type='text' id='try' name='try' onChange={ (e) => {
            setNewTry(e.target.value)

          }} required></input>
        <button type='submit'>submit</button>
      </form>    
    </>
  )
}

export default Tries