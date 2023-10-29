import ChildInfo from './childInfo';

export const ChildList = ({ childData }) => {

  return (
    <>
      <h1>Children</h1>
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
    </>
  );
}
