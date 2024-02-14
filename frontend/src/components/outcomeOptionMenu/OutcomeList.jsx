/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useOutcomeTips } from '../../serverStore/queries'
import Outcome from './Outcome'
import { Flex } from '@radix-ui/themes'

const OutcomeList = ({ outcomes, setOutcomes, showOutcomeHints }) => {
  const needOutcomes = outcomes.length == 0 && showOutcomeHints 
  const { isSuccess, data } = useOutcomeTips(needOutcomes) // only queries if needOutcomes == true

  useEffect(() => {
    if (isSuccess) {
      setOutcomes(data.data.outcomes)
    }
  }, [isSuccess]) 

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
console.log({outcomes})

  return (
    <ol>
      <Flex gap='3' direction='column'>
        {outcomes.length > 0 ? (
          <>
            <p style={{fontSize: '0.8rem'}}>The littlest win</p>
            {outcomes.map((x, i) => (
              <Outcome
                key={x.id}
                outcome={x.outcome}
                isFirst={i === 0}
                isLast={i === outcomes.length - 1}
                moveThisUp={() => moveUp(i)}
                moveThisDown={() => moveDown(i)}
                removeThis={() => removeOutcomeHandler(x.id)}
              />))
            }
            <p style={{fontSize: '0.8rem'}}>The biggest win</p>
          </>
        ) : (
          <p>No outcome options saved</p>
        )}
      </Flex>
    </ol>
  )
}

export default OutcomeList
