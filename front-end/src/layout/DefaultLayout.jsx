import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header"
import Footer from "../components/Layout/Footer"

export default function DefaultLayout() {
    return (
        <>
            <Header />

            <main className="pb-5">

                <Outlet />

            </main>

            <Footer />
        </>
    )
}