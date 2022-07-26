import React, {useContext, useEffect, useState} from "react";
import { ReviewModule, ReviewTitle, ReviewDate, ReviewPreview } from './Styles.js';
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/FormatDate.js";
import DataContext from "../../context/DataContext.js";

const ReviewListModule = ({ review }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [formattedDate, setformattedDate] = useState(review.date || null)
    const [rerender, setRerender] = useState(false);
    const { setFromReviewFeed } = useContext(DataContext)
    const navigate = useNavigate();
    const params = useParams();


    useEffect(() => {
        if (formattedDate) {
            setformattedDate(formatDate(formattedDate))
        } else {
            setformattedDate('No Date')
        }
        setRerender(!rerender)  // dummy state
        setIsLoading(false)
    }, [])


    const handleClick = (event) => {
        setFromReviewFeed(true)
        navigate(`/user/${params.username}/${event}`)
    }

    return(
        <>
        {!isLoading && 
            <ReviewModule onClick={() => handleClick(review.id)}>
                <ReviewTitle>
                    {review.title}
                </ReviewTitle>
                <ReviewDate>
                    {formattedDate}
                </ReviewDate>
                <ReviewPreview>
                    {review.review}
                </ReviewPreview>
            </ReviewModule>
        }
        </>
        
    );
}

export default ReviewListModule;