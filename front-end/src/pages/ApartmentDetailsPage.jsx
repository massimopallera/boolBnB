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
            <div className="container">

                <div>
                    <DetailApartmentCard id={id} />
                </div>


                <h3 className='text-center mt-5'>Recensioni</h3>

                <div className='d-flex flex-wrap justify-content-between'>
                    {/* Reviews Form */}
                    <div className='col-12 col-lg-4 my-3'><ReviewForm id={id}></ReviewForm></div>
                    {/* Reviews */}
                    <span className="col-12 col-lg-8 reviewBox my-3 "><ReviewsSection id={id}></ReviewsSection></span>
                </div>

            </div>

        </>

    )
}