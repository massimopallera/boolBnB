import { useEffect } from "react";

import { useGlobalContext } from "../context/GlobalContext";

import AddForm from '../components/AddApartment/AddForm';
import ShowOwnerAps from '../components/AddApartment/ShowOwnerAps';



export default function AddApartment() {

    const { checkAuthentication, isAuthenticated } = useGlobalContext()
   
    useEffect(() => {
        checkAuthentication()
    }, [isAuthenticated])

    return (
        <>
            {isAuthenticated ? (
            <>
                <AddForm isAuthenticated={isAuthenticated}/>
                <hr />
                <h2>Le Tue Inserzioni</h2>
               <ShowOwnerAps isAuthenticated={isAuthenticated}/>
            </>
            ) : ('NOT AUTHENTICATED')}

           
        </>
    )
}