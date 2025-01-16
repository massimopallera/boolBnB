/* import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const initialFormData = {
    email: '',
    password: ''
}


export default function Login() {

    const [formData, setFormData] = useState(initialFormData)

    const { checkAuthentication } = useGlobalContext()
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()


    const validateFields = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "L'email è obbligatoria.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Inserisci un'email valida.";
        }

        if (!formData.password) {
            newErrors.password = "La password è obbligatoria.";
        } else if (formData.password.length < 6) {
            newErrors.password = "La password deve contenere almeno 6 caratteri.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const baseUrl = import.meta.env.VITE_EXPRESS_SERVER
        const path = baseUrl + '/login'

        if (!validateFields()) {
            return; // Interrompi il flusso se ci sono errori
        }

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




    return (
        <>


            <form onSubmit={handleLogin} className="p-5 rounded-3 shadow-lg bg-light">
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
                        required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
                        required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="d-grid gap-2 mb-4">
                    <button type="submit" className="btn btn-primary btn-lg">Login</button>
                </div>

                <div className="text-center">
                    <a href="sign-in" className="text-decoration-none text-muted">Hai dimenticato la password?</a>
                </div>
            </form>


        </>
    )
}
 */




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
            });

            setFormData(initialFormData);

            if (response.ok) {
                toast.success("Accesso eseguito con successo!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setTimeout(() => navigate("/"), 1000); // Ritardo del redirect
            } else {
                toast.error("Errore nel login. Controlla le credenziali.", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error("Errore durante il login:", error);
            toast.error("Si è verificato un errore imprevisto.", {
                position: "top-right",
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
        checkAuthentication("/apartments/addNew");
    }, []);

    return (
        <>
            <form onSubmit={handleLogin} className="p-5 rounded-3 shadow-lg bg-light">
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
                    <a href="sign-in" className="text-decoration-none text-muted">Hai dimenticato la password?</a>
                </div>
            </form>

            {/* Contenitore per le notifiche */}
            <ToastContainer />
        </>
    );
}



