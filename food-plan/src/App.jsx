import './App.css'
import { useState } from 'react';
import AddChild from './components/AddChild.jsx'
import AddIntro from './components/AddIntro.jsx'
import { ChildList } from './components/ChildList';
import { useChildren } from './serverStore/queries';
// import { UpdateChild } from './serverStore/mutations';



function App() {
  const [showAddChild, setShowAddChild] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showAddIntro, setShowAddIntro] = useState(false)
  const [introChild, setintroChild] = useState(null)

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

  return (
    <div className="App">
      { 
        showLogin
        ? <Login closeLogin={() => setShowLogin(false)}/>
        : showAddIntro 
        ? <AddIntro child={introChild} closeAddIntro={closeAddIntro} />
        : showAddChild 
        ? <AddChild closeAddChild={closeAddChild}/>
        : <>
            <ChildList childData={children}  openAddIntro={openAddIntro}/>
            <button onClick={openAddChild}>Add a child</button>
          </>
      }
    </div>
  );
}




export default App
