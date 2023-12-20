import Exposure from './Exposure.jsx'
import { useExposures } from '../serverStore/queries.jsx'

const AllExposures = ({ kid, openEditExposures }) => {
  console.log('kid.exposures', kid.exposures)
  console.log('kid._id', kid._id, typeof kid._id)
  console.log(kid.exposures.map(x => x._id))

  return (
    <>
      { kid.exposures.map(exposure => 
        <Exposure key={ exposure._id } kidId={kid._id} exposure={ exposure } openEditExposures={openEditExposures}  />
      )}
    </>
  )
}

export default AllExposures