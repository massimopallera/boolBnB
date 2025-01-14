import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailApartmentCard from '../components/apartment/DetailApartmentCard';


import ReviewsSection from "../components/apartment/ReviewsSection"
import ReviewForm from '../components/apartment/ReviewForm';



export default function ApartmentDetailsPage() {

    const { id } = useParams();

    const apartmentsApi = `http://127.0.0.1:3000/apartments/${id}`;

    const [apartment, setApartment] = useState({})

    useEffect(() => {
        fetch(apartmentsApi)
        .then(resp => resp.json())
        .then(result => setApartment(result.data[0]))
        .catch(err => console.log(err))
    }, []);


    // email form
    // hearts logic



    return (
        <>
            <div className="container m-auto">
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5'>
                    {
                        <div key={apartment.id}>
                            <DetailApartmentCard apartment={apartment} />
                        </div>
                    }

                    {/* Reviews */}
                    <ReviewsSection id={id}></ReviewsSection>
                    {/* Reviews Form */}
                    <ReviewForm id={id}></ReviewForm>
                </div>
            </div>

        </>

    )
}