import { useCreateExposure } from "../serverStore/mutations"
import { useForm } from "react-hook-form"

const AddExposure = ({ kid, handleGoBack }) => {
  const {register, handleSubmit} = useForm()

  const today = new Date().toISOString().substring(0, 10)
  
  console.log('addExposure', 'kid', kid, kid._id)
  
  const createExposure = useCreateExposure(kid._id)

  const submit = (data) => {
    console.log('AddExposure onSubmit', {data})

    createExposure.mutate(data)
    
    handleGoBack()
  }

  const formArray = kid.outcomeOptions.map(option => <label key={option._id} htmlFor={option.outcome}>{ option.outcome } <input type='checkbox' name='outcome' value={option.outcome} {...register('outcomes')}/></label>)

  return (
    <>
      <h1>Add Intro</h1>
      <form onSubmit={ handleSubmit(submit) }>
        <label htmlFor='food'>food</label>
        <input id='food' type='text' required {...register('food')} />
        <label htmlFor='description'>description</label>
        <input id='description' type='text' required {...register('description')} />
        <legend>what did { kid.name } do?</legend>
        {formArray}
        <br/>
        <label htmlFor='meal'>meal</label>
        <input id='meal' type='text' {...register('meal')}></input>
        <label htmlFor='date'>date</label>
        <input id='date' type='date' defaultValue={today} {...register("date", { valueAsDate: true })} />
        <button type='submit'>submit</button>
      </form>
      <button onClick={ handleGoBack }>Back</button>
    </>
  )
}

export default AddExposure