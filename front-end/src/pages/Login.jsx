import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const initialFormData = {
    email: '',
    password: ''
}


export default function Login(){

    const [formData, setFormData] = useState(initialFormData)

    const { checkAuthentication } = useGlobalContext()

    const navigate = useNavigate()

    const handleLogin = async (e) => {
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
        checkAuthentication('/apartments/addNew'); //change with a message
    }, []);
    
  
    

    return(
    <>
        <form onSubmit={handleLogin}>
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



