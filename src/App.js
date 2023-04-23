import React from 'react'
import {ContextsProvider} from './context/Contexts'
import LoginLogic from './LoginLogic'


function App () {
  return (
    <ContextsProvider>
      <LoginLogic/>
    </ContextsProvider>
  )
}

export default App
