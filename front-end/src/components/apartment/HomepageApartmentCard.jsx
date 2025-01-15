import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function HomepageApartmentCard({ apartment }) {


    return (
        <>

            <div className="col">
                <Link to={`/apartments/${apartment.id}`} className="overviewCard card bg-light bg-gradient shadow-sm d-flex flex-column p-3">
                    <span> <img
                        src={apartment.apartment_images || "/placeholder.png"}
                        alt="Apartment"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: '150px', objectFit: 'cover' }}
                    /></span>
                    <div className="card-body bg-white border mt-4">
                        <strong>Descrizione:</strong><p>  {apartment.description}</p>
                        <span> <strong>Indirizzo:</strong> {apartment.address}</span>
                    </div>
                    <div className="p-2">
                        <i className="bi bi-heart-fill mt-3 text-danger">  {apartment.hearts_counter}</i>
                    </div>
                </Link>
            </div>

        </>
    )
}


