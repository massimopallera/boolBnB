import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default function ShowOwnerAps({ isAuthenticated }) {

    const [apartments, setAparments] = useState([])


    // get owner apartments if authenticated
    async function getApartments(isAuthenticated) {
        if (isAuthenticated) {
            fetch('http://localhost:3000/apartments/owner-apartments', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json" // Specifica il tipo di contenuto come JSON
                },
                credentials: 'include',
            })
                .then(resp => resp.json())
                .then(data => { setAparments(data.data) })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        getApartments(isAuthenticated)
    }, [isAuthenticated])

    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center align-items-stretch">
                {apartments ? (apartments.map((apartment) => (
                    <Link to={`/apartments/${apartment.name}?id=${apartment.id}`} className="text-decoration-none">
                        <div key={apartment.id} className=" col mb-3">
                            <div className="card h-100">
                                <div>
                                    <img
                                        src={apartment.apartments_images != '' ? `http://localhost:3000/uploads/${apartment.apartments_images}` : "/placeholder.png"}
                                        alt="Apartment"
                                        className="img-fluid rounded"
                                        style={{ maxHeight: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="">{apartment.name}</h5>
                                    <p className="">{apartment.address}</p>

                                </div>
                            </div>
                        </div>
                    </Link>
                ))) : <>

                    <div className="py-3">
                        <h5>Non hai aggiunto ancora nessun appartamento</h5>
                    </div>



                </>}

            </div >
        </>
    )
}