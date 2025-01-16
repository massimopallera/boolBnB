import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialFormData = {
    email: '',
    password: '',
    name: '',
    last_name: '',
    phone: '',
}
export default function SignIn() {


    const [formData, setFormData] = useState(initialFormData)
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault()

        const baseUrl = import.meta.env.VITE_EXPRESS_SERVER
        const path = baseUrl + '/user'
        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.statusCode === 201) {
                    console.log('Utente registrato correttamente')
                    toast.success("Registrazione riuscita!", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setTimeout(() => navigate("/"), 1000); // Ritardo del redirect
                } else {
                    console.error('Errore durante la registrazione')  // Mostra il messaggio di errore nel caso di fallimento 201 non viene raggiunto  // Se vuoi mostrare un'altra cosa in caso di fallimento, puoi aggiungere una logica di controllo al codice HTTP che riceviamo dal server.  // Esempio: if (data.statusCode === 400) console.error('Email già registrata')  // Altrimenti, puoi mostrare un messaggio generico.  // In questo caso, il codice 201 è quello che ci si aspetta nel caso di successo.  // Se vuoi mostrare un'altra cosa, potrebbe essere utile aggiungere un controllo di stato sul codice HTTP che riceviamo dal server.
                }
            })
            .catch(err => { console.log(err) })
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleForm} className="p-sm-5 p-2 rounded-3 shadow-lg bg-light">
                    <h2 className="text-center mb-4">Registrati</h2>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="form-control form-control-lg"
                            placeholder="Inserisci la tua email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="form-control form-control-lg"
                            placeholder="Crea una password"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="form-control form-control-lg"
                            placeholder="Inserisci il tuo nome"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Cognome</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            className="form-control form-control-lg"
                            placeholder="Inserisci il tuo cognome"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Telefono</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="form-control form-control-lg"
                            placeholder="Inserisci il tuo numero di telefono"
                            required
                        />
                    </div>

                    <div className="d-grid gap-2 mb-4">
                        <button type="submit" className="btn btn-primary btn-lg">Registrati</button>
                    </div>

                    <div className="text-center">
                        <p className="text-muted">Hai già un account? <a href="/login" className="text-decoration-none text-primary">Accedi</a></p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}