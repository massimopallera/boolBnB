import { useEffect, useState } from "react";
import HomepageCard from "../components/Homepage/HomepageCard";

export default function Search(){
         const [searchFields, setSearchFields] = useState({
             address: "",
             beds: 0,
             rooms: 0,
             category: 1
         });

         const [filtered, setFiltered] = useState([])
         const [categories, setCategories] = useState()
     
         function onChange(e) {
            console.log(searchFields.category)
             const {id, value} = e.target;
         }
         
         function handleForm(e) {
             e.preventDefault();
     
            if (!searchFields.beds) setSearchFields({...searchFields, beds: 0});
            if (!searchFields.rooms) setSearchFields({...searchFields, rooms: 0});

             fetch('http://localhost:3000/apartments/search', {
                 method: 'POST',
                 body: JSON.stringify({address: searchFields.address, beds: Number(searchFields.beds), rooms:Number(searchFields.rooms), category:Number(searchFields.category)}),
                 headers: { 'Content-Type': 'application/json' }
             })
             .then(resp => resp.json())
             .then(data => {console.log(data);(data.data.length !== 0 ? setFiltered(data.data) : setFiltered())})
         }

         useEffect(() => {
             // Fetch all apartments
             fetch('http://localhost:3000/categories')
            .then(resp => resp.json())
            .then(data => setCategories(data.data))
         },[])
     
         return (
             <div className="mb-3">
                 <div className="container mt-3">
                    <h3 className="text-center">RICERCA</h3>

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
                                     onChange={(e) => setSearchFields({...searchFields, address: e.target.value})}
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
                                     onChange={(e) => setSearchFields({...searchFields, beds: e.target.value})}
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
                                     onChange={(e) => setSearchFields({...searchFields, rooms: e.target.value})}
                                     value={searchFields.rooms}
                                 />
                             </div>
                         </div>
     
                         {/*  Searchbar: Numero minimo di stanze */}
                         <div className="col-lg-3 col-md-6 col-sm-12">
                             <div className="form-group">
                                 <select name="" id="" className="form-select" onChange={(e) => setSearchFields({...searchFields, category: e.target.value})}>
                                    {categories ? categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )) : null}
                                 </select>
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
                    ))): (<>
                        <div>
                            <h5>Spiacente, non ho trovato nulla con i requisiti richiesti.</h5>
                        </div>        
                        </>)
                    }
                    </div>
                 </div>
             </div>
         );
     
}