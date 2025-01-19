
import { useGlobalContext } from "../context/GlobalContext";
import HomepageCard from "../components/Homepage/HomepageCard";

export default function HomePage() {
    const { apartments } = useGlobalContext();

    return (
        <div className="container px-4" style={{ maxWidth: "2400px" }}>
        <h1 className="mb-3 text-center">STRUTTURE</h1>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
                    {apartments.map((apartment) => (
                        <HomepageCard apartment={apartment} key={apartment.id} />
                    ))}
                </div>
        </div>

    );
}
