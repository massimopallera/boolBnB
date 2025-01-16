import { useEffect, useState } from "react";

const initialFormData = {
    rooms: '',
    beds: '',
    toilets: '',
    sq_meters: '',
    address: '',
    apartments_images: '',
    description: '',
    price: 0,
    added_services: []

}


export default function AddForm({ isAuthenticated }) {

    const [formData, setFormData] = useState(initialFormData);
    const [services, setServices] = useState()
    const [errors, setErrors] = useState({});



    function handleForm(e) {
        e.preventDefault();

        let formErrors = {};


        if (!formData.rooms) formErrors.rooms = "Il numero di stanze è obbligatorio";
        if (!formData.beds) formErrors.beds = "Il numero di letti è obbligatorio";
        if (!formData.toilets) formErrors.toilets = "Il numero di bagni è obbligatorio";
        if (!formData.sq_meters) formErrors.sq_meters = "La grandezza in metri quadri è obbligatoria";
        if (!formData.address) formErrors.address = "L'indirizzo è obbligatorio";
        if (!formData.apartments_images) formErrors.apartments_images = "L'indirizzo è obbligatorio";



        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setErrors({});

        /* 😁 ADD CONTROLS CLIENT SIDE */

        // send form data to server
        fetch('http://localhost:3000/apartments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" // Specifica il tipo di contenuto come JSON
            },
            credentials: 'include',
            body: JSON.stringify({ ...formData })
        })
            .then(resp => resp.json())
            .then(data => {
                setFormData(initialFormData);
                window.location.reload()
            })
            .catch(err => console.log(err))


    }

    // get services FOR CHECKBOXES
    function getServices() {
        fetch('http://localhost:3000/apartments/services')
            .then(resp => resp.json())
            .then(data =>
                setServices(data.data)
            )
            .catch(err => console.log(err))
    }

    // checkbox logic
    function handleCheckbox(e) {
        const { value, checked } = e.target;
        let formErrors = {};

        let updatedServices = [...formData.added_services];

        if (checked) {
            if (!updatedServices.includes(value)) {
                updatedServices.push(value);
            }
        } else {
            updatedServices = updatedServices.filter(service => service !== value);
        }

        setFormData({ ...formData, added_services: updatedServices });

    }
    useEffect(() => { getServices() }, [isAuthenticated])


    return (
        <div className="container mt-5 ">
            <form className="card bg-light bg-gradientd-flex flex-column p-3 mb-3" onSubmit={handleForm}>
                <h4 className="text-center">Aggiungi inserzione</h4>
                <div className="mb-3">
                    <label htmlFor="rooms" className="form-label">Stanze</label>
                    <input type="number" min="0" className="form-control" name="rooms" id="rooms" placeholder="Inserisci il numero di stanza dell'appartamento" value={formData.rooms} onChange={(e) => setFormData({ ...formData, rooms: e.target.value })} />
                    {errors.rooms && (
                        <label className="text-danger" style={{ fontSize: "15px" }}>
                            {errors.rooms}
                        </label>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="beds" className="form-label">Letti</label>
                    <input type="number" min="0" className="form-control" name="beds" id="beds" placeholder="Inserisci il numero di letti dell'appartamento" value={formData.beds} onChange={(e) => setFormData({ ...formData, beds: e.target.value })} />
                    {errors.rooms && (
                        <label className="text-danger" style={{ fontSize: "15px" }}>
                            {errors.beds}
                        </label>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="toilets" className="form-label">Bagni</label>
                    <input type="number" min="0" className="form-control" name="toilets" id="toilets" placeholder="Inserisci il numero di bagni dell'appartamento" value={formData.toilets} onChange={(e) => setFormData({ ...formData, toilets: e.target.value })} />
                    {errors.toilets && (
                        <label className="text-danger" style={{ fontSize: "15px" }}>
                            {errors.toilets}
                        </label>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="sq_meters" className="form-label">Metri quadri</label>
                    <input type="number" min="0" className="form-control" name="sq_meters" id="sq_meters" placeholder="Inserisci la grandezza in metri quadri dell'appartamento" value={formData.sq_meters} onChange={(e) => setFormData({ ...formData, sq_meters: e.target.value })} />
                    {errors.sq_meters && (
                        <label className="text-danger" style={{ fontSize: "15px" }}>
                            {errors.sq_meters}
                        </label>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Indirizzo</label>
                    <input type="text" className="form-control" name="address" id="address" placeholder="Inserisci l'indirizzo dell'appartamento" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    {errors.address && (
                        <label className="text-danger" style={{ fontSize: "15px" }}>
                            {errors.address}
                        </label>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="apartments_images" className="form-label">Immagine</label>
                    <input type="text" className="form-control" name="apartments_images" id="apartments_images" placeholder="inserisci un'immagine dell'appartamento" value={formData.apartments_images} onChange={(e) => setFormData({ ...formData, apartments_images: e.target.value })} />
                    {errors.apartments_images && (
                        <label className="text-danger" style={{ fontSize: "15px" }}>
                            {errors.apartments_images}
                        </label>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descrizione</label>
                    <textarea className="form-control" name="text" id="description" placeholder="Descrivi brevemente l'appartamento" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                    {errors.description && (
                        <label className="text-danger" style={{ fontSize: "15px" }}>
                            {errors.description}
                        </label>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Prezzo a notte</label>
                    <input type="number" min="0" className="form-control" name="number" id="price" placeholder="Insrisci prezzo a notte" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}></input>
                </div>

                {services ? (services.map(service =>
                    <div key={service.id} className="form-check">
                        <input className="form-check-input" type="checkbox" value={service.id} id={`service-${service.id}`} onChange={(e) => handleCheckbox(e)} />
                        <label className="form-check-label" htmlFor={`service-${service.id}`}>{service.name}</label>
                    </div>
                ))
                    : null}




                <button type="submit" className="btn btn-primary">Salva</button>
            </form>
        </div>
    )
}