import { useState } from "react";
import dayjs from "dayjs"


const initialFormData = {
    name: '',
    text: '',
    days_of_stay: 1,
    date: ''
}

export default function ReviewForm({ id }) {

    const [formData, setFormData] = useState(initialFormData);

    function handleForm(e) {

        e.preventDefault();

        /* 😁 ADD CONTROLS CLIENT SIDE */
        // Creare un div dove inserire gli errori del form
        if (formData.name === '') {
            alert('Il campo Name non può essere vuoto');
            return;
        }

        if (formData.text === '') {
            alert('Il campo Review non può essere vuoto');
            return;
        }
        if (formData.days_of_stay < 1 || (typeof (formData.days_of_stay) !== "number")) {
            alert('Il campo Days of stay deve essere un numero e maggiore di 0');
            return;
        }
        if (formData.date === '') {
            alert('Il campo Data non può essere vuoto');
            return;
        }

        // controlla che il bro non sia nel futuro
        const formattedDate = dayjs().format('YYYY-MM-DD');
        if (formData.date > formattedDate) {
            alert('Dove vai Marty McFly?!');
            return
        }


        // send form data to server
        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, id_apartment_fk: Number(id) })
        })
            .then(resp => resp.json())
            .then(data => {
                setFormData(initialFormData);
                if (data.statusCode !== 201) return console.log('Errore');
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <>

            <form className="card bg-light bg-gradient shadow-sm d-flex flex-column p-3" onSubmit={handleForm}>
                <h4 className="text-center">Lascia la tua recensione</h4>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        placeholder="Scrivi il tuo nome"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="days_of_stay" className="form-label">Giorni di pernottamento</label>
                    <input
                        type="number"
                        min="0"
                        name="days_of_stay"
                        id="days_of_stay"
                        className="form-control"
                        placeholder="segna quanti giorni hai pernottato in questo appartamento"
                        value={formData.days_of_stay}
                        onChange={(e) => setFormData({ ...formData, days_of_stay: Number(e.target.value) })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Data</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        className="form-control"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Recensione</label>
                    <textarea
                        name="text"
                        id="text"
                        className="form-control"
                        placeholder="Scrivi la tua recensione"
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Salva</button>
            </form>


        </>
    )
}