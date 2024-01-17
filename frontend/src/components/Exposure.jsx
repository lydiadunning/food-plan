import { Button, Card } from '@radix-ui/themes'

const Exposure = ({ exposure, openEditExposures }) => {

  const date = exposure.date ? new Date(exposure.date) : null

  return (
    <Card>
      <p>Food: { exposure.food }</p>
      <p>Description: { exposure.description }</p>
      { exposure.outcomes.length > 0 && <p>Outcome: { exposure.outcomes.join(', ') }</p> } 
      { exposure.meal && <p>Meal: { exposure.meal }</p> }
      { exposure.date && <p>Date: { date.toDateString() }</p>}
      <Button variant='outline' onClick={ () => openEditExposures(exposure) }>Edit Exposure</Button>
    </Card>
  )
}

export default Exposure