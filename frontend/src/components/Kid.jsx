/* eslint-disable react/prop-types */
import { useState } from 'react'
import Intro from "./Exposure.jsx"
import AllIntros from './AllExposures.jsx'
import { useDeleteKid } from '../serverStore/mutations.jsx'
import { DeleteKid } from './Delete.jsx'
import EditIntro from './EditExposure.jsx'

const Kid = ({ kid, openAddIntro, closeKid, openEditKid }) => {
  const [ showAllIntros, setShowAllIntros ] = useState(false)
  const [ showEditIntro, setShowEditIntro ] = useState(false)
  const [ exposureToEdit, setIntroToEdit ] = useState(null)

  console.log('kid in Kid', kid)

  const openAllIntros = () => {
    setShowAllIntros(true)
  }

  const closeAllIntros = () => {
    setShowAllIntros(false)
  }

  const openEditIntros = (exposure) => {
    setIntroToEdit(exposure)
    setShowEditIntro(true)
  }

  const closeEditIntro = () => {
    setShowEditIntro(false)
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
        showEditIntro
        ?
        <EditIntro kid={kid} exposure={exposureToEdit} closeEditIntro={closeEditIntro} />
        :
        showAllIntros 
        ? 
        <>
          <AllIntros kid={kid} openEditIntros={openEditIntros} />
          <button onClick={closeAllIntros}>Close Intros</button> 
        </>
        :
        kid.exposures?.length > 0
        ?
        <>
          <Intro exposureId={ kid.exposures[0] } openEditIntros={openEditIntros} /> 
          { kid.exposures.length > 1 && <button onClick={ openAllIntros }>See All Intros</button> }
        </>
        :
        <></>
      } 
      <button 
        onClick={ () => openAddIntro(kid) }
      >add an exposureduction
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