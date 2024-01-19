/* eslint-disable react/prop-types */
import { useState } from 'react'
// import Exposure from "./Exposure.jsx"
import AllExposures from './AllExposures.jsx'
import { DeleteKid } from './DeleteKid.jsx'
import EditExposure from './EditExposure.jsx'
import { Button, Card, Heading, Flex, IconButton } from '@radix-ui/themes'
import { pencil } from '../assets/svgImages.jsx'

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
      <Flex direction='column' p='6'>
        <Flex justify="between">
          <Heading>{ kid.name }</Heading>
          <Flex gap='2'>
            <IconButton onClick={ () => handleGoToKid('editKid', kid) }>{pencil}</IconButton>
            <DeleteKid kid={kid} closeKid={handleGoBack} />
          </Flex>
        </Flex>
        <Button 
            size='3'
            my='3'
            onClick={ () => handleGoToKid('addExposure', kid) }
          >add an introduction
        </Button>
        <AllExposures kid={kid} openEditExposures={openEditExposures} />
        {  
          showEditExposure
          &&
          <EditExposure kid={kid} exposure={exposureToEdit} closeEditExposure={closeEditExposure} />
        } 
      </Flex>
    </Card>
  )
}

export default Kid