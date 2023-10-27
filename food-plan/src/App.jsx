import './App.css'
import { useState } from 'react';
import AddChild from './components/AddChild.jsx'
import { ChildList } from './components/ChildList';
import { useChildren } from './serverStore/queries';
// import { UpdateChild } from './serverStore/mutations';



function App() {
  const [showAddChild, setShowAddChild] = useState(false)


  // react-query used here. Comments stay until I'm more familiar with using the technology.
  // using react-query and axios to simplify state management for values retrieved from the server.
  // gets result of query with useChildren
  const { isLoading, error, data } = useChildren()

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  // after getting the data and confirming it has loaded without errors, use the data.
  const children = data.data
  // end of react-query behavior


  return (
    <div className="App">
      { 
        !showAddChild 
        ? <ChildList childData={children} setShowAddChild={setShowAddChild}/>
        : <AddChild setShowAddChild={setShowAddChild}/>
      }
    </div>
  );
}




export default App
