import './App.css'
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useKids } from './serverStore/queries';
import TopBar from './components/TopBar.jsx';
import { Container } from '@radix-ui/themes';
import AddKid from './components/AddKid.jsx'
import AddExposure from './components/exposureForms/AddExposure.jsx'
import Kid from './components/Kid';
import EditKid from './components/EditKid.jsx'
import { KidList } from './components/KidList';
import { LoginForm } from './components/userAuth/LoginForm.jsx'
import { checkForLogin } from './components/userAuth/userHooks.jsx';


function App() {
  const [kid, setKid] = useState(null)

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
       
  <Container style={{backgroundColor: 'var(--sand-3)'}} size='1' className="app" py='1' px='6'>
    <TopBar />
      
      <Routes>
        <Route path='/' element=
          { checkForLogin() ?  <Navigate to="/kidlist" replace={true} /> :  <Navigate to="/login" replace={true} /> }
        />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/addkid' element={<AddKid />}/>
        <Route path='/kidlist' element={<KidList kidData={kids} setKid={setKid} />} />

        {/* link to specific kid in the list */}
        <Route path='/kid/:kidid' element={<Kid kid={kid} />}/>
        <Route path='/kid/:kidid/editkid' element={<EditKid kid={kid} setKid={setKid}/>}/>
        <Route path='/kid/:kidid/addexposure' element={<AddExposure kid={kid}/>} />
        
      </Routes>
    </Container>
  );
}

export default App
