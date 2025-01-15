import { useState } from "react"
import { useNavigate } from "react-router-dom";

const initialFormData = {
    email: '',
    password: '',
    name: '',
    last_name: '',
    phone: '',
}
export default function SignIn(){ 


    const [formData, setFormData] = useState(initialFormData)
    const navigate = useNavigate();

    function handleForm(e){
        e.preventDefault()

        const baseUrl = import.meta.env.VITE_EXPRESS_SERVER
        const path = baseUrl + '/user'
        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData})
        })
        .then(resp => resp.json())
        .then(data => { 
            if (data.statusCode === 201){
                console.log('Utente registrato correttamente')
                navigate('/')
                // Rendi visibile la home page o dove vuoi
            } else {
                console.error('Errore durante la registrazione')  // Mostra il messaggio di errore nel caso di fallimento 201 non viene raggiunto  // Se vuoi mostrare un'altra cosa in caso di fallimento, puoi aggiungere una logica di controllo al codice HTTP che riceviamo dal server.  // Esempio: if (data.statusCode === 400) console.error('Email già registrata')  // Altrimenti, puoi mostrare un messaggio generico.  // In questo caso, il codice 201 è quello che ci si aspetta nel caso di successo.  // Se vuoi mostrare un'altra cosa, potrebbe essere utile aggiungere un controllo di stato sul codice HTTP che riceviamo dal server.
            }
         })
        .catch(err => {console.log(err)})        
    }

     return(
        <>
            <form onSubmit={handleForm}>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email}   onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password"  value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name}  onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                </div>
                <div>
                    <label>last_name</label>
                    <input type="text" name="last_name"  value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})}/>
                </div>
                <div>
                    <label>phone</label>
                    <input type="text" name="phone"  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
                </div>
                <button type="submit">Registrati</button>
            </form>
    </>
    )
}