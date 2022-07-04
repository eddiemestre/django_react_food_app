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

    useEffect(() => {
        if (params.email) {
            if (params.email === JSON.parse(localStorage.getItem('email'))) {
                setUrlIsUser(true)
            } else {
                setUrlIsUser(false)
            }
        }
        console.log("selectedReview?", selectedReview)
        console.log("is user?", urlIsUser)
        console.log("prev Page?", prevPage)
    }, [params])

    useEffect(() => {
        if (location.pathname == "/create_review") {
            toggleReviewOn();
            setReviewModuleActive(true)
            setPrevPage(true)
        } else {
            toggleReviewOff();
            setReviewModuleActive(false)
        }
    }, [params])

    

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
        delay: 1000,
        // onRest: () => PauseAnimation(),
    });


    const clickYes = () => {
        toggleReviewOff()
        setDiscardModal(false)
        setReviewModuleActive(false)
        setInputHasChanged(false)
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
                navigate(`/profile/${JSON.parse(localStorage.getItem('email'))}`)
                
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
            console.log("button should animate")
            return (
                EditAppear((style, item) =>
                item ? 
                <ButtonContainer style={style}>{createReviewButton()}</ButtonContainer>
                : ''
                // <ButtonContainer>{createReviewButton()}</ButtonContainer>
                )
            )
        } else {
            console.log("button should stay in place")
            return (
                <ButtonContainer>{createReviewButton()}</ButtonContainer>
            )
        }
    }

  return (
    <div> 
      <Outlet context={[ toggleReviewOff, setReviewSaved, reviewModuleActive, setReviewModuleActive, setInputHasChanged, setSelectedReview]}/>
      {/* <SvgTest isActive={reviewModuleActive} onClick={() => {ModalConditions()}} id="efXkrK1xpLH1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 480" shapeRendering="geometricPrecision" textRendering="geometricPrecision"><ellipse rx="239.999999" ry="239.999999" transform="translate(320 239.999999)" fill={fill} strokeWidth="0"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="matrix(0 1-1 0 320 240)" fill="none" stroke={stroke} strokeWidth="10"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="translate(320 239.999999)" fill="none" stroke={stroke} strokeWidth="10"/></SvgTest> */}
      {urlIsUser ?
            TestReviewButton(prevPage)
      : '' }
      {fadeAnimationTwo((style, item) =>
            item ? <FaderDivClose style={style}/> : '' )}
            {discardModal && (modalAppear((style, item) => item ? <ModalContainer style={style}><DiscardModal clickYes={clickYes} clickNo={clickNo}/></ModalContainer> : ''))}
           
    </div>
  )
  }

  export default ReviewAdderTemplate;