import ChildInList from './ChildInList.jsx';
import { useDeleteChild, useUpdateChild } from '../serverStore/mutations.jsx'


export const ChildList = ({ childData, openAddIntro, openChild, openEditChild, closeChild }) => {

  const deleteChild = useDeleteChild()
  const updateChild = useUpdateChild()

  return (
    <>
      <h1>Children</h1>
      { childData ? <ul>
        { childData?.map(child => 
          <ChildInList 
            key={ child._id } 
            child={ child } 
            updateChild={ () => updateChild.mutate(child)}
            deleteChild={ () => deleteChild.mutate(child) }
            openAddIntro={ openAddIntro }
            openChild={ openChild }
            openEditChild={openEditChild}
            closeChild={closeChild}
          />
        )}
      </ul> : <p>no children</p>}
    </>
  );
}
