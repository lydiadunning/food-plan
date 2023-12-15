import { useExposure } from '../serverStore/queries.jsx'

const Exposure = ({ exposureId, openEditExposures }) => {
  const { isLoading, error, data } = useExposure(exposureId)

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  const exposure = data.data

  return (
    <section>
      <p>Food: { exposure.food }</p>
      <p>Description: { exposure.description }</p>
      { exposure.outcome && <p>Tried: { exposure.outcome }</p> }
      { exposure.meal && <p>Meal: { exposure.meal }</p> }
      { exposure.date && <p>Date: { exposure.date.toString() }</p>}
      <button onClick={ () => openEditExposures(exposure) }>Edit Exposure</button>
    </section>
  )
}

export default Exposure