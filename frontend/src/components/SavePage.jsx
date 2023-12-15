import { useCreateKid} from '../serverStore/mutations'

export default function SavePage({ kidName, tries, closeAddKid }) {

  const mutation = useCreateKid()

  const saveHandler = (e) => {
    e.preventDefault()
    const kid = {
      name: kidName,
      tries: tries
    }
    mutation.mutate(kid)
    closeAddKid()
  }
  
  return (
    <>
      <h3>{kidName}</h3>
      {tries?.map( x => <p key={x._id}>{x.try}</p>)}
      <button onClick={saveHandler}>Save</button>
    </>
  )
}