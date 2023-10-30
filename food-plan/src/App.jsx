import './App.css'
import { useState } from 'react';
import AddChild from './components/AddChild.jsx'
import AddIntro from './components/AddIntro.jsx'
import Child from './components/Child';
import { ChildList } from './components/ChildList';
import { useChildren } from './serverStore/queries';
// import { UpdateChild } from './serverStore/mutations';



function App() {
  // too much. consolidate.
  const [showAddChild, setShowAddChild] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showAddIntro, setShowAddIntro] = useState(false)
  const [showChild, setShowChild] = useState(false)
  const [introChild, setintroChild] = useState(null)
  const [child, setChild] = useState(null)

  // react-query used here. Comments stay until I'm more familiar with using the technology.
  // using react-query and axios to simplify state management for values retrieved from the server.
  // gets result of query with useChildren
  const { isLoading, error, data } = useChildren()

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  // after getting the data and confirming it has loaded without errors, use the data.
  const children = data.data
  // end of react-query behavior

  const closeAddChild = () => {
    setShowAddChild(false)
  }

  const openAddChild = () => {
    setShowAddChild(true)
  }

  const openAddIntro = (child) => {
    setintroChild(child)
    setShowAddIntro(true)
  }

  const closeAddIntro = () => {
    setShowAddIntro(false)
  }

  const openChild = (child) => {
    setChild(child)
    setShowChild(true)
  }

  const closeChild = () => {
    setShowChild(false)
  }

  return (
    <div className="App">
      { 
        showLogin
        ? <Login closeLogin={() => setShowLogin(false)}/>
        : showAddIntro 
        ? <AddIntro child={introChild} closeAddIntro={closeAddIntro} />
        : showAddChild 
        ? <AddChild closeAddChild={closeAddChild}/>
        : showChild
        ? <Child child={child} openAddIntro={openAddIntro} closeChild={closeChild} />
        : <>
            <ChildList childData={children}  openAddIntro={openAddIntro} openChild={openChild}/>
            <button onClick={openAddChild}>Add a child</button>
          </>
      }
    </div>
  );
}




export default App
