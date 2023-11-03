import { useCreateChild} from '../serverStore/mutations'
import axios from "axios"
import { useMutation, useQueryClient } from 'react-query';

export default function SavePage({ childName, tries, closeAddChild }) {

  const queryClient = useQueryClient()

  const baseUrl = 'http://localhost:2002/api/'
  const mutation = useCreateChild()

  const saveHandler = (e) => {
    e.preventDefault()
    const child = {
      name: childName,
      tries: tries
    }
    mutation.mutate(child)
    closeAddChild()
  }
  const child = {
    name: childName,
    tries: tries
  }
  
  return (
    <>
      <h3>{childName}</h3>
      {tries?.map( x => <p key={x._id}>{x.try}</p>)}
      <button onClick={saveHandler}>Save</button>
    </>
  )
}