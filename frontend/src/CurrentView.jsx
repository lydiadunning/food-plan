import AddKid from './components/AddKid.jsx'
import AddExposure from './components/AddExposure.jsx'
import Kid from './components/Kid';
import EditKid from './components/EditKid.jsx'
import { KidList } from './components/KidList';
import { Login } from './components/userAuth/Login.jsx'


const CurrentView = ({ current, kid, setKid, setUser, kids, handleHistory }) => {
  console.log('in CurrentView', current)

  const {handleGoTo, handleGoBack, handleGoBackTo} = handleHistory

  const handleGoToKid = (target, kid) => {
    setKid(kid)
    handleGoTo(target)
  }

  switch (current) {
    case 'login':
      return <Login setUser={setUser} handleGoTo={handleGoTo} />;
    case 'addExposure':
      return <AddExposure kid={kid} handleGoBack={handleGoBack} />;
    case 'editKid':
      return <EditKid kid={kid} handleGoBack={handleGoBack} />;
    case 'addKid':
      return <AddKid handleGoBack={handleGoBack}/>;
    case 'kid':
      return <Kid kid={kid} handleGoToKid={handleGoToKid} handleGoBack={handleGoBack}/>;
    case 'kidList':
      return <KidList kidData={kids} handleGoTo={handleGoTo} handleGoToKid={handleGoToKid} handleGoBack={handleGoBack}/>;
    default:
      throw Error(`Lost in the sauce, current: ${current}`);
  }
}

export default CurrentView

