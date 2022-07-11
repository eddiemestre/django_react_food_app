import React, { useEffect, useState } from 'react';
import { GlobalStyle, 
    Container,  
    InsideContainer, 
    ContentContainer, 
    Title, 
    Name, 
    Date, 
    Content, 
    LastEdited,
    EditButtonPosition,
    ButtonContainer,
    BackContainer } from './Styles';
import { useParams, useOutletContext, Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useTransition, animated } from '@react-spring/web';
import { formatDate } from '../../utils/FormatDate';

const SingleReviewView = () => {
    const { auth } = useAuth();
    const params = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [selectedReview, setSelectedReview] = useOutletContext();
    const [isAuthedUser, setIsAuthedUser] = useState(false);
    const [fromListView, setFromListView] = useState(false);
    const [formattedDate, setformattedDate] = useState('')
    const [rerender, setRerender] = useState(false);
    const [dateModified, setDateModified] = useState('')

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

                
                setSelectedReview(response.data)
                if (response?.data?.date) {
                    setformattedDate(formatDate(response?.data?.date))
                } else {
                    setformattedDate("Not Dated")
                }
                setDateModified(formatDate(response?.data?.date_modified))

            } catch (err) {
                console.log(err)
                if (err?.response?.status === 404) {
                    navigate("/*")
                }
            }    
        }

        const getAuthedReview = async (review_id) => {
            try {
                const response = await axiosPrivate.get(`/reviews/auth_reviews/${review_id}`, {
                    signal: controller.signal
                });

                console.log(response?.data);
                setSelectedReview(response?.data)
                if (response?.data?.date) {
                    setformattedDate(formatDate(response?.data?.date))
                } else {
                    setformattedDate("Not Dated")
                }
                setDateModified(formatDate(response?.data?.date_modified))

            } catch (err) {
                console.error(err);
                if (err?.response?.status === 404) {
                    navigate("/*")
                }
            }
        }
        
        if (Object.keys(selectedReview).length > 1) {
            console.log("selectedReview state exists")
            setFromListView(true);

            // if this is the authed users review, add username to the data
            if (params.username === JSON.parse(localStorage.getItem('username'))) {
                console.log("authed user's info")
                setIsAuthedUser(true);
                setSelectedReview(prevState => ({
                    ...prevState,
                    "username": JSON.parse(localStorage.getItem('username')),
                    "user": JSON.parse(localStorage.getItem('name'))
                }))

                // console.log(selectedReview)
            }

        } else {
            const user = params.username
            const review_id = params.id
            if (user === JSON.parse(localStorage.getItem('username'))) {
                console.log("this is the authed users review, it can be public or private")
                setIsAuthedUser(true);
                getAuthedReview(review_id)
            } else {
                console.log("this is someone elses review, get Public")
                getPublicReview(review_id)
            }

            setformattedDate(formatDate(selectedReview.date))
            setDateModified(formatDate(selectedReview.date_modified))
            

        }

        console.log("Is Authed?", isAuthedUser)
        console.log("from List View", fromListView)

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [selectedReview])

    useEffect(() => { // this doesn't update the state
        console.log("in useEffect", selectedReview.date)
        console.log("formatted Date", formattedDate)
        
        if (selectedReview.date) {
            setformattedDate(formatDate(selectedReview.date))
        } else {
            setformattedDate("Not Dated")
        }

        if (selectedReview.date_modified) {
            setDateModified(formatDate(selectedReview.date_modified))
        } else {
            setDateModified("Unknown")
        }
        // if (formattedDate) {
        //     setformattedDate(formatDate(formattedDate))
        // } else if (selectedReview.date) {
        //     setformattedDate(formatDate(selectedReview.date))
        // } else {
        //     setformattedDate("Not Dated")
        // }

       
        setRerender(!rerender)  // dummy state
    }, [selectedReview])

    // useEffect(() => {
    //     if (formattedDate && typeof formattedDate === "string") {
    //         setformattedDate(formatDate(formattedDate))
            
    //     } else if (selectedReview.date && typeof formattedDate === "string") {
    //         setformattedDate(formatDate(selectedReview.date))
    //     } else {
    //         console.log(selectedReview.date)
    //         setformattedDate("Not Dated")
    //     }

    //     // setDateModified(formatDate(selectedReview.date_modified))
    //     if (dateModified) {
    //         setDateModified(formatDate(dateModified))
    //     } else if (selectedReview.date_modified) {
    //         setDateModified(formatDate(selectedReview.date_modified))
    //     }  else {
    //         setDateModified("Unknown")
    //     }
       
    //     setRerender(!rerender)  // dummy state  
    // }, [])

    
    // const modalAppear = useTransition(discardModal, {
    //     from: { opacity: 0, transform: "translateY(-20px)" },
    //     enter: { opacity: 1, transform: "translateY(0px)" },
    //     leave: { opacity: 0, transform: "translateY(-20px)" },
    // });

    const EditButton = () => {
        return (
            <EditButtonPosition
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
            </EditButtonPosition>
        );
    }

    const BackButton = () => {
        return (
            <EditButtonPosition
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
          </EditButtonPosition>
        );
    }
    // const delay = ms => new Promise(res => setTimeout(res, ms));

    // const PauseAnimation = async () => {
    //     await delay(5000);
    //     setIsAuthedUser(false)
    //   }
      const EditAppear = useTransition(isAuthedUser, {
        from: { opacity: 0, transform: "translateY(20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(20px)" },
        reverse: isAuthedUser,
        delay: 300,
        // onRest: () => PauseAnimation(),
    });

    const BackAppear = useTransition(fromListView, {
        from: { opacity: 0, transform: "translateY(20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(20px)" },
        reverse: isAuthedUser,
        delay: 400,
        // onRest: () => PauseAnimation(),
    });

    const handleEditClick = () => {
        navigate(`/user/${params.username}/${params.id}/edit`)
    }

    const handleBackClick = () => {
        console.log("back a page!")
        navigate(`/user/${params.username}/`)
    }

    return (
        <>
            <GlobalStyle />
            <Container>
                <InsideContainer>
                    <ContentContainer>
                        <Title>{selectedReview.title}</Title>
                        <Link to={`/user/${selectedReview.username}`} style={{textDecoration: 'none'}}><Name>{selectedReview.user}</Name></Link>
                        <Date>{formattedDate}</Date>
                        <Content>{selectedReview.review}</Content>
                        <LastEdited>Last edited on {dateModified}</LastEdited>
                    </ContentContainer>

                </InsideContainer>
            </Container>
            {/* show button for editing if isAuthedUser is true */}
            {isAuthedUser && 
                EditAppear((style, item) =>
                    item ? 
                    <ButtonContainer style={style} onClick={() => handleEditClick()}>{EditButton()}</ButtonContainer>
                    : ''
                    )
            }
            {/* show button for going back if fromListView is true */}
            {fromListView && 
                BackAppear((style, item) =>
                    item ? 
                    <BackContainer style={style} onClick={() => handleBackClick()}>{BackButton()}</BackContainer>
                    : ''
                    )
            }
        </>
    );
}

export default SingleReviewView;