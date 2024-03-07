import { Heading, HoverCardContent, HoverCardRoot, HoverCardTrigger, Table, TableHeader } from "@radix-ui/themes"

const HeatCell = ({ day, entriesOnThisDate }) => {
  const entryCount = entriesOnThisDate.length < 10 ? entriesOnThisDate.length : 10
  const lightness = 100 - ((entryCount + 1) * 10) 
  const saturation = !entryCount ? 20 : 80
  const color = `55, ${saturation}%, ${lightness}%`
  console.log(color)

  return (
    <HoverCardRoot>
      <HoverCardTrigger>
        <div style={{width: '10px', height: '10px', backgroundColor:`hsl(${color})`, margin: '2px'}}/>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>
          {day.toString()}
        </p>
        <p>
          {entryCount} {entryCount === 1 ? 'entry' : 'entries'}
        </p>
        {
          !!entryCount &&
          <Table.Root variant='surface'>
            <TableHeader>
              <Table.Row>
                <Table.ColumnHeaderCell>Food</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Outcomes</Table.ColumnHeaderCell>
              </Table.Row>
            </TableHeader>
            
            <Table.Body>
              {
                entriesOnThisDate.map((entry, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.RowHeaderCell>{entry.food}</Table.RowHeaderCell>
                      <Table.Cell>{
                        entry.outcomes.length > 0 ? 
                        entry.outcomes.join(', ') : 
                        'offered'
                      }</Table.Cell>
                    </Table.Row>
                  )
                })
              }
              
            </Table.Body>
          </Table.Root>
        }
      </HoverCardContent>
    </HoverCardRoot>
  )
}

export default HeatCell