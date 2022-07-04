import React, { useEffect } from 'react';
import { GlobalStyle, Container, Head, AddSpot, Done, InsideContainer, ContentContainer, Title, Name, Date, Content, LastEdited } from './Styles';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";


const SingleReviewView = () => {
    const { auth } = useAuth();
    const params = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [selectedReview, setSelectedReview] = useOutletContext();

    useEffect(() => {
        // check where we came from instead of email
        //
        //
        let isMounted = true;
        const controller = new AbortController();

        const getPublicReview = async (review_id) => {
            try {
                const response = await axios.get(`/reviews/public_reviews/${review_id}`, 
                {
                    signal: controller.signal,
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,   // sends cookie to backend
                });

                console.log(response?.data)
                setSelectedReview(response.data)
            } catch (err) {
                console.log(err)
            }    
        }

        const getAuthedReview = async (review_id) => {
            try {
                const response = await axiosPrivate.get(`/reviews/auth_reviews/${review_id}`, {
                    signal: controller.signal
                });

                console.log(response?.data);
                setSelectedReview(response?.data)
            } catch (err) {
                console.error(err);
            }
        }
        
        if (Object.keys(selectedReview).length > 1) {
            console.log("selectedReview state exists")

            // if this is the authed users review, add email to the data
            if (params.email === JSON.parse(localStorage.getItem('email'))) {

                console.log("authed user's info")
                setSelectedReview(prevState => ({
                    ...prevState,
                    "email": JSON.parse(localStorage.getItem('email')),
                    "user": JSON.parse(localStorage.getItem('name'))
                }))

                // console.log(selectedReview)
            }

        } else {
            const user = params.email
            const review_id = params.id
            if (user === JSON.parse(localStorage.getItem('email'))) {
                console.log("this is the authed users review, it can be public or private")
                getAuthedReview(review_id)
            } else {
                console.log("this is someone elses review, get Public")
                getPublicReview(review_id)
            }
            

        }


        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])

    return (
        <>
            <GlobalStyle />
            <Container>

                <InsideContainer>
                    <ContentContainer>
                        <Title>{selectedReview.title}</Title>
                        <Link to={`/profile/${selectedReview.email}`} style={{textDecoration: 'none'}}><Name>{selectedReview.user}</Name></Link>
                        <Date>{selectedReview.date}</Date>
                        <Content>{selectedReview.review}</Content>
                        <LastEdited>Last edited on {selectedReview.date_modified}</LastEdited>
                    </ContentContainer>

                </InsideContainer>
                {/* {selectedReview.title}
                <br />
                {selectedReview.date}
                <br />
                {selectedReview.review} */}
                {/* <Head>
                    <AddSpot>{selectedReview.title}</AddSpot> */}
                    {/* this will be condiitional depending on authed and where coming from */}
                    {/* <Done onClick={() => console.log("temp")}>Done</Done>
                </Head>
                <InsideContainer> */}
                    {/* <Content placeholder= "add review..." type="text" name="review" onChange={getInputValue} value={props.review}></Content> */}
                {/* {selectedReview.review}
                </InsideContainer> */}
            </Container>
        </>
    );
}

export default SingleReviewView;