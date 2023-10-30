import ChildInfo from './childInfo';
import { useDeleteChild, useUpdateChild } from '../serverStore/mutations.jsx'

export const ChildList = ({ childData, openAddIntro }) => {

  const deleteChild = useDeleteChild()
  const updateChild = useUpdateChild()

  return (
    <>
      <h1>Children</h1>
      { childData ? <ul>
        { childData?.map(child => 
          <ChildInfo 
            key={ child._id } 
            child={ child } 
            updateChild={ () => updateChild.mutate(child)}
            deleteChild={ () => deleteChild.mutate(child) }
            openAddIntro={ openAddIntro }
          />
        )}
      </ul> : <p>no children</p>}
    </>
  );
}
