import { useCreateKid} from '../serverStore/mutations'

export default function SavePage({ kidName, outcomeOptions, handleGoBack }) {

  const createKid = useCreateKid()

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
    createKid.mutate(kid)
    handleGoBack()
  }
  
  return (
    <>
      <h3>{kidName}</h3>
      {outcomeOptions?.map( x => <p key={x._id}>{x.outcome}</p>)}
      <button onClick={saveHandler}>Save</button>
    </>
  )
}