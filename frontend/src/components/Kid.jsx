/* eslint-disable react/prop-types */
import AllExposures from './AllExposures.jsx'
import { DeleteKid } from './DeleteKid.jsx'
import { Card, Heading, Flex } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'
import EditKid from './EditKid.jsx'
import AddExposure from './exposureForms/AddExposure.jsx'

const Kid = ({ kid, setKid, makeMessage }) => {
  // const kid = useParams()
  console.log('kid in Kid', kid)
  const navigate = useNavigate()

  return (
    <Card className='swipeable'>
      <Flex direction='column' p='5' className='kid-size'>
      <Heading>{kid.name}</Heading>
        <Flex gap='2' justify='end'>
          <EditKid kid={kid} setKid={setKid} /> {/*button w/ dialog*/}
          <DeleteKid kid={kid} closeKid={() => navigate(-1)} />
        </Flex>
        
        <AddExposure kid={kid} makeMessage={makeMessage} />
        {/* <Button 
            size='3'
            my='3'
            onClick={ () => navigate(`/kid/${kid.id}/addexposure`) }
          >add an entry
        </Button> */}
        <AllExposures kid={kid} />
      </Flex>
    </Card>
  )
}

export default Kid
