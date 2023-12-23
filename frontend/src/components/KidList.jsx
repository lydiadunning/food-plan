import KidInList from './KidInList.jsx';

export const KidList = ({ kidData, handleGoToKid, handleGoTo }) => {

  return (
    <>
      <h1>Kids</h1>
      { kidData ? <ul>
        { kidData?.map(kid => 
          <KidInList 
            key={ kid._id } 
            kid={ kid } 
            openAddExposure={ () => handleGoToKid('addExposure', kid) }
            openKid={ () => handleGoToKid('kid', kid) }
            openEditKid={ () => handleGoToKid('editKid', kid)}
          />
        )}
      </ul> : <p>no children</p>}
      <button onClick={() => handleGoTo('addKid')}>Add a kid</button>
    </>
  );
}
