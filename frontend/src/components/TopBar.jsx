import * as Popover from '@radix-ui/react-popover';
import { browserLogout } from './userAuth/userHooks';
import { useState } from 'react';
import { Button, Card, Flex, Link } from '@radix-ui/themes'
import { useQueryClient } from '@tanstack/react-query';
import { triangle, x } from '../assets/svgImages';

const TopBar = ({ handleResetTo, handleGoBack, showBack }) => {
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const logout = async () => {
    browserLogout()
    queryClient.clear()
    handleResetTo('login')
    setOpen(false)
  }

  return (
    <Flex justify='between' direction='row-reverse' mb='3'>
      <Popover.Root open={open} onOpenChange={setOpen}>

        <Popover.Content className='popover' style={{ zIndex: '200' }}>
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
      {showBack && <Link onClick={handleGoBack}>{triangle} Back</Link>}

    </Flex>
  )
};

export default TopBar
