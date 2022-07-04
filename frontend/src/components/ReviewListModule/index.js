import React, {useEffect, useState} from "react";
import { ReviewModule, ReviewTitle, ReviewDate, ReviewPreview } from './Styles.js';
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useReview from "../../hooks/useReviewStager.js";
import { formatDate } from "../../utils/FormatDate.js";

// export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export const parseDate = (date) => {
//     var parsed = null;
//     var temp = date;
//     if (date.includes('T')) {
//         temp = date.split('T');
//         temp = temp[0]
//         // console.log("temp parsed", temp)
//         temp = temp.split('-')
//         temp = `${temp[2]}-${temp[1]}-${temp[0]}`
//         // console.log("parsed", temp)
//     }

//     parsed = temp.split('-');
//         if (parsed) {
//             if (parsed[0][0] === '0') {
//                 parsed[0] = parsed[0][1]
//             }
//         }

//         // console.log("Final parsed", parsed)

//     return parsed;
// }


// export const formatDate = (date) => {
//     // console.log("Format date", date)
//     const parse = parseDate(date)
//     const newDate = `${months[parseInt(parse[1] - 1)]} ${parse[0]}, ${parse[2]}`
//     return newDate;
// }

const ReviewListModule = (props) => {
    const reviews = props.value;
    const [formattedDate, setformattedDate] = useState(reviews.date || null)
    const [rerender, setRerender] = useState(false);

    const navigate = useNavigate();
    
    // const { selectedReview, setSelectedReview } = useOutletContext();
    const params = useParams();
    const { selectedReview, setSelectedReview } = useReview();
    
    // useEffect(() => {
    //     console.log("selectedReview", selectedReview)
    // }, [])
   


    useEffect(() => {
        if (formattedDate) {
            setformattedDate(formatDate(formattedDate))
        } else {
            setformattedDate(null)
        }
        setRerender(!rerender)  // dummy state
    }, [])

    // const listReviews = reviews.map(review) =>
    //     return (
    //         <div>{props.rTitle}</div>
    //     )
    // }

    const handleClick = (event) => {
        console.log(event)
        props.setReview(reviews)
        navigate(`/profile/${params.email}/${event}`)
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