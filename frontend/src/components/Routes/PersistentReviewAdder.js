import { Outlet, useNavigate, useOutletContext, useParams, useLocation } from "react-router-dom";
import {SvgTest, FaderDivClose, ModalContainer, Outer, ButtonContainer} from './Styles';
import { useEffect, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import DiscardModal from "../DiscardModal";

const ReviewAdderTemplate = () => {
    const [fill, setFill] = useState('#03dac6')
    const [stroke, setStroke] = useState('black')
    const [reviewModuleActive, setReviewModuleActive] = useState(false)
    const [discardModal, setDiscardModal] = useState(false)
    const [inputHasChanged, setInputHasChanged] = useState(false)
    const [prevPage, setPrevPage] = useState(false)
    const [reviewSaved, setReviewSaved] = useState(false)
    const [urlIsUser, setUrlIsUser] = useState(true)
    const params = useParams();
    const location = useLocation();
    const [selectedReview, setSelectedReview] = useOutletContext();
    const navigate = useNavigate();


    

    const toggleReviewOn = () => {
        setFill('#C56679')
        setStroke('white')
    }

    const toggleReviewOff = () => {
        setFill('#03dac6')
        setStroke('black')
        const scrollY = document.body.style.top;
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    const fadeAnimationTwo = useTransition(discardModal, {
        from: { opacity: 0 },
        enter: {opacity: 0.5},
        leave: {opacity: 0 },
    });

    const modalAppear = useTransition(discardModal, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
    });

    const EditAppear = useTransition(!prevPage, {
        from: { opacity: 0, transform: "translateY(20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(20px)" },
        reverse: !prevPage,
        delay: 300,
        // onRest: () => PauseAnimation(),
    });


    const clickYes = () => {
        toggleReviewOff()
        setDiscardModal(false)
        setReviewModuleActive(false)
        setInputHasChanged(false)
        navigate(`/user/${JSON.parse(localStorage.getItem('username'))}`)
    }

    const clickNo = () => {
        setDiscardModal(false) 
    }

    const ModalConditions = () => {

        if (reviewModuleActive === false) {
            console.log("review modal false, changing to true")
            toggleReviewOn()
            setReviewModuleActive(true)
            navigate('/create_review');
            
        } else {
            if (inputHasChanged === false) {
                console.log("reivew modal true, changing to false. No changes detected")
                toggleReviewOff()
                setReviewModuleActive(false)
                navigate(`/user/${JSON.parse(localStorage.getItem('username'))}`)
                
            } else {
                console.log("Discard Modal false, changing to True")
                setDiscardModal(true)
            }
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
            <circle cx="30.71" cy="30.71" r="30" fill={fill}></circle>
            <path
                fill={stroke}
                d="M29.673 21.393H31.741999999999997V40.013999999999996H29.673z"
            ></path>
            <path
                fill={stroke}
                d="M21.398 31.738H23.467V50.358999999999995H21.398z"
                transform="rotate(-90 21.398 31.738)"
            ></path>
        </SvgTest>
    )

    const TestReviewButton = (animate) => {
        if (!animate) {
            return (
                EditAppear((style, item) =>
                item ? 
                <ButtonContainer style={style}>{createReviewButton()}</ButtonContainer>
                : ''
                )
            )
        } else {
            return (
                <ButtonContainer>{createReviewButton()}</ButtonContainer>
            )
        }
    }

  return (
    <div> 
        <Outlet context={[ toggleReviewOff, // 0
                setReviewSaved,             // 1
                reviewModuleActive,         // 2
                setReviewModuleActive,      // 3
                setInputHasChanged,         // 4
                setSelectedReview,          // 5
                inputHasChanged ]}/>       {/* 6 */}
        {urlIsUser ?
            TestReviewButton(prevPage)
        : '' }
        {fadeAnimationTwo((style, item) =>
            item 
            ? <FaderDivClose style={style}/> 
            : '' )}
    
        {discardModal && (modalAppear((style, item) => 
            item 
            ? <ModalContainer style={style}><DiscardModal type="create" clickYes={clickYes} clickNo={clickNo}/></ModalContainer> 
            : ''))}
           
    </div>
  )
  }

  export default ReviewAdderTemplate;