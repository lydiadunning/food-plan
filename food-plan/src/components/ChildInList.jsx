/* eslint-disable react/prop-types */
import { DeleteChild } from './Delete.jsx'

const ChildInList = ({ child, openAddIntro, deleteChild, openChild, openEditChild, closeChild }) => {

  console.log('child', child._id)
  
  function listEach(arr, propertyName) {
    const strings = arr.map(x => x[propertyName])
    return strings.toString()
  }

  return (
    <li key={ child._id }>
      <p>{ child.name }</p>
      <button onClick={ () => openChild(child) }>More Info</button>
      <p>{ listEach(child.tries, 'try') }</p>
      <button onClick={ () => openAddIntro(child) }>add an introduction</button>
      <button onClick={ () => openEditChild(child) }>Edit</button>
      <DeleteChild child={child} closeChild={closeChild}/>
  
    </li>
  )
}

export default ChildInList