/* eslint-disable react/prop-types */
import { useEffect } from "react"
import {useOutcomeTips} from '../../serverStore/queries'
import Outcome from './Outcome'


const OutcomeList = ({ outcomes, setOutcomes, showOutcomeHints }) => {

  const {isLoading, error, data} = useOutcomeTips()
  
  console.log({outcomes})

  useEffect(() => {
    if(outcomes.length == 0 && data && showOutcomeHints) {
      console.log(data)
      const convertedOutcomes = data.data.outcomeTips.map(x => {
        return {
          _id: x._id,
          outcome: x.outcome,
        }
      })
      setOutcomes(convertedOutcomes)
    } else if (error) {
      return {
        outcome: 'error: hints not available.',
        id: 0
      }
    } 
  }, [isLoading]) // executes the effect when loading state changes.
  // AFAIK, react-query will cache outcome hint data after first load
  // so this only triggers once.
  // What if this component is used to change an existing list of outcomes?
  // Then, the outcomes will be passed in as props, with their setter.
  // if outcome-hints isn't cached, there is an unneccesary server query
  // the useEffect will trigger, but outcomes.length won't be 0
  // so it will have no effect.
  console.log(outcomes)

  const removeOutcomeHandler = (id) => {
    console.log('in removeOutcomeHandler', id)
    setOutcomes(outcomes.filter(x => x._id !== id))
  }

  const moveDown = (index) => {
    const reordered = outcomes
      .slice(0, index).
        concat(
          outcomes[index + 1], 
          outcomes[index], 
          ...outcomes.slice(index + 2))
    setOutcomes(reordered)
  }

  const moveUp = (index) => {
    const reordered = outcomes
      .slice(0, index - 1)
      .concat(
        outcomes[index], 
        outcomes[index - 1], 
        ...outcomes.slice(index + 1))
    setOutcomes(reordered)
  }  

  return (
    <ul>
      { outcomes.length > 0 
      ? outcomes.map((x, i) => 
        <Outcome 
          key={x._id}
          outcome={x.outcome} 
          isFirst={i === 0}
          isLast={i === outcomes.length - 1}
          moveThisUp={() => moveUp(i)}
          moveThisDown={() => moveDown(i)}
          removeThis={() => removeOutcomeHandler(x._id)}
        />
        )
      : <p>Add a new outcome</p>
      }
    </ul>
  )
}

export default OutcomeList