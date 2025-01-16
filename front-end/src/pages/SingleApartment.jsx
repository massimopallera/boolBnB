import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleApartmentCard from '../components/Cards/SingleApartmentCard';


import ReviewsSection from "../components/Reviews/ShowReviews"
import NewReview from '../components/Reviews/NewReview';


export default function SingleApartment() {

    const [reviewCounter, setReviewCounter] = useState(0);

    const { id } = useParams();


    return (
        <>
            <div className="container">

                <div>
                    <SingleApartmentCard id={id} />
                </div>


                <h3 className='text-center mt-5'>Recensioni {reviewCounter} </h3> {/* COUNTER RECENSIONI */}
                <div className='d-flex flex-wrap justify-content-between'>

                    {/* Reviews Form */}
                    <div className='col-12 col-lg-4 my-3'><NewReview id={id}></NewReview></div>


                    {/* Reviews */}
                    <span className="col-12 col-lg-8 reviewBox my-3 ">
                        <ReviewsSection id={id} setCounter={ (cont) => setReviewCounter(cont) }>
                        </ReviewsSection>
                    </span>

                </div>
            </div>

        </>

    )
}