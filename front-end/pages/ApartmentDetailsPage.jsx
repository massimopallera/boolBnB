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
            <div className="container m-auto ">
                {
                    <div key={apartment.id}>
                        <DetailApartmentCard apartment={apartment} />
                    </div>
                }

                <h3 className='text-center my-4'>Recensioni</h3>
                <div className='d-flex justify-content-center'>
                    {/* Reviews Form */}
                    <ReviewForm id={id}></ReviewForm>
                    {/* Reviews */}
                    <ReviewsSection id={id}></ReviewsSection>
                </div>
            </div>

        </>

    )
}