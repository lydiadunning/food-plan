import { useUpdateExposure } from "../serverStore/mutations"
import { useForm } from "react-hook-form"

const EditExposure = ({ kid, exposure, closeEditExposure }) => {
  const {register, handleSubmit} = useForm({
    defaultValues: {
      food: exposure.food,
      description: exposure.description,
      outcomes: exposure.outcomes,
      meal: exposure.meal,
      date: exposure.date.slice(0, 10)
    }
  })
  
  const updateExposure = useUpdateExposure(kid.id, exposure.id)

  const onSubmit = (data) => {
    updateExposure.mutate(data)
    closeEditExposure()
  }

  const formArray = kid.outcomeOptions.map(option => <label key={option.id} htmlFor={option.outcome}>{ option.outcome } <input type='checkbox' name='outcome' value={option.outcome} {...register('outcomes')}/></label>)

  return (
    <>
      <h1>Edit Exposure</h1>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor='food'>food</label>
        <input id='food' type='text' required {...register('food')} />
        <label htmlFor='description'>description</label>
        <input id='description' type='text' required {...register('description')} />
        <label htmlFor='outcome'>what did { kid.name } try?</label>
        {formArray}
        <label htmlFor='meal'>meal</label>
        <input id='meal' type='text' {...register('meal')}></input>
        <label htmlFor='date'>date</label>
        <input id='date' type='date' {...register("date", { valueAsDate: true })} />
        <button type='submit'>submit</button>
      </form>
      <button onClick={ closeEditExposure }>Back</button>
    </>
  )
}

export default EditExposure