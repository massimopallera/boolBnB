import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <>
            <header className="shadow p-2 mb-5 bg-white">
                <nav>
                    <NavLink to="/" className="text-decoration-none">
                        <img className="logo" src="/logo.png" alt="Logo" />

                    </NavLink>
                    <NavLink to="/login" className="">
                        < button
                            type="button"
                            className="btn btn-primary"
                        >
                            Login/Registrati

                        </button>

                    </NavLink>



                </nav>
            </header>
        </>
    )
}