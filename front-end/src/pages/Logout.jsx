import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Logout() {

    const navigate = useNavigate()

    const { checkAuthentication, isAuthenticated } = useGlobalContext()

    useEffect(() => {
        checkAuthentication();
        try {
            if (isAuthenticated) {
                const baseUrl = import.meta.env.VITE_EXPRESS_SERVER;
                fetch(baseUrl + '/logout', {
                    method: 'POST',
                    credentials: 'include', // Necessario per includere i cookie
                })
                console.log('Logout effettuato, redirezione alla home...');
                toast.success("Login effettutato con successo!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate("/");

                }, 1000); /* navigate('/'); // Redirigi se autenticato */
                return;
            } else {
                // alert('Nessun login effettuato, redirect a login');
                /* navigate('/'); */ // Redirigi se non autenticato
            }
        } catch (error) {
            console.error('Errore durante la verifica della sessione:', error);
        }
    }, []);

    return (
        <>
            <div className="logout">

            </div>
            <ToastContainer />
        </>
    )
}