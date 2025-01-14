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
            <div>
                <h3>Recensioni</h3>
                {reviews.map((review, index) => (
                    <div key={index}>
                        <div> <strong>name</strong> : {review.name}</div>
                        <div> <strong>text</strong> : {review.text}</div>
                        <div> <strong>date</strong> : {dayjs(review.date).format('YYYY-MM-DD')}</div>
                        <div> <strong>days of stay</strong> : {review.days_of_stay}</div>
                    </div>
                ))}
            </div>
        </>
    )
}