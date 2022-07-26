import { createContext, useState } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [reviews, setReviews] = useState([])
    const [fromReviewFeed, setFromReviewFeed] = useState(false)
    
    return (
        <DataContext.Provider value={{ 
                reviews, setReviews, fromReviewFeed, setFromReviewFeed
        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContext;