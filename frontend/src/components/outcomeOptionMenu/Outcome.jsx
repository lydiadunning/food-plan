/* eslint-disable react/prop-types */
import { IconButton, Flex, Box } from '@radix-ui/themes'
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
          {!isFirst && <IconButton onClick={moveThisUp}>{upArrow}</IconButton>}
          {!isLast ? (
            <IconButton onClick={moveThisDown}>{downArrow}</IconButton>
          ) : (
            <Box width='6'></Box>
          )}
          {<IconButton onClick={removeThis}>{x}</IconButton>}
        </Flex>
      </Flex>
    </li>
  )
}

export default Outcome
