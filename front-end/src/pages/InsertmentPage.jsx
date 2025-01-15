import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [apartments, setAparments] = useState([])

    const navigate = useNavigate()

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
                const aux = apartments
                aux.unshift(formData)
                setAparments(aux)
                setFormData(initialFormData);
                // window.location.reload() 
            })
            .catch(err => console.log(err))
    }

    function getApartments(isAuthenticated){
        if(isAuthenticated){
            fetch('http://localhost:3000/apartments/owner-apartments', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json" // Specifica il tipo di contenuto come JSON
                },
                credentials: 'include',
            })
                .then(resp => resp.json())
                .then(data => {
                    setAparments(data.data)
                })
                .catch(err => console.log(err))
        } else console.log('nuh uh');
        
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            const baseUrl = import.meta.env.VITE_EXPRESS_SERVER;
            const path = baseUrl + '/check'; // Endpoint per verificare la sessione
    
            try {
                const response = await fetch(path, {
                    method: 'GET',
                    credentials: 'include', // Necessario per includere i cookie
                });
    
                if (response.ok) {
                    console.log('Utente autenticato');
                    setIsAuthenticated(true)
                    getApartments(true)
                    // navigate('/'); // Redirigi se autenticato
                } else {
                    setIsAuthenticated(false)
                    console.log('Utente non autenticato');
                    navigate('/')
                }
            } catch (error) {
                console.error('Errore durante la verifica della sessione:', error);
            }
        };
    
        checkAuthentication();
        
    }, [navigate]);

    console.log(apartments);
    


    return (
        <>
            {isAuthenticated ? (


                <> 
                    
             
            <div className="container mt-5 ">
                <form className="card bg-light bg-gradientd-flex flex-column p-3 mb-3" onSubmit={handleForm}>
                    <h4 className="text-center">Aggiungi inserzione</h4>
                    <div className="mb-3">
                        <label htmlFor="rooms" className="form-label">Stanze</label>
                        <input type="number" min="0" className="form-control" name="rooms" id="rooms" placeholder="Inserisci il numero di stanza dell'appartamento" value={formData.rooms} onChange={(e) => setFormData({ ...formData, rooms: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="beds" className="form-label">Letti</label>
                        <input type="number" min="0" className="form-control" name="beds" id="beds" placeholder="Inserisci il numero di letti dell'appartamento" value={formData.beds} onChange={(e) => setFormData({ ...formData, beds: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="toilets" className="form-label">Bagni</label>
                        <input type="number" min="0" className="form-control" name="toilets" id="toilets" placeholder="Inserisci il numero di bagni dell'appartamento" value={formData.toilets} onChange={(e) => setFormData({ ...formData, toilets: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sq_meters" className="form-label">Metri quadri</label>
                        <input type="number" min="0" className="form-control" name="sq_meters" id="sq_meters" placeholder="Inserisci la grandezza in metri quadri dell'appartamento" value={formData.sq_meters} onChange={(e) => setFormData({ ...formData, sq_meters: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Indirizzo</label>
                        <input type="text" className="form-control" name="address" id="address" placeholder="Inserisci l'indirizzo dell'appartamento" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apartments_images" className="form-label">Immagine</label>
                        <input type="text" className="form-control" name="apartments_images" id="apartments_images" placeholder="inserisci un'immagine dell'appartamento" value={formData.apartments_images} onChange={(e) => setFormData({ ...formData, apartments_images: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descrizione</label>
                        <textarea className="form-control" name="text" id="description" placeholder="Descrivi brevemente l'appartamento" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Salva</button>
                </form>
            </div>

                <hr />
                <h2>Le Tue Inserzioni</h2>

                <div className="row row-cols-1">
                {apartments.map((element) => (
                    <div key={element.id} className=" col mb-3">
                        <div className="card" >
                            <img src={element.apartments_images} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">{element.address}</h5>
                                <p className="card-text">{element.description}</p>
                                
                            </div>
                        </div>
                    </div>
                ))}
                        
            </div>
            </>
            ) : ('NOT AUTHENTICATED')}

           
        </>
    )
}