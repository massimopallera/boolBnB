// imports
import { BrowserRouter, Routes, Route } from "react-router-dom"

// context
import { GlobalContextProvider } from './context/GlobalContext.jsx'

// 📄 PAGES
import SingleApartment from "./pages/SingleApartment"
import DefaultLayout from "./layout/DefaultLayout"
import AddApartment from "./pages/AddApartment"
import SendMail from "./pages/SendMail.jsx"
import Homepage from "./pages/Homepage"
import Logout from "./pages/Logout.jsx"
import SignIn from "./pages/SignIn.jsx"
import Login from './pages/Login.jsx'

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
              <Route path='send-mail' element={<SendMail />} />

            </Route>
            
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter >
    </>
  )
}

export default App
