import {useState, React} from 'react';

const SetThresholds = ({ child, setChild, keepEditing }) => {
  
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

  const defaults = allDefaultThresholds.map((x, i) => {
    return {
      text: x,
      key: i,
      isActive: false,
      isDefault: true
    }
  })

  const allKeys = child.thresholds.map(x => x.key)

  const startingThresholds = child.thresholds.length === 0 ? defaults :
    child.thresholds.concat(defaults.filter(threshold => !allKeys.includes(threshold.key)))

  const [allThresholds, setAllThresholds] = useState(startingThresholds)

  const getActiveThresholds = () => {
    return allThresholds.filter(x =>  x.isActive )
  }

  const checkboxHandler = (e) => {
    const key = parseInt(e.target.value)
    setAllThresholds(
      allThresholds.map(x => {
        if (key === x.key) {
          return {
            ...x,
            isActive: !x.isActive
          }
        }
        return x
      })
    )
  }

  const acceptThresholds = () => {
    const active = getActiveThresholds()
    setChild({...child, 'thresholds': active})
    keepEditing(false)
  }

  const customHandler = (e) => {
    if (e.key === 'Enter') {
      // interface with database, use db provided index
      let newKey = allThresholds.length + 1
      setAllThresholds([...allThresholds, {
        text: e.target.value,
        key: newKey,
        isActive: false,
        isDefault: false
      }])
      e.value = ''
    }
  }

console.log('allActiveThresholds', getActiveThresholds())

  return(
    <section>
      <h2>Set Thresholds</h2>
      <ol>
        {allThresholds.map((threshold, index) => {
          return (
            <li>
              <label>{ threshold.text }</label>
              <input
                type="checkbox"
                id={`checkbox-${threshold.key}`}
                name={threshold.text}
                value={threshold.key}
                onChange={checkboxHandler}
                checked={threshold.isActive}
              />
            </li>
            
          )
        })}
      </ol>
      <input type='text' onKeyUp={customHandler} placeholder='Custom Threshold'></input>
      <br></br>
      <button type='button' onClick={acceptThresholds}>Measure these Thresholds</button>
      {getActiveThresholds().map((x, i) => { return <p>{x.text}</p> })}
    </section>
	)
}

export default SetThresholds;