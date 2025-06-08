import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomepageCard from '../components/Homepage/HomepageCard';

export default function Search() {
    const [searchFields, setSearchFields] = useState({
        address: "",
        beds: 0,
        rooms: 0,
        category: 0
    });

    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Funzione per aggiornare la query string
    const setQueryString = (searchFields) => {
        const params = new URLSearchParams();
        for (let [key, value] of Object.entries(searchFields)) {
            if (value) {
                params.set(key, value);
            }
        }
        navigate(`?${params.toString()}`);
    };

    // Funzione per eseguire la chiamata fetch
    const fetchData = async (query) => {
        try {
            const response = await fetch('http://localhost:3000/apartments/search', {
                method: 'POST',
                body: JSON.stringify(query),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (data.data.length !== 0) {
                setFiltered(data.data);
            } else {
                setFiltered([]);
            }
        } catch (error) {
            console.error("Errore durante il fetch:", error);
        }
    };

    // Funzione per gestire il form
    function handleForm(e) {
        e.preventDefault();

        if (!searchFields.beds) setSearchFields((prev) => ({ ...prev, beds: 0 }));
        if (!searchFields.rooms) setSearchFields((prev) => ({ ...prev, rooms: 0 }));

        setQueryString(searchFields);
        fetchData({
            address: searchFields.address,
            beds: Number(searchFields.beds),
            rooms: Number(searchFields.rooms),
            category: Number(searchFields.category)
        });
    }

    // Controlla la query string al caricamento del componente
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryFromUrl = {
            address: params.get("address") || "",
            beds: Number(params.get("beds")) || 0,
            rooms: Number(params.get("rooms")) || 0,
            category: Number(params.get("category")) || 0,
        };

        // Se ci sono parametri validi, aggiorna lo stato e fai una ricerca
        if (Object.values(queryFromUrl).some((value) => value)) {
            setSearchFields(queryFromUrl);
            fetchData(queryFromUrl);
        }
    }, [location.search]);

    // Fetch delle categorie al caricamento
    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then((resp) => resp.json())
            .then((data) => setCategories(data.data))
            .catch((error) => console.error("Errore durante il fetch delle categorie:", error));
    }, []);

    return (
        <div className="mb-3">
            <div className="container mt-3">
                <h3 className="text-center">RICERCA</h3>
                <form className="row g-3 align-items-end mb-5" onSubmit={handleForm}>
                    {/* Searchbar: Località */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="address" className="form-label">Località</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="Inserisci la località"
                                onChange={(e) => setSearchFields({ ...searchFields, address: e.target.value })}
                                value={searchFields.address}
                            />
                        </div>
                    </div>

                    {/* Searchbar: Posti letto */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="beds" className="form-label">Posti letto</label>
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                id="beds"
                                placeholder="Inserisci i posti letto"
                                onChange={(e) => setSearchFields({ ...searchFields, beds: e.target.value })}
                                value={searchFields.beds}
                            />
                        </div>
                    </div>

                    {/* Searchbar: Stanze */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="rooms" className="form-label">Stanze</label>
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                id="rooms"
                                placeholder="Inserisci le stanze"
                                onChange={(e) => setSearchFields({ ...searchFields, rooms: e.target.value })}
                                value={searchFields.rooms}
                            />
                        </div>
                    </div>

                    {/* Categoria */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <select
                                name="category"
                                className="form-select"
                                onChange={(e) => setSearchFields({ ...searchFields, category: e.target.value })}
                                value={searchFields.category}
                            >
                                 <option value={0} >Seleziona una categoria</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Pulsante di ricerca */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Cerca</button>
                        </div>
                    </div>
                </form>

                {/* Risultati */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5">
                    {filtered.length > 0 ? (
                        filtered.map((apartment) => (
                            <HomepageCard apartment={apartment} key={apartment.id} />
                        ))
                    ) : (
                        <div>
                            <h5>Spiacente, non ho trovato nulla con i requisiti richiesti.</h5>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
