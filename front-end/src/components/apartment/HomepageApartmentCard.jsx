import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function HomepageApartmentCard({ apartment }) {


    return (
        <>

            <div className="col d-flex justify-content-center">
                <Link to={`/apartments/${apartment.id}`} className="overviewCard card bg-light bg-gradient shadow-sm d-flex flex-column ">
                    <span>
                        <div className="homeLike d-flex  align-items-center"> <span className="mb-1">{apartment.hearts_counter}</span> <i className=" mx-1 bi bi-heart-fill text-danger"></i></div>

                        <img
                            src={apartment.apartment_images || "/placeholder.png"}
                            alt="Apartment"
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: '100%', objectFit: 'cover' }}
                        /></span>
                    <div className="card-body mt-2">
                        <div className="mb-2"><strong>Descrizione:</strong>  {apartment.description}</div>

                        <div> <strong>Indirizzo:</strong> {apartment.address}</div>
                    </div>

                </Link>
            </div>

        </>
    )
}


