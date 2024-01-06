import Exposure from './Exposure.jsx'
import { useExposures } from '../serverStore/queries.jsx'

const AllExposures = ({ kid, openEditExposures }) => {

  const { isLoading, error, data } = useExposures(kid.id)
  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  const exposures = data.data

  console.log({exposures})

  return (
    <>
      { exposures.map(exposure => 
        <Exposure key={ exposure.id } exposure={ exposure } openEditExposures={openEditExposures}  />
      )}
    </>
  )
}

export default AllExposures