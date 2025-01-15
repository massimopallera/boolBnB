import { useEffect, useState } from "react";
import dayjs from 'dayjs';



export default function ReviewsSection({ id }) {

    const [reviews, setReviews] = useState([])

    const reviewsApi = import.meta.env.VITE_EXPRESS_SERVER + "/reviews/" + id

    useEffect(() => {
        fetch(reviewsApi)
            .then(resp => resp.json())
            .then(data => { setReviews(data.data) })
            .catch(err => console.error(err))
    }, [])


    return (
        <>


            {reviews ? reviews.map((review, index) => (
                <div className="card bg-light bg-gradient shadow-sm d-flex flex-column p-3 mb-2 mx-4" key={index}>
                    <div> <h4>{review.name}</h4></div>
                    <div className="card-body bg-white border my-1">
                        <p>{review.text}</p>
                    </div>
                    <div> <strong>Data</strong> : {dayjs(review.date).format('YYYY-MM-DD')}</div>
                    <div> <strong>Giorni di permanenza</strong> : {review.days_of_stay}</div>
                </div>
            )) : 'NotFound'}

        </>
    )
}