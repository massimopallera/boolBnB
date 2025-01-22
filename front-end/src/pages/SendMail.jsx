import { useLocation } from "react-router-dom"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const initialFormData = {
    to: '',
    subject: '',
    text: '',
}




export default function SendMail() {

    const location = useLocation()
    const { ownerEmail } = location.state || ''
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ initialFormData, to: ownerEmail })
    //send email
    function handleMail(e) {
        e.preventDefault()

        if (!formData.subject) {
            toast.error("Il campo oggetto non può rimanere vuoto.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        if (!formData.text) {
            toast.error("Il campo testo non può rimanere vuoto.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        fetch('http://127.0.0.1:3000/info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, to: ownerEmail })
        }).then(resp => resp.json())
            .then(data => {
                console.log(data)
                toast.success("Email inviata con successo!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate(-1);

                }, 1000);
            })
            .catch(err => {
                console.error(err);
                toast.error("Errore durante l'invio dell'email.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    theme: "light",
                });
            });
    }


    return (
        <>

            <div className="container my-5">
                <h2 className="mb-4 text-center">Invia una Email</h2>
                <form className="p-4 shadow rounded bg-light" onSubmit={handleMail}>
                    {/* Campo Email */}
                    <div className="mb-3">
                        <label htmlFor="to" className="form-label">
                            Inserisci la tua mail
                        </label>
                        <input
                            type="email"
                            id="to"
                            name="to"
                            className="form-control"
                            placeholder="tuamail@mail.it"
                        /* value={formData.to}
                        disabled */
                        />
                    </div>

                    {/* Campo Oggetto */}
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">
                            Oggetto
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="form-control"
                            placeholder="Inserisci l'oggetto della mail"
                            value={formData.subject}
                            onChange={(e) =>
                                setFormData({ ...formData, subject: e.target.value })
                            }
                        />
                    </div>

                    {/* Campo Testo */}
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">
                            Testo del messaggio
                        </label>
                        <textarea
                            id="text"
                            name="text"
                            className="form-control"
                            rows="5"
                            placeholder="Scrivi il contenuto della tua email"
                            value={formData.text}
                            onChange={(e) =>
                                setFormData({ ...formData, text: e.target.value })
                            }
                        ></textarea>
                    </div>

                    {/* Pulsante Invia */}
                    <div className="d-grid">
                        <button className="btn btn-primary btn-lg" type="submit">
                            Invia Email
                        </button>
                    </div>
                </form>

                <ToastContainer />
            </div>
        </>
    )
}