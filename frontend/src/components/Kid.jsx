/* eslint-disable react/prop-types */
import { useState } from 'react'
// import Exposure from "./Exposure.jsx"
import AllExposures from './AllExposures.jsx'
import { DeleteKid } from './DeleteKid.jsx'
import EditExposure from './EditExposure.jsx'
import { Button } from '@radix-ui/themes'

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
          <Button onClick={closeAllExposures}>Close Exposures</Button> 
        </>
        :
        <Button onClick={ openAllExposures } >show all exposures</Button>
        // show most recent exposure
      } 
      <Button 
        onClick={ () => handleGoToKid('addExposure', kid) }
      >add an introduction
      </Button>
      <Button onClick={ () => handleGoToKid('editKid', kid) }>Edit</Button>
      <DeleteKid kid={kid} closeKid={handleGoBack} />
      <Button 
        onClick={ handleGoBack }
      >back to list
      </Button>
    </>
  )
}

export default Kid