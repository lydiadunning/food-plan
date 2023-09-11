import Home from './home'
// interface for adding a new introduction and saving it.

const AddIntroduction = ({ child }) => {
  // doesn't pass up props for the introduction, it would be added immediately to the database.
  return (
    <section>
      <h2>Add an Introduction</h2>
      <form>
        <label for='food'>Food Introduced</label>
        <input id='food'></input>
        <label for='description'>Description</label>
        <input id='description'></input>
        <label for='meal'>Meal Time</label>
        <input id='meal'></input>
        <label for="threshold">Threshold Passed:</label>
          <select name="" id="threshold">
            {child.thresholds.map(x => <option value="">{ x }</option>)}
          </select>
        <button type='submit' onClick={() => <Home/>}>Log for { child.name }</button>
      </form>
    </section>
  )
}

export default AddIntroduction