import {useState, React} from 'react';
// a component for adding a child, during app setup

const AddChild = ({ setChild }) => {
  
  const createGoal = (text = 'introduce a new food each day') => {
    const date = new Date() 
    date.setDate(date.getDate() + 7);
    console.log(date)

    return {
      description: text,
      endDate: date,
    }
  }

  const createThresholds = () => {
    return []
    // return ['pick up with fork', 'smell', 'touch', 'lick', 'place in mouth', 'bite']
  }

  const createChild = (name) => {
    setChild({
      'name': name,
      thresholds: createThresholds(),
      goal: createGoal(),
    })
  }

  const [form, setForm] = useState('') 

  const clickHandler = (event) => {
    createChild(form)
  }
  
  return(
    <form className="new-child">
      <label className="name" > Child
      <input type='text' placeholder="name"
        value={ form} onChange={ e => { 
          setForm(e.target.value)
        }} />
      </label>
    <button onClick={ clickHandler }>Done</button>
	</form>
	)
}

export default AddChild;