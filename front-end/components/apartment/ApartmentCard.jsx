import { Link } from "react-router-dom"

export default function ApartmentCard({ apartment }) {

    return (
        <>
            <div>
                <div> <strong>Descrizione:</strong> {apartment.description}</div>
                <div> <strong>Stanze:</strong> {apartment.rooms}</div>
                <div> <strong>Letti:</strong> {apartment.beds}</div>
                <div> <strong>Bagni:</strong> {apartment.toilets}</div>
                <div> <strong>Mq:</strong> {apartment.sq_meters}</div>
                <div> <strong>Indirizzo:</strong> {apartment.address}</div>
                <div> <strong>Email (da eliminare):</strong> {apartment.reference_email}</div>
                <div> <strong>Immagine:</strong> {apartment.apartment_images}</div>
                <div> <strong>Servizi aggiuntivi:</strong> {apartment.added_services}</div>
                <div> <strong>Cuori:</strong> {apartment.hearts_counter}</div>
                <Link to={`/apartments/${apartment.id}`} className="btn btn-primary">Dettagli</Link>
                <hr />
            </div>
        </>
    )
}


