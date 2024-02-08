import Kid from './Kid.jsx'
import { IconButton, Flex, Heading, Card } from '@radix-ui/themes'
import { plus } from '../assets/svgImages.jsx'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader.jsx'
import { useRef } from 'react'

export const KidList = ({ kidData, makeMessage }) => {
  const navigate = useNavigate()

  const ref = useRef(null);
  const handleScroll = () => {
    ref.current.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  };

  console.log({ kidData })
  return (
    <>
      <Heading align='center' mt='3' mb='6'>
        Kids
      </Heading>
      { kidData ?
        <Flex className='swipe-container' direction='row' gap='4' align='start'>
          {kidData?.map((kid) => (
            <Kid key={kid.id} kid={kid} makeMessage={makeMessage} />
          ))}
          <Card className='swipeable' size='5' ref={ref} onClick={handleScroll} >
            <IconButton size='3' onClick={() => navigate('/addkid')} >
              {plus}
            </IconButton>
          </Card>
        </Flex>
        : <Loader/>
      }
    </>
  )
}
