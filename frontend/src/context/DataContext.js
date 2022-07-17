import { createContext, useState, useEffect } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [reviews, setReviews] = useState([])

    return (
        <DataContext.Provider value={{ 
                reviews, setReviews 
        }}>
            { children }
        </DataContext.Provider>
    )
}



export default DataContext;