import { useState } from "react";
import HomepageCard from "../components/Homepage/HomepageCard";

export default function Search(){
         const [searchFields, setSearchFields] = useState({
             address: "",
             beds: 0,
             rooms: 0,
         });

         const [filtered, setFiltered] = useState()
     
         function onChange(e) {
             const { id, value } = e.target;
             setSearchFields((prev) => ({
                 ...prev,
                 [id]: value,
             }));
         }
         
         function handleForm(e) {
             e.preventDefault();
     
            if (!searchFields.beds) setSearchFields({...searchFields, beds: 0});
            if (!searchFields.rooms) setSearchFields({...searchFields, rooms: 0});

             fetch('http://localhost:3000/apartments/search', {
                 method: 'POST',
                 body: JSON.stringify({...searchFields, beds: Number(searchFields.beds), rooms:Number(searchFields.rooms)}),
                 headers: { 'Content-Type': 'application/json' }
             })
             .then(resp => resp.json())
             .then(data => setFiltered(data.data))
         }
     
         // useEffect(() => {
         //     const filtered = apartments.filter((apartment) => {
     
         //         const matchesLocation = searchFields.address
         //             ? apartment.address.toLowerCase().includes(searchFields.address.toLowerCase())
         //             : true;
     
         //         const matchesBeds = searchFields.beds
         //             ? apartment.beds === parseInt(searchFields.beds)
         //             : true;
         //         const matchesRooms = searchFields.rooms
         //             ? apartment.rooms === parseInt(searchFields.rooms)
         //             : true;
     
     
         //         return matchesLocation && matchesBeds && matchesRooms;
         //     });
     
         //     setFilteredApartments(filtered);
         // }, [searchFields, apartments, setFilteredApartments]);
     
         return (
             <div className="mb-3">
                 <div className="container mt-3">
                     <form className="row g-3 align-items-end mb-5" onSubmit={handleForm}>
                         {/*  Searchbar: Località */}
                         <div className="col-lg-3 col-md-6 col-sm-12">
                             <div className="form-group">
                                 <label htmlFor="address" className="form-label">
                                     Località
                                 </label>
                                 <input
                                     type="text"
                                     className="form-control"
                                     id="address"
                                     placeholder="Inserisci la località"
                                     onChange={onChange}
                                     value={searchFields.address}
                                 />
                             </div>
                         </div>
     
                         {/*  Searchbar: Numero minimo di posti letto */}
                         <div className="col-lg-3 col-md-6 col-sm-12">
                             <div className="form-group">
                                 <label htmlFor="beds" className="form-label">
                                     Posti letto
                                 </label>
                                 <input
                                     type="number"
                                     min="0"
                                     className="form-control"
                                     id="beds"
                                     placeholder="Inserisci i posti letto"
                                     onChange={onChange}
                                     value={searchFields.beds}
                                 />
                             </div>
                         </div>
     
                         {/*  Searchbar: Numero minimo di stanze */}
                         <div className="col-lg-3 col-md-6 col-sm-12">
                             <div className="form-group">
                                 <label htmlFor="rooms" className="form-label">
                                     Stanze
                                 </label>
                                 <input
                                     type="number"
                                     min="0"
                                     className="form-control"
                                     id="rooms"
                                     placeholder="Inserisci le stanze"
                                     onChange={onChange}
                                     value={searchFields.rooms}
                                 />
                             </div>
                         </div>
     
                         {/*  Searchbar: Numero minimo di stanze */}
                         <div className="col-lg-3 col-md-6 col-sm-12">
                             <div className="form-group">
                                 {/* <label htmlFor="rooms" className="form-label">
                                     Cer
                                 </label> */}
                                 <button className="btn btn-primary" type="submit">Cerca</button>
                             </div>
                         </div>
                     </form>

                    
                    <div className="row row-cols-4 g-5">

                    {/*  Risultati */}
                    {filtered ? (filtered.map(apartment => (
                        <HomepageCard apartment={apartment} key={apartment.id} />
                    ))) : null}
                    </div>
                 </div>
             </div>
         );
     
}