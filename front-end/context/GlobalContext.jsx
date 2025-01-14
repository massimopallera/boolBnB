import { createContext, useState, useContext, useEffect } from 'react';


export const GlobalContext = createContext();

export function useGlobalContext() {
    return useContext(GlobalContext);
};

export function GlobalContextProvider({ children }) {

    const [apartments, setApartments] = useState([])
    const baseUrl = import.meta.env.VITE_EXPRESS_SERVER
    const apartmentsApi = baseUrl + "/apartments"

    useEffect(() => {
        fetch(apartmentsApi)
        .then(resp => resp.json())
        .then(result => {setApartments(result.data || [])})
        .catch(error => console.error("Error fetching apartments:", error));
    }, [])
    

    const [reviews, setReviews] = useState([])

    


    return (
        <GlobalContext.Provider value={{ apartments, reviews }}>
            {children}
        </GlobalContext.Provider>
    )

}

