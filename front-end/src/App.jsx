import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "../layout/DefaultLayout"
import Homepage from "../pages/Homepage"
import ApartmentDetailsPage from "../pages/ApartmentDetailsPage"
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
            <Route path="apartments/:id" element={<ApartmentDetailsPage />} />
            <Route path=".................." element={<InsertmentPage />} />
            {/* <Route path=".................." element={<ResearchPage />} /> */}

          </Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
