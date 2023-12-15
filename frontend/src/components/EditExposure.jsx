import { useUpdateIntro } from "../serverStore/mutations"
import { useForm } from "react-hook-form"

const EditIntro = ({ kid, exposure, closeEditIntro }) => {
    const {register, handleSubmit} = useForm({
    defaultValues: {
      food: exposure.food,
      description: exposure.description,
      try: exposure.try,
      meal: exposure.meal,
      date: exposure.date.slice(0, 10)
    }
  })
  
  const updateIntro = useUpdateIntro(exposure._id)

  const onSubmit = (data) => {
    updateIntro.mutate(data)
    console.log('data', data)
    closeEditIntro()
  }

  return (
    <>
      <h1>Edit Intro</h1>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor='food'>food</label>
        <input id='food' type='text' required {...register('food')} />
        <label htmlFor='description'>description</label>
        <input id='description' type='text' required {...register('description')} />
        <label htmlFor='try'>what did { kid.name } try?</label>
        <select id='try' {...register('try')}>
          { kid.tries.map( x => <option key={x._id} value={x._id}>{x.try}</option> ) }
        </select>
        <label htmlFor='meal'>meal</label>
        <input id='meal' type='text' {...register('meal')}></input>
        <label htmlFor='date'>date</label>
        <input id='date' type='date' {...register("date", { valueAsDate: true })} />
        <button type='submit'>submit</button>
      </form>
      <button onClick={ closeEditIntro }>Back</button>
    </>
  )
}

export default EditIntro