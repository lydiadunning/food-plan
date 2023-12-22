import KidInList from './KidInList.jsx';
import { useDeleteKid, useUpdateKid } from '../serverStore/mutations.jsx'


export const KidList = ({ kidData, handleGoToKid, handleGoTo, handleGoBack }) => {

  const deleteKid = useDeleteKid()
  const updateKid = useUpdateKid()

  return (
    <>
      <h1>Kids</h1>
      { kidData ? <ul>
        { kidData?.map(kid => 
          <KidInList 
            key={ kid._id } 
            kid={ kid } 
            updateKid={ () => updateKid.mutate(kid)}
            deleteKid={ () => deleteKid.mutate(kid) }
            openAddExposure={ () => handleGoToKid('addExposure', kid) }
            openKid={ () => handleGoToKid('kid', kid) }
            openEditKid={ () => handleGoToKid('editKid', kid)}
            closeKid={handleGoBack}
          />
        )}
      </ul> : <p>no children</p>}
      <button onClick={() => handleGoTo('addKid')}>Add a kid</button>
    </>
  );
}
