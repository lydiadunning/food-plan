import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel';
import LegendLite from 'cal-heatmap/plugins/LegendLite';
import { useEffect } from 'react';



const HeatMap = ({ entries }) => {
  // if (entries.length === 0) {
    return 'no entries'
  // }

  // const dateData = entries.reduce((a, c) => {
  //   const currentDate = c.date.slice(0, 10)
  //   return {
  //     ...a,
  //     [currentDate]: a[currentDate] ? a[currentDate] + 1 : 1
  //   }
  // }, {}) // a: {date: count}

  // const firstDate = min(Object.keys(dateData))
  // const lastDate = max(Object.keys(dateData))
  // console.log({firstDate}, {lastDate})

  // const start = isSunday(firstDate) ? firstDate : previousSunday(firstDate)
  // const end = isSaturday(lastDate) ? lastDate : nextSaturday(lastDate)
  // const allDays = eachDayOfInterval( start, Date.now() )
  // console.log({allDays})
/*
  const amber = [
    '#FBE577',
    '#FFBA18',
    '#E2A336',
    '#AB6400',
    '#4F3422'
  ]



  const cal = new CalHeatmap();
  const options = {
    data: {
      source: entries,
      x: 'date',
      y: 'food', 
      groupY: 'count'
    },
    date: { start: new Date('2024-01-01') },
    range: 4,
    scale: {
      color: {
        type: 'threshold',
        range: amber,
        domain: [2, 5, 8, 15],
      },

    },
    domain: {
      type: 'month',
      gutter: 4,
      label: { text: 'MMM', textAlign: 'start', position: 'top' },
    },
    subDomain: { type: 'ghDay', radius: 2, width: 11, height: 11, gutter: 4 },
    itemSelector: '#ex-ghDay',
  }
  const plugins = [
    [
      Tooltip,
      {
        text: function (date, value, dayjsDate) {
          return (
            (value ? value : 'No') +
            ' contributions on ' +
            dayjsDate.format('dddd, MMMM D, YYYY')
          );
        },
      },
    ],
    [
      LegendLite,
      {
        includeBlank: true,
        itemSelector: '#ex-ghDay-legend',
        radius: 2,
        width: 11,
        height: 11,
        gutter: 4,
      },
    ],
    [
      CalendarLabel,
      {
        width: 30,
        textAlign: 'start',
        text: () => ['', 'mon', '', 'wed', '', 'fri', ''],
        padding: [25, 0, 0, 0],
      },
    ],
  ]

  useEffect(() => {
    cal.paint(options, plugins);
  }, [])
  

return(
  <div
    style={{
      borderRadius: '3px',
      padding: '1rem',
      overflow: 'hidden',
    }}
  >
    <div id="ex-ghDay" className="margin-bottom--md"></div>
    <a
      className="button button--sm button--secondary margin-top--sm"
      href="#"
      onClick={e => {
        e.preventDefault();
        cal.previous();
      }}
    >
      ← Previous
    </a>
    <a
      className="button button--sm button--secondary margin-top--sm margin-left--xs"
      href="#"
      onClick={e => {
        e.preventDefault();
        cal.next();
      }}
    >
      Next →
    </a>
    <div style={{ float: 'right', fontSize: 12 }}>
      <span style={{ color: '#768390' }}>Less</span>
      <div
        id="ex-ghDay-legend"
        style={{ display: 'inline-block', margin: '0 4px' }}
      ></div>
      <span style={{ color: '#768390', fontSize: 12 }}>More</span>
    </div>
  </div>
);

  // console.log({dateDataForHeatmap})
  // const cal = new CalHeatmap();
  // cal.paint({
  //   data: {
  //     source: entries,
  //     x: 'date',
  //     y: 'food', 
  //     groupY: 'count'
  //   },
  //   // range: 2,
  //   domain: {
  //     type: 'week',
  //     label: { text: 'MMM', textAlign: 'start', position: 'top' },
  //     gutter: 4
  //   },
  //   subDomain: {type: 'xDay', radius: 2, width: 11, height: 11, gutter: 4},
  //   scale: {
  //     color: {
  //       // Try some values: Purples, Blues, Turbo, Magma, etc ...
  //       // scheme: 'Cool',
  //       range: amber,
  //       type: 'linear',
  //       domain: [0, 7],
  //     },
  //   },
  //   date: { start: new Date('2024-01-01'), end: Date.now() },
  // }, 
  // [[Tooltip, 
  //   {
  //   }
  // ]],
  // [
  //   CalendarLabel,
  //   {
  //     width: 30,
  //     textAlign: 'start',
  //     text: () => dayjs.weekdaysShort().map((d, i) => (i % 2 == 0 ? '' : d)),
  //     padding: [25, 0, 0, 0],
  //   },
  // ],
  // );

  // return (
  //   <div id="cal-heatmap"></div>
  // )
  */
}

export default HeatMap