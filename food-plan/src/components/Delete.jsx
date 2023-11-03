import { useDeleteChild } from "../serverStore/mutations"
import { useState } from "react"

export const DeleteChild = ({ child, closeChild }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const deleteHandler = () => {
    setShowConfirm(true)
  }

  const deleteChild = useDeleteChild()
  const confirmDelete = () => {
    deleteChild.mutate(child)
    closeChild()
  }

  const cancelDelete = () => {
    setShowConfirm(false)
  }

  return (
    <>
    {
      showConfirm ? <>
        <p>Do you want to delete {child.name}? All records for that child will be lost.</p>
        <button onClick={ confirmDelete }>Confirm</button>
        <button onClick={ cancelDelete }>Cancel</button>
      </>
      : <button onClick={ deleteHandler }>Delete</button>
    }
    </>
  )
}

