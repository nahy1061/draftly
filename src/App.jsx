import React from 'react'
import { ResumeProvider } from './context/ResumeContext'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Builder from './pages/Builder'

const App = () => {
  return (
    <ResumeProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/builder' element={<Builder/>}/>
      </Routes>
    </ResumeProvider>
  )
}

export default App