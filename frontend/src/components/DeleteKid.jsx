import { useDeleteKid } from '../serverStore/mutations'
import { Button, IconButton, Card } from '@radix-ui/themes'
import * as Popover from '@radix-ui/react-popover'
import { trashcan, x } from '../assets/svgImages'

export const DeleteKid = ({ kid, closeKid }) => {
  const deleteKid = useDeleteKid()
  const confirmDelete = () => {
    // console.log('delete confirmed')
    deleteKid.mutate(kid)
    closeKid()
  }

  return (
    <Popover.Root>
      <Popover.Content className='popover' style={{ zIndex: '200' }}>
        <Card>
          <Button onClick={confirmDelete}>Confirm</Button>
          <Popover.Close
            style={{
              padding: '3px 3px 0 3px',
              border: 'none',
              marginLeft: '3px',
            }}
          >
            {x}
          </Popover.Close>
          <Popover.Arrow className='popover-arrow' />
        </Card>
      </Popover.Content>
      <Popover.Trigger asChild>
        <IconButton>{trashcan}</IconButton>
      </Popover.Trigger>
    </Popover.Root>
  )
}
