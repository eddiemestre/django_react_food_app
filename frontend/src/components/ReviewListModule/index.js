import React, {useEffect, useState} from "react";
import { ReviewModule, ReviewTitle, ReviewDate, ReviewPreview } from './Styles.js';


const ReviewListModule = (props) => {
    const reviews = props.value;
    const [formattedDate, setformattedDate] = useState(reviews.date)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const parseDate = (date) => {
        const parsed = date.split('-');
        if (parsed) {
            if (parsed[0][0] === '0') {
                parsed[0] = parsed[0][1]
            }
        }

        return parsed;
    }
    const formatDate = (date) => {
        const parse = parseDate(date)
        const newDate = `${months[parseInt(parse[1] - 1)]} ${parse[0]}, ${parse[2]}`
        setformattedDate(newDate)
    }

    useEffect(() => {
        formatDate(formattedDate)
    }, [])

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
                {formattedDate}
            </ReviewDate>
            <ReviewPreview>
                {reviews.review}
            </ReviewPreview>
        </ReviewModule>
    );
}

export default ReviewListModule;