/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useOutcomeTips } from '../../serverStore/queries'
import Outcome from './Outcome'
import { Flex } from '@radix-ui/themes'

const OutcomeList = ({ outcomes, setOutcomes, showOutcomeHints }) => {
  const { isLoading, error, data } = useOutcomeTips()

  useEffect(() => {
    if (outcomes.length == 0 && data && showOutcomeHints) {
      const convertedOutcomes = data.data.outcomeTips.map((x) => {
        return {
          id: x._id,
          outcome: x.outcome,
        }
      })
      setOutcomes(convertedOutcomes)
    } else if (error) {
      return {
        outcome: 'error: hints not available.',
        id: 0,
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

  const removeOutcomeHandler = (id) => {
    setOutcomes(outcomes.filter((x) => x.id !== id))
  }

  const moveDown = (index) => {
    const reordered = outcomes
      .slice(0, index)
      .concat(
        outcomes[index + 1],
        outcomes[index],
        ...outcomes.slice(index + 2)
      )
    setOutcomes(reordered)
  }

  const moveUp = (index) => {
    const reordered = outcomes
      .slice(0, index - 1)
      .concat(
        outcomes[index],
        outcomes[index - 1],
        ...outcomes.slice(index + 1)
      )
    setOutcomes(reordered)
  }

  return (
    <ol>
      <Flex gap='3' direction='column'>
        <p style={{fontSize: '0.8rem'}}>The littlest win</p>
        {outcomes.length > 0 ? (
          outcomes.map((x, i) => (
            <Outcome
              key={x.id}
              outcome={x.outcome}
              isFirst={i === 0}
              isLast={i === outcomes.length - 1}
              moveThisUp={() => moveUp(i)}
              moveThisDown={() => moveDown(i)}
              removeThis={() => removeOutcomeHandler(x.id)}
            />
          ))
        ) : (
          <p>Add a new outcome</p>
        )}
        <p style={{fontSize: '0.8rem'}}>The biggest win</p>
      </Flex>
    </ol>
  )
}

export default OutcomeList
