import { useGlobalContext } from '../context/GlobalContext'
import HomepageCard from '../components/Cards/HomepageCard'

export default function HomePage() {

    const { apartments } = useGlobalContext()

    return (
    <>
        <div className="mx-5">
            {<div className='row row-cols-sm-12 row-cols-md-3 row-cols-lg-4 g-5'>
                {
                    apartments.map(apartment => (
                        <div key={apartment.id}>
                            <HomepageCard apartment={apartment} />
                        </div>
                    ))
                }
            </div>}
        </div>
    </>

    )
}