import React, {useState} from "react";
import { ReviewModule, ReviewTitle, ReviewDate, ReviewPreview } from './Styles.js';

const ReviewListModule = (props) => {
    const reviews = props.value;

    // const listReviews = reviews.map(review) =>
    //     return (
    //         <div>{props.rTitle}</div>
    //     )
    // }


    return(
        <ReviewModule>
            <ReviewTitle>
                {reviews.title}
            </ReviewTitle>
            <ReviewDate>
                {reviews.date}
            </ReviewDate>
            <ReviewPreview>
                {reviews.content}
            </ReviewPreview>
        </ReviewModule>
    );
}

export default ReviewListModule;