import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";

const initialFormData = {
    email: '',
    password: ''
}


export default function Login(){

    const [formData, setFormData] = useState(initialFormData)
    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();

        const baseUrl = import.meta.env.VITE_EXPRESS_SERVER
        const path = baseUrl + '/login'
    
        try {
            const response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData }),
                credentials: 'include', // Include i cookie nella richiesta
            });
    
            setFormData(initialFormData)
            if (response.ok) {
                console.log('Login riuscito');
                navigate('/');
                // Puoi eseguire un'azione aggiuntiva come un redirect
            } else {
                console.error('Errore nel login');
            }
        } catch (error) {
            console.error('Errore durante il login:', error);
        } 
        

        
              
    };
    
    
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
                    console.log('Utente autenticato, redirezione alla home...');
                    navigate('/'); // Redirigi se autenticato
                } else {
                    console.log('Utente non autenticato');
                }
            } catch (error) {
                console.error('Errore durante la verifica della sessione:', error);
            }
        };
    
        checkAuthentication();
    }, [navigate]);
    
  
    

     return(
        <>
            <form onSubmit={handleForm}>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                </div>

                <button type="submit">Login</button>
            </form>
        </>
    )
}



