import { Grid } from '@radix-ui/themes'
import HeatCell from './HeatCell'
import {isSunday, previousSunday, isSaturday, nextSaturday, eachDayOfInterval, min, max, isSameDay} from 'date-fns'

const HeatMap = ({ entries }) => {
  if (entries.length === 0) {
    return 'no entries'
  }

  console.log({entries})
  if (typeof entries === 'undefined') {
    console.warn('entries undefined, ===')
  }
  if (typeof entries == 'undefined') {
    console.warn('entries undefined, ==')
  }

  const dateData = entries.reduce((a, c) => {
    const currentDate = c.date.slice(0, 10)
    return {
      ...a,
      [currentDate]: a[currentDate] ? a[currentDate] + 1 : 1
    }
  }, {}) // a: {date: count}
  console.log({dateData})

  const firstDate = min(Object.keys(dateData))
  const lastDate = max(Object.keys(dateData))
  console.log({firstDate}, {lastDate})

  const start = isSunday(firstDate) ? firstDate : previousSunday(firstDate)
  const end = isSaturday(lastDate) ? lastDate : nextSaturday(lastDate)
  const allDays = eachDayOfInterval( start, Date.now() )
  console.log({allDays})

  // useEffect(() => {

  // }, [])

  return (
    <Grid flow='column' rows='7' align='center'>
      {
        allDays.map(day => <HeatCell key={day} day={day} entriesOnThisDate={entries.filter(entry => isSameDay(entry.date, day))} />)
      }
    </Grid>
  )

}

export default HeatMap