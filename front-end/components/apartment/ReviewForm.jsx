import { useState, useEffect } from "react";

const initialFormData = {
    name: '',
    text: '',
    days_of_stay: 0
}

export default function ReviewForm({id}){

    const [formData, setFormData] = useState(initialFormData);


    function handleForm(e){
        e.preventDefault();
        console.log(formData);

        /* 😁 ADD CONTROLS CLIENT SIDE */

        // send form data to server
        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" // Specifica il tipo di contenuto come JSON
              },
              body: JSON.stringify({...formData, id_apartment_fk: Number(id)}) 
        })
        .then(resp => resp.json())
        .then(data => {
            setFormData(initialFormData);
            // add review here in globalContext array 
            // if status 201 piazzi il form nel context

            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    // const reviewsApi = import.meta.env.VITE_EXPRESS_SERVER + "/reviews"


    
    



    return(
    <>
        <div>
            <form onSubmit={handleForm}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}></input>
                <textarea name="text" placeholder="Review" value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})}></textarea>
                <input type="number" name="days_of_stay" placeholder="Days of stay" value={formData.days_of_stay} onChange={(e) => setFormData({...formData, days_of_stay: e.target.value})}></input>
                
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    </>
    )
}