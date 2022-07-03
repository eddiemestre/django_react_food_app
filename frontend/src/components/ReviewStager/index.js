import { useLocation, Navigate, Outlet } from "react-router-dom";
import useReview from "../../hooks/useReviewStager";
import React, { useState } from 'react';

const ReviewRoutes = () => {
    const [selectedReview, setSelectedReview] = useState({hello: "hello"})

    return (
        // is the user signed in?
        // send logged in user where ever they wanted to go
        // send unathorized non-users to logic
        <Outlet context={[selectedReview, setSelectedReview]} />

    )
}

export default ReviewRoutes;