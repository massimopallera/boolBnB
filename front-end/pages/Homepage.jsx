import { useState, useEffect } from 'react'
import HomepageApartmentCard from '../components/apartment/HomepageApartmentCard'

export default function HomePage() {

    const apartmentsApi = "http://127.0.0.1:3000/apartments"

    const [apartments, SetApartments] = useState([])

    useEffect(() => {
        fetch(apartmentsApi)
            .then(resp => resp.json())
            .then(result => {
                console.log(result.data);
                SetApartments(result.data)
            })
    }, [])

    return (
        <>
            <div className="container m-auto">
                {<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5'>
                    {
                        apartments.map(apartment => (
                            <div key={apartment.id}>
                                <HomepageApartmentCard apartment={apartment} />
                            </div>
                        ))
                    }
                </div>}
            </div>

        </>

    )



}