import { useState } from "react";
import dayjs from "dayjs"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const initialFormData = {
    name: '',
    text: '',
    days_of_stay: 1,
}

export default function NewReview({ id }) {

    const [formData, setFormData] = useState(initialFormData);
    const [formSubmitted, setFormSubmitted] = useState(false); // Stato per tracciare se il form è stato inviato

    function handleForm(e) {

        e.preventDefault();

        /* 😁 ADD CONTROLS CLIENT SIDE */
        // Creare un div dove inserire gli errori del form
        if (formData.name === '') {
            toast.error('Il campo "Nome" non può essere vuoto', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                theme: "light",
            });
            return;
        }

        if (formData.text === '') {
            toast.error('Il campo "Recensioni" non può essere vuoto', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                theme: "light",
            });
            return;
        }
        if (formData.days_of_stay < 1 || (typeof (formData.days_of_stay) !== "number")) {
            toast.error('Il campo "Giorni di permanenza" deve essere un numero maggiore di 0', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                theme: "light",
            });
            return;
        }
        // if (formData.date === '') {
        //     alert('Il campo Data non può essere vuoto');
        //     return;
        // }

        // controlla che il bro non sia nel futuro
        // const formattedDate = dayjs().format('YYYY-MM-DD');
        // if (formData.date > formattedDate) {
        //     alert('Dove vai Marty McFly?!');
        //     return
        // }

        // send form data to server
        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, id_apartment_fk: Number(id) })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.statusCode !== 201) {
                    toast.error('Errore durante il salvataggio della recensione');
                    return;
                }
                toast.success('Recensione salvata con successo!', { position: "top-center", autoClose: 2000 });
                setFormData(initialFormData); // Resetta il form
                setFormSubmitted(true); // Nasconde il pulsante "Salva"

                /* setTimeout(() => {
                    window.location.reload();
                }, 2000);  */// Aggiungi un ritardo per mostrare il messaggio prima del refresh
            })
            .catch(err => {
                console.error(err);
                toast.error('Errore di connessione al server');
            });
    }

    return (
        <>
            <ToastContainer />
            {!formSubmitted && (
                <form
                    className="card bg-light bg-gradient shadow-sm d-flex flex-column p-3"
                    onSubmit={handleForm}
                >
                    <h4 className="text-center">Lascia la tua recensione</h4>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="Scrivi il tuo nome"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="days_of_stay" className="form-label">
                            Giorni di permanenza
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="30"
                            name="days_of_stay"
                            id="days_of_stay"
                            className="form-control"
                            placeholder="segna quanti giorni hai pernottato in questo appartamento"
                            value={formData.days_of_stay}
                            onChange={(e) =>
                                setFormData({ ...formData, days_of_stay: Number(e.target.value) })
                            }
                        />
                    </div>

                    {/* <div className="mb-3">
                    <label htmlFor="date" className="form-label">Data</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        className="form-control"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}/>
                    </div> */}

                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">
                            Recensione
                        </label>
                        <textarea
                            name="text"
                            id="text"
                            className="form-control"
                            placeholder="Scrivi la tua recensione"
                            value={formData.text}
                            onChange={(e) =>
                                setFormData({ ...formData, text: e.target.value })
                            }
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Salva
                    </button>
                </form>
            )}
        </>
    )
}

