/* eslint-disable react/prop-types */
import { IconButton, Flex, Box, Tooltip } from '@radix-ui/themes'
import { upArrow, downArrow, x } from '../../assets/svgImages'

const Outcome = ({
  outcome,
  isFirst,
  isLast,
  moveThisUp,
  moveThisDown,
  removeThis,
}) => {
  return (
    <li>
      <Flex justify='between'>
        {outcome}
        <Flex gap='3'>
          {!isFirst && 
          <Tooltip content='move down' delayDuration='1000' skipdelayDuration='100'>
            <IconButton type='button' onClick={moveThisUp}>{upArrow}</IconButton>
          </Tooltip >
          }
          {!isLast ? (
            <Tooltip content='move down' delayDuration='1000' skipdelayDuration='100'>
              <IconButton type='button' onClick={moveThisDown}>{downArrow}</IconButton>
            </Tooltip>
          ) : (
            <Box width='6'></Box>
          )}
          <Tooltip content='remove' delayDuration='1000' skipdelayDuration='100'>
            <IconButton type='button' onClick={removeThis}>{x}</IconButton>
          </Tooltip>
        </Flex>
      </Flex>
    </li>
  )
}

export default Outcome
