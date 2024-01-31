import KidInList from './KidInList.jsx';
import { IconButton, Flex, Heading, Card } from '@radix-ui/themes'
import { plus } from '../assets/svgImages.jsx';
import { useNavigate } from 'react-router-dom';

export const KidList = ({ kidData, setKid }) => {
  const navigate = useNavigate()

  const setKidAndNavigate = (url, kid) => {
    setKid(kid)
    navigate(url)
  }

  console.log({kidData})
  return (
    <>
      <Heading align='center' mt='3' mb='6'>Kids</Heading>
      { <Flex direction='column' gap='3' >
        { kidData?.map(kid => 
          <KidInList 
            key={ kid.id } 
            kid={ kid } 
            openAddExposure={ () => setKidAndNavigate(`/kid/${kid.id}/addexposure`, kid)}
            openKid={ () => setKidAndNavigate(`/kid/${kid.id}`, kid) }
            openEditKid={ () => setKidAndNavigate(`/kid/${kid.id}/editkid`, kid)}
          />
        )}
        <Card size='5'>
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
