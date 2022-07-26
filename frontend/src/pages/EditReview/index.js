import React, { useEffect, useState, useContext } from "react"
import EditReviewModule from "../../components/EditReviewModule/index.js";
import { useTransition } from '@react-spring/web';
import { Container, GlobalStyle, SvgContent, ButtonContainer, FaderDivClose, ModalContainer } from './Styles.js';
import { useNavigate, useParams } from "react-router-dom";
import DiscardModal from "../../components/DiscardModal/index.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import DataContext from "../../context/DataContext.js";
import { formatDate } from "../../utils/FormatDate.js";
import useAuth from "../../hooks/useAuth.js";
import axios from 'axios';

const EditReview = () => {

    // hooks
    const navigate = useNavigate();
    const params = useParams();
    const axiosPrivate = useAxiosPrivate();
    const { reviews, setReviews } = useContext(DataContext)
    const { auth } = useAuth();

    // state
    const [discardModal, setDiscardModal] = useState(false)     // animates discard modal in and out
    const [inputHasChanged, setInputHasChanged] = useState(false)   // determines if discard modal should animate
    const [discardType, setDiscardType] = useState('')
    const [onEdit, setOnEdit] = useState(true)
    const [review, setReview] = useState({})
    const [reviewUpdated, setReviewUpdated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
      console.log("reviews", reviews)
      console.log(reviews.find(review => (review.id).toString() === params.id))
      setReview(reviews.find(review => (review.id).toString() === params.id))
      setReviewUpdated(!reviewUpdated)
      console.log("review", review)
    }, [reviews, params])


    useEffect(() => {
      console.log("trigger")
      console.log(review)
      if (auth?.accessToken) {
        console.log("user!")
        if (review?.title) {
            setReview(prevState => ({
            ...prevState,
            "username": auth.username,
            "name": auth.name,
            "date": formatDate(review.date),
            "date_modified": formatDate(review.date_modified)
            }))
            setIsLoading(false)
        }
      } else {
        console.log("not logged in")
      }
    }, [reviewUpdated])

    useEffect(() => {
      console.log("in edit review use effect")
      let isMounted = true;
      const source = axios.CancelToken.source();
      setIsLoading(true)

      const fetchAuthData = async () => {
          try {
              const response = await axiosPrivate.get('/reviews/auth_reviews/', {
                  cancelToken: source.token
              });

              // console.log(response)
              if (isMounted) {
                  console.log("mounted set Data")
                  setReviews(response.data);
                  setReview(response.data.find(review => (review.id).toString() === params.id))
              }
          }  catch (err) {
              if (isMounted)
              console.log("failed")
              setReviews([])
          } finally {
              isMounted && setIsLoading(false)
          }
      }

      const PullData = async () => {
          if (auth?.accessToken) {
              // console.log("authed user signed in")
              if (auth?.username === params.username) {
                  console.log("authed users reviews")
                  fetchAuthData()
              } else {
                console.log("not where we're suppose to be")
              }
          } else {
            console.log("no auth")
          }
      }
  
      const HasReviews = () => {
          if (reviews.length && auth?.accessToken) {
              if (reviews[0]?.user === auth?.user_id && auth?.username === params.username) {
                  console.log("reviews are present and belong to authed paramed user")
                  setIsLoading(false)
              }  else {
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

  }, [auth, axiosPrivate, params, setReviews])

    const backgroundOverlay = useTransition(discardModal, {
        from: { opacity: 0 },
        enter: {opacity: 0.5},
        leave: {opacity: 0 },
    });

    const modalAppear = useTransition(discardModal, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
    });


    const DeleteThisReview = async () => {
        console.log("delete review from database")
        try {
            let response;
                // post review with all fields
                response = await axiosPrivate.delete(`/reviews/auth_reviews/${params.id}/`, 
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true,
                    }
                );
            
            // remove review from local list
            // console.log("all reviews", reviews)
            const reviewsList = reviews.filter(review => (review.id).toString() !== params.id)
            // console.log("remove review", reviewsList)
            setReviews(reviewsList)

        } catch (err) {
            console.log(err);
        }
    }

    const EditAppear = useTransition(onEdit, {
        from: { opacity: 0, transform: "translateY(20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(20px)" },
        reverse: (() => setOnEdit(false)),
        delay: 300,
    });


    const ModalConditions = () => {
        setDiscardType("edit")
        if (inputHasChanged === false) {
            console.log("review modal true, changing to false. No changes detected")
            navigate(`/user/${params.username}/${params.id}`)
            
        } else {
            console.log("Discard Modal false, changing to True")
            setDiscardModal(true)
        }
    }


    const createReviewButton = () => (
        <SvgContent onClick={() => {ModalConditions()}}
            xmlns="http://www.w3.org/2000/svg"
            width="61"
            height="61"
            fill="none"
            viewBox="0 0 61 61"
        >
            <circle cx="30.71" cy="30.71" r="30" fill="#C56679"></circle>
            <path
                fill='white'
                d="M29.673 21.393H31.741999999999997V40.013999999999996H29.673z"
            ></path>
            <path
                fill='white'
                d="M21.398 31.738H23.467V50.358999999999995H21.398z"
                transform="rotate(-90 21.398 31.738)"
            ></path>
        </SvgContent>
    )

    const clickYes = () => {
        if (discardType === "edit") {
            setDiscardModal(false)
            setInputHasChanged(false)
            navigate(`/user/${params.username}/${params.id}`)
        } else {
            setDiscardModal(false)
            setInputHasChanged(false)
            DeleteThisReview()
            navigate(`/user/${params.username}/`)
        }
    }

    const clickNo = () => {
        setDiscardModal(false)
        setDiscardType('') 
    }

    return (
        <>
        {!isLoading && 
            <>
                <GlobalStyle />
                <Container>
                        <EditReviewModule 
                            setDiscardModal={setDiscardModal} 
                            setDiscardType={setDiscardType}
                            setInputHasChanged={setInputHasChanged}
                            inputHasChanged={inputHasChanged}
                            review={review}
                            setReview={setReview}
                        />
                    </Container>

                    {EditAppear((style, item) =>
                        item ? 
                        <ButtonContainer style={style}>{createReviewButton()}</ButtonContainer>
                        : '')
                    }
                    
                    {discardModal && (backgroundOverlay((style, item) =>
                        item 
                        ? <FaderDivClose style={style}/> 
                        : '' ))
                    }
            
                    {discardModal && (modalAppear((style, item) => 
                        item 
                        ? <ModalContainer style={style}><DiscardModal type={discardType} clickYes={clickYes} clickNo={clickNo}/></ModalContainer> 
                        : ''))
                    }    
            </>
        }
        </>
    )

}

export default EditReview;