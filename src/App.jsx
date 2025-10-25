import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Room from './components/Room'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/room/:roomId' element={<Room/>} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App