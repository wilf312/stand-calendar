import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import {ControlArea} from './ControlArea'

interface GoogleCalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: Creator;
  organizer: Creator;
  start: Start;
  end: Start;
  recurringEventId: string;
  originalStartTime: Start;
  iCalUID: string;
  sequence: number;
  reminders: Reminders;
  eventType: string;
}

interface Reminders {
  useDefault: boolean;
}

interface Start {
  dateTime: string;
  timeZone: string;
}

interface Creator {
  email: string;
  self: boolean;
}
export const List = () => {
  const [eventList, setEventList] = useState<GoogleCalendarEvent[]>([])
  const fetchList = useCallback(() => {
    // @ts-ignore 
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
      // @ts-ignore 
    }).then(function(response) {
      const events: GoogleCalendarEvent[] = response.result.items
      setEventList(events)
      // console.log(JSON.stringify(events[0]))

      // if (events.length > 0) {
      //   for (let i = 0; i < events.length; i++) {
      //     var event = events[i]
      //     var when = event.start.dateTime
      //     if (!when) {
      //       when = event.start.date
      //     }
      //     // appendPre(event.summary + ' (' + when + ')')
      //   }
      // } else {
      //   // appendPre('No upcoming events found.')
      // }
    })
  }, []) 

  return <div>
    <button onClick={() => { fetchList() }}>fetchList</button>

    {eventList[0] &&  <Page>
      {eventList[0].summary}
      <ControlArea />
    </Page>}


    {/* <ul>
      {eventList.map((event: GoogleCalendarEvent) => {
        return <li>
          <h2>{event.summary}</h2>
          <h2>{event.start.dateTime}</h2>
        </li>
      })}
    </ul> */}
  </div>

}

const Page = styled.div `
  position: absolute;
  left: 0;
  top:0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14vw;
  background: #ffa5a5;

  font-family: 'RocknRoll One', sans-serif;
`
