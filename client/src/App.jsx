import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Nomination from './pages/Nomination'
import VoteArea from './pages/VoteArea'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nomination' element={<Nomination />} />
        <Route path='/vote' element={<VoteArea />} />
      </Routes>
    </>
  )
}
