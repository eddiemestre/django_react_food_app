import React, { useEffect, useState, useContext } from 'react';
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
import AuthenticatedContext from '../../context/AuthContext';
import DataContext from '../../context/DataContext';
const SingleReviewView = () => {
    const { auth } = useAuth();
    const { id } = useParams();
    const { reviews, setReviews } = useContext(DataContext)
    const [review, setReview] = useState(reviews.find(review => (review.id).toString() === id) || {})

    //       setAuth(prevState => ({
//         ...prevState,
//         "username": response?.data[0]?.username,
//         "user_id": response?.data[0]?.id,
//         "name": response?.data[0]?.name,
//         "email": response?.data[0]?.email
//       }))

    useEffect(() => {
      console.log("trigger")
      if (auth.username) {
        setReview(prevState => ({
          ...prevState,
          "username": auth.username,
          "name": auth.name,
          "date": formatDate(review.date),
          "date_modified": formatDate(review.date_modified)
        }))
      } else {
        console.log("No auth")
        setReview(prevState => ({
          ...prevState,
          "date": formatDate(review.date),
          "date_modified": formatDate(review.date_modified)
        }))
      }
    }, [auth, review.date, review.date_modified])

    // const axiosPrivate = useAxiosPrivate();
    // const navigate = useNavigate();
    // const [selectedReview, setSelectedReview] = useOutletContext();
    // const [isAuthedUser, setIsAuthedUser] = useState(false);
    // const [fromListView, setFromListView] = useState(false);
    // const [formattedDate, setformattedDate] = useState('')
    // const [rerender, setRerender] = useState(false);
    // const [dateModified, setDateModified] = useState('')
    // const { authenticated, setAuthenticated} = useContext(AuthenticatedContext)

    // const EditButton = () => {
    //     return (
    //         <EditButtonPosition
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="60"
    //           height="60"
    //           fill="none"
    //           viewBox="0 0 60 60"
    //         >
    //           <circle cx="30" cy="30" r="30" fill="#03DAC6"></circle>
    //           <path
    //             fill="#000"
    //             d="M23.333 37.905a.826.826 0 00.2 0l3.334-.833a.834.834 0 00.391-.217L37.5 26.58a1.666 1.666 0 000-2.35l-1.317-1.325a1.666 1.666 0 00-2.358 0L23.583 33.147a.883.883 0 00-.225.392l-.833 3.333a.835.835 0 00.608 1.033.826.826 0 00.2 0z"
    //           ></path>
    //           <path
    //             fill="#03DAC6"
    //             d="M35 24.08l1.325 1.325L35 26.73l-1.317-1.325L35 24.08zM24.925 34.164L32.5 26.58l1.325 1.325-7.583 7.584-1.759.433.442-1.758z"
    //           ></path>
    //         </EditButtonPosition>
    //     );
    // }

    // const BackButton = () => {
    //     return (
    //         <EditButtonPosition
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="60"
    //         height="60"
    //         fill="none"
    //         viewBox="0 0 60 60"
    //       >
    //         <circle cx="30" cy="30" r="30" fill="#121212"></circle>
    //         <circle cx="30" cy="30" r="30" fill="#fff" fillOpacity="0.08"></circle>
    //         <path
    //           fill="#fff"
    //           d="M35.383 21.325l-1.917-1.918L22.74 30.132l10.725 10.725 1.917-1.917-8.807-8.808 8.807-8.807z"
    //         ></path>
    //       </EditButtonPosition>
    //     );
    // }

    //   const EditAppear = useTransition(isAuthedUser, {
    //     from: { opacity: 0, transform: "translateY(20px)" },
    //     enter: { opacity: 1, transform: "translateY(0px)" },
    //     leave: { opacity: 0, transform: "translateY(20px)" },
    //     reverse: isAuthedUser,
    //     delay: 300,
    //     // onRest: () => PauseAnimation(),
    // });

    // const BackAppear = useTransition(fromListView, {
    //     from: { opacity: 0, transform: "translateY(20px)" },
    //     enter: { opacity: 1, transform: "translateY(0px)" },
    //     leave: { opacity: 0, transform: "translateY(20px)" },
    //     reverse: isAuthedUser,
    //     delay: 400,
    //     // onRest: () => PauseAnimation(),
    // });

    // const handleEditClick = () => {
    //     navigate(`/user/${params.username}/${params.id}/edit`)
    // }

    // const handleBackClick = () => {
    //     console.log("back a page!")
    //     navigate(`/user/${params.username}/`)
    // }

    return (
        <>
            <GlobalStyle />
            <Container>
                <InsideContainer>
                    <ContentContainer>
                        <Title>{review.title}</Title>
                        <Link to={`/user/${review.username}`} style={{textDecoration: 'none'}}><Name>{review.name}</Name></Link>
                        {/* <Date>{formattedDate}</Date> */}
                        <Date>{review.date}</Date>
                        <Content>{review.review}</Content>
                        {/* <LastEdited>Last edited on {dateModified}</LastEdited> */}
                        <LastEdited>Last edited on {review.date_modified}</LastEdited>
                    </ContentContainer>

                </InsideContainer>
            </Container>
            {/* show button for editing if isAuthedUser is true */}
            {/* {isAuthedUser && 
                EditAppear((style, item) =>
                    item ? 
                    <ButtonContainer style={style} onClick={() => handleEditClick()}>{EditButton()}</ButtonContainer>
                    : ''
                    )
            } */}
            {/* show button for going back if fromListView is true */}
            {/* {fromListView && 
                BackAppear((style, item) =>
                    item ? 
                    <BackContainer style={style} onClick={() => handleBackClick()}>{BackButton()}</BackContainer>
                    : ''
                    )
            } */}
        </>
    );
}

export default SingleReviewView;