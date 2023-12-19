/* eslint-disable react/prop-types */
import { useState } from 'react'
import Exposure from "./Exposure.jsx"
import AllExposures from './AllExposures.jsx'
import { useDeleteKid } from '../serverStore/mutations.jsx'
import { DeleteKid } from './Delete.jsx'
import EditExposure from './EditExposure.jsx'

const Kid = ({ kid, openAddExposure, closeKid, openEditKid }) => {
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

  const deleteKid = useDeleteKid()
  const deleteHandler = () => {
    deleteKid.mutate(kid)
    closeKid()
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
        kid.exposures?.length > 0
        ?
        <>
          <Exposure exposureId={ kid.exposures[0] } openEditExposures={openEditExposures} /> 
          { kid.exposures.length > 1 && <button onClick={ openAllExposures }>See All Exposures</button> }
        </>
        :
        <></>
      } 
      <button 
        onClick={ () => openAddExposure(kid) }
      >add an introduction
      </button>
      <button onClick={ () => openEditKid(kid) }>Edit</button>
      <DeleteKid kid={kid} closeKid={closeKid} />
      <button 
        onClick={ closeKid }
      >back to list
      </button>
    </>
  )
}

export default Kid