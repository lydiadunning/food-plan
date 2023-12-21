/* eslint-disable react/prop-types */
const Outcome = ({ outcome, isFirst, isLast, moveThisUp, moveThisDown, removeThis }) => {

  return (
    <li>
      { outcome } { !isFirst && <button onClick={ moveThisUp }>^</button> } {!isLast && <button onClick={ moveThisDown }>v</button> } { <button onClick={ removeThis }>x</button> } 
    </li>
  )
}

export default Outcome