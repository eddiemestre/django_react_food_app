import React, {useState} from "react";
import { useTransition, animated } from '@react-spring/web';
import {GlobalStyle, GridContainer, Add, Test1, Test2, Test3, Trans, SvgTest, FaderDiv, FaderDivClose } from './Styles.js';
import "./Styles.css";
import {ReactComponent as PlusSvg} from '../../svg/plus_icon.svg';
import TestSvg from '../../svg/test.svg';

import LargeScreenView from "../../components/LargeScreen/LargeSCreenView";
import InAppHeader from "../../components/InAppHeader/index.js";
import ReviewList from "../../components/ReviewList/index.js";
import ReviewModule from "../../components/ReviewModule/index.js";
import DiscardModal from "../../components/DiscardModal/index.js";

const Home = () => {
    const [reviewModuleActive, setReviewModuleActive] = useState(false)
    const [fill, setFill] = useState('#03dac6')
    const [stroke, setStroke] = useState('black')
    const [inputHasChanged, setInputHasChanged] = useState(false)
    const [faderDivOpened, setFaderDivOpen] = useState(false)
    const [discardModal, setDiscardModal] = useState(false)

    const transition = useTransition(reviewModuleActive, {

    });
    const listView = (
        <Test1 is_hidden={reviewModuleActive}>
            <ReviewList />
        </Test1>
    )

    const backgroundDiv = (
        <FaderDiv modal_opened={reviewModuleActive} />
    )

    // const toggleReview = () => {
    //     if (!reviewModuleActive) {
    //         setFill('#C56679')
    //         setStroke('white')
    //     }
    //     // else {
    //     //    setFill('#03dac6')
    //     //    setStroke('black')
    //     //    const scrollY = document.body.style.top;
    //     //    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    //     // }
    // }

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

    const ModalConditions = () => {
        if (reviewModuleActive === false) {
            console.log("review modal false, changing to true")
            toggleReviewOn()
            setReviewModuleActive(true)
            
        } else {
            if (inputHasChanged === false) {
                console.log("reivew modal true, changing to false. No changes detected")
                toggleReviewOff()
                setReviewModuleActive(false)
                
            } else {
                console.log("Discard Modal false, changing to True")
                setDiscardModal(true)
            }
        }
    }

    const clickYes = () => {
        toggleReviewOff()
        setDiscardModal(false)
        setReviewModuleActive(false)
        setInputHasChanged(false)
    }

    const clickNo = () => {
        setDiscardModal(false)
    }

    const test = () => {
        return (
            fadeAnimation((style, item) =>
            item ? <FaderDivClose style={style}/> : ''
            )
            );
    }

    // const ModalView = (
    //     <CloseModalContainer onClick={() => setInputHasChanged(false)}/>
    // )
    
    // const reviewInfoView = (
    //     <Test2>
    //         <ReviewModule />
    //     </Test2>
    // )

    // const AnimatedReviewModule = animated(ReviewModule)

    // const testAnimation = ({className}) => (
    //     <CSSTransition
    //                 in={reviewModuleActive}
    //                 appear={true}
    //                 timeout={600}
    //                 classNames={className}
    //             >
    //                 <Test2/>
    //             </CSSTransition>
    // )

    // use State for whether X is clicked or not
    // two functions, one for the review list view, and one for the review module view


    const slideAnimation = useTransition(reviewModuleActive,  {
        from: {y: 1000},
        enter: {y: 0},
        leave: {y: 1000},
    });

    const fadeAnimation = useTransition(reviewModuleActive, {
        from: { opacity: 0 },
        enter: {opacity: 0.5},
        leave: {opacity: 0 },
    });

    const fadeAnimationTwo = useTransition(discardModal, {
        from: { opacity: 0 },
        enter: {opacity: 0.5},
        leave: {opacity: 0 },
    });

    const modalAppear = useTransition(discardModal, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" }
    });


    // const style = {
    //     transform: reviewModuleActive ? 'rotate(45deg)' : '',
    //     transition: 'transform 150ms ease',
    // }
    return (
        <>
            <GlobalStyle modal_opened={reviewModuleActive}/>
            <LargeScreenView />
            <GridContainer is_hidden={reviewModuleActive}>
                <InAppHeader />
                {/* {reviewModuleActive && reviewInfoView } */}
                {/* {slideAnimation((style, item) => 
                    item ? <Test2 style={style} /> : ''
                )} */}
                {listView}
                {/* <Footer /> */}
            </GridContainer>
            {/* {reviewModuleActive && backgroundDiv} */}
            {fadeAnimation((style, item) =>
                item ? <FaderDiv style={style}/> : ''
            )}
            {/* <FaderDiv modal_opened={reviewModuleActive}/> */}
            {slideAnimation((style, item) => 
                    item ? <Test2 style={style}><ReviewModule hasChanged={setInputHasChanged}></ReviewModule></Test2> : ''
                )}
                {/* <CSSTransition
                    in={reviewModuleActive}
                    timeout={600}
                    classNames="fade"
                    unmountOnExit
                >
                    <Test2/>
                </CSSTransition> */}
            {/* <Add><i className="ri-close-circle-fill ri-5x" style={style} onClick={() => toggleReview()}></i></Add> */}
                {/* <Add><PlusSvg onClick={() => toggleReview()}/></Add> */}
                {/* <svg src={PlusSvg} className="svg" name="svgdefault" onClick={() => toggleReview()}/>
                <img src={PlusSvg} className="svg" name="svgdefault" onClick={() => toggleReview()}/> */}
            <SvgTest isActive={reviewModuleActive} onClick={() => {ModalConditions()}} id="efXkrK1xpLH1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 480" shapeRendering="geometricPrecision" textRendering="geometricPrecision"><ellipse rx="239.999999" ry="239.999999" transform="translate(320 239.999999)" fill={fill} strokeWidth="0"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="matrix(0 1-1 0 320 240)" fill="none" stroke={stroke} strokeWidth="10"/><line x1="0" y1="-100.45977" x2="0" y2="100.45977" transform="translate(320 239.999999)" fill="none" stroke={stroke} strokeWidth="10"/></SvgTest>
             {discardModal && (fadeAnimationTwo((style, item) =>
            item ? <FaderDivClose style={style}/> : '' ))}
            {discardModal && (modalAppear((style, item) => item ? <Test3 style={style}><DiscardModal clickYes={clickYes} clickNo={clickNo}/></Test3> : ''))}

        </>
    );
};

export default Home;