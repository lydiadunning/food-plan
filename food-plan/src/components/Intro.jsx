import { useIntro } from '../serverStore/queries.jsx'

const Intro = ({ introId, openEditIntros }) => {
  const { isLoading, error, data } = useIntro(introId)

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  const intro = data.data

  return (
    <section>
      <p>Food: { intro.food }</p>
      <p>Description: { intro.description }</p>
      { intro.try && <p>Tried: { intro.try }</p> }
      { intro.meal && <p>Meal: { intro.meal }</p> }
      { intro.date && <p>Date: { intro.date.toString() }</p>}
      <button onClick={ () => openEditIntros(intro) }>Edit Intro</button>
    </section>
  )
}

export default Intro