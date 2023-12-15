import './App.css'
import { useState } from 'react';
import AddKid from './components/AddKid.jsx'
import AddIntro from './components/AddExposure.jsx'
import Kid from './components/Kid';
import EditKid from './components/EditKid.jsx'
import { KidList } from './components/KidList';
import { useKids } from './serverStore/queries';
// import { UpdateKid } from './serverStore/mutations';



function App() {
  // too much. consolidate.
  const [showAddKid, setShowAddKid] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showAddIntro, setShowAddIntro] = useState(false)
  const [showKid, setShowKid] = useState(false)
  const [showEditKid, setShowEditKid] = useState(false)

  const [kid, setKid] = useState(null)

  // react-query used here. Comments stay until I'm more familiar with using the technology.
  // using react-query and axios to simplify state management for values retrieved from the server.
  // gets result of query with useKids
  const { isLoading, error, data } = useKids()

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  // after getting the data and confirming it has loaded without errors, use the data.
  const kids = data.data
  // end of react-query behavior

  const closeAddKid = () => {
    setShowAddKid(false)
  }

  const openAddKid = () => {
    setShowAddKid(true)
  }

  const openAddIntro = (kid) => {
    setKid(kid)
    setShowAddIntro(true)
  }

  const closeAddIntro = () => {
    setShowAddIntro(false)
  }

  const openKid = (kid) => {
    setKid(kid)
    setShowKid(true)
  }

  const closeKid = () => {
    setShowKid(false)
    setKid(null)
  }

  const openEditKid = (kid) => {
    setShowEditKid(kid)
    setKid(kid)
  }

  const closeEditKid = () => {
    setShowEditKid(false)
  }

  return (
    <div className="App">
      { 
        showLogin
        ? <Login closeLogin={() => setShowLogin(false)}/>
        : showAddIntro 
        ? <AddIntro kid={kid} closeAddIntro={closeAddIntro} />
        : showEditKid
        ? <EditKid kid={kid} closeEditKid={closeEditKid} />
        : showAddKid 
        ? <AddKid closeAddKid={closeAddKid}/>
        : showKid
        ? <Kid kid={kid} openAddIntro={openAddIntro} closeKid={closeKid} openEditKid={openEditKid} />
        : <>
            <KidList kidData={kids}  openAddIntro={openAddIntro} openKid={openKid} openEditKid={openEditKid} closeKid={closeKid}/>
            <button onClick={openAddKid}>Add a kid</button>
          </>
      }
    </div>
  );
}




export default App
