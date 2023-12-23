import './App.css'
import { useEffect, useState } from 'react';

import { useKids } from './serverStore/queries';
// import { UpdateKid } from './serverStore/mutations';
import { checkForLogin } from './components/userAuth/userHooks.jsx';
import { 
  useHistory,
  useHistoryDispatch,
} from './components/history/useHistory.jsx'
import CurrentView from './CurrentView.jsx';



function App() {
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
      handleGoTo('kidList')
    } else {
      handleGoTo('login')
    }
  }, [])

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

  return (
    <div className="App">
      <CurrentView current={current} kid={kid} setKid={setKid} setUser={setUser} kids={kids} handleHistory={handleHistory} />
    </div>
  );
}




export default App
