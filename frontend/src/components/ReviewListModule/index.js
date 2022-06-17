import React, {useState} from "react";
import { ReviewModule, ReviewTitle, ReviewDate, ReviewPreview } from './Styles.js';


const ReviewListModule = (props) => {
    const reviews = props.value;

    // const listReviews = reviews.map(review) =>
    //     return (
    //         <div>{props.rTitle}</div>
    //     )
    // }

    const handleClick = (event) => {
        console.log(event)
    }

    return(
        <ReviewModule onClick={() => handleClick(reviews.id)}>
        {/* <ReviewModule> */}
            <ReviewTitle>
                {reviews.title}
            </ReviewTitle>
            <ReviewDate>
                {reviews.date}
            </ReviewDate>
            <ReviewPreview>
                {reviews.review}
            </ReviewPreview>
        </ReviewModule>
    );
}

export default ReviewListModule;