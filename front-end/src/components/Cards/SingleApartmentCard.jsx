import { useState, useEffect } from "react"
export default function SingleApartment({ id }) {

    const [apartment, setApartment] = useState()
    const [likesCounter, setLikesCounter] = useState(0)

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/apartments/${id}`)
           .then(resp => resp.json())
           .then(data => {setApartment(data.data[0]); setLikesCounter(data.data[0].hearts_counter);})
           .catch(err => console.log(err))
    },[])


    function handleClick() {
        setLikesCounter(likesCounter + 1)  // increment likes counter
        // send like to server
        fetch(`http://localhost:3000/apartments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ hearts_counter: likesCounter }),
            headers: { "Content-Type": "application/json" }
        })
           .then(resp => resp.json())
        //    .then(data => )
           .catch(err => console.log(err))

    }

    return (
        <>
            {apartment ? (

                <div className="container m-auto ">
                    <div className="bg-lightflex-row bg-gradientd-flex row">
                        <div className=" d-flex  row justify-content-center flex-wrap border shadow rounded p-4 bg-light bg-gradient">
                            <div className="col-sm-12 col-lg-8 p-0 m-0">
                                <img
                                    src={apartment.apartment_images || "/placeholder.png"}
                                    alt="apartment"
                                    className="img-fluid rounded"
                                />
                            </div>

                            <div className="col-sm-12 col-lg-4">

                                <div className=" ">
                                    <ul className="list-unstyled p-4">
                                        <li><strong>Descrizione:</strong> {apartment.description}</li>
                                        <li><strong>Stanze:</strong> {apartment.rooms}</li>
                                        <li><strong>Letti:</strong> {apartment.beds}</li>
                                        <li><strong>Bagni:</strong> {apartment.toilets}</li>
                                        <li><strong>Mq:</strong> {apartment.sq_meters}</li>
                                        <li><strong>Indirizzo:</strong> {apartment.address}</li>
                                        <li><strong>Email:</strong> {apartment.email}</li>
                                        {
                                            apartment?.added_services !== null && <li><strong>Servizi aggiuntivi:</strong> {apartment.added_services}</li>
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between fs-4 mx-1 mt-3">
                                <div className="d-flex">
                                    <div className="like"><i onClick={() => handleClick()} className="bi bi-heart-fill text-danger mx-2"> </i>
                                    </div>
                                    <span>{likesCounter} </span>
                                </div>

                                <button className="btn btn-primary">Contatta proprietario</button>
                            </div>

                        </div>
                    </div>
                </div>
            ) : null
            }
        </>
    )
}


