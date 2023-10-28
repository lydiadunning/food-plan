/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import {useTryHints} from '../../serverStore/queries'
import Try from './Try'


const TryMenu = ({ tries, setTries }) => {
  const [ newTry, setNewTry ] = useState('')
  // keycounter prevents duplication of keys in new tries
  const [ keyCounter, setKeyCounter] = useState(1) 

  console.log('tries executing', tries, newTry)

  const {isLoading, error, data} = useTryHints()
  
  useEffect(() => {
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
  // AFAIK, react-query will cache try hint data after first load
  // so this only triggers once.
  // What if this component is used to change an existing list of tries?
  // Then, the tries will be passed in as props, with their setter.
  // if try-hints isn't cached, there is an unneccesary server query
  // the useEffect will trigger, but tries.length won't be 0
  // so it will have no effect.
  // TODO: maybe move this useEffect into another component, to modify 
  // tries on the way to this component.

  // consider making removeTryHandler, moveUp, moveDown 
  // methods on the try object
  const removeTryHandler = (id) => {
    console.log('in removeTryHandler', id, tries.filter(x => x.id !== id))
    setTries(tries.filter(x => x.id !== id))
  }

  const moveDown = (index) => {
    const reordered = tries
      .slice(0, index).
        concat(
          tries[index + 1], 
          tries[index], 
          ...tries.slice(index + 2))
    console.log('in moveDown', reordered)

    setTries(reordered)
  }

  const moveUp = (index) => {
    const reordered = tries
      .slice(0, index - 1)
      .concat(
        tries[index], 
        tries[index - 1], 
        ...tries.slice(index + 1))
    setTries(reordered)
  }  

  const submitHandler = (e) => {
    e.preventDefault()
    const tryObject = {try: newTry, id: keyCounter}
    setTries([...tries, tryObject])
    setNewTry('')
    setKeyCounter(keyCounter + 1)
  }

  return (
    <>
      <ul>
        { tries && tries.map((x, i) => {
          return <Try 
            key={x.id}
            thisTry={x.try} 
            isFirst={i === 0}
            isLast={i === tries.length - 1}
            moveThisUp={() => moveUp(i)}
            moveThisDown={() => moveDown(i)}
            removeThis={() => removeTryHandler(x.id)}
          />
        })}
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

export default TryMenu