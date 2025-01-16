import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <>
            <header className="shadow p-2 mb-5 bg-white">
                <nav>
                    <NavLink to="/" className="text-decoration-none">
                        <img className="logo" src="/logo.png" alt="Logo" />
                        <h1> BoolB&B </h1>
                    </NavLink>
                </nav>
            </header>
        </>
    )
}