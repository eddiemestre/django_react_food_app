import React, {useState, useEffect} from "react";
import { ReviewContainer, AddText, MyReviews, TextContainer } from './Styles.js';

import ReviewListModule from "../ReviewListModule/index.js";

const ReviewList = () => {
    const [hasReviews, setHasReviews] = useState(false);

    const review_data = [
        {
          id: 1,
          title: "Mendocino Farms",
          date: "May 11, 2022",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  labore et dolore  labore et dolore magna aliqua magna aliqua"
        },
        {
          id: 2,  
          title: "Rosaline",
          date: "April 4, 2022",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  labore et dolore magna aliqua  labore et dolore magna aliqua dolore magna aliqua"
        },
        {
            id: 3,  
            title: "Rosaline",
            date: "April 4, 2022",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  labore et dolore magna aliqua  labore et dolore magna aliqua dolore magna aliqua"
          },
        {
          id: 4,  
          title: "Rosaline",
          date: "April 4, 2022",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  labore et dolore magna aliqua  labore et dolore magna aliqua dolore magna aliqua"
        },
        {
            id: 5,  
            title: "Rosaline",
            date: "April 4, 2022",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  labore et dolore magna aliqua  labore et dolore magna aliqua dolore magna aliqua"
          },
        {
          id: 6,  
          title: "Rosaline",
          date: "April 4, 2022",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  labore et dolore magna aliqua  labore et dolore magna aliqua dolore magna aliqua"
        },
      ];

    
    useEffect(() => {
        if (review_data.length > 0) {
            setHasReviews(true)
        } else {
            setHasReviews(false)
        }

    }, [hasReviews, review_data]);

    const test = (
        review_data.map(review => (
            <ReviewListModule value={review} key={review.id} />
        ))
    )

    const AddReviewText = (
        <TextContainer><AddText>Add your first review by<br/>clicking the + icon below!</AddText></TextContainer>
    )


    const showReviews = (
        <ReviewContainer>
            <MyReviews>My Reviews</MyReviews>
            {/* {
                review_data.map(review => (
                    <ReviewListModule value={review} key={review.id} />
                ))
            } */}
            {hasReviews ? test : AddReviewText}
            {/* <ReviewListModule value={review_data[0]} />
            <ReviewListModule value={review_data[1]} /> */}
        </ReviewContainer>
    )







    return (
        <div>
            {/* {hasReviews ? showReviews : AddReviewText} */}
            {showReviews}
        </div>
    );
};

export default ReviewList;