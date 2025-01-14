

export default function DetailApartmentCard({ apartment }) {



    return (
        <>
            <div className="col">
                <div className="card bg-light bg-gradient shadow-sm d-flex flex-column p-3">
                    <span> <strong>Immagine:</strong> {apartment.apartment_images}</span>
                    <span> <strong>Descrizione:</strong> {apartment.description}</span>
                    <span> <strong>Stanze:</strong> {apartment.rooms}</span>
                    <span> <strong>Letti:</strong> {apartment.beds}</span>
                    <span> <strong>Bagni:</strong> {apartment.toilets}</span>
                    <span> <strong>Mq:</strong> {apartment.sq_meters}</span>
                    <span> <strong>Indirizzo:</strong> {apartment.address}</span>
                    <span> <strong>Email:</strong> {apartment.email}</span>
                    <span> <strong>Servizi aggiuntivi:</strong> {apartment.added_services}</span>
                    <span> <strong>Cuori:</strong> {apartment.hearts_counter}</span>
                </div>
            </div>

            

        </>
    )
}


