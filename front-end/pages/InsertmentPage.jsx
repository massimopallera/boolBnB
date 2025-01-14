import { useState, useEffect } from "react";

const initialFormData = {
    rooms: '',
    beds: '',
    toilets: '',
    sq_meters: '',
    address: '',
    apartments_images: '',
    description: ''

}

export default function InsertmentPage() {

    const [formData, setFormData] = useState(initialFormData);

    function handleForm(e) {
        e.preventDefault();
        console.log(formData);

        /* 😁 ADD CONTROLS CLIENT SIDE */

        // send form data to server
        fetch('http://localhost:3000/apartments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" // Specifica il tipo di contenuto come JSON
            },
            body: JSON.stringify({ ...formData })
        })
            .then(resp => resp.json())
            .then(data => {

                setFormData(initialFormData);
                console.log(data)
                /*  window.location.reload() */
            })
            .catch(err => console.log(err))


    }


    return (
        <>
            <div>
                <form onSubmit={handleForm}>
                    <input type="number" name="rooms" placeholder="rooms" value={formData.rooms} onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}></input>
                    <input type="number" name="beds" placeholder="beds" value={formData.beds} onChange={(e) => setFormData({ ...formData, beds: e.target.value })}></input>
                    <input type="number" name="toilets" placeholder="toilets" value={formData.toilets} onChange={(e) => setFormData({ ...formData, toilets: e.target.value })}></input>
                    <input type="number" name="sq_meters" placeholder="sq_meters" value={formData.sq_meters} onChange={(e) => setFormData({ ...formData, sq_meters: e.target.value })}></input>
                    <input type="text" name="address" placeholder="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}></input>
                    <input type="text" name="apartments_images" placeholder="apartments_images" value={formData.apartments_images} onChange={(e) => setFormData({ ...formData, apartments_images: e.target.value })}></input>
                    <textarea name="text" placeholder="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </>
    )
}