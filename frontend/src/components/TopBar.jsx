import * as Popover from '@radix-ui/react-popover';
import { browserLogout } from './userAuth/userHooks';
import { useState } from 'react';
import { Button, Card, Flex } from '@radix-ui/themes'
import { useQueryClient } from 'react-query';
import { x } from '../assets/svgImages';

const TopBar = ({ handleResetTo }) => {
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const logout = async () => {
    browserLogout()
    await queryClient.invalidateQueries('kids')
    handleResetTo('login')
    setOpen(false)
  }

  return (
    <Flex justify='end' mb='3'>
      <Popover.Root open={open} onOpenChange={setOpen}>

        <Popover.Content className='popover'>
          <Card>
            <Button onClick={logout} >log out</Button>
            <Popover.Close style={{padding: '3px 3px 0 3px', border: 'none', marginLeft: '3px'}}>{ x }</Popover.Close>
            <Popover.Arrow className='popover-arrow'/>
          </Card>
        </Popover.Content>

        <Popover.Trigger asChild >
          <Button >user</Button>
        </Popover.Trigger>
        
      </Popover.Root>
    </Flex>
  )
};

export default TopBar
