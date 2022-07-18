import React from "react";
import { ReviewContainer, AddText, MyReviews, TextContainer, UserReviewsTitle, ReviewFeedContainer } from './Styles.js';
import ReviewListModule from "../ReviewListModule/index.js";


const ReviewList = ({reviews, anonUser, auth}) => {
    // const fakes = [
        // {
        //     "id": 1,
        //     "title": "1st post",
        //     "date": "July 16, 2021 11:47:39 AM",
        //     "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        //   },
        //   {
        //     "id": 2,
        //     "title": "Second post",
        //     "date": "July 16, 2021 11:47:48 AM",
        //     "review": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. two"
        //   },
        //   {
        //     "id": 3,
        //     "title": "Number Three",
        //     "date": "July 16, 2021 11:48:01 AM",
        //     "review": "Third post... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        //   },
        //   {
        //     "id": 4,
        //     "title": "Testing a 4th post",
        //     "date": "August 09, 2021 4:44:22 PM",
        //     "review": "Some more testing words"
        //   },
        //   {
        //     "id": 5,
        //     "title": "Testing a 4th post",
        //     "date": "August 09, 2021 4:44:22 PM",
        //     "review": "Some more testing words"
        //   },
        //   {
        //     "id": 6,
        //     "title": "Testing a 4th post",
        //     "date": "August 09, 2021 4:44:22 PM",
        //     "review": "Some more testing words"
        //   },
        //   {
        //     "id": 7,
        //     "title": "Testing a 4th post",
        //     "date": "August 09, 2021 4:44:22 PM",
        //     "review": "Some more testing words"
        //   },
        //   {
        //     "id": 8,
        //     "title": "Testing a 4th post",
        //     "date": "August 09, 2021 4:44:22 PM",
        //     "review": "Some more testing words"
        //   }
    // ]

    const AllReviews = (
        reviews.map(review => (
            <ReviewListModule key={review.id} review={review}/>
        ))
        // fakes.map(review => (
        //     <ReviewListModule key={review.id} review={review}/>
        //     // <ReviewListModule value={review} key={review.id} setReview={props.setReview}/>
        // ))
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
