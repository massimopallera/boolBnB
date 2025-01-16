import { useEffect } from "react";
import { NavLink } from "react-router-dom"


import { useGlobalContext } from "../../context/GlobalContext";


export default function Header() {

    const { isAuthenticated, checkAuthentication } = useGlobalContext();

    useEffect(() => {
        checkAuthentication();
    }, [isAuthenticated]);


    return (
        <>
            <header>

                <nav className="shadow py-2 px-4 mb-5 bg-white d-flex align-items-center justify-content-between">
                    <NavLink to="/" className="text-decoration-none">
                        <img className="logo" src="/logo.png" alt="Logo" />

                    </NavLink>
                    <div >
                    {isAuthenticated ? ( 
                    <>
                        <NavLink to="apartments/AddNew" className="me-3 d-none d-sm-inline">
                            < button
                                type="button"
                                className="btn btn-primary"
                            >
                                Aggiungi Un Appartamento

                            </button>

                        </NavLink>

                        <NavLink to="logout" className="d-none d-sm-inline">
                            < button
                                type="button"
                                className="btn btn-primary"
                            >
                                Logout

                            </button>

                        </NavLink>

                        <NavLink to="apartments/AddNew" className="me-2 d-inline d-sm-none">
                                < button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-plus fs-5"></i>

                                </button>
                            </NavLink>
                            <NavLink to="logout" className="mx-1 d-inline d-sm-none">
                                < button
                                    type="button"
                                    className="btn btn-primary"
                                    >
                                    <i class="bi bi-box-arrow-right fs-5"></i>

                                </button>
                            </NavLink>

                            
                        {/* GOLOSA IDEA BOTTONI IN BASSO */}
                        {/* 
                        <div style={{right: "2rem", bottom: "2rem", position:"fixed"}}>
                            <NavLink to="logout" className="d-block d-sm-none">
                                < button
                                    type="button"
                                    className="btn btn-primary"
                                    >
                                    <i class="bi bi-box-arrow-right"></i>

                                </button>
                            </NavLink>

                            <NavLink to="apartments/AddNew" className="my-2 d-block d-sm-none">
                                < button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-plus"></i>

                                </button>
                            </NavLink>
                        </div>
                        */}


                        </>) : (
                            <NavLink to="login" className="me-3">
                            < button
                                type="button"
                                className="btn btn-primary"
                            >
                                Login/Registrati

                            </button>

                        </NavLink>
                        )
                        }
                    </div>

                    

                </nav>
            </header>
        </>
    )
}