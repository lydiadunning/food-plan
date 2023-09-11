import {useState, React} from 'react';
import ChildProfile from './childProfile';
import AddChild from './addChild';
import AddIntroduction from './addIntroduction'

const Home = () => {
  const [child, setChild] = useState({
    name: '',
    thresholds: [],
    goal: null,
  })

  const addIntroHandler = () => {
    console.log('in addIntroHandler')
    return <AddIntroduction child={ child }/>
  }

return child.name === ''
  ? <ChildProfile child={ child } setChild={ setChild }/>
// currently interrupts profile setup.
// the home page should probably access the database for child profiles. Pass as props to limit database usage, but don't pass child profile props from profile creation. 
  : (
    <section>
      {/* for this stage of development, display only one child. Haven't incorporated more than one yet. */}
      <h2>Children</h2> 
      <p>{ child.name }</p>
      <br/>
      <button onClick={ addIntroHandler }>Log a Food Introduction</button>
    </section>
  )
}

export default Home;