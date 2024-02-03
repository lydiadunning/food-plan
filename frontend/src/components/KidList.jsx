import Kid from './Kid.jsx';
import { IconButton, Flex, Heading, Card } from '@radix-ui/themes'
import { plus } from '../assets/svgImages.jsx';
import { useNavigate } from 'react-router-dom';

export const KidList = ({ kidData }) => {
  const navigate = useNavigate()

  console.log({kidData})
  return (
    <>
      <Heading align='center' mt='3' mb='6'>Kids</Heading>
      { <Flex className='swipe-container' direction='row' gap='3' align='start'>
        { kidData?.map(kid => 
          <Kid key={kid.id} kid={kid} />
        )}
        <Card className='swipeable' size='5'>
          <IconButton 
            size='3' 
            onClick={() => navigate('/addkid')}>
            { plus }
          </IconButton>
        </Card>
      </Flex> }
      
    </>
  );
}
