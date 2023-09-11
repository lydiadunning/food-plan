import {useState, React} from 'react';
import AddChild from './addChild';
import SetThresholds from './setThresholds';
import SetGoal from './setGoal';
// a component for adding a child, during app setup

const ChildProfile = ({ child, setChild }) => {

  const isChildThreshold = child ? Object.keys(child.thresholds).length === 0 : false
  const [isEditingThresholds, setIsEditingThresholds] = useState(isChildThreshold)

  // TO DO: fix this
  const handleEditThresholds = () => {
    setIsEditingThresholds(true)
  }

  // the below code uses the threshold's index as a key, a react anti-pattern. This was chosen for expediency
  // currently, this list is constant. Keys will be necessary when implementing changeable thresholds. 
  return child.name === '' 
    ? <AddChild setChild={ setChild } ></AddChild>
    : isEditingThresholds 
    ? <SetThresholds child={ child } setChild={ setChild } keepEditing={setIsEditingThresholds}></SetThresholds>
    : (
      <section className={ child.name }>
        <h2>{ child.name }</h2>
        <h3>Thresholds <button onClick={handleEditThresholds}>✏️</button></h3>
        <ol>
          { child.thresholds.map(threshold => <li key={threshold.key}>{ threshold.text }</li>) }
        </ol>
        {/* <h3>Goal <a href="">✏️</a></h3>
        <p>{ child.goal.description}</p>
        <p>until { child.goal.endDate.toDateString() }</p> */}
        <SetGoal child={child} setChild={setChild}></SetGoal>
        <br/>
        <br/>
      </section>
	  )
}

export default ChildProfile;