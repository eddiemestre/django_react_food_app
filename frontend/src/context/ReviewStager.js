import React, { createContext, useState } from "react";

const ReviewContext = createContext({});

export const ReviewStager = ({ children }) => {
    const [selectedReview, setSelectedReview] = useState({});
    const [amendedList, setAmendedList] = useState(false)

    return (
        <ReviewContext.Provider value={{ selectedReview, setSelectedReview, amendedList, setAmendedList }}>
            {children}
        </ReviewContext.Provider>
    )
}

export default ReviewContext;