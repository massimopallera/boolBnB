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
                    <NavLink to='/Apartments/AddNew'>
                        < button
                            type="button"
                            className="btn btn-primary"
                        >
                            Aggiungi Un appartamento

                        </button>
                    </NavLink>


                </nav>
            </header>
        </>
    )
}