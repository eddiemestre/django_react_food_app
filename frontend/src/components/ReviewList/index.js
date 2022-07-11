import React, {useState, useEffect} from "react";
import { ReviewContainer, AddText, MyReviews, TextContainer } from './Styles.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import ReviewListModule from "../ReviewListModule/index.js";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import axios from "../../api/axios.js";

const ReviewList = (props) => {
    const [hasReviews, setHasReviews] = useState(false);
    const [selectedReview, setSelectedReview] = useOutletContext();
    const axiosPrivate = useAxiosPrivate();
    const [reviews, setReviews] = useState([])
    const params = useParams();
    const [render, setRender] = useState(false)
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({})
    // const [noReviews, setNoReviews] = useState(false)
    // const [loggedIn, setLoggedIn] = useState(true)

    var loggedIn = false;
    var noReviews = false;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAuthedReviews = async () => {
            console.log("get Authed Reviews")
            try {
                const response = await axiosPrivate.get('/reviews/auth_reviews/', {
                    signal: controller.signal
                });

                console.log("list data", response?.data);
                isMounted && setReviews(response?.data)

                if (response?.data.length > 0) {
                    console.log("reviews is greater than 1")
                    setHasReviews(true)
                } else {
                    setHasReviews(false)
                }
                console.log("reviews data", reviews)
                console.log("has reviews", hasReviews)
            } catch (err) {
                console.error(err);
                if (err?.response?.status === 404) {
                    setHasReviews(false)
                }
            }
        }

        const getGuestReviews = async () => {
            try {
                const response = await axios.post('/reviews/account_public_reviews/', 
                JSON.stringify({username: params.username}), 
                {
                    headers: {'Content-Type': 'application/json'},
                    signal: controller.signal
                });
                console.log("list data in review list", response?.data);
                isMounted && setReviews(response.data)

                if (response?.data?.length > 0) {
                    setHasReviews(true)
                } else {
                    setHasReviews(true)
                }
                console.log("reviews data", reviews)
                console.log("has reviews", hasReviews)

            } catch (err) {
                console.log(err);
                if (err?.response?.status === 404) {
                    setHasReviews(false)
                }
                
            }
        }

        const getUserDetails = async () => {
            console.log("get user Details")
            try {
                const response = await axios.get(`/auth/get_other_user/${params.username}`, {
                    signal: controller.signal
                });

                console.log("user data", response?.data);
                isMounted && setUserDetails(response?.data)

                // if (response?.data.length > 0) {
                //     console.log("reviews is greater than 1")
                //     setHasReviews(true)
                // } else {
                //     setHasReviews(false)
                // }
                // console.log("reviews data", reviews)
                // console.log("has reviews", hasReviews)
            } catch (err) {
                console.error(err);
                if (err?.response?.status === 404) {
                    console.log("404 getting anon user details")
                }
            }
        }
        

        if (params.username === JSON.parse(localStorage.getItem('username'))) {
            console.log("this is the logged in user")
            console.log("review list loaded")
            // setLoggedIn(true)
            loggedIn = true;
            getAuthedReviews();
            getUserDetails();

        } else {
            console.log("this is a different user, get their public reviews")
            loggedIn = false;
            getGuestReviews();
            getUserDetails();
        }

        return () => {
            isMounted = false;
            controller.abort();
        }
    },[props.wasSaved, selectedReview])

    useEffect(() => {
        console.log("selected review", selectedReview)
        let isMounted = true;
        const controller = new AbortController();


        
        
    })

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

    const AddReviewText = () => {
        if (loggedIn) {
            return (
                <TextContainer><AddText>Add your first review by<br/>clicking the + icon below!</AddText></TextContainer>
            )
        } else if (!loggedIn) {
            return (
                <TextContainer><AddText>Looks like this user doesn't<br/>have any public reviews.</AddText></TextContainer>
            )
        }
    }


    const showReviews = (
        <ReviewContainer>
        {JSON.parse(localStorage.getItem('username')) 
        ? <MyReviews>My Reviews</MyReviews>
        : <MyReviews>{userDetails.name}'s Reviews</MyReviews>}
            
            {/* {
                review_data.map(review => (
                    <ReviewListModule value={review} key={review.id} />
                ))
            } */}
            {hasReviews ? AllReviews : AddReviewText()}
            {/* {hasReviews && AddReviewText} */}
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