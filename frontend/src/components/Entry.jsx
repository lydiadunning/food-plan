import { IconButton, Card, Flex } from '@radix-ui/themes'
import { pencil } from '../assets/svgImages'

const Entry = ({ entry, openEditEntries }) => {
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  // used Marcos Dantas solution.
  const date = entry.date?.slice(0, 10)
    ? new Date(entry.date?.slice(0, 10).split('-'))
    : null

  return (
    <Card>
      <Flex justify='between'>
        <p>{entry.food}</p>

        <IconButton onClick={() => openEditEntries(entry)}>
          {pencil}
        </IconButton>
      </Flex>
      <Flex gap='2'>
        <Flex direction='column'>
          {entry.meal && <p>{entry.meal}</p>}
          {entry.date && <p>{date.toDateString()}</p>}
        </Flex>
        <Flex direction='column'>
          <p>{entry.description}</p>
        </Flex>
      </Flex>
      {entry.outcomes.length > 0 && <p>{entry.outcomes.join(', ')}</p>}
    </Card>
  )
}

export default Entry
