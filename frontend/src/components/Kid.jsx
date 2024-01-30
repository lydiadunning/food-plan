/* eslint-disable react/prop-types */
import AllExposures from './AllExposures.jsx'
import { DeleteKid } from './DeleteKid.jsx'
import { Button, Card, Heading, Flex, IconButton } from '@radix-ui/themes'
import { pencil } from '../assets/svgImages.jsx'

const Kid = ({ kid, handleGoToKid, handleGoBack }) => {

  console.log('kid in Kid', kid)

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
        <AllExposures kid={kid} />

      </Flex>
    </Card>
  )
}

export default Kid