import React, {useEffect, useState, useContext } from "react";
import {GlobalStyle, GridContainer, FeedContainer, Add, Test1, Test2, Test3, Trans, SvgTest, FaderDiv, FaderDivClose } from './Styles.js';
import ReviewList from "../../components/ReviewList/index.js";
import DataContext from "../../context/DataContext.js";
import {default as axiosAPI} from "../../api/axios.js";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { hasLocalStorage } from "../../utils/index.js";
import axios from "axios";
// import { useTransition, animated } from '@react-spring/web';
// import "./Styles.css";
// import {ReactComponent as PlusSvg} from '../../svg/plus_icon.svg';
// import TestSvg from '../../svg/test.svg';


// import InAppHeader from "../../components/InAppHeader/index.js";

// import ReviewModule from "../../components/ReviewModule/index.js";
// import DiscardModal from "../../components/DiscardModal/index.js";
// import MenuModal from "../../components/Menu/index.js";

const Home = () => {
    const { reviews, setReviews } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState(null)
    const { auth, anonUser, setAnonUser } = useAuth();
    const params = useParams();
    const axiosPrivate = useAxiosPrivate();


    useEffect(() => {
        console.log("in home use effect")
        let isMounted = true;
        const source = axios.CancelToken.source();
        setIsLoading(true)

        const fetchAuthData = async () => {
            setIsLoading(true)

            try {
                const response = await axiosPrivate.get('/reviews/auth_reviews/', {
                    cancelToken: source.token
                });

                console.log(response)
                if (isMounted) {
                    console.log("mounted set Data")
                    setReviews(response.data);
                    setFetchError(null);
                }
            }  catch (err) {
                if (isMounted)
                console.log("failed")
                setFetchError(err.message)
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

                console.log("user data", response?.data);
                isMounted && setAnonUser(response?.data)
                 
            } catch (err) {
                console.error(err);
                if (err?.response?.status === 404) {
                    console.log("404 getting anon user details")
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
                console.log("list data in review list", response?.data);
                isMounted && setReviews(response?.data)

            } catch (err) {
                console.log(err);
                if (err?.response?.status === 404) {
                    console.log("no public reviews found")
                }
            } finally {
                setIsLoading(false)
            }
        }

        const PullData = async () => {
            if (auth?.accessToken) {
                console.log("authed user signed in")
                if (auth?.username === params.username) {
                    console.log("authed users reviews")
                    fetchAuthData()
                } else {
                    console.log(`${params.username}'s public reviews`)
                    getAnonUser()
                    fetchAnonData()
                }
            } else {
                console.log(`${params.username}'s public reviews`)
                getAnonUser()
                fetchAnonData()
            }
        }
    
        const HasReviews = () => {
            if (reviews.length) {
                if (reviews[0]?.user === auth?.user_id && auth?.username === params.username) {
                    console.log("reviews are present and belong to authed paramed user")
                    console.log(reviews)
                    setIsLoading(false)
                } else if (reviews[0].username === params.username) {
                    console.log("reviews are present and belong to public paramed user")
                    console.log("reviews")
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

    }, [])




    // useEffect(() => {
    //     console.log("in home use effect")
    //     let isMounted = true;
    //     const source = axios.CancelToken.source();
    //     setIsLoading(true)

    //     const fetchAuthData = async () => {
    //         setIsLoading(true)

    //         try {
    //             const response = await axiosPrivate.get('/reviews/auth_reviews/', {
    //                 cancelToken: source.token
    //             });

    //             console.log(response)
    //             if (isMounted) {
    //                 console.log("mounted set Data")
    //                 setReviews(response.data);
    //                 setFetchError(null);
    //             }
    //         }  catch (err) {
    //             if (isMounted)
    //             console.log("failed")
    //             setFetchError(err.message)
    //             setReviews([])
    //         } finally {
    //             isMounted && setIsLoading(false)
    //         }
    //     }

    //     const GetAuthedUser = async () => {
    //         try {
    //           const response = await axiosPrivate.get('/auth/get_user/', {
    //                 cancelToken: source.token
    //           });
      
    //           // set in AuthContext
    //           setAuth(prevState => ({
    //             ...prevState,
    //             "username": response?.data[0]?.username,
    //             "user_id": response?.data[0]?.id,
    //             "name": response?.data[0]?.name,
    //             "email": response?.data[0]?.email
    //           }))
      
    //           // set in localStorage
    //           localStorage.setItem('user_id', JSON.stringify(response?.data[0]?.id))
    //           localStorage.setItem('username', JSON.stringify(response?.data[0]?.username))
    //           localStorage.setItem('name', JSON.stringify(response?.data[0]?.name))
    //           localStorage.setItem('email', JSON.stringify(response?.data[0]?.email))
              
    //           return true
    //         } catch (err) {
    //           console.log(err);
    //           return false
    //         } finally {
    //             isMounted && setIsLoading(false)
    //         }
    //     }

    //     const getAnonUser = async () => {
    //         try {
    //             const response = await axiosAPI.get(`/auth/get_other_user/${params.username}/`, {
    //                 cancelToken: source.token
    //             });

    //             console.log("user data", response?.data);
    //             isMounted && setAnonUser(response?.data)
                 
    //         } catch (err) {
    //             console.error(err);
    //             if (err?.response?.status === 404) {
    //                 console.log("404 getting anon user details")
    //             }
    //         } finally {
    //             isMounted && setIsLoading(false)
    //         }
    //     }

    //     const fetchAnonData = async () => {
    //         try {
    //             const response = await axiosAPI.post('/reviews/account_public_reviews/', 
    //             JSON.stringify({username: params.username}), 
    //             {
    //                 cancelToken: source.token,
    //                 headers: {'Content-Type': 'application/json'}
    //             });
    //             console.log("list data in review list", response?.data);
    //             isMounted && setReviews(response?.data)

    //         } catch (err) {
    //             console.log(err);
    //             if (err?.response?.status === 404) {
    //                 console.log("no public reviews found")
    //             }
    //         } finally {
    //             setIsLoading(false)
    //         }
    //     }

    //     const PullData = async () => {
    //         if (!reviews.length) {
    //             if (auth?.accessToken && hasLocalStorage()) {
    //                 console.log("has auth")
    //                 fetchAuthData()
    //             } else if (hasLocalStorage()) {
    //                 console.log("has localStorage")
    //                 setAuth(prevState => ({
    //                     ...prevState, 
    //                     name: JSON.parse(localStorage.getItem('name')),
    //                     username: JSON.parse(localStorage.getItem('username')),
    //                     user_id: JSON.parse(localStorage.getItem('user_id')),
    //                     email: JSON.parse(localStorage.getItem('email'))
    //                 }))
    //                 fetchAuthData()
    //             } else {
    //                 console.log("no local storage")
    //                 const authSuccess = await GetAuthedUser();
    //                 if (authSuccess) {
    //                     console.log("get authed user success")
    //                     fetchAuthData()
    //                 } else {
    //                     console.log("anonymous user")
    //                     setAuth({})
    //                     console.log("get user details")
    //                     getAnonUser();
    //                     fetchAnonData()
    //                 }
    //             }
    //         }
    //         else {
    //             console.log("has reviews")
    //             console.log(reviews)
    //             setIsLoading(false)
    //         }
    //     }

    //     PullData()
        
    //     const cleanUp = () => {
    //         isMounted = false;
    //         // console.log("cancelled?")
    //         source.cancel();
    //     }

    //     return cleanUp;

    // }, [])

//     const toggleReviewOn = () => {
//         setFill('#C56679')
//         setStroke('white')
//     }

//     const toggleReviewOff = () => {
//         setFill('#03dac6')
//         setStroke('black')
//         const scrollY = document.body.style.top;
//         window.scrollTo(0, parseInt(scrollY || '0') * -1);
//     }

//     const ModalConditions = () => {

//         if (reviewModuleActive === false) {
//             console.log("review modal false, changing to true")
//             toggleReviewOn()
//             setReviewModuleActive(true)
            
//         } else {
//             if (inputHasChanged === false) {
//                 console.log("reivew modal true, changing to false. No changes detected")
//                 toggleReviewOff()
//                 setReviewModuleActive(false)
                
//             } else {
//                 console.log("Discard Modal false, changing to True")
//                 setDiscardModal(true)
//             }
//         }
//     }

//     const clickYes = () => {
//         toggleReviewOff()
//         setDiscardModal(false)
//         setReviewModuleActive(false)
//         setInputHasChanged(false)
//     }

//     const clickNo = () => {
//         setDiscardModal(false)
//     }

//     const exitMenu = () => {
//         setMenuOpened(false)
//     }


//     const slideAnimation = useTransition(reviewModuleActive,  {
//         from: {y: 1000},
//         enter: {y: 0},
//         leave: {y: 1000},
//     });

//     const fadeAnimation = useTransition(reviewModuleActive, {
//         from: { opacity: 0 },
//         enter: {opacity: 0.5},
//         leave: {opacity: 0 },
//     });

//     const fadeAnimationTwo = useTransition(discardModal, {
//         from: { opacity: 0 },
//         enter: {opacity: 0.5},
//         leave: {opacity: 0 },
//     });

//     const modalAppear = useTransition(discardModal, {
//         from: { opacity: 0, transform: "translateY(-20px)" },
//         enter: { opacity: 1, transform: "translateY(0px)" },
//         leave: { opacity: 0, transform: "translateY(-20px)" },
//     });



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