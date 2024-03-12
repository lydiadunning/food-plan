/* eslint-disable react/prop-types */

import { Button, Flex, IconButton, Dialog, Tooltip } from '@radix-ui/themes'
import HeatMap from './heatmap.jsx'
import { BarChartIcon } from '@radix-ui/react-icons'

const KidData = ({ kid }) => {
  return (
    <Dialog.Root>
      <Tooltip content={`Data for ${kid.name}`}>
        <Dialog.Trigger>
          <IconButton><BarChartIcon/></IconButton>
        </Dialog.Trigger>
      </Tooltip>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <HeatMap entries={kid.entries} />
        <Flex justify='center'>
          <Dialog.Close>
            <Button mr='1' variant='soft' color='gray'>
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default KidData
