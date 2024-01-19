import { useDeleteKid } from "../serverStore/mutations"
import { useState } from "react"
import { Button, Card } from '@radix-ui/themes'
import * as Popover from '@radix-ui/react-popover'
import { x } from '../assets/svgImages';

export const DeleteKid = ({ kid, closeKid }) => {

  const deleteKid = useDeleteKid()
  const confirmDelete = () => {
    console.log('delete confirmed')
    deleteKid.mutate(kid)
    closeKid()
  }

  return (
    <Popover.Root>
      <Popover.Content className='popover'>
        <Card>
          <Button onClick={ confirmDelete }>Confirm</Button>
          <Popover.Close style={{padding: '3px 3px 0 3px', border: 'none', marginLeft: '3px'}}>{ x }</Popover.Close>
          <Popover.Arrow className='popover-arrow'/>
        </Card>
      </Popover.Content>
      <Popover.Trigger asChild >
        <Button>Delete</Button>
      </Popover.Trigger>
    </Popover.Root>
    
  )
}

