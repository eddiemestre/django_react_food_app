import React, { useEffect } from 'react';
import { GlobalStyle, Container } from './Styles';
import { useParams, useOutletContext } from 'react-router-dom';
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
                const response = await axios.get(`/reviews/public/${review_id}`, 
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
                const response = await axiosPrivate.get(`/reviews/my_reviews/${review_id}`, {
                    signal: controller.signal
                });

                console.log(response?.data[0]);
                setSelectedReview(response?.data[0])
            } catch (err) {
                console.error(err);
            }
        }
        
        if (Object.keys(selectedReview).length > 1) {
            console.log("selectedReview state exists")
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
                {selectedReview.title}
                <br />
                {selectedReview.date}
                <br />
                {selectedReview.review}
            </Container>
        </>
    );
}

export default SingleReviewView;