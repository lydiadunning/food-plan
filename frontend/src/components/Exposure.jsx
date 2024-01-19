import { IconButton, Card, Flex } from '@radix-ui/themes'
import { pencil } from '../assets/svgImages'

const Exposure = ({ exposure, openEditExposures }) => {

  const date = exposure.date ? new Date(exposure.date) : null

  return (
    <Card m='4'>
      <Flex gap='2'>
        <Flex direction='column' >

          <p>{ exposure.food }</p>
          { exposure.meal && <p>{ exposure.meal }</p> }
          { exposure.date && <p>{ date.toDateString() }</p>}

        </Flex>
        <Flex direction='column'>

          <p>{ exposure.description }</p>

        </Flex> 
      </Flex>
      <Flex justify='between'>

      { exposure.outcomes.length > 0 && <p>{ exposure.outcomes.join(', ') }</p> } 
        <IconButton onClick={ () => openEditExposures(exposure) }>{ pencil }</IconButton>
        
      </Flex>
    </Card>
  )
}

export default Exposure