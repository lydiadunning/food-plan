/* eslint-disable react/prop-types */
import { useState } from "react"

// const Tries = ({ tries, saveHandler }) => {
const Tries = ({ tries, setTries }) => {
  const [ newTry, setNewTry ] = useState('')

  console.log('tries executing', tries, newTry)


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
    const tryObject = {try: newTry, _id: Math.random()  * 100}
    console.log('in submit handler')
    setTries([...tries, tryObject])
    console.log(newTry, tries)
    setNewTry('')
  }

  return (
    <>
      <ul>
        { tries && tries.map((x, i) => {
          return <li key={x._id}>{ x.try } { i !== 0 && <button onClick={ () => moveUp(x) }>^</button> } { i !== tries.length - 1 && <button onClick={ () => moveDown(x) }>v</button> } { <button onClick={() => removeTryHandler(x._id)}>x</button> } </li>
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