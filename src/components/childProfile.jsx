import {useState, React} from 'react';
import AddChild from './addChild';
// a component for adding a child, during app setup

const ChildProfile = () => {

  const childState = {
    name: '',
    thresholds: [],
    goal: null,
  }
  
  const [child, setChild] = useState(childState)

  if (child.name === '') {
    return (
      <AddChild setChild={ setChild } ></AddChild>
    )
  }

  // the below code uses the threshold's index as a key, a react anti-pattern. This was chosen for expediency
  // currently, this list is constant. Keys will be necessary when implementing changeable thresholds. 
  return(
    <section className={ child.name }>
      <h2>{ child.name }</h2>
      <h3>Thresholds <a href="">✏️</a></h3>
      <ol>
        { child.thresholds.map((threshold, index) => <li key={index}>{ threshold }</li>) }
      </ol>
      <h3>Goal <a href="">✏️</a></h3>
      <p>{ child.goal.description}</p>
      <p>until { child.goal.endDate.toDateString() }</p>
    </section>
	)
}

export default ChildProfile;