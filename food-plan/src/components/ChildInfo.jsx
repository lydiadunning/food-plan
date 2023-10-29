/* eslint-disable react/prop-types */
import { useState } from "react"
import { useDeleteChild } from '../serverStore/mutations.jsx'

const ChildInfo = ({ child, updateChild }) => {

  function listEach(arr, propertyName) {
    const strings = arr.map(x => x[propertyName])
    return strings.toString()
  }

  const intros = child.intros?.map(x => {
    return (<li key={x._id}>
      <p>Food: { x.food }</p>
      <p>Description: { x.description }</p>
      { x.meal && <p>Meal: { x.meal }</p> }
      { x.date && <p>Date: { x.date.toString() }</p>}
    </li>)
  })

  const {error, mutate} = useDeleteChild()


  return (
    <li key={ child._id }>
      <p>{ child.name }</p>
      <p>{ listEach(child.tries, 'try') }</p>
      {intros && <ul>{intros}</ul>}
      <button>add an introduction</button>
      <button onClick={ () => mutate(child) }>delete</button>
    </li>
  )
}

export default ChildInfo