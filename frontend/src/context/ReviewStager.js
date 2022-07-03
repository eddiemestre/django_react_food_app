import React, { createContext, useState } from "react";

const ReviewContext = createContext({});

export const ReviewStager = ({ children }) => {
    const [selectedReview, setSelectedReview] = useState({hello: "hello"});


    return (
        <ReviewContext.Provider value={{ selectedReview, setSelectedReview }}>
            {children}
        </ReviewContext.Provider>
    )
}

export default ReviewContext;