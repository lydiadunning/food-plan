/* eslint-disable react/prop-types */
import AllEntries from './AllEntries.jsx'
import { Delete } from './Delete.jsx'
import { Card, Heading, Flex } from '@radix-ui/themes'
import EditKid from './EditKid.jsx'
import AddEntry from './entryForms/AddEntry.jsx'
import { useDeleteKid } from '../serverStore/mutations.jsx'
import {useRef} from 'react'

const Kid = ({ kid, makeMessage }) => {
  console.log('kid in Kid', kid)

  const ref = useRef(null);
  const handleScroll = () => {
    ref.current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
  };

  const deleteKid = useDeleteKid(kid.id)
  const deleteKidAction = () => {
    deleteKid.mutate()
    makeMessage(`${kid.name} has been deleted`)
  }

  return (
    <Card className='swipeable' ref={ref} onClick={handleScroll}>
      <Flex direction='column' p='5' className='kid-size'>
      <Heading>{kid.name}</Heading>
        <Flex gap='2' justify='end'>
          <EditKid kid={kid} /> 
          <Delete action={deleteKidAction} />
        </Flex>
        <AddEntry kid={kid} makeMessage={makeMessage} />
        <AllEntries kid={kid} />
      </Flex>
    </Card>
  )
}

export default Kid
