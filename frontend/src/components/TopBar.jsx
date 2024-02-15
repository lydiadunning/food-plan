import * as Popover from '@radix-ui/react-popover'
import { browserLogout } from './userAuth/userHooks'
import { useState } from 'react'
import { Button, Card, Flex, Link } from '@radix-ui/themes'
import { useQueryClient } from '@tanstack/react-query'
import { triangle, x } from '../assets/svgImages'
import { useNavigate, useMatch } from 'react-router-dom'

const TopBar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const matchLogin = useMatch('/login')
  const matchKidList = useMatch('/kidlist')
  const match404 = useMatch('/404')
  const showBack = !matchLogin && !matchKidList && !match404

  const queryClient = useQueryClient()

  const logout = async () => {
    browserLogout()
    queryClient.clear()
    navigate('/login')
    setOpen(false)
  }

  // note - reversed
  return ( 
    <Flex justify='between' direction='row-reverse' mb='3'>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Content className='popover' style={{ zIndex: '200' }}>
          <Card>
            <Button onClick={logout}>log out</Button>
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
          <Button>user</Button>
        </Popover.Trigger>
      </Popover.Root>
      {showBack && <Link onClick={() => navigate(-1)}>{triangle} Back</Link>}
    </Flex>
  )
}

export default TopBar
