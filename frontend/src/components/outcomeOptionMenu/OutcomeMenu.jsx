/* eslint-disable react/prop-types */
import { useState } from 'react'
import OutcomeList from './OutcomeList'
import { Button, Card, Flex, Box, Popover, IconButton } from '@radix-ui/themes'
import { QuestionMarkCircledIcon, InfoCircledIcon, Cross1Icon } from '@radix-ui/react-icons'

const OutcomeMenu = ({ outcomes, setOutcomes, showOutcomeHints = false }) => {
  const [newOutcomeOption, setNewOutcomeOption] = useState('')
  // keycounter prevents duplication of keys in new outcomes
  const [keyCounter, setKeyCounter] = useState(outcomes.length + 1)

  const newOutcomeOptionHandler = (e) => {
    setNewOutcomeOption(e.target.value)
  }

  const submitHandler = () => {
    const outcome = {
      outcome: newOutcomeOption,
      id: keyCounter,
    }
    setOutcomes([...outcomes, outcome])
    setKeyCounter(keyCounter + 1)
    setNewOutcomeOption('')
  }

  // not using a form here to avoid nesting this for in the AddKid form.
  return (
    <Card size='1' my='3'>
      <Flex>
      <p>Brief description</p>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton variant='ghost'><QuestionMarkCircledIcon/></IconButton>
        </Popover.Trigger>
        <Popover.Content>
          <p><i>Using a past tense verb works well here.</i></p>
          <Popover.Close>
            <IconButton><Cross1Icon/></IconButton>
          </Popover.Close>
        </Popover.Content>

        
      </Popover.Root>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton variant='ghost'><InfoCircledIcon/></IconButton>
        </Popover.Trigger>
        <Popover.Content>
          <p><i>Using a past tense verb works well here.</i></p>
          <Popover.Close>
            <IconButton><Cross1Icon/></IconButton>
          </Popover.Close>
        </Popover.Content>
       
        
      </Popover.Root>
      </Flex>
      
      <Box>
        <OutcomeList
          outcomes={outcomes}
          setOutcomes={setOutcomes}
          showOutcomeHints={showOutcomeHints}
        />
        <Flex mt='3' justify='between' align='center'>
          <label>Add an outcome:
            <input
              onChange={newOutcomeOptionHandler}
              type='text'
              name='outcome'
              value={newOutcomeOption}
            />
          </label>
          <Button onClick={submitHandler} type='button'>add</Button>
        </Flex>
      </Box>
    </Card>
  )
}

export default OutcomeMenu
