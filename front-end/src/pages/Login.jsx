import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormData = {
    email: "",
    password: "",
};

export default function Login() {
    const [formData, setFormData] = useState(initialFormData);
    const { checkAuthentication } = useGlobalContext();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const baseUrl = import.meta.env.VITE_EXPRESS_SERVER;
        const path = baseUrl + "/login";

        try {
            const response = await fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData }),
                credentials: "include", // Include i cookie nella richiesta
            })
            // Controlla lo status HTTP della risposta
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Estrai i dati dalla risposta

            if (data.success) {
                // Login riuscito
                setFormData(initialFormData);

                toast.success("Accesso eseguito con successo!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                // Ritardo per redirect
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 1000);

            }
        } catch (error) {




            console.error("Errore durante il login:", error);
            toast.error("Si è verificato un errore imprevisto.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <>
            <div className="container">
                <form onSubmit={handleLogin} className="p-sm-5 p-2 rounded-3 shadow-lg bg-light">
                    <h2 className="text-center mb-4">Accedi al tuo account</h2>

                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control form-control-lg"
                            placeholder="Inserisci la tua email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            value={formData.email}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg"
                            placeholder="Inserisci la tua password"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            value={formData.password}
                            required
                        />
                    </div>

                    <div className="d-grid gap-2 mb-4">
                        <button type="submit" className="btn btn-primary btn-lg">Login</button>
                    </div>

                    <div className="text-center">
                        <p className="text-muted">Non hai un account? <a href="sign-in" className="text-decoration-none text-primary">Registrati!</a></p>
                    </div>


                </form>
            </div>


            <ToastContainer />
        </>
    );
}



