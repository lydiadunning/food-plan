import { useCreateIntro } from "../serverStore/mutations"
import { useForm } from "react-hook-form"

const AddIntro = ({ child, closeAddIntro }) => {
  const {register, handleSubmit} = useForm()

  const today = new Date().toISOString().substring(0, 10)
  console.log('today', today)
  
  const createIntro = useCreateIntro(child._id)

  const onSubmit = (data) => {
    createIntro.mutate(data)
    console.log('data', data)
    closeAddIntro()
  }

  console.log('child.tries', child.tries)

  return (
    <>
      <h1>Add Intro</h1>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor='food'>food</label>
        <input id='food' type='text' required {...register('food')} />
        <label htmlFor='description'>description</label>
        <input id='description' type='text' required {...register('description')} />
        <label htmlFor='try'>what did { child.name } try?</label>
        <select id='try' {...register('try')}>
          { child.tries.map( x => <option key={x._id} value={x._id}>{x.try}</option> ) }
        </select>
        <label htmlFor='meal'>meal</label>
        <input id='meal' type='text' {...register('meal')}></input>
        <label htmlFor='date'>date</label>
        <input id='date' type='date' defaultValue={today} {...register("date", { valueAsDate: true })} />
        <button type='submit'>submit</button>
      </form>
      <button onClick={ closeAddIntro }>Back</button>
    </>
  )
}

export default AddIntro