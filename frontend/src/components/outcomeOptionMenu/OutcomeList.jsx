/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useOutcomeTips } from '../../serverStore/queries'
import Outcome from './Outcome'
import { Flex, Button } from '@radix-ui/themes'

const OutcomeList = ({ outcomes, setOutcomes, showOutcomeHints }) => {
  const [doGetHints, setDoGetHints] = useState(showOutcomeHints)
  const needOutcomes = outcomes.length == 0 && doGetHints
  const { isSuccess, data } = useOutcomeTips(needOutcomes) // only queries if needOutcomes == true

  useEffect(() => {
    if (needOutcomes && isSuccess) {
      setOutcomes(data.data.outcomes)
    }
  }, [isSuccess, doGetHints]) 

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
          <Flex align='start' gap='2' direction='column'>
            <p>No outcome options saved</p>
            <Button variant='outline' onClick={() => setDoGetHints(true)}>add default options</Button>
          </Flex>  
        )}
      </Flex>
    </ol>
  )
}

export default OutcomeList
