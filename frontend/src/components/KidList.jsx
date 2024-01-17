import KidInList from './KidInList.jsx';
import { Button, Flex, Heading, Strong } from '@radix-ui/themes'

export const KidList = ({ kidData, handleGoToKid, handleGoTo }) => {

  return (
    <>
      <Heading align='center' m='3'>Kids</Heading>
      { kidData ? <Flex direction='row' wrap='wrap' gap='3' >
        { kidData?.map(kid => 
          <KidInList 
            key={ kid.id } 
            kid={ kid } 
            openAddExposure={ () => handleGoToKid('addExposure', kid) }
            openKid={ () => handleGoToKid('kid', kid) }
            openEditKid={ () => handleGoToKid('editKid', kid)}
          />
        )}
      </Flex> : <p>no children</p>}
      <Button size='3' mt='3' mx='auto'
      onClick={() => handleGoTo('addKid')}><Strong >+</Strong></Button>
    </>
  );
}
