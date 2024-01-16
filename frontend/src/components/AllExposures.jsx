import Exposure from './Exposure.jsx'
import { useExposures } from '../serverStore/queries.jsx'
import * as Collapsible from '@radix-ui/react-collapsible';
import { useState } from 'react';

const AllExposures = ({ kid, openEditExposures }) => {
  const [open, setOpen] = useState(false);

  const { isLoading, error, data } = useExposures(kid.id)
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  const exposures = data.data

  console.log({exposures})

  return exposures.length > 1 ? (
    <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <button>See All</button>
      </Collapsible.Trigger>
      <Exposure exposure={ exposures[0] } openEditExposures={openEditExposures}  />
      { exposures.slice(1).map(exposure => 
        <Collapsible.Content key={ exposure.id }>
          <Exposure exposure={ exposure } openEditExposures={openEditExposures}  />
        </Collapsible.Content>
      )}
    </Collapsible.Root>
  ) : exposures.length < 1 ? (
    <p>No Exposures have been added</p>
  ) : (
    <Exposure exposure={ exposures[0] } openEditExposures={openEditExposures}  />
  )

  // return (
  //   <>
  //     { exposures.map(exposure => 
  //       <Exposure key={ exposure.id } exposure={ exposure } openEditExposures={openEditExposures}  />
  //     )}
  //   </>
  // )
}

export default AllExposures