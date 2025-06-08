import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SingleApartmentCard from '../components/Cards/SingleApartmentCard';


import ReviewsSection from "../components/Reviews/ShowReviews"
import NewReview from '../components/Reviews/NewReview';


export default function SingleApartment() {

    const [reviewCounter, setReviewCounter] = useState(0);
    const [reviews, setReviews] = useState([])


    const [searchParams] = useSearchParams();
    const id  = searchParams.get('id');


    return (
        <>
            <div className="container">

                    <SingleApartmentCard id={id} />



                <h3 className='text-center mt-5'>Recensioni: {reviewCounter} </h3> {/* COUNTER RECENSIONI */}
                <div className='d-flex flex-wrap justify-content-center'>


                    {/* Reviews Form */}
                    <div className='col-12 col-lg-4 my-3' id="hide-form" ><NewReview id={id} counter={reviewCounter} setReviews={(newReview) => setReviews([newReview,...reviews])} setCounter={(cont) => setReviewCounter(cont)}></NewReview></div>


                    {/* Reviews */}
                    <span className="col-12 col-lg-8 reviewBox my-3 ">
                        <ReviewsSection id={id} setCounter={(cont) => setReviewCounter(cont)} setReviews={(element) => setReviews(element)} reviews={reviews} />
                    </span>

                </div>
            </div>

        </>

    )
}