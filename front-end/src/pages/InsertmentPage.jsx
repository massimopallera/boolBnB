import { useState, useEffect } from "react";

const initialFormData = {
    rooms: '',
    beds: '',
    toilets: '',
    sq_meters: '',
    address: '',
    apartments_images: '',
    description: ''

}

export default function InsertmentPage() {

    const [formData, setFormData] = useState(initialFormData);

    function handleForm(e) {
        e.preventDefault();
        console.log(formData);

        /* 😁 ADD CONTROLS CLIENT SIDE */

        // send form data to server
        fetch('http://localhost:3000/apartments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" // Specifica il tipo di contenuto come JSON
            },
            body: JSON.stringify({ ...formData })
        })
            .then(resp => resp.json())
            .then(data => {

                setFormData(initialFormData);
                console.log(data)
                /*  window.location.reload() */
            })
            .catch(err => console.log(err))


    }


    return (
        <>
            <div className="container mt-5">
                <form className="card bg-light bg-gradientd-flex flex-column p-3" onSubmit={handleForm}>
                    <h4 className="text-center">Aggiungi inserzione</h4>
                    <div class="mb-3">
                        <label for="rooms" class="form-label">Stanze</label>
                        <input type="number" min="0" class="form-control" name="rooms" id="rooms" placeholder="Inserisci il numero di stanza dell'appartamento" value={formData.rooms} onChange={(e) => setFormData({ ...formData, rooms: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label for="beds" class="form-label">Letti</label>
                        <input type="number" min="0" class="form-control" name="beds" id="beds" placeholder="Inserisci il numero di letti dell'appartamento" value={formData.beds} onChange={(e) => setFormData({ ...formData, beds: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label for="toilets" class="form-label">Bagni</label>
                        <input type="number" min="0" class="form-control" name="toilets" id="toilets" placeholder="Inserisci il numero di bagni dell'appartamento" value={formData.toilets} onChange={(e) => setFormData({ ...formData, toilets: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label for="sq_meters" class="form-label">Metri quadri</label>
                        <input type="number" min="0" class="form-control" name="sq_meters" id="sq_meters" placeholder="Inserisci la grandezza in metri quadri dell'appartamento" value={formData.sq_meters} onChange={(e) => setFormData({ ...formData, sq_meters: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">Indirizzo</label>
                        <input type="text" class="form-control" name="address" id="address" placeholder="Inserisci l'indirizzo dell'appartamento" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label for="apartments_images" class="form-label">Immagine</label>
                        <input type="text" class="form-control" name="apartments_images" id="apartments_images" placeholder="inserisci un'immagine dell'appartamento" value={formData.apartments_images} onChange={(e) => setFormData({ ...formData, apartments_images: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Descrizione</label>
                        <textarea class="form-control" name="text" id="description" placeholder="Descrivi brevemente l'appartamento" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Salva</button>
                </form>
            </div>

        </>
    )
}