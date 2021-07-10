import React, { useEffect } from 'react'

const initClient = () => {
  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
  
  // Authorization scopes required by the API multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'
  debugger
  // @ts-ignore 
  gapi.client.init({
    apiKey: import.meta.env.VITE_API_KEY || '', // Client ID and API key from the Developer Console
    clientId: import.meta.env.VITE_CLIENT_ID || '',
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    debugger
    // Listen for sign-in state changes.
    // @ts-ignore 
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

    // Handle the initial sign-in state.
    // @ts-ignore 
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
    // @ts-ignore 
    authorizeButton.onclick = handleAuthClick
    // @ts-ignore 
    signoutButton.onclick = handleSignoutClick
  }, function(error: any) {
    // appendPre(JSON.stringify(error, null, 2))
  })
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn: boolean) {
  if (isSignedIn) {
    // @ts-ignore 
    authorizeButton.style.display = 'none'
    // @ts-ignore 
    signoutButton.style.display = 'block'
    listUpcomingEvents()
  } else {
    // @ts-ignore 
    authorizeButton.style.display = 'block'
    // @ts-ignore 
    signoutButton.style.display = 'none'
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  // @ts-ignore 
  gapi.auth2.getAuthInstance().signIn()
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  // @ts-ignore 
  gapi.auth2.getAuthInstance().signOut()
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message: string) {
  var pre = document.getElementById('content')
  var textContent = document.createTextNode(message + '\n')

  // @ts-ignore 
  pre.appendChild(textContent)
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
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
    var events = response.result.items
    appendPre('Upcoming events:')

    if (events.length > 0) {
      for (let i = 0 i < events.length i++) {
        var event = events[i]
        var when = event.start.dateTime
        if (!when) {
          when = event.start.date
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.')
    }
  })
}



export const GoogleCalendar = () => {
  useEffect(() => {
    // @ts-ignore 
    gapi.load('client:auth2', initClient)
  }, [])

  return <div>

    {/* <!--Add buttons to initiate auth sequence and sign out--> */}
    <button id="authorize_button">Authorize</button>
    <button id="signout_button">Sign Out</button>

    <pre id="content" style={{
      whiteSpace: "pre-wrap"
    }}></pre>

  </div>

}
