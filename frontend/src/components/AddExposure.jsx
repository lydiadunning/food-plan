import { useCreateExposure } from "../serverStore/mutations"
import { useForm } from "react-hook-form"

const AddExposure = ({ kid, handleGoBack }) => {
  const {register, handleSubmit} = useForm()

  const today = new Date().toISOString().substring(0, 10)
  console.log('today', today)
  
  const createExposure = useCreateExposure(kid._id)

  const onSubmit = (data) => {
    console.log('AddExposure onSubmit', {data})

    createExposure.mutate(data)
    
    handleGoBack()
  }

  console.log('kid.outcomeOptions', kid.outcomeOptions)

  return (
    <>
      <h1>Add Intro</h1>
      <form onSubmit={ () => handleSubmit(onSubmit) }>
        <label htmlFor='food'>food</label>
        <input id='food' type='text' required {...register('food')} />
        <label htmlFor='description'>description</label>
        <input id='description' type='text' required {...register('description')} />
        <label htmlFor='outcomeOption'>what did { kid.name } do?</label>
        <select id='outcomeOption' {...register('outcomeOption')}>
          { kid.outcomeOptions.map( x => <option key={x._id} value={x._id}>{x.outcomeOption}</option> ) }
        </select>
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