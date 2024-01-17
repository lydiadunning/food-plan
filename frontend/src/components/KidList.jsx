import KidInList from './KidInList.jsx';
import { IconButton, Flex, Heading, Card } from '@radix-ui/themes'
import { plus } from '../assets/svgImages.jsx';

export const KidList = ({ kidData, handleGoToKid, handleGoTo }) => {

  return (
    <>
      <Heading align='center' m='3'>Kids</Heading>
      { <Flex align='center' direction='column' gap='3' >
        { kidData?.map(kid => 
          <KidInList 
            key={ kid.id } 
            kid={ kid } 
            openKid={ () => handleGoToKid('kid', kid) }
            openEditKid={ () => handleGoToKid('editKid', kid)}
          />
        )}
        <Card size='5'>
          <IconButton 
            size='3' 
            onClick={() => handleGoTo('addKid')}>
            { plus }
          </IconButton>
        </Card>
      </Flex> }
      
    </>
  );
}
