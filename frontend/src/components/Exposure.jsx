const Exposure = ({ exposure, openEditExposures }) => {

  const date = new Date(exposure.date) || null

  return (
    <section>
      <p>Food: { exposure.food }</p>
      <p>Description: { exposure.description }</p>
      { exposure.outcomes.length > 0 && <p>Outcome: { exposure.outcomes.join(', ') }</p> } 
      { exposure.meal && <p>Meal: { exposure.meal }</p> }
      { exposure.date && <p>Date: { date.toDateString() }</p>}
      <button onClick={ () => openEditExposures(exposure) }>Edit Exposure</button>
    </section>
  )
}

export default Exposure