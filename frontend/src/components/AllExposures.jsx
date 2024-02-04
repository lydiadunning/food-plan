import Exposure from './Exposure.jsx'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import EditExposure from './exposureForms/EditExposure.jsx'

const AllExposures = ({ kid }) => {
  const [open, setOpen] = useState(false)
  const [exposureIDToEdit, setExposureIDToEdit] = useState(null)

  const exposures = kid.exposures || []
  const latestExposure = exposures.length > 0 ? exposures[0] : null

  return exposures.length > 1 ? (
    <Collapsible.Root
      className='CollapsibleRoot'
      open={open}
      onOpenChange={setOpen}
    >
      <Flex direction='column' gap='3'>
        {exposureIDToEdit && exposureIDToEdit === latestExposure.id ? (
          <EditExposure
            exposure={latestExposure}
            kid={kid}
            closeEditExposure={() => setExposureIDToEdit(null)}
          />
        ) : (
          <Exposure
            exposure={latestExposure}
            openEditExposures={() => setExposureIDToEdit(latestExposure.id)}
          />
        )}
        {exposures.slice(1).map((exposure) => (
          <Collapsible.Content key={exposure.id}>
            {exposureIDToEdit && exposureIDToEdit === exposure.id ? (
              <EditExposure
                exposure={exposure}
                kid={kid}
                closeEditExposure={() => setExposureIDToEdit(null)}
              />
            ) : (
              <Exposure
                exposure={exposure}
                openEditExposures={() => setExposureIDToEdit(exposure.id)}
              />
            )}
          </Collapsible.Content>
        ))}
        <Collapsible.Trigger asChild>
          <Button size='3'>See All</Button>
        </Collapsible.Trigger>
      </Flex>
    </Collapsible.Root>
  ) : exposures.length < 1 ? (
    <p>No Exposures have been added</p>
  ) : (
    <>
      {exposureIDToEdit ? (
        <EditExposure
          exposure={latestExposure}
          kid={kid}
          closeEditExposure={() => setExposureIDToEdit(null)}
        />
      ) : (
        <Exposure
          exposure={latestExposure}
          openEditExposures={() => setExposureIDToEdit(latestExposure.id)}
        />
      )}
    </>
  )
}

export default AllExposures
