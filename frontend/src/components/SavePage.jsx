import { useCreateKid} from '../serverStore/mutations'

export default function SavePage({ kidName, outcomeOptions, closeAddKid }) {

  const mutation = useCreateKid()

  const saveHandler = (e) => {
    e.preventDefault()
    console.log({outcomeOptions})
    const kid = {
      name: kidName,
      outcomeOptions: outcomeOptions.map(option => {
        return {outcome: option.outcome}
      })
    }
    console.log({kid})
    mutation.mutate(kid)
    closeAddKid()
  }
  
  return (
    <>
      <h3>{kidName}</h3>
      {outcomeOptions?.map( x => <p key={x._id}>{x.outcome}</p>)}
      <button onClick={saveHandler}>Save</button>
    </>
  )
}