import { createContext, useState, useContext, useEffect } from 'react';


export const ApartmentContext = createContext();

export function useApartmentContext() {
    return useContext(ApartmentContext);
};

export function ApartmentProvider({ children }) {

    const [apartments, setApartments] = useState([])

    // show all apartments 
    // const fetchApartments = () => {
        
        // }
    const apartmentsApi = import.meta.env.VITE_EXPRESS_SERVER + "/apartments"

    useEffect(() => {
        fetch(apartmentsApi)
            .then(resp => resp.json())
            .then(result => {
                setApartments(result.data || [])
            })
            .catch(error => console.error("Error fetching apartments:", error));
    }, [])



    return (
        <ApartmentContext.Provider value={{ apartments }}>
            {children}
        </ApartmentContext.Provider>
    )

}

