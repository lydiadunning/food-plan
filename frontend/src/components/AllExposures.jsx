import Exposure from './Exposure.jsx'

const AllExposures = ({ kid, openEditExposures }) => {
  console.log('kid.exposures', kid.exposures)

  return (
    <>
      { kid.exposures.map(exposure => 
        <Exposure key={ exposure } exposureId={ exposure } openEditExposures={openEditExposures}  />
      )}
      hi
    </>
  )
}

export default AllExposures