import { Link } from "react-router-dom"

export default function HomepageApartmentCard({ apartment }) {

    return (
        <>

            <div className="col">
                <Link to={`/apartments/${apartment.id}`} className="overviewCard card bg-light bg-gradient shadow-sm d-flex flex-column p-3">
                    <span> <strong>Immagine:</strong> {apartment.apartment_images}</span>
                    <span> <strong>Descrizione:</strong> {apartment.description}</span>
                    <span> <strong>Indirizzo:</strong> {apartment.address}</span>
                    <span> <strong>Cuori:</strong> {apartment.hearts_counter}</span>
                </Link>

            </div>

        </>
    )
}


