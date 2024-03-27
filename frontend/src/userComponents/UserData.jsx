import { Box, Card, Heading } from "@radix-ui/themes"
import Loader from '../components/Loader.jsx'
import HeatMap from '../components/HeatMap.jsx'

const UserData = ({ kidData }) => {
  const makeNameList = (kidNames) => {
    if (kidNames.length === 1) {
      return kidNames[0]
    } else if (kidNames.length > 4) {
      return kidNames.join(', ') + ' and more'
    } else {
      return kidNames.slice(0, kidNames.length - 1).join(', ') + ' and ' + kidNames[kidNames.length - 1]
    }
  }

  return (
    <Card>
      {
        kidData ?
          <Box m='1'>
            <Heading>Total daily entries for {makeNameList(kidData.map(kid => kid.name))}</Heading>
            <HeatMap entries={kidData.map(kid => kid.entries).flat()} />
          </Box>
        : <Loader/>
      }
      
    </Card>
  )
}

export default UserData