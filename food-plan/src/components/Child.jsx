/* eslint-disable react/prop-types */
import { useState } from 'react'
import Intro from "./Intro.jsx"
import AllIntros from './AllIntros.jsx'

const Child = ({ child, openAddIntro, closeChild, openEditChild }) => {
  const [ showAllIntros, setShowAllIntros ] = useState(false)
  console.log('child in Child', child._id)


  const openAllIntros = () => {
    setShowAllIntros(true)
  }

  const closeAllIntros = () => {
    setShowAllIntros(false)
  }

  return (
    <>
      <p>{ child.name }</p>
      {  
        showAllIntros 
        ? 
        <>
          <AllIntros child={child}/>
          <button onClick={closeAllIntros}>Close Intros</button> 
        </>
        :
        child.intros?.length > 0
        ?
        <>
          <Intro introId={ child.intros[0] } /> 
          { child.intros.length > 1 && <button onClick={ openAllIntros }>See All Intros</button> }
        </>
        :
        <></>
      } 
      <button 
        onClick={ () => openAddIntro(child) }
      >add an introduction
      </button>
      <button onClick={ () => openEditChild(child._id) }>Edit</button>
      {/* <button onClick={ deleteChild }>delete</button> */}
      <button 
        onClick={ closeChild }
      >back to list
      </button>
    </>
  )
}

export default Child