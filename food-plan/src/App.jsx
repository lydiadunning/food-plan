import './App.css'
import { useState } from 'react';
import ChildInfo from './components/childInfo';


function App() {
  const [children, setChildren] = useState(null)

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
      <h1>Children</h1>
      <button onClick={ getChildren }>Get Children</button>
      { children ? <ul>{ listOfChildren }</ul> : <p>no children</p>}
    </div>
  );
}

export default App
