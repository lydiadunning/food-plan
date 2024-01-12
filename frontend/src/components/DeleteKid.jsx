import { useDeleteKid } from "../serverStore/mutations"
import { useState } from "react"

export const DeleteKid = ({ kid, closeKid }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const deleteHandler = () => {
    setShowConfirm(true)
  }

  const deleteKid = useDeleteKid()
  const confirmDelete = () => {
    // console.log('delete confirmed')
    deleteKid.mutate(kid)
    closeKid()
  }

  const cancelDelete = () => {
    setShowConfirm(false)
  }

  return (
    <>
    {
      showConfirm ? <>
        <p>Do you want to delete {kid.name}? All records for that kid will be lost.</p>
        <button onClick={ confirmDelete }>Confirm</button>
        <button onClick={ cancelDelete }>Cancel</button>
      </>
      : <button onClick={ deleteHandler }>Delete</button>
    }
    </>
  )
}

