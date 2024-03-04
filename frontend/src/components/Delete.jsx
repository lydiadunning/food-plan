import { Button, IconButton, Card, Tooltip } from '@radix-ui/themes'
import * as Popover from '@radix-ui/react-popover'
import { trashcan, x } from '../assets/svgImages'

export const Delete = ({ action }) => {

  return (
    <Popover.Root>
      <Popover.Content className='popover' style={{ zIndex: '200' }}>
        <Card>
          <Button onClick={action}>Confirm</Button>
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
        <Tooltip content='delete'>
          <IconButton>{trashcan}</IconButton>
        </Tooltip>
      </Popover.Trigger>
    </Popover.Root>
  )
}
