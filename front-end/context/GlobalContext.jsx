import { createContext, useState, useContext, } from 'react';


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
                    console.log(result.data);
                    SetApartments(result.data)
                })
        }, [])
    }



    return (
        <ApartmentContext.Provider value={{ apartments }}>
            {children}
        </ApartmentContext.Provider>
    )

}

