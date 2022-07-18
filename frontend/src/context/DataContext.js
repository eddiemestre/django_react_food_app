import { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFetchReviews from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [reviews, setReviews] = useState([])
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    // console.log(params)

    // const { data, fetchError, isLoading } = useAxiosFetchReviews(params.username);

    // useEffect(() => {
    //     console.log("log in changed")
    //     setReviews(data)
    // }, [data])
    
    return (
        <DataContext.Provider value={{ 
                reviews, setReviews
        }}>
            { children }
        </DataContext.Provider>
    )
}



export default DataContext;