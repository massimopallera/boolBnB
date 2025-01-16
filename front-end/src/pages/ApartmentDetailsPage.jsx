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
    function handleMail(e) {
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
            <div className="container">

                <div>
                    <DetailApartmentCard id={id} />
                </div>


                <h3 className='text-center mt-5'>Recensioni</h3>

                <div className='d-flex flex-wrap justify-content-between'>

                    {/* Reviews Form */}
                    <div className='col-12 col-lg-4 my-3'><ReviewForm id={id}></ReviewForm></div>

                    <div >
                        <form className='d-flex flex-column gap-3' onSubmit={handleMail}>

                            <div>
                                <label htmlFor="to">Cc</label>
                                <input type="email" id="to" name="to" value={formData.to} onChange={(e) => setFormData({ ...formData, to: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="subject">Oggetto</label>
                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="text">Text</label>
                                <textarea name="text" id="" value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })}></textarea>
                            </div>

                            <button className="btn btn-primary">Invia email</button>  {/* Send email button */}
                        </form>
                    </div>

                    {/* Reviews */}
                    <span className="col-12 col-lg-8 reviewBox my-3 "><ReviewsSection id={id}></ReviewsSection></span>
                </div>

            </div>

        </>

    )
}