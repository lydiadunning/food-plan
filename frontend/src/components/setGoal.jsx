import {useState, React} from 'react';

const SetGoal = ({ child, setChild }) => {
  
  const defaultGoal = 'introduce a new food each day'
  const [endDate, setEndDate] = useState(null)
  const [duration, setDuration] = useState(null)
  const [goalCache, setGoalCache] = useState(null)
  const [newGoal, setnewGoal] = useState(child.goal)

  const createGoal = (text = defaultGoal) => {
    const date = new Date() 
    date.setDate(date.getDate() + 7);
    console.log(date)

    return {
      description: text,
      endDate: date,
      success: 0 // up to 5
    }
  }

  const elapseTime = (change, units = 'week') => {
    const date = new Date() 
    if (units === 'week') {
      date.setDate(date.getDate() + (change * 7));
    } else if (units === 'min') {
      date.setDate(date.getMinutes() + change);
    }
    console.log(date.toString())
    return date
  }

  const newGoalHandler = (e) => {
    if (e.key === 'Enter') {
      setnewGoal(e.target.value)
    }
  }

  const acceptGoals = () => {
    setChild({...child, goal: {
      description: newGoal,
      'endDate': endDate,
      success: 0
    }})
  }
  
  const radioHandler = (e) => {
    console.log(e.target.value)
    switch (e.target.value) {
      case 'oneWeek':
        setEndDate(elapseTime(1))
        break;
      case 'twoWeek':
        setEndDate(elapseTime(2))
        break;
      case 'test':
        setEndDate(elapseTime(1, 'min'))
        break;
      default:
    }
  }

  const changeGoal = () => {
    setGoalCache(child.goal)
    setChild(c => { return {...c, goal: null}})
  }

  if (child.goal) {
    return(
      <section>
        <h2>Current Goal</h2>
        <p>{ child.goal.description }</p>
        <p>End Date: { child.goal.endDate.toDateString() }</p>
        <button type='button' onClick={changeGoal}>Change Goal</button>
      </section>
    )
  }  

  return(
    <section>
      <h2>Set a New Goal</h2>
      <form>
        <input name='goal' type='text' onKeyUp={newGoalHandler} placeholder='new Goal'></input>
        <label>Duration</label>
        <div>
          <input type="radio" value="oneWeek" name="duration" onChange={ radioHandler } /> 1 week
          <input type="radio" value="twoWeek" name="duration" onChange={ radioHandler } /> 2 weeks
          <input type="radio" value="test" name="duration" onChange={ radioHandler } /> 1 minute
        </div>
        <br></br>
        <button type='submit' onClick={acceptGoals}>Pursue this Goal</button>
      </form>
      
    </section>
	)
}

export default SetGoal