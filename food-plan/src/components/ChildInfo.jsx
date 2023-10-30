/* eslint-disable react/prop-types */
import { useState } from "react"
import { useDeleteChild } from '../serverStore/mutations.jsx'

const ChildInfo = ({ child, openAddIntro, deleteChild, openChild }) => {

  console.log('child', child.intros)
  
  function listEach(arr, propertyName) {
    const strings = arr.map(x => x[propertyName])
    return strings.toString()
  }

  // const intros = child.intros?.map(x => {
  //   return (<li key={x._id}>
  //     <p>Food: { x.food }</p>
  //     <p>Description: { x.description }</p>
  //     { x.meal && <p>Meal: { x.meal }</p> }
  //     { x.date && <p>Date: { x.date.toString() }</p>}
  //   </li>)
  // })


  
  

  return (
    <li key={ child._id }>
      <p>{ child.name }</p>
      <button onClick={ () => openChild(child) }>More Info</button>
      <p>{ listEach(child.tries, 'try') }</p>
      <button onClick={ () => openAddIntro(child) }>add an introduction</button>
      <button onClick={ deleteChild }>delete</button>
      { }
    </li>
  )
}

export default ChildInfo