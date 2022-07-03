import React, {useState, useEffect} from "react";
import { ReviewContainer, AddText, MyReviews, TextContainer } from './Styles.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import ReviewListModule from "../ReviewListModule/index.js";
import { useParams } from "react-router-dom";
import axios from "../../api/axios.js";

const ReviewList = (props) => {
    const [hasReviews, setHasReviews] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [reviews, setReviews] = useState([])
    const params = useParams();
    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAuthedReviews = async () => {
            try {
                const response = await axiosPrivate.get('/reviews/my_reviews/', {
                    signal: controller.signal
                });

                console.log("list data", response?.data);
                isMounted && setReviews(response.data)

                if (reviews) {
                    setHasReviews(true)
                }
                console.log("reviews data", reviews)
                console.log("has reviews", hasReviews)
            } catch (err) {
                console.error(err);
            }
        }

        const getGuestReviews = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/reviews/public/', 
                JSON.stringify({email: params.email}), 
                {
                    headers: {'Content-Type': 'application/json'},
                    signal: controller.signal
                });
                console.log("list data in review list", response?.data);
                isMounted && setReviews(response.data)

                if (reviews) {
                    setHasReviews(true)
                }
                console.log("reviews data", reviews)
                console.log("has reviews", hasReviews)

            } catch (err) {
                console.log(err);
            }
        }
        

        if (params.email === JSON.parse(localStorage.getItem('email'))) {
            console.log("this is the logged in user")
            console.log("review list loaded")
            getAuthedReviews();

        } else {
            console.log("this is a different user, get their public reviews")
            getGuestReviews();
        }

        return () => {
            isMounted = false;
            controller.abort();
        }
    },[props.wasSaved])

    // const getReviews = async () => {
    //     // let isMounted = true;
    //     // const controller = new AbortController();

    //     // try {
    //     //     const response = await axiosPrivate.get('/reviews/my_reviews/', {
    //     //         signal: controller.signal
    //     //     });

    //     //     console.log(response.data);
    //     //     isMounted && setReviews(response.data)
    //     // } catch (err) {
    //     //     console.error(err);
    //     // }

    //     // return
    // }

    // const review_data = [
    //     {
    //       id: 1,
    //       title: "Mendocino Farms",
    //       date: "May 11, 2022",
    //       review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  labore et dolore  labore et dolore magna aliqua magna aliqua"
    //     },
    //     {
    //       id: 2,  
    //       title: "Rosaline",
    //       date: "April 4, 2022",
    //       review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  labore et dolore magna aliqua  labore et dolore magna aliqua dolore magna aliqua"
    //     },
    //     {
    //         id: 3,  
    //         title: "Rosaline",
    //         date: "April 4, 2022",
    //         review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  labore et dolore magna aliqua  labore et dolore magna aliqua dolore magna aliqua"
    //       },
    //     {
    //       id: 4,  
    //       title: "Rosaline",
    //       date: "April 4, 2022",
    //       review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  labore et dolore magna aliqua  labore et dolore magna aliqua dolore magna aliqua"
    //     },
    //     {
    //         id: 5,  
    //         title: "Rosaline",
    //         date: "April 4, 2022",
    //         review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  labore et dolore magna aliqua  labore et dolore magna aliqua dolore magna aliqua"
    //       },
    //     {
    //       id: 6,  
    //       title: "Rosaline",
    //       date: "April 4, 2022",
    //       review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  labore et dolore magna aliqua  labore et dolore magna aliqua dolore magna aliqua"
    //     },
    //   ];

    
    // useEffect(() => {
    //     if (review_data.length > 0) {
    //         setHasReviews(true)
    //     } else {
    //         setHasReviews(false)
    //     }

    // }, [hasReviews, review_data]);


    const AllReviews = (
        reviews.map(review => (
            // <ReviewListModule value={review} key={review.id}/>
            <ReviewListModule value={review} key={review.id} setReview={props.setReview}/>
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
            {hasReviews ? AllReviews : AddReviewText}
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


// date: "05-10-2022"
// date_created: "2022-06-25"
// date_modified: "2022-06-25"
// id: 24
// private: true
// review: ""
// title: "Test"
// user: 1