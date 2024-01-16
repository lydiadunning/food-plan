import * as Popover from '@radix-ui/react-popover';
import { browserLogout } from './userAuth/userHooks';
import { useState } from 'react';

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
        <button>user</button>
      </Popover.Trigger>
      <Popover.Content className='popover'>
        <div>
          <button onClick={logout} >log out</button>
          <Popover.Close>x</Popover.Close>
          <Popover.Arrow className='popover-arrow'/>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
};

export default TopBar