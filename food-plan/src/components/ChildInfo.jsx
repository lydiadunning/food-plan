/* eslint-disable react/prop-types */
import { useState } from "react"
import Tries from './Tries'

const ChildInfo = ({ child, updateChild }) => {
  const [ showTryMenu, setShowTryMenu] = useState(false)


  function listEach(arr, propertyName) {
    const strings = arr.map(x => x[propertyName])
    return strings.toString()
  }

  const intros = child.intros?.map(x => {
    return (<li key={x._id}>
      <p>Food: { x.food }</p>
      <p>Description: { x.description }</p>
      { x.meal && <p>Meal: { x.meal }</p> }
      { x.date && <p>Date: { x.date.toString() }</p>}
    </li>)
  })

  async function updateTries(allTries) {
    try {
      const updatedChild = {...child, tries: allTries}
      const response = await fetch(`http://localhost:2002/api/child/${child._id}/tries`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedChild),
      });
  
      const childInDb = response.json();
      updateChild(childInDb)
      console.log('before return in update tries', childInDb.tries)
      return Promise.resolve(childInDb.tries) 
    } catch (error) {
      console.error("Error:", error.message);
      return Promise.reject(error)
    }
  }



  const showTryMenuHandler = (e) => {
    e.preventDefault()
    setShowTryMenu(!showTryMenu)
  }

  const createSaveHandler = () => {
    return function(allTries) {
      updateTries(allTries)
    }
  }



  return (
    <li key={ child._id }>
      <p>{ child.name }</p>
      <p>{ listEach(child.tries, 'try') }</p>
      {intros && <ul>{intros}</ul>}
      <button onClick={showTryMenuHandler}>change tries</button>
      <button>add an introduction</button>
      { showTryMenu && <Tries tries={child.tries} saveHandler={createSaveHandler()} />}

    </li>
  )
}

export default ChildInfo