import React, {useEffect, useState, useContext, useMemo } from "react";
import {GlobalStyle, GridContainer } from './Styles.js';
import ReviewList from "../../components/ReviewList/index.js";
import DataContext from "../../context/DataContext.js";
import {default as axiosAPI} from "../../api/axios.js";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import axios from "axios";

const Home = () => {
    const { reviews, setReviews } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(false)
    const { auth, anonUser, setAnonUser } = useAuth();
    const params = useParams();
    const axiosPrivate = useAxiosPrivate();

    // useEffect(() => {
    //     console.log(reviews)
    // }, [reviews])

    useEffect(() => {
        // console.log("in home use effect")
        let isMounted = true;
        const source = axios.CancelToken.source();
        setIsLoading(true)

        const fetchAuthData = async () => {
            setIsLoading(true)

            try {
                const response = await axiosPrivate.get('/reviews/auth_reviews/', {
                    cancelToken: source.token
                });

                // console.log(response)
                if (isMounted) {
                    // console.log("mounted set Data")
                    let allReviews = response.data; 
                    allReviews.sort((a, b) =>  (a.date===null)-(b.date===null) || new Date(b.date) - new Date(a.date) || a.title.localeCompare(b.title))
                    setReviews(allReviews);
                }
            }  catch (err) {
                if (isMounted)
                console.log("failed")
                setReviews([])
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        const getAnonUser = async () => {
            try {
                const response = await axiosAPI.get(`/auth/get_other_user/${params.username}/`, {
                    cancelToken: source.token
                });

                // console.log("user data", response?.data);
                isMounted && setAnonUser(response?.data)
                 
            } catch (err) {
                console.error(err);
                if (err?.response?.status === 404) {
                    // console.log("404 getting anon user details")
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        const fetchAnonData = async () => {
            try {
                const response = await axiosAPI.post('/reviews/account_public_reviews/', 
                JSON.stringify({username: params.username}), 
                {
                    cancelToken: source.token,
                    headers: {'Content-Type': 'application/json'}
                });
                // console.log("list data in review list", response?.data);

                let allReviews = response.data; 
                allReviews.sort((a, b) =>  (a.date===null)-(b.date===null) || new Date(b.date) - new Date(a.date) || a.title.localeCompare(b.title))
                isMounted && setReviews(allReviews)

            } catch (err) {
                console.log(err);
                if (err?.response?.status === 404) {
                    // console.log("no public reviews found")
                }
            } finally {
                setIsLoading(false)
            }
        }

        const PullData = async () => {
            if (auth?.accessToken) {
                // console.log("authed user signed in")
                if (auth?.username === params.username) {
                    // console.log("authed users reviews")
                    fetchAuthData()
                } else {
                    // console.log(`${params.username}'s public reviews`)
                    getAnonUser()
                    fetchAnonData()
                }
            } else {
                // console.log(`${params.username}'s public reviews`)
                getAnonUser()
                fetchAnonData()
            }
        }
    
        const HasReviews = () => {
            if (reviews.length) {
                if (reviews[0]?.user === auth?.user_id && auth?.username === params.username) {
                    console.log("reviews are present and belong to authed paramed user")
                    setIsLoading(false)
                } else if (reviews[0].username === params.username) {
                    console.log("reviews are present and belong to public paramed user")
                    setIsLoading(false)
                } else {
                    console.log("reviews present but not same url, pull data")
                    PullData()
                }
            } else {
                console.log("no reviews present, pull data")
                PullData()
            }
        }

        HasReviews();
        
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;

    }, [auth, setAnonUser, axiosPrivate, params, setReviews])


    return (
        <>
            <GlobalStyle />
            {!isLoading && 
            <GridContainer >
                <ReviewList reviews={reviews} auth={auth} anonUser={anonUser}/>
            </GridContainer>}
            {isLoading && <p>Loading...</p>}
        </>
    );
};

export default Home;