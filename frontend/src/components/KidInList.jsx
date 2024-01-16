/* eslint-disable react/prop-types */
import { DeleteKid } from './DeleteKid.jsx'
import { Button } from '@radix-ui/themes'

const KidInList = ({ kid, openAddExposure, openKid, openEditKid }) => {
  
  function listEach(arr, propertyName) {
    const strings = arr.map(x => x[propertyName])
    return strings.toString()
  }

  return (
    <li key={ kid.id }>
      <p className='kid-name'>{ kid.name }</p>
      <div className='kid-in-list'>
        <div style={{}}>
          <Button onClick={ () => openKid(kid) }>More Info</Button>
          <Button onClick={ () => openAddExposure() }>add an introduction</Button>
        </div>
        <p>{ listEach(kid.outcomeOptions, 'outcome') }</p>
        <Button onClick={ () => openEditKid() }>Edit</Button>
        <DeleteKid kid={kid} closeKid={()=>{}}/>
      </div>
    </li>
  )
}

export default KidInList