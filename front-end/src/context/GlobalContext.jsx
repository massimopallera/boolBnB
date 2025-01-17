import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext();

export function useGlobalContext() {
    return useContext(GlobalContext);
};



export function GlobalContextProvider({ children }) {

    const [apartments, setApartments] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const baseUrl = import.meta.env.VITE_EXPRESS_SERVER
    const apartmentsApi = baseUrl + "/apartments"


    const navigate = useNavigate()
    const goToPage = (pagePath) => {navigate(pagePath)}

    useEffect(() => {
        fetch(apartmentsApi)
        .then(resp => resp.json())
        .then(result => {setApartments(result.data)})
        .catch(error => console.error("Error fetching apartments:", error));
    }, [])
    

    const [reviews, setReviews] = useState([])


    //check Login
    const checkAuthentication = async (pagePath = null) => {
        const baseUrl = import.meta.env.VITE_EXPRESS_SERVER;
        const path = baseUrl + '/check'; // Endpoint per verificare la sessione

        try {
            const response = await fetch(path, {
                method: 'GET',
                credentials: 'include', // Necessario per includere i cookie
            });

            if (response.ok) {
                setIsAuthenticated(true)
                console.log('dentro');
                goToPage(pagePath)
            } else {
                setIsAuthenticated(false)
                console.log('non dentro');
                
                // ADD MESSAGE FOR USER 

                // goToPage('/')
            }
        } catch (error) {
            console.error('Errore durante la verifica della sessione:', error);
        }
    };
    
    return (
        <GlobalContext.Provider value={{ apartments, reviews, checkAuthentication, goToPage, isAuthenticated}}>
            {children}
        </GlobalContext.Provider>
    )

}