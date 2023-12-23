import Exposure from './Exposure.jsx'

const AllExposures = ({ exposures, openEditExposures }) => {

  return (
    <>
      { exposures.map(exposure => 
        <Exposure key={ exposure._id } exposure={ exposure } openEditExposures={openEditExposures}  />
      )}
    </>
  )
}

export default AllExposures