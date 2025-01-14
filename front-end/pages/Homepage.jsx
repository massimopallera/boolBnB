import { useState, useEffect } from 'react'

import { useApartmentContext } from '../context/GlobalContext'
import HomepageApartmentCard from '../components/apartment/HomepageApartmentCard'

export default function HomePage() {

    const { apartments, fetchApartments } = useApartmentContext()

    const apartmentList = fetchApartments()

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