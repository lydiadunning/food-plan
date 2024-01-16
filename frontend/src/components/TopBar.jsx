import * as Popover from '@radix-ui/react-popover';

const TopBar = () => {



  return (
    <Popover.Root>
      <Popover.Trigger asChild >
        <button>user</button>
      </Popover.Trigger>
      <Popover.Content className='popover'>
        <div>
          <button>log out</button>
          <Popover.Close>x</Popover.Close>
          <Popover.Arrow className='popover-arrow'/>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
};

export default TopBar