import { Link } from "react-router-dom"

export default function ApartmentCard({ apartment }) {

    return (
        <>



            <div className="col">
                <Link to={`/apartments/${apartment.id}`} className="card shadow-sm d-flex flex-column p-3">
                    <span> <strong>Immagine:</strong> {apartment.apartment_images}</span>
                    <span> <strong>Descrizione:</strong> {apartment.description}</span>
                    <span> <strong>Stanze:</strong> {apartment.rooms}</span>
                    <span> <strong>Letti:</strong> {apartment.beds}</span>
                    <span> <strong>Bagni:</strong> {apartment.toilets}</span>
                    <span> <strong>Mq:</strong> {apartment.sq_meters}</span>
                    <span> <strong>Indirizzo:</strong> {apartment.address}</span>
                    <span> <strong>Email (da eliminare):</strong> {apartment.reference_email}</span>
                    <span> <strong>Servizi aggiuntivi:</strong> {apartment.added_services}</span>
                    <span> <strong>Cuori:</strong> {apartment.hearts_counter}</span>
                </Link>

            </div>










        </>
    )
}


