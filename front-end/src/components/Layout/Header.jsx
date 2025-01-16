import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <>
            <header>

                <nav className="shadow py-2 px-4 mb-5 bg-white d-flex align-items-center justify-content-between">

                    <NavLink to="/" className="text-decoration-none">
                        <img className="logo" src="/logo.png" alt="Logo" />

                    </NavLink>
                    <div >
                        <NavLink to="login" className="mx-3">
                            < button
                                type="button"
                                className="btn btn-primary"
                            >
                                Login/Registrati

                            </button>

                        </NavLink>

                        <NavLink to="apartments/AddNew" className="">
                            < button
                                type="button"
                                className="btn btn-primary"
                            >
                                Aggiungi Un Appartamento

                            </button>

                        </NavLink>
                    </div>


                </nav>
            </header>
        </>
    )
}