import Entry from './Entry.jsx'
import HeatMap from './heatmap.jsx'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import EditEntry from './entryForms/EditEntry.jsx'

const AllEntries = ({ kid }) => {
  const [open, setOpen] = useState(false)
  const [entryIDToEdit, setEntryIDToEdit] = useState(null)

  const entries = kid.entries || []
  const latestEntry = entries.length > 0 ? entries[0] : null
  console.log('allEntries entries', entries)

  return entries.length > 1 ? (
    <Collapsible.Root
      className='CollapsibleRoot'
      open={open}
      onOpenChange={setOpen}
    >
      <HeatMap entries={entries} />
      <Flex direction='column' gap='3'>
        {entryIDToEdit && entryIDToEdit === latestEntry.id ? (
          <EditEntry
            entry={latestEntry}
            kid={kid}
            closeEditEntry={() => setEntryIDToEdit(null)}
          />
        ) : (
          <Entry
            entry={latestEntry}
            openEditEntries={() => setEntryIDToEdit(latestEntry.id)}
          />
        )}
        {entries.slice(1).map((entry) => (
          <Collapsible.Content key={entry.id}>
            {entryIDToEdit && entryIDToEdit === entry.id ? (
              <EditEntry
                entry={entry}
                kid={kid}
                closeEditEntry={() => setEntryIDToEdit(null)}
              />
            ) : (
              <Entry
                entry={entry}
                openEditEntries={() => setEntryIDToEdit(entry.id)}
              />
            )}
          </Collapsible.Content>
        ))}
        <Collapsible.Trigger asChild>
          <Button size='3' variant='outline'>{open ? 'Hide' : 'See All'}</Button>
        </Collapsible.Trigger>
      </Flex>
    </Collapsible.Root>
  ) : entries.length < 1 ? (
    <p>No Entries have been added</p>
  ) : (
    <>
      {entryIDToEdit ? (
        <EditEntry
          entry={latestEntry}
          kid={kid}
          closeEditEntry={() => setEntryIDToEdit(null)}
        />
      ) : (
        <Entry
          entry={latestEntry}
          openEditEntries={() => setEntryIDToEdit(latestEntry.id)}
        />
      )}
    </>
  )
}

export default AllEntries
