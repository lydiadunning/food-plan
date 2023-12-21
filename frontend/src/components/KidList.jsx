import KidInList from './KidInList.jsx';
import { useDeleteKid, useUpdateKid } from '../serverStore/mutations.jsx'


export const KidList = ({ kidData, openAddExposure, openKid, openEditKid, closeKid }) => {

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
            openAddExposure={ openAddExposure }
            openKid={ openKid }
            openEditKid={openEditKid}
            closeKid={closeKid}
          />
        )}
      </ul> : <p>no children</p>}
    </>
  );
}
