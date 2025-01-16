import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export default function Logout(){
     
    const navigate = useNavigate()

    const {checkAuthentication, isAuthenticated } = useGlobalContext()
 
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
                navigate('/'); // Redirigi se autenticato
                return;
            } else {
                // alert('Nessun login effettuato, redirect a login');
                navigate('/login'); // Redirigi se non autenticato
            }
        } catch (error) {
            console.error('Errore durante la verifica della sessione:', error);
        }
    },[]);
    
    return(
        <>

        </>
    )
}