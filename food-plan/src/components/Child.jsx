/* eslint-disable react/prop-types */
import { useState } from 'react'
import Intro from "./Intro.jsx"
import AllIntros from './AllIntros.jsx'

const Child = ({ child, openAddIntro, closeChild }) => {
  const [ showAllIntros, setShowAllIntros ] = useState(false)

  function listEach(arr, propertyName) {
    const strings = arr.map(x => x[propertyName])
    return strings.toString()
  }

  const openAllIntros = () => {
    setShowAllIntros(true)
  }

  const closeAllIntros = () => {
    setShowAllIntros(false)
  }

  return (
    <>
      <p>{ child.name }</p>
      <p>{ listEach(child.tries, 'try') }</p>
      {  
        showAllIntros 
        ? 
        <>
          <AllIntros child={child}/>
          <button onClick={closeAllIntros}>Close Intros</button> 
        </>
        :
        child.intros.length > 0
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
      {/* <button onClick={ deleteChild }>delete</button> */}
      <button 
        onClick={ closeChild }
      >back to list
      </button>
    </>
  )
}

export default Child