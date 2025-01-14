import { useState, useEffect } from 'react'
import ApartmentCard from '../components/apartment/ApartmentCard'
import { useApartmentContext } from '../context/GlobalContext'

export default function HomePage() {

    const { apartments } = useApartmentContext()

    return (
        <>
            <div className="container m-auto">
                {<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5'>
                    {
                        apartments.map(apartment => (
                            <div key={apartment.id}>
                                <ApartmentCard apartment={apartment} />
                            </div>
                        ))
                    }
                </div>}
            </div>

        </>

    )



}