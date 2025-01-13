import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "../layout/DefaultLayout"
import Homepage from "../pages/Homepage"
import DetailsPage from "../pages/DetailsPage"
import InsertmentPage from "../pages/InsertmentPage"
import ResearchPage from "../pages/ResearchPage"

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>

            <Route index element={<Homepage />} />
            <Route path=".................." element={<DetailsPage />} />
            <Route path=".................." element={<InsertmentPage />} />
            {/* <Route path=".................." element={<ResearchPage />} /> */}

          </Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
