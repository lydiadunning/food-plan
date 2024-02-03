/* eslint-disable react/prop-types */
import AllExposures from './AllExposures.jsx'
import { DeleteKid } from './DeleteKid.jsx'
import { Button, Card, Heading, Flex, IconButton } from '@radix-ui/themes'
import { pencil } from '../assets/svgImages.jsx'
import { useNavigate } from 'react-router-dom'

const Kid = ({ kid }) => {
  // const kid = useParams()
  console.log('kid in Kid', kid)
  const navigate = useNavigate()

  return (
    <Card className='swipeable'>
      <Flex direction='column' p='6'>
        <Flex justify="between">
          <Heading>{ kid.name }</Heading>
          <Flex gap='2'>
            <IconButton onClick={ () => navigate(`/kid/${kid.id}/editkid`) }>{pencil}</IconButton>
            <DeleteKid kid={kid} closeKid={() => navigate(-1)} />
          </Flex>
        </Flex>
        <Button 
            size='3'
            my='3'
            onClick={ () => navigate(`/kid/${kid.id}/addexposure`) }
          >add an entry
        </Button>
        <AllExposures kid={kid} />

      </Flex>
    </Card>
  )
}

export default Kid