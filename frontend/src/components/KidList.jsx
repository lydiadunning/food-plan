import KidInList from './KidInList.jsx';
import { Button } from '@radix-ui/themes'

export const KidList = ({ kidData, handleGoToKid, handleGoTo }) => {

  return (
    <>
      <h1>Kids</h1>
      { kidData ? <ul className='container-v'>
        { kidData?.map(kid => 
          <KidInList 
            key={ kid.id } 
            kid={ kid } 
            openAddExposure={ () => handleGoToKid('addExposure', kid) }
            openKid={ () => handleGoToKid('kid', kid) }
            openEditKid={ () => handleGoToKid('editKid', kid)}
          />
        )}
      </ul> : <p>no children</p>}
      <Button onClick={() => handleGoTo('addKid')}>Add a kid</Button>
    </>
  );
}
