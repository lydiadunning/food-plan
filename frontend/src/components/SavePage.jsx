import { useNavigate } from 'react-router-dom'
import { useCreateKid } from '../serverStore/mutations'
import { Button } from '@radix-ui/themes'

export default function SavePage({ kidName, outcomeOptions }) {
  const navigate = useNavigate()
  const createKid = useCreateKid()

  const saveHandler = (e) => {
    e.preventDefault()
    const kid = {
      name: kidName,
      outcomeOptions: outcomeOptions.map((option) => {
        return { outcome: option.outcome }
      }),
    }
    createKid.mutate(kid)
    navigate('/kidlist')
  }

  return (
    <>
      <h3>{kidName}</h3>
      {outcomeOptions?.map((x) => (
        <p key={x.id}>{x.outcome}</p>
      ))}
      <Button size='3' mr='3' onClick={saveHandler}>
        Save
      </Button>
    </>
  )
}
