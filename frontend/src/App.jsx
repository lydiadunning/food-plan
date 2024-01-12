import './App.css'
import { useContext, useState } from 'react';
import {Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { useKids } from './serverStore/queries';
import { 
  useHistory,
  useHistoryDispatch,
} from './components/history/useHistory.jsx'
import CurrentView from './CurrentView.jsx';
import AddKid from './components/AddKid.jsx'
import AddExposure from './components/AddExposure.jsx'
import Kid from './components/Kid';
import EditKid from './components/EditKid.jsx'
import { KidList } from './components/KidList';
import { Login } from './components/userAuth/Login.jsx'
import { checkForLogin } from './components/userAuth/userHooks.jsx';
// import { UserContext } from './components/userAuth/userContext.js';



function App() {
  const [kid, setKid] = useState(null)
  // const user = useContext(UserContext)

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

  // const currentPath = `/${history.current}`

  // react-query used here. Comments stay until I'm more familiar with using the technology.
  // using react-query and axios to simplify state management for values retrieved from the server.
  // gets result of query with useKids
  // delay loading kids until after a user is signed in.
  const { isLoading, error, data } = useKids()

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  // after getting the data and confirming it has loaded without errors, use the data.
  const kids = data.data
  // end of react-query behavior  

  const handleGoToKid = (target, kid) => {
    setKid(kid)
    handleGoTo(target)
  }

  // return (
  //   <div className="App">
  //     <CurrentView current={current} kid={kid} setKid={setKid} kids={kids} handleHistory={handleHistory} />
  //   </div>
  // );
  console.log(checkForLogin(), checkForLogin() ? 'yes' : 'no')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element=
          { checkForLogin() ?  <Navigate to="/kidList" replace={true} /> :  <Navigate to="/login" replace={true} /> }
        />
        <Route path='/login' element={<Login handleGoTo={handleGoTo} />} />
        <Route path='/addExposure' element={<AddExposure kid={kid} handleGoBack={handleGoBack} />} />
        <Route path='/editKid' element={<EditKid kid={kid} handleGoBack={handleGoBack} />}/>
        <Route path='/addKid' element={<AddKid handleGoBack={handleGoBack}/>}/>
        <Route path='/kid' element={<Kid kid={kid} handleGoToKid={handleGoToKid} handleGoBack={handleGoBack}/>}/>
        <Route path='/kidList' element={<KidList kidData={kids} handleGoTo={handleGoTo} handleGoToKid={handleGoToKid} handleGoBack={handleGoBack}/>} />
      </Routes>
    </BrowserRouter>
  )
}

// default:
//   throw Error(`Lost in the sauce, current: ${current}`);
// }


export default App
