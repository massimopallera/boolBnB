import { useEffect, useState } from "react";

export default function ReviewsSection({id}){
     
    const [reviews, setReviews] = useState([])
    
    const getReviews = 'http://localhost:3000/reviews/' + id;

    useEffect( () => {
        fetch(getReviews)
        .then(resp => resp.json())
        .then(data => {setReviews(data.data)})
        .catch(err => console.error(err))
    }, [] )
    
    // console.log(reviews);
    

    return(
        <>
            <div>
                <h3>Recensioni</h3>
                {reviews.map((review,index) => (
                    <div key={index}>
                        <div> <strong>name</strong> : {review.name}</div>
                        <div> <strong>text</strong> : {review.text}</div>
                        <div> <strong>date</strong> : {review.date}</div>
                        <div> <strong>days of stay</strong> : {review.days_of_stay}</div>
                    </div>
                ))}
            </div>
        </>
    )
}