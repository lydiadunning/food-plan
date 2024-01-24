/* eslint-disable react/prop-types */
import { pencil } from '../assets/svgImages.jsx'
import { IconButton, Button, Grid, Text, Flex, Heading, Card } from '@radix-ui/themes'

const KidInList = ({ kid, openAddExposure, openKid, openEditKid }) => {
  function listEach(arr, propertyName) {
    const strings = arr.map(x => <Text key={x.id}>{x[propertyName].toString()}</Text>)
    return strings
  }

  return (
    <Card size='1' key={ kid.id }>
      <Grid gap='3' flow='row' columns='2' p='6'>
        <Heading className='kid-name'>{ kid.name }</Heading>
        <Flex gap='3' justify='end' wrap='wrap'>
          <IconButton onClick={ () => openEditKid() }>{pencil}</IconButton>
        </Flex>
        {/* <div className='kid-in-list'> */}
        <Flex gap='3' direction='column'>

          <Button size='3' onClick={ () => openKid(kid) }>More Info</Button>
          <Button size='3' onClick={ () => openAddExposure() }>add an introduction</Button>
        </Flex>
        <Flex gap='3' direction='column' align='center'>
          { listEach(kid.outcomeOptions, 'outcome') }
        </Flex>

        
        {/* </div> */}
      </Grid>
    </Card>
  )
}

export default KidInList