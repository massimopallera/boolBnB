import { Link } from "react-router-dom"

export default function HomepageCard({ apartment }) {

    return (
        <div className="col d-flex justify-content-center my-3">
            <Link to={`/apartments/${apartment.id}`} className="overviewCard card bg-light bg-gradient shadow-sm d-flex flex-column">

                {/* LIKE COUNTER & HEART ICON */}
                <span>
                    <div className="homeLike d-flex px-2" style={{fontSize:'15px', padding: "1px 0"}}>
                        <span className="">{apartment.hearts_counter}</span>
                        <i className="bi bi-heart-fill text-danger"></i>
                    </div>

                    <img
                        src={ apartment.apartments_images != '' ? `http://localhost:3000/uploads/${apartment.apartments_images}` : "/placeholder.png"}
                        alt="Apartment"
                        className="img-fluid rounded"
                        style={{ maxHeight: '100%', objectFit: 'cover' }}
                    />
                </span>

                <div className="card-body mt-2">
                    <div className="mb-2"><strong>{apartment.name}</strong> </div>
                    <div>{apartment.address}</div>
                </div>

            </Link>
        </div>
    )
}


