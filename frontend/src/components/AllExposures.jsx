import Exposure from './Exposure.jsx'
import { useExposures } from '../serverStore/queries.jsx'

const AllExposures = ({ kid, openEditExposures }) => {
  console.log('kid.exposures', kid.exposures)
  console.log('kid.id', kid.id, typeof kid.id)

  return (
    <>
      { kid.exposures.map(exposure => 
        <Exposure key={ exposure.id } kidId={kid.id} exposure={ exposure } openEditExposures={openEditExposures}  />
      )}
    </>
  )
}

export default AllExposures