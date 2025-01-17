import { useEffect, useState } from "react";

export default function ShowOwnerAps({isAuthenticated}){

    const [apartments, setAparments] = useState([])


    // get owner apartments if authenticated
    async function getApartments(isAuthenticated){
        if(isAuthenticated){
            fetch('http://localhost:3000/apartments/owner-apartments', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json" // Specifica il tipo di contenuto come JSON
                },
                credentials: 'include',
            })
                .then(resp => resp.json())
                .then(data => {setAparments(data.data)})
                .catch(err => console.log(err))
        }
    }

    useEffect(()=> {
        getApartments(isAuthenticated)
    },[isAuthenticated])

     return(
        <>
             <div className="row row-cols-1">
                { apartments ? (apartments.map((element) => (
                    <div key={element.id} className=" col mb-3">
                        <div className="card" >
                            <img src={element.apartments_images} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">{element.address}</h5>
                                <p className="card-text">{element.description}</p>
                                
                            </div>
                        </div>
                    </div>
                ))) : null}
                        
            </div>
        </>
    )
}