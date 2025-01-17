import { useGlobalContext } from '../context/GlobalContext'
import HomepageCard from '../components/Homepage/HomepageCard'

export default function HomePage() {

    const { apartments } = useGlobalContext()

    return (
        <>
            <div className="container" style={{ maxWidth: "1800px" }}>
                <h2 className=' pb-4'>STRUTTURE: </h2>
                <div className='row row-cols-sm-12 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 align-items-stretch justify-content-center g-5'>

                    {apartments.map(apartment => (
                        <HomepageCard apartment={apartment} key={apartment.id} />
                    ))
                    }
                </div>
            </div>
        </>

    )
}