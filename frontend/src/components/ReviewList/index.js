// import React, {useState, useEffect} from "react";
// import { ReviewContainer, AddText, MyReviews, TextContainer } from './Styles.js';
// import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
// import ReviewListModule from "../ReviewListModule/index.js";
// import { useParams, useNavigate, useOutletContext } from "react-router-dom";
// import axios from "../../api/axios.js";

// const ReviewList = (props) => {


//     const AllReviews = (
//         reviews.map(review => (
//             // <ReviewListModule value={review} key={review.id}/>
//             <ReviewListModule value={review} key={review.id} setReview={props.setReview}/>
//         ))
//     )

//     const AddReviewText = () => {
//         if (loggedIn) {
//             return (
//                 <TextContainer><AddText>Add your first review by<br/>clicking the + icon below!</AddText></TextContainer>
//             )
//         } else if (!loggedIn) {
//             return (
//                 <TextContainer><AddText>Looks like this user doesn't<br/>have any public reviews.</AddText></TextContainer>
//             )
//         }
//     }


//     const showReviews = (
//         <ReviewContainer>
//             {JSON.parse(localStorage.getItem('username')) 
//                 ? <MyReviews>My Reviews</MyReviews>
//                 : <MyReviews>{userDetails.name}'s Reviews</MyReviews>}
//             {hasReviews ? AllReviews : AddReviewText()}
//         </ReviewContainer>
//     )


//     return (
//         <div>
//             {!isLoading && showReviews}
//         </div>
//     );
// };

// export default ReviewList;
