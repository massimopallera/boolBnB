import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailApartmentCard from '../components/apartment/DetailApartmentCard';


import ReviewsSection from "../components/apartment/ReviewsSection"
import ReviewForm from '../components/apartment/ReviewForm';

const initialFormData = {
    to: '',
    subject: '',
    text: '',
}


export default function ApartmentDetailsPage() {

    const { id } = useParams();

    const [formData, setFormData] = useState(initialFormData)
    //send email
    function handleMail(e){
        e.preventDefault()

        fetch('http://127.0.0.1:3000/info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData) 
    }).then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    }

    return (
        <>
            <div className="container-sm m-auto ">

                <div>
                    <DetailApartmentCard id={id} />
                </div>


                <h3 className='text-center my-4'>Recensioni</h3>
                <div className='d-flex justify-content-center'>
                    {/* Reviews Form */}
                    <ReviewForm id={id}></ReviewForm>
                    <div>
                        <form onSubmit={handleMail}>

                            <div>
                                <input type="email" id="to" name="to" value={formData.to} onChange={(e) => setFormData({...formData, to: e.target.value})} />
                                <label htmlFor="to">Cc</label>
                            </div>
                            <div>
                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                                <label htmlFor="subject">Oggetto</label>
                            </div>
                            <div>
                                <textarea name="text" id="" value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})}></textarea>
                                <label htmlFor="text">Text</label>
                            </div>

                            <button  className="btn btn-primary">Invia email</button>  {/* Send email button */}
                        </form>
                    </div>
                    {/* Reviews */}
                    <ReviewsSection id={id}></ReviewsSection>
                </div>
            </div>

        </>

    )
}