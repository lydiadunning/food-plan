import './App.css'
import { useState, useEffect } from 'react';
import ChildInfo from './components/childInfo';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import AddChild from './components/AddChild.jsx'




function App() {
  const [children, setChildren] = useState(null)
  const [showAddChild, setShowAddChild] = useState(false)

  useEffect(() => {
    fetch('http://localhost:2002/api/child')
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((children) => setChildren(children))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  async function getChildren() {
    const response = await fetch('http://localhost:2002/api/child')
    const children = await response.json();
    setChildren(children)
  }

  async function updateChild(child) {
    const allChildren = children.map(x => {
      if (x._id === child._id) {
        return child
      } else {
        return x
      }
    })
    setChildren(allChildren)
  }



  const listOfChildren = children?.map(child => <ChildInfo key={ child._id } child={ child } updateChild={ updateChild }/>)


  return (
    <div className="App">
      { !showAddChild &&
      <>
        <h1>Children</h1>
        <button onClick={ getChildren }>Get Children</button>
        { children ? <ul>{ listOfChildren }</ul> : <p>no children</p>}
        <button onClick={ () => setShowAddChild(true) }>Add a child</button>
      </>}
      {
        showAddChild &&
        <AddChild setShowAddChild={setShowAddChild}/>
      }
    </div>
  );
}

const queryClient = new QueryClient()

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Example />
//     </QueryClientProvider>
//   )
// }


export default App
