import { useIntro } from '../serverStore/queries.jsx'

const Intro = ({ introId }) => {
  // intro query
  const { isLoading, error, data } = useIntro(introId)

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  const intro = data.data

  return (
    <section>
      <p>Food: { intro.food }</p>
      <p>Description: { intro.description }</p>
      { intro.meal && <p>Meal: { intro.meal }</p> }
      { intro.date && <p>Date: { intro.date.toString() }</p>}
    </section>
  )
}

export default Intro