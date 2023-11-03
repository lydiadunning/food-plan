/* eslint-disable react/prop-types */
import { useState } from 'react'
import Intro from "./Intro.jsx"
import AllIntros from './AllIntros.jsx'
import { useDeleteChild } from '../serverStore/mutations.jsx'
import { DeleteChild } from './Delete.jsx'
import EditIntro from './EditIntro.jsx'

const Child = ({ child, openAddIntro, closeChild, openEditChild }) => {
  const [ showAllIntros, setShowAllIntros ] = useState(false)
  const [ showEditIntro, setShowEditIntro ] = useState(false)
  const [ introToEdit, setIntroToEdit ] = useState(null)

  console.log('child in Child', child)

  const openAllIntros = () => {
    setShowAllIntros(true)
  }

  const closeAllIntros = () => {
    setShowAllIntros(false)
  }

  const openEditIntros = (intro) => {
    setIntroToEdit(intro)
    setShowEditIntro(true)
  }

  const closeEditIntro = () => {
    setShowEditIntro(false)
  }

  const deleteChild = useDeleteChild()
  const deleteHandler = () => {
    deleteChild.mutate(child)
    closeChild()
  }


  return (
    <>
      <p>{ child.name }</p>
      {  
        showEditIntro
        ?
        <EditIntro child={child} intro={introToEdit} closeEditIntro={closeEditIntro} />
        :
        showAllIntros 
        ? 
        <>
          <AllIntros child={child} openEditIntros={openEditIntros} />
          <button onClick={closeAllIntros}>Close Intros</button> 
        </>
        :
        child.intros?.length > 0
        ?
        <>
          <Intro introId={ child.intros[0] } openEditIntros={openEditIntros} /> 
          { child.intros.length > 1 && <button onClick={ openAllIntros }>See All Intros</button> }
        </>
        :
        <></>
      } 
      <button 
        onClick={ () => openAddIntro(child) }
      >add an introduction
      </button>
      <button onClick={ () => openEditChild(child) }>Edit</button>
      <DeleteChild child={child} closeChild={closeChild} />
      <button 
        onClick={ closeChild }
      >back to list
      </button>
    </>
  )
}

export default Child