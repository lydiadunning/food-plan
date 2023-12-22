import './App.css'
import { useEffect, useReducer, useState } from 'react';
import AddKid from './components/AddKid.jsx'
import AddExposure from './components/AddExposure.jsx'
import Kid from './components/Kid';
import EditKid from './components/EditKid.jsx'
import { KidList } from './components/KidList';
import { Login } from './components/userAuth/Login.jsx'
import { useKids } from './serverStore/queries';
// import { UpdateKid } from './serverStore/mutations';
import { checkForLogin } from './components/userAuth/userHooks.jsx';
import { 
  useHistory,
  useHistoryDispatch,
  HistoryContextProvider, 
} from './components/history/useHistory.jsx'
import CurrentView from './CurrentView.jsx';



function App() {
  // too much. consolidate.
  const [showAddKid, setShowAddKid] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [showAddExposure, setShowAddExposure] = useState(false)
  const [showKid, setShowKid] = useState(false)
  const [showEditKid, setShowEditKid] = useState(false)

  const [user, setUser] = useState({ id: ''})
  const [kid, setKid] = useState(null)

  const dispatch = useHistoryDispatch()
  const history = useHistory()

  function handleGoTo(target) {
    dispatch({
      type: 'goto',
      target: target
    });
  }

  function handleGoBack() {
    dispatch({
      type: 'goback',
    });
  }

  function handleGoBackTo(target) {
    dispatch({
      type: 'gobackto',
      target: target,
    });
  }

  const handleHistory = {
    handleGoTo,
    handleGoBack,
    handleGoBackTo
  }

  const current = history.current

  useEffect( () => {
    const user = checkForLogin()
    if (user) {
      setUser(user)
      setShowLogin(false)
      handleGoTo('kidList')
    } else {
      handleGoTo('login')
    }
  }, [])

  // react-query used here. Comments stay until I'm more familiar with using the technology.
  // using react-query and axios to simplify state management for values retrieved from the server.
  // gets result of query with useKids
  // delay loading kids until after a user is signed in.
  const { isLoading, error, data } = useKids(user.id)

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

  const openAddExposure = (kid) => {
    setKid(kid)
    setShowAddExposure(true)
  }

  const closeAddExposure = () => {
    setShowAddExposure(false)
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
      <CurrentView current={current} kid={kid} setKid={setKid} setUser={setUser} kids={kids} handleHistory={handleHistory} />
      
      {/* { 
        showLogin
        ? <Login setUser={setUser} closeLogin={() => setShowLogin(false)}/>
        : showAddExposure 
        ? <AddExposure kid={kid} closeAddExposure={closeAddExposure} />
        : showEditKid
        ? <EditKid kid={kid} closeEditKid={closeEditKid} />
        : showAddKid 
        ? <AddKid closeAddKid={closeAddKid}/>
        : showKid
        ? <Kid kid={kid} openAddExposure={openAddExposure} closeKid={closeKid} openEditKid={openEditKid} />
        : <>
            <KidList kidData={kids}  openAddExposure={openAddExposure} openKid={openKid} openEditKid={openEditKid} closeKid={closeKid}/>
            <button onClick={openAddKid}>Add a kid</button>
          </>
      } */}
    </div>
  );
}




export default App
