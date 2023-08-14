import {useState, React} from 'react';
import AddChild from './addChild';
import SetThresholds from './setThresholds';
// a component for adding a child, during app setup

const ChildProfile = () => {

  const childState = {
    name: '',
    thresholds: [],
    goal: null,
  }
  
  const [child, setChild] = useState(childState)
  const [customThresholds, setCustomThresholds] = useState({})


  if (child.name === '') {
    return (
      <AddChild setChild={ setChild } ></AddChild>
    )
  } else if (Object.keys(child.thresholds).length === 0) {
    console.log('thresholds')
    return (<SetThresholds child={ child } setChild={ setChild }></SetThresholds>)
  }


  // the below code uses the threshold's index as a key, a react anti-pattern. This was chosen for expediency
  // currently, this list is constant. Keys will be necessary when implementing changeable thresholds. 
  return(
    <section className={ child.name }>
      <h2>{ child.name }</h2>
      <h3>Thresholds <a href="">✏️</a></h3>
      <ol>
        { Object.keys(child.thresholds).map(key => <li key={key}>{ child.thresholds[key] }</li>) }
      </ol>
      <h3>Goal <a href="">✏️</a></h3>
      <p>{ child.goal.description}</p>
      <p>until { child.goal.endDate.toDateString() }</p>
      <br/>
      <br/>
    </section>
	)
}

export default ChildProfile;