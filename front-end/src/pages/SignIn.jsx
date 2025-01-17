import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const initialFormData = {
    email: "",
    password: "",
    verifyPassword: "",
    name: "",
    last_name: "",
    phone: "",
};

export default function RegistrationForm() {
    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();


    const handleForm = (e) => {
        e.preventDefault();

        const {
            email,
            password,
            verifyPassword,
            name,
            last_name,
            phone,
        } = formData


        for (const key in formData) {
            if(!formData[key]){
                toast.error(`Il campo ${key} non può essere vuoto`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }
        }
        
        if(!Number(phone)){
            toast.error("Il numero di telefono non è valido", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }



        if (password !== verifyPassword) {
            toast.error("Le password non coincidono", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }


        const baseUrl = import.meta.env.VITE_EXPRESS_SERVER;
        const path = baseUrl + "/user";

        fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.statusCode === 201) {
                    // Success: Registration completed
                    toast.success("Registrazione riuscita!", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    console.log("Utente registrato correttamente");
                    setTimeout(() => { navigate("/"); window.location.reload() }, 1000); // Ritardo del redirect
                } else {
                    // Error handling (example: already registered email)
                    if (data.statusCode === 409) {
                        toast.error("Email già registrata. Prova con un'altra.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    }
                    console.error("Errore durante la registrazione");
                }
            })
            .catch((err) => {
                toast.error("Errore di connessione. Riprova più tardi.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.log(err);
            });
    };

    return (
        <>
            <form onSubmit={handleForm} className="p-5 rounded-3 shadow-lg bg-light">
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
                    <label htmlFor="verifyPassword" className="form-label">Conferma Password</label>
                    <input
                        type="password"
                        id="verifyPassword"
                        name="verifyPassword"
                        value={formData.verifyPassword}
                        onChange={(e) => setFormData({ ...formData, verifyPassword: e.target.value })}
                        className="form-control form-control-lg"
                        placeholder="Conferma Password"
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

            {/* Aggiungi il ToastContainer per gestire i toast */}
            <ToastContainer />
        </>
    );
}
