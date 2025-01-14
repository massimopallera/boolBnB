import { useGlobalContext } from '../context/GlobalContext'
import HomepageApartmentCard from '../components/apartment/HomepageApartmentCard'

export default function HomePage() {

    const { apartments } = useGlobalContext()



    return (
        <>
            <div className="container m-auto">
                {<div className='row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-5'>
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