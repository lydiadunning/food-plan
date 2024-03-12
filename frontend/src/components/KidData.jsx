/* eslint-disable react/prop-types */

import { Button, Flex, IconButton, Dialog, Tooltip } from '@radix-ui/themes'
import HeatMap from './heatmap.jsx'
import { BarChartIcon } from '@radix-ui/react-icons'

const KidData = ({ kid }) => {
  console.log('kidData kid', kid)
  console.log("bar chart icon", BarChartIcon)

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Tooltip content={`Data for ${kid.name}`}>
          <IconButton><BarChartIcon/></IconButton>
        </Tooltip>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex direction='column'>
          <HeatMap entries={kid.entries} />
          <Flex justify='center'>
            <Dialog.Close>
              <Button mr='1' variant='soft' color='gray'>
                Close
              </Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default KidData
