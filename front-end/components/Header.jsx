import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <>
            <header className="">
                <nav>
                    <NavLink to="/" className="text-decoration-none">
                        <h1>BOOLBNB</h1>
                    </NavLink>
                </nav>
            </header>
        </>
    )
}