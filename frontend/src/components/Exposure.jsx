import { IconButton, Card, Flex } from '@radix-ui/themes'
import { pencil } from '../assets/svgImages'

const Exposure = ({ exposure, openEditExposures }) => {
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  // used Marcos Dantas solution.
  const date = exposure.date?.slice(0, 10)
    ? new Date(exposure.date?.slice(0, 10).split('-'))
    : null

  return (
    <Card>
      <Flex justify='between'>
        <p>{exposure.food}</p>

        <IconButton onClick={() => openEditExposures(exposure)}>
          {pencil}
        </IconButton>
      </Flex>
      <Flex gap='2'>
        <Flex direction='column'>
          {exposure.meal && <p>{exposure.meal}</p>}
          {exposure.date && <p>{date.toDateString()}</p>}
        </Flex>
        <Flex direction='column'>
          <p>{exposure.description}</p>
        </Flex>
      </Flex>
      {exposure.outcomes.length > 0 && <p>{exposure.outcomes.join(', ')}</p>}
    </Card>
  )
}

export default Exposure
