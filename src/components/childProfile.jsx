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

  const isChildThreshold = child ? Object.keys(child.thresholds).length === 0 : false
  const [isEditingThresholds, setIsEditingThresholds] = useState(isChildThreshold)


  if (child.name === '') {
    return (
      <AddChild setChild={ setChild } ></AddChild>
    )
  } else if (isEditingThresholds) {
    console.log('thresholds')
    return (<SetThresholds child={ child } setChild={ setChild } keepEditing={setIsEditingThresholds}></SetThresholds>)
  } else {
    console.log(child)
  }

  // TO DO: fix this
  const editThresholds = () => {
    setIsEditingThresholds(true)
  }

  // the below code uses the threshold's index as a key, a react anti-pattern. This was chosen for expediency
  // currently, this list is constant. Keys will be necessary when implementing changeable thresholds. 
  return(
    <section className={ child.name }>
      <h2>{ child.name }</h2>
      <h3>Thresholds <button onClick={editThresholds}>✏️</button></h3>
      <ol>
        { child.thresholds.map(threshold => <li key={threshold.key}>{ threshold.text }</li>) }
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