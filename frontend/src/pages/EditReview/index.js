import React, { useEffect, useState, useContext } from "react"
import { useTransition, animated } from '@react-spring/web';
import { Test2, Container, GlobalStyle, SvgTest, ButtonContainer, FaderDivClose, ModalContainer } from './Styles.js';
import ReviewModule from "../../components/ReviewModule/index.js";
import { useOutletContext, useLocation, useNavigate, useParams } from "react-router-dom";
import DiscardModal from "../../components/DiscardModal/index.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import AuthenticatedContext from "../../context/AuthContext.js";

const EditReview = () => {
    // const [reviewModuleActive, setReviewModuleActive] = useState(false)
    // const [reviewSaved, setReviewSaved] = useState(false)
    // const [inputHasChanged, setInputHasChanged] = useState(false)
    const location = useLocation();
    const [selectedReview, setSelectedReview] = useOutletContext();
    const [toEdit, setToEdit] = useState(false)
    const [toggleReviewOff, setToggleReviewOff] = useState(true)
    const [reviewSaved, setReviewSaved] = useState(false)
    const [reviewModuleActive, setReviewModuleActive] = useState(true)
    const [inputHasChanged, setInputHasChanged] = useState(false)
    const [discardModal, setDiscardModal] = useState(false)
    const [discardType, setDiscardType] = useState("edit")
    const params = useParams();
    const [urlParams, setUrlParams] = useState({"username": params.username, "id": params.id})
    const axiosPrivate = useAxiosPrivate();
    const context = useOutletContext();
    const navigate = useNavigate();
    const { authenticated, setAuthenticated} = useContext(AuthenticatedContext)

    useEffect(() => {
        console.log("in edit", authenticated)
        setReviewModuleActive(true)

        console.log("inside edit review", selectedReview)

        console.log("Edit review", selectedReview)
        if(selectedReview.title) {
            setToEdit(true)
        } else {
            setToEdit(false)
        }

        return () => {
            setReviewModuleActive(false)
        }
    }, [])

    const fadeAnimationTwo = useTransition(discardModal, {
        from: { opacity: 0 },
        enter: {opacity: 0.5},
        leave: {opacity: 0 },
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
            console.log(response?.data)
            setSelectedReview({})
        } catch (err) {
            console.log(err);
        }
    }

    const EditAppear = useTransition(toEdit, {
        from: { opacity: 0, transform: "translateY(20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(20px)" },
        reverse: !toEdit,
        delay: 300,
        // onRest: () => PauseAnimation(),
    });

    const modalAppear = useTransition(discardModal, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
    });

    const ModalConditions = () => {
        setDiscardType("edit")
        if (inputHasChanged === false) {
            console.log("reivew modal true, changing to false. No changes detected")
            // toggleReviewOff()
            // setReviewModuleActive(false)
            navigate(`/user/${params.username}/${params.id}`)
            
        } else {
            console.log("Discard Modal false, changing to True")
            setDiscardModal(true)
        }
    }


    const createReviewButton = () => (
        <SvgTest isActive={reviewModuleActive} onClick={() => {ModalConditions()}}
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
        </SvgTest>
    )

    const slideAnimation = useTransition(reviewModuleActive,  {
        from: {y: 1000},
        enter: {y: 0},
        leave: {y: 1000},
    });


    const clickYes = () => {
        if (discardType === "edit") {
            // toggleReviewOff()
            setDiscardModal(false)
            setInputHasChanged(false)
            // setReviewModuleActive(false)
            navigate(`/user/${params.username}/${params.id}`)
        } else {
            setDiscardModal(false)
            setInputHasChanged(false)
            DeleteThisReview()
            setSelectedReview({})
            navigate(`/user/${params.username}/`)
        }

        
    }

    const clickNo = () => {
        setDiscardModal(false)
        setDiscardType("edit")
        
    }
    return (
        // {slideAnimation((style, item) => 
        //     item ? <Test2 style={style}><ReviewModule setToggle={toggleReviewOff} setSaved={setReviewSaved} setModuleActive={setReviewModuleActive} hasChanged={setInputHasChanged}></ReviewModule></Test2> : ''
        // )}
        <>
            <GlobalStyle />
            <Container>
                <ReviewModule urlParams={urlParams} setDiscardModal={setDiscardModal} setDiscardType={setDiscardType} setToggle={toggleReviewOff} setSaved={setReviewSaved} setModuleActive={setReviewModuleActive} hasChanged={setInputHasChanged} changed={inputHasChanged} setSelectedReview={setSelectedReview}/>
            </Container>

            {EditAppear((style, item) =>
                item ? 
                <ButtonContainer style={style}>{createReviewButton()}</ButtonContainer>
                : ''
                // <ButtonContainer>{createReviewButton()}</ButtonContainer>
                )}
            
            {fadeAnimationTwo((style, item) =>
                item 
                ? <FaderDivClose style={style}/> 
                : '' )}

            {discardModal && (modalAppear((style, item) => 
                item 
                ? <ModalContainer style={style}><DiscardModal type={discardType} clickYes={clickYes} clickNo={clickNo}/></ModalContainer> 
                : ''))}
        </>
    )

}

export default EditReview;