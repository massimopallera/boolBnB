// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layout/DefaultLayout"
import Homepage from "./pages/Homepage"
import SingleApartment from "./pages/SingleApartment"
import AddApartment from "./pages/AddApartment"
// import ResearchPage from "./pages/ResearchPage"

import { GlobalContextProvider } from './context/GlobalContext.jsx'

import './App.css'
import Authentication from './pages/Authentication.jsx'
import Logout from "./pages/Logout.jsx"
import SignIn from "./pages/SignIn.jsx"

function App() {

  return (
    <>
      <GlobalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>

              <Route index element={<Homepage />} />
              <Route path="apartments/:id" element={<SingleApartment />} />
              <Route path="apartments/addNew" element={<AddApartment />} />
              <Route path='auth' element={<Authentication />} />
              <Route path='logout' element={<Logout />} />
              <Route path='sign-in' element={<SignIn />} />
              {/* <Route path=".................." element={<ResearchPage />} /> */}

            </Route>
          </Routes>
        </BrowserRouter >
      </GlobalContextProvider>
    </>
  )
}

export default App
