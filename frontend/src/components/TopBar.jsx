import * as Popover from '@radix-ui/react-popover';
import { browserLogout } from './userAuth/userHooks';
import { useState } from 'react';
import { Button } from '@radix-ui/themes'


const TopBar = ({ handleResetTo }) => {
  const [open, setOpen] = useState(false)

  const logout = () => {
    browserLogout()
    handleResetTo('login')
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild >
        <Button>user</Button>
      </Popover.Trigger>
      <Popover.Content className='popover'>
        <div>
          <Button onClick={logout} >log out</Button>
          <Popover.Close>x</Popover.Close>
          <Popover.Arrow className='popover-arrow'/>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
};

export default TopBar