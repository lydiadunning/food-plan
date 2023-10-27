import ChildInfo from './childInfo';

export const ChildList = ({ childData, setShowAddChild }) => {

  return (
    <>
      <h1>Children</h1>
      {/* <button onClick={ getChildren }>Get Children</button> */}
      { childData ? <ul>
        { childData?.map(child => 
          <ChildInfo 
            key={ child._id } 
            child={ child } 
            updateChild={ (child) => 
              {console.log(`updating ${child.name}`)} 
            }
          />
        )}
      </ul> : <p>no children</p>}
      <button onClick={ () => setShowAddChild(true) }>Add a child</button>
    </>
  );
}
