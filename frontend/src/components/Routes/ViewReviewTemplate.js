import { Outlet, useOutletContext } from "react-router-dom";
import React, {useEffect, useState} from 'react';

const ReviewViewTemplate = () => {

    const [selectedReview, setSelectedReview] = useOutletContext();

    useEffect(() => {
        console.log("inside ReviewViewTemplate", selectedReview)
    })


    return (
        <div>
            <Outlet context={[selectedReview, setSelectedReview]} />
        </div>
    )
}

  export default ReviewViewTemplate;