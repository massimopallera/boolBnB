export default function DetailApartmentCard({ apartment }) {



    return (
        <>
            <div className="container-sm m-auto ">
                <div className="card bg-light bg-gradientd-flex flex-column p-3">
                    <div className="d-flex justify-content-center mb-3">
                        <img
                            src={apartment.apartment_images || "/placeholder.png"}
                            alt="Apartment"
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
                    <i className="bi bi-heart-fill fs-1 mt-3 text-danger">  {apartment.hearts_counter}</i>
                </div>
            </div>
        </>
    )
}


