/* eslint-disable react/prop-types */
import { DeleteKid } from './Delete.jsx'

const KidInList = ({ kid, openAddExposure, deleteKid, openKid, openEditKid }) => {

  console.log('kid', kid, kid.outcomeOptions)
  
  function listEach(arr, propertyName) {
    const strings = arr.map(x => x[propertyName])
    return strings.toString()
  }

  return (
    <li key={ kid._id }>
      <p>{ kid.name }</p>
      <button onClick={ () => openKid(kid) }>More Info</button>
      <p>{ listEach(kid.outcomeOptions, 'outcome') }</p>
      <button onClick={ () => openAddExposure() }>add an introduction</button>
      <button onClick={ () => openEditKid() }>Edit</button>
      <DeleteKid kid={kid} closeKid={()=>{}}/>
  
    </li>
  )
}

export default KidInList