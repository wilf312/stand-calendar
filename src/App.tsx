import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import {GoogleCalendar} from './GoogleCalendar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <GoogleCalendar />
    </div>
  )
}

export default App
