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
                            <div>{apartment.id}</div>
                            <div>{apartment.owner_id}</div>
                            <div>{apartment.description}</div>
                            <div>{apartment.rooms}</div>
                            <div>{apartment.beds}</div>
                            <div>{apartment.toilets}</div>
                            <div>{apartment.sq_meters}</div>
                            <div>{apartment.address}</div>
                            <div>{apartment.reference_email}</div>
                            <div>{apartment.apartment_images}</div>
                            <div>{apartment.added_services}</div>
                            <div>{apartment.hearts_counter}</div>
                        </div>
                    ))
                }
            </div>}
        </>

    )



}