import { createContext, useState, useContext, useEffect } from 'react';


export const ApartmentContext = createContext();

export function useApartmentContext() {
    return useContext(ApartmentContext);
};

export function ApartmentProvider({ children }) {

    const [apartments, SetApartments] = useState([])

    const fetchApartments = () => {
        const apartmentsApi = "http://127.0.0.1:3000/apartments"

        useEffect(() => {
            fetch(apartmentsApi)
                .then(resp => resp.json())
                .then(result => {

                    SetApartments(result.data || [])
                })
                .catch(error => console.error("Error fetching apartments:", error));
        }, [])
    }



    return (
        <ApartmentContext.Provider value={{ apartments, fetchApartments }}>
            {children}
        </ApartmentContext.Provider>
    )

}

