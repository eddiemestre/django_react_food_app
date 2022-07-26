import React from "react";
import { ReviewContainer, AddText, MyReviews, TextContainer, UserReviewsTitle, ReviewFeedContainer } from './Styles.js';
import ReviewListModule from "../ReviewListModule/index.js";


const ReviewList = ({reviews, anonUser, auth}) => {

    const AllReviews = (
        reviews.map(review => (
            <ReviewListModule key={review.id} review={review}/>
        ))
    )

    const AddReviewText = () => {
        if (auth?.accessToken) {
            return (
                <TextContainer><AddText>Add your first review by<br/>clicking the + icon below!</AddText></TextContainer>
            )
        } else {
            return (
                <TextContainer><AddText>Looks like this user doesn't<br/>have any public reviews.</AddText></TextContainer>
            )
        }
    }


    return (
        <ReviewContainer>
            <UserReviewsTitle>
                {auth?.name
                    ? <MyReviews>My Reviews</MyReviews>
                    : anonUser?.name
                        ? <MyReviews>{anonUser.name}'s Reviews</MyReviews>
                        : <MyReviews></MyReviews>
                }
            </UserReviewsTitle>
            <ReviewFeedContainer>
                {reviews.length ? AllReviews : AddReviewText()} 
            </ReviewFeedContainer>     
        </ReviewContainer>
    );
};

export default ReviewList;
