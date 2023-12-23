const Exposure = ({ kidId, exposure, openEditExposures }) => {

  return (
    <section>
      <p>Food: { exposure.food }</p>
      <p>Description: { exposure.description }</p>
      {/* commenting out the outcome until it's converted into an array
       { exposure.outcome && <p>Tried: { exposure.outcome }</p> } */}
      { exposure.meal && <p>Meal: { exposure.meal }</p> }
      { exposure.date && <p>Date: { exposure.date.toString() }</p>}
      <button onClick={ () => openEditExposures(exposure) }>Edit Exposure</button>
    </section>
  )
}

export default Exposure