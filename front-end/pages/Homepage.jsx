import { useState, useEffect } from 'react'
import ApartmentCard from '../components/apartment/ApartmentCard'

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
            {<div>
                {
                    apartments.map(apartment => (
                        <div key={apartment.id}>
                            <ApartmentCard apartment={apartment} />
                        </div>
                    ))
                }
            </div>}
        </>

    )



}