// imports
import { BrowserRouter, Routes, Route } from "react-router-dom"

// context
import { GlobalContextProvider } from './context/GlobalContext.jsx'

// 📄 PAGES
import DefaultLayout from "./layout/DefaultLayout"
import Homepage from "./pages/Homepage"
import SingleApartment from "./pages/SingleApartment"
import AddApartment from "./pages/AddApartment"
import Login from './pages/Login.jsx'
import Logout from "./pages/Logout.jsx"
import SignIn from "./pages/SignIn.jsx"

// CSS
import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            
            <Route element={<DefaultLayout />}>

              <Route index element={<Homepage />} />
              <Route path="apartments/:id" element={<SingleApartment />} />
              <Route path="apartments/addNew" element={<AddApartment />} />
              <Route path='login' element={<Login />} />
              <Route path='logout' element={<Logout />} />
              <Route path='sign-in' element={<SignIn />} />

            </Route>
            
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter >
    </>
  )
}

export default App
