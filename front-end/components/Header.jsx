import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <>
            <header className="shadow p-2 mb-5">
                <nav>
                    <NavLink to="/" className="text-decoration-none">
                        <h1>BOOLBNB</h1>
                    </NavLink>
                </nav>
            </header>
        </>
    )
}