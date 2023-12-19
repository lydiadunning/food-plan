/* eslint-disable react/prop-types */
import { DeleteKid } from './Delete.jsx'

const KidInList = ({ kid, openAddExposure, deleteKid, openKid, openEditKid, closeKid }) => {

  console.log('kid', kid._id)
  
  function listEach(arr, propertyName) {
    const strings = arr.map(x => x[propertyName])
    return strings.toString()
  }

  return (
    <li key={ kid._id }>
      <p>{ kid.name }</p>
      <button onClick={ () => openKid(kid) }>More Info</button>
      <p>{ listEach(kid.outcomeOptions, 'outcome') }</p>
      <button onClick={ () => openAddExposure(kid) }>add an introduction</button>
      <button onClick={ () => openEditKid(kid) }>Edit</button>
      <DeleteKid kid={kid} closeKid={closeKid}/>
  
    </li>
  )
}

export default KidInList