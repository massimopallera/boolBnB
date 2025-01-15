import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

export default function Logout(){
     
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuthentication = async () => {
            const baseUrl = import.meta.env.VITE_EXPRESS_SERVER;
            const path = baseUrl + '/check'; // Endpoint per verificare la sessione
    
            try {
                const response = await fetch(path, {
                    method: 'GET',
                    credentials: 'include', // Necessario per includere i cookie
                });
    
                if (response.ok) {
                    fetch(baseUrl + '/logout', {
                        method: 'POST',
                        credentials: 'include', // Necessario per includere i cookie
                    })
                    console.log('Logout effettuato, redirezione alla home...');
                    navigate('/'); // Redirigi se autenticato
                } else {
                    // alert('Nessun login effettuato, redirect a login');
                    navigate('/auth'); // Redirigi se non autenticato
                }
            } catch (error) {
                console.error('Errore durante la verifica della sessione:', error);
            }
        };
    
        checkAuthentication();
    }, [navigate]);
    
    return(
        <>

        </>
    )
}