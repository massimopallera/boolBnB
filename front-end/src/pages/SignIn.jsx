import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa gli stili per il toast

export default function SignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        last_name: "",
        phone: ""
    });

    const handleForm = (e) => {
        e.preventDefault();

        // Simula un'operazione di registrazione con un controllo base (modifica a seconda della logica effettiva)
        if (formData.email && formData.password) {
            // Successo nella registrazione
            toast.success("Registrazione effettuata con successo!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            setTimeout(() => { navigate("/"); window.location.reload() }, 1000); // Ritardo del redirect
        } else {
            // Errore nei dati
            toast.error("Compila tutti i campi correttamente!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

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
            <ToastContainer /> {/* Mostra i toast sopra il contenuto */}
        </>
    );
}
