import { useState, useEffect } from "react"
export default function DetailApartmentCard({ id }) {

    const [apartment, setApartment] = useState()
    const [likesCounter, setLikesCounter] = useState(0)

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/apartments/${id}`)
           .then(resp => resp.json())
           .then(data => { setApartment(data.data[0]); setLikesCounter(data.data[0].hearts_counter);})
           .catch(err => console.log(err))
    },[])


    function handleClick(){
        setLikesCounter(likesCounter + 1)  // increment likes counter
        // send like to server
        fetch(`http://localhost:3000/apartments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({hearts_counter: likesCounter}),
            headers:{ "Content-Type": "application/json" }
        })
           .then(resp => resp.json())
           .then(data => console.log('fatto'))
           .catch(err => console.log(err))
    }

    return (
        <>
        { apartment ? (

            <div className="container-sm m-auto ">
                <div className="card bg-light bg-gradientd-flex flex-column p-3">
                    <div className="d-flex justify-content-center mb-3">
                        <img
                            src={apartment.apartment_images || "/placeholder.png"}
                            alt="apartment"
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li><strong>Descrizione:</strong> {apartment.description}</li>
                                <li><strong>Stanze:</strong> {apartment.rooms}</li>
                                <li><strong>Letti:</strong> {apartment.beds}</li>
                                <li><strong>Bagni:</strong> {apartment.toilets}</li>
                                <li><strong>Mq:</strong> {apartment.sq_meters}</li>
                                <li><strong>Indirizzo:</strong> {apartment.address}</li>
                                <li><strong>Email:</strong> {apartment.email}</li>
                                <li><strong>Servizi aggiuntivi:</strong> {apartment.added_services}</li>
                            </ul>
                        </div>
                    </div>
                        <div className="d-flex align-items-center fs-4 gap-2">
                            <i onClick={() => handleClick()} className="bi bi-heart-fill text-danger"> </i>
                            <span>{likesCounter}</span>   
                        </div>
                       
                </div>
            </div>
            ) : null
    }
        </>
    )
}


