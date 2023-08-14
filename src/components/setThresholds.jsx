import {useState, React} from 'react';
// a component for adding a child, during app setup

const SetThresholds = ({ child, setChild }) => {
  
  const allDefaultThresholds = [
    'on the plate',
    'poke with a fork',
    'pick up with a fork', 
    'smell', 
    'touch', 
    'lick', 
    'place in mouth', 
    'bite',
    'multiple bites',
    'eat small portion',
    'eat average portion'
  ]

  const [thresholds, setThresholds] = useState({})

  const checkboxHandler = (e) => {
    const index = e.target.value
    console.log('checking', index, e.target.name)
    if (index in thresholds) {
      console.log(index,'in there')
      const {[index]: discard, ...rest} = thresholds
      console.log('rest', rest, 'index', discard)
      setThresholds(rest)
    } else {
      setThresholds({...thresholds, [index]: e.target.name})
    }  
  }
  console.log(setChild)

  const acceptThresholds = () => {
    setChild({...child, 'thresholds': thresholds})
  }
  
console.log(thresholds)

  return(
    <section>
      <h2>Set Thresholds</h2>
      <ol>
        {allDefaultThresholds.map((threshold, index) => {
          return (
            <li>
              <label>{ threshold }</label>
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                name={threshold}
                value={index}
                onChange={checkboxHandler}
              />
            </li>
            
          )
        })}
      </ol>
      <button onClick={acceptThresholds}>Measure these Thresholds</button>
      {Object.values(thresholds).map((x, i) => { return <p>{x}</p> })}
    </section>
	)
}

export default SetThresholds;