
import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import HomepageCard from "../components/Homepage/HomepageCard";
import SearchField from "../components/Homepage/SearchFields";

export default function HomePage() {
    const { apartments } = useGlobalContext();
    const [filteredApartments, setFilteredApartments] = useState(apartments);

    return (
        <div className="container" style={{ maxWidth: "1800px" }}>
            <h3 className="text-center">RICERCA</h3>
            <SearchField setFilteredApartments={setFilteredApartments} />
            <h2 className="pb-4">STRUTTURE: </h2>
            {filteredApartments && filteredApartments.length > 0 ? (<div className="row row-cols-sm-12 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 align-items-stretch justify-content-center g-5">
                {filteredApartments.map((apartment) => (
                    <HomepageCard apartment={apartment} key={apartment.id} />
                ))}
            </div>
            ) : (<>
                <div>
                    <h5>Spiacente, non ho trovato nulla con i requisiti richiesti.</h5>
                </div>


            </>)}
        </div>

    );
}
