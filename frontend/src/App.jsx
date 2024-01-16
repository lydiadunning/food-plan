// import './App.css'
import { useState } from 'react';

import { useKids } from './serverStore/queries';
import { 
  useHistory,
  useHistoryDispatch,
} from './components/history/useHistory.jsx'
import CurrentView from './CurrentView.jsx';
import TopBar from './components/TopBar.jsx';
import { Container } from '@radix-ui/themes'


function App() {
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

  function handleResetTo(target) {
    dispatch({
      type: 'resetto',
      target: target,
    });
  }


  const handleHistory = {
    handleGoTo,
    handleGoBack,
    handleGoBackTo,
    handleResetTo
  }

  const current = history.current

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
    <Container className="App, container-v">
      <TopBar handleResetTo={handleResetTo}/>
      <CurrentView current={current} kid={kid} setKid={setKid} kids={kids} handleHistory={handleHistory} />
    </Container>
  );
}




export default App
