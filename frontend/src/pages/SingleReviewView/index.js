import React, { useEffect, useState, useContext } from 'react';
import { GlobalStyle, 
    Container,  
    ContentContainer, 
    Title, 
    TitleContainer,
    Name, 
    Date, 
    Content, 
    LastEdited,
    ButtonPosition,
    BackContainer,
    OuterContainer,
    ButtonContainer } from './Styles';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useTransition } from '@react-spring/web';
import {default as axiosAPI} from "../../api/axios.js";
import { formatDate } from '../../utils/FormatDate';
import DataContext from '../../context/DataContext';
import axios from 'axios';
import NotFound from '../NotFound';

const SingleReviewView = () => {
    const { auth, setAnonUser } = useAuth();
    const params = useParams();
    const navigate = useNavigate();
    const { reviews, setReviews, fromReviewFeed } = useContext(DataContext)
    const [review, setReview] = useState({})
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [isAuthedUser, setIsAuthedUser] = useState(false)
    const [reviewUpdated, setReviewUpdated] = useState(false)

    useEffect(() => {
        console.log("update params")
        setNotFound(false)
        setIsLoading(true)
    }, [params])


    useEffect(() => {
      console.log("reviews", reviews)
      console.log(reviews.find(review => (review.id).toString() === params.id))
      setReview(reviews.find(review => (review.id).toString() === params.id))
    //   if (Object.keys(reviews).length > 0) {
    //     console.log("has reviews")
    //     if (reviews.find(review => (review.id).toString() !== params.id)) {
    //         console.log("no reviews with this param")
    //     }
    //   }
      setReviewUpdated(!reviewUpdated)
    }, [reviews, params])


    useEffect(() => {
      console.log("trigger")
      console.log(review)
      if (auth.username && review?.title) {
        console.log("user!")
        setIsAuthedUser(true)
        setReview(prevState => ({
          ...prevState,
          "username": auth.username,
          "name": auth.name,
          "date": formatDate(review.date),
          "date_modified": formatDate(review.date_modified)
        }))
        setIsLoading(false)
      } else if (review?.title) {
        console.log("No auth")
        setReview(prevState => ({
          ...prevState,
          "date": formatDate(review.date),
          "date_modified": formatDate(review.date_modified)
        }))
        setIsLoading(false)
      }
    }, [reviewUpdated])

    useEffect(() => {
      // console.log("in single review use effect")
      let isMounted = true;
      const source = axios.CancelToken.source();

      const fetchAuthData = async () => {

          try {
              const response = await axiosPrivate.get('/reviews/auth_reviews/', {
                  cancelToken: source.token
              });

              // console.log(response)
              if (isMounted) {
                  console.log("mounted set Data")
                  setReviews(response.data);

                  if (!response.data.find(review => (review.id).toString() === params.id)) {
                    console.log("review doesn't exist")
                    setNotFound(true)
                    setIsLoading(false)
                  }
                  setIsAuthedUser(true)
              }
          }  catch (err) {
              if (isMounted)
              setNotFound(true)
              setIsLoading(false)
              setReviews([])
          } finally {
            //   isMounted && setIsLoading(false)
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
                setNotFound(true)
                
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
              isMounted && setReviews(response?.data)

              if (!response.data.find(review => (review.id).toString() === params.id)) {
                console.log("review doesn't exist")
                setNotFound(true)
              }


          } catch (err) {
              console.log(err);
                setNotFound(true)
          } finally {
              setIsLoading(false)
          }
      }

      const PullData = async () => {
          if (auth?.accessToken) {
              // console.log("authed user signed in")
              if (auth?.username === params.username) {
                  console.log("authed users reviews")
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
                  if (reviews.find(review => (review.id).toString() === params.id)) {
                    console.log("found review")
                  } else {
                    console.log("didn't find")
                    setNotFound(true)
                    setIsLoading(false)
                  }
                  setIsAuthedUser(true)
                //   setIsLoading(false)
              } else if (reviews[0].username === params.username) {
                  console.log("reviews are present and belong to public paramed user")
                  if (reviews.find(review => (review.id).toString() === params.id)) {
                    console.log("found review")
                  } else {
                    console.log("didn't find")
                    setNotFound(true)
                    setIsLoading(false)
                  }
                //   setIsLoading(false)
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

  }, [auth, axiosPrivate, params, setReviews, setAnonUser])


    const EditButton = () => {
        return (
            <ButtonPosition
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="none"
              viewBox="0 0 60 60"
            >
              <circle cx="30" cy="30" r="30" fill="#03DAC6"></circle>
              <path
                fill="#000"
                d="M23.333 37.905a.826.826 0 00.2 0l3.334-.833a.834.834 0 00.391-.217L37.5 26.58a1.666 1.666 0 000-2.35l-1.317-1.325a1.666 1.666 0 00-2.358 0L23.583 33.147a.883.883 0 00-.225.392l-.833 3.333a.835.835 0 00.608 1.033.826.826 0 00.2 0z"
              ></path>
              <path
                fill="#03DAC6"
                d="M35 24.08l1.325 1.325L35 26.73l-1.317-1.325L35 24.08zM24.925 34.164L32.5 26.58l1.325 1.325-7.583 7.584-1.759.433.442-1.758z"
              ></path>
            </ButtonPosition>
        );
    }

    const BackButton = () => {
        return (
            <ButtonPosition
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="none"
            viewBox="0 0 60 60"
          >
            <circle cx="30" cy="30" r="30" fill="#121212"></circle>
            <circle cx="30" cy="30" r="30" fill="#fff" fillOpacity="0.08"></circle>
            <path
              fill="#fff"
              d="M35.383 21.325l-1.917-1.918L22.74 30.132l10.725 10.725 1.917-1.917-8.807-8.808 8.807-8.807z"
            ></path>
          </ButtonPosition>
        );
    }

      const EditAppear = useTransition(isAuthedUser, {
        from: { opacity: 0, transform: "translateY(20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(20px)" },
        reverse: isAuthedUser,
        delay: 300,
        // onRest: () => PauseAnimation(),
    });

    const BackAppear = useTransition(fromReviewFeed, {
        from: { opacity: 0, transform: "translateY(20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(20px)" },
        // reverse: isAuthedUser,
        delay: 400,
    });

    const handleEditClick = () => {
        navigate(`/user/${auth?.username}/${params.id}/edit`)
    }

    const handleBackClick = () => {
        navigate(`/user/${params.username}/`)
    }

    return (
            <>
                <GlobalStyle />
                {!isLoading && !notFound &&
                    <>
                        <OuterContainer>
                        <Container>
                            <TitleContainer>
                            <Title>{review?.title}</Title>
                            </TitleContainer>
                            <ContentContainer>
                                <Link to={`/user/${review?.username}`} style={{textDecoration: 'none'}}><Name>{review?.name}</Name></Link>
                                <Date>{review?.date}</Date>
                                <Content>{review?.review}</Content>
                                <LastEdited>Last edited on {review?.date_modified}</LastEdited>
                            </ContentContainer>
                        </Container>
                        </OuterContainer>

                        {/* show button for editing if isAuthedUser is true */}
                        {isAuthedUser && 
                            EditAppear((style, item) =>
                                item ? 
                                <ButtonContainer style={style} onClick={() => handleEditClick()}>{EditButton()}</ButtonContainer>
                                : ''
                                )
                        }
                        {/* show button for going back if fromListView is true */}
                        {fromReviewFeed && 
                            BackAppear((style, item) =>
                                item ? 
                                <BackContainer style={style} onClick={() => handleBackClick()}>{BackButton()}</BackContainer>
                                : ''
                                )
                        }
                    </>
                }
                {!isLoading && notFound && 
                    <NotFound />
                }
            </>
    );
}

export default SingleReviewView;