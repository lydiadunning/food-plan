/* eslint-disable react/prop-types */
import { Button } from '@radix-ui/themes'

const Outcome = ({ outcome, isFirst, isLast, moveThisUp, moveThisDown, removeThis }) => {

  return (
    <li >
      { outcome } { !isFirst && <Button onClick={ moveThisUp }>^</Button> } {!isLast && <Button onClick={ moveThisDown }>v</Button> } { <Button onClick={ removeThis }>x</Button> } 
    </li>
  )
}

export default Outcome