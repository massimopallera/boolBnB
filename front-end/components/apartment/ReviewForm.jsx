import { useState } from "react";
import dayjs from "dayjs"


const initialFormData = {
    name: '',
    text: '',
    days_of_stay: 1,
    date:''
}

export default function ReviewForm({id}){

    const [formData, setFormData] = useState(initialFormData);

    function handleForm(e){

        e.preventDefault();

        /* 😁 ADD CONTROLS CLIENT SIDE */
        // Creare un div dove inserire gli errori del form
        if(formData.name === ''){
            alert('Il campo Name non può essere vuoto');
            return;
        }

        if(formData.text === ''){
            alert('Il campo Review non può essere vuoto');
            return;
        }
        if (formData.days_of_stay < 1 || (typeof (formData.days_of_stay) !== "number")){
            alert('Il campo Days of stay deve essere un numero e maggiore di 0');
            return;
        }
        if(formData.date === ''){
            alert('Il campo Data non può essere vuoto');
            return;
        }
        
        // controlla che il bro non sia nel futuro
        const formattedDate = dayjs().format('YYYY-MM-DD');
        if (formData.date > formattedDate) {
            alert('Dove vai Marty McFly?!');
            return
         }


        // send form data to server
        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...formData, id_apartment_fk: Number(id)}) 
        })
        .then(resp => resp.json())
        .then(data => {
            setFormData(initialFormData);
            if (data.statusCode !== 201) return console.log('Errore');
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    return(
    <>
        <div>
            <form onSubmit={handleForm}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}></input>
                <textarea name="text" placeholder="Review" value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})}></textarea>
                <input type="number" min="0" name="days_of_stay" placeholder="Days of stay" value={formData.days_of_stay} onChange={(e) => setFormData({...formData, days_of_stay: Number(e.target.value)})}></input>
                <input type="date" name="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    </>
    )
}