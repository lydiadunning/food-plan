/* eslint-disable react/prop-types */
import { useState } from 'react'
// import Exposure from "./Exposure.jsx"
import AllExposures from './AllExposures.jsx'
import { DeleteKid } from './DeleteKid.jsx'
import EditExposure from './EditExposure.jsx'


const Kid = ({ kid, handleGoToKid, handleGoBack }) => {
  const [ showAllExposures, setShowAllExposures ] = useState(false)
  const [ showEditExposure, setShowEditExposure ] = useState(false)
  const [ exposureToEdit, setExposureToEdit ] = useState(null)

  console.log('kid in Kid', kid)

  const openAllExposures = () => {
    setShowAllExposures(true)
  }

  const closeAllExposures = () => {
    setShowAllExposures(false)
  }

  const openEditExposures = (exposure) => {
    setExposureToEdit(exposure)
    setShowEditExposure(true)
  }

  const closeEditExposure = () => {
    setShowEditExposure(false)
  }

  return (
    <>
      <p>{ kid.name }</p>
      {  
        showEditExposure
        ?
        <EditExposure kid={kid} exposure={exposureToEdit} closeEditExposure={closeEditExposure} />
        :
        showAllExposures 
        ? 
        <>
          <AllExposures kid={kid} openEditExposures={openEditExposures} />
          <button onClick={closeAllExposures}>Close Exposures</button> 
        </>
        :
        <button onClick={ openAllExposures } >show all exposures</button>
        // show most recent exposure
      } 
      <button 
        onClick={ () => handleGoToKid('addExposure', kid) }
      >add an introduction
      </button>
      <button onClick={ () => handleGoToKid('editKid', kid) }>Edit</button>
      <DeleteKid kid={kid} closeKid={handleGoBack} />
      <button 
        onClick={ handleGoBack }
      >back to list
      </button>
    </>
  )
}

export default Kid