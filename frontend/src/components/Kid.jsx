/* eslint-disable react/prop-types */
import { useState } from 'react'
// import Exposure from "./Exposure.jsx"
import AllExposures from './AllExposures.jsx'
import { DeleteKid } from './DeleteKid.jsx'
import EditExposure from './EditExposure.jsx'
import { Button, Card, Heading, Flex } from '@radix-ui/themes'

const Kid = ({ kid, handleGoToKid, handleGoBack }) => {
  const [ showEditExposure, setShowEditExposure ] = useState(false)
  const [ exposureToEdit, setExposureToEdit ] = useState(null)

  console.log('kid in Kid', kid)

  const openEditExposures = (exposure) => {
    setExposureToEdit(exposure)
    setShowEditExposure(true)
  }

  const closeEditExposure = () => {
    setShowEditExposure(false)
  }

  return (
    <Card>
      <Flex justify="between">
        <Heading>{ kid.name }</Heading>
        <Flex gap='3'>
          <Button onClick={ () => handleGoToKid('editKid', kid) }>Edit</Button>
          <DeleteKid kid={kid} closeKid={handleGoBack} />
          <Button 
            onClick={ handleGoBack }
          >back to list
          </Button>
        </Flex>
      </Flex>
      <AllExposures kid={kid} openEditExposures={openEditExposures} />
      {  
        showEditExposure
        &&
        <EditExposure kid={kid} exposure={exposureToEdit} closeEditExposure={closeEditExposure} />

      } 
      <Button 
        onClick={ () => handleGoToKid('addExposure', kid) }
      >add an introduction
      </Button>
    </Card>
  )
}

export default Kid