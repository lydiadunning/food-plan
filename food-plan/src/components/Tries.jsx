/* eslint-disable react/prop-types */
import { useState } from "react"

// const Tries = ({ tries, saveHandler }) => {
const Tries = ({ tries, saveHandler }) => {

  const [triesInOrder, setTriesInOrder] = useState([...tries])
  const [ newTry, setNewTry ] = useState('')

  console.log('tries executing', tries, triesInOrder, newTry)


  const removeTryHandler = (id) => {

    saveHandler(triesInOrder.filter(x => x._id !== id))
    setTriesInOrder(triesInOrder.filter(x => x._id !== id))

  }

  const moveDown = (tryToMove) => {
    const index = triesInOrder.indexOf(tryToMove)
    const reordered = triesInOrder.slice(0, index).concat(triesInOrder[index + 1], triesInOrder[index], ...triesInOrder.slice(index + 2))

    setTriesInOrder(reordered)
  }

  const moveUp = (tryToMove) => {
    const index = triesInOrder.indexOf(tryToMove)
    const reordered = triesInOrder.slice(0, index - 1).concat(triesInOrder[index], triesInOrder[index - 1], ...triesInOrder.slice(index + 1))
    setTriesInOrder(reordered)
  }  

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      console.log('before save', [...tries, {try: newTry}])
      const savedTries = await saveHandler([...tries, {try: newTry}])
      console.log('after save', savedTries)
      setTriesInOrder(savedTries)
      setNewTry('')
      console.log('end of submit handler')
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <>
      <ul>
        { triesInOrder && triesInOrder.map((x, i) => {
          return <li key={x._id}>{ x.try } { i !== 0 && <button onClick={ () => moveUp(x) }>^</button> } { i !== tries.length - 1 && <button onClick={ () => moveDown(x) }>v</button> } { <button onClick={() => removeTryHandler(x._id)}>x</button> } </li>
          })
        }
      </ul>
      <button onClick={ () => saveHandler(triesInOrder) }>Save</button>
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