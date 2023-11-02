/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"

const Try = ({ thisTry, isFirst, isLast, moveThisUp, moveThisDown, removeThis }) => {

  return (
    <li>
      { thisTry } { !isFirst && <button onClick={ moveThisUp }>^</button> } {!isLast && <button onClick={ moveThisDown }>v</button> } { <button onClick={ removeThis }>x</button> } 
    </li>
  )
}

export default Try