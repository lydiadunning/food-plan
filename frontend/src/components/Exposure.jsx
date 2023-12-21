import { useExposure } from '../serverStore/queries.jsx'

const Exposure = ({ kidId, exposure, openEditExposures }) => {
  // const { isLoading, error, data } = useExposure(kidId, exposure.id)
  // console.log({kidId}, {exposureId: exposure.id})

  // if (isLoading) return 'Loading...'
  // if (error) return 'An error has occurred: ' + error.message

  // const exposure = data.data

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