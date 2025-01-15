import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function HomepageApartmentCard({ apartment }) {


    return (
        <>

            <div className="col d-flex justify-content-center">
                <Link to={`/apartments/${apartment.id}`} className="overviewCard card bg-light bg-gradient shadow-sm d-flex flex-column ">
                    <span> <img
                        src={apartment.apartment_images || "/placeholder.png"}
                        alt="Apartment"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: '100%', objectFit: 'cover' }}
                    /></span>
                    <div className="card-body mt-2">
                        <div className="mb-2"><strong>Descrizione:</strong>  {apartment.description}</div>

                        <div> <strong>Indirizzo:</strong> {apartment.address}</div>
                    </div>
                    <div className="p-2">
                        <i className="bi bi-heart-fill mt-3 text-danger">  {apartment.hearts_counter}</i>
                    </div>
                </Link>
            </div>

        </>
    )
}


