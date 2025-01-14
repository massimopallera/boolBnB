export default function DetailApartmentCard({ apartment }) {



    return (
        <>
            <div className="">
                <div className="card bg-light bg-gradientd-flex flex-column p-3">
                    <div className="d-flex justify-content-center mb-3">
                        <img
                            src={apartment.apartment_images || "/placeholder.png"}
                            alt="Apartment"
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: '700px', objectFit: 'cover' }}
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
                                <li><strong>Cuori:</strong> {apartment.hearts_counter}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


