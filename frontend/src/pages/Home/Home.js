import React, {useEffect, useState, useContext } from "react";
import { GlobalStyle } from "./Styles";
// import { useTransition, animated } from '@react-spring/web';
// import {GlobalStyle, GridContainer, Add, Test1, Test2, Test3, Trans, SvgTest, FaderDiv, FaderDivClose } from './Styles.js';
// import "./Styles.css";
// import {ReactComponent as PlusSvg} from '../../svg/plus_icon.svg';
// import TestSvg from '../../svg/test.svg';

// import { useParams, useOutletContext } from "react-router-dom";

// import LargeScreenView from "../../components/LargeScreen/LargeSCreenView";
// import InAppHeader from "../../components/InAppHeader/index.js";
// import ReviewList from "../../components/ReviewList/index.js";
// import ReviewModule from "../../components/ReviewModule/index.js";
// import DiscardModal from "../../components/DiscardModal/index.js";
// import MenuModal from "../../components/Menu/index.js";
// import useRefreshToken from "../../hooks/useRefreshToken.js";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
// import AuthenticatedContext from "../../context/AuthContext.js";

const Home = () => {

//     const listView = (
//         <Test1 is_hidden={reviewModuleActive}>
//             <ReviewList wasSaved={reviewSaved} setReview={context[5]}/>
//         </Test1>
//     )

//     const backgroundDiv = (
//         <FaderDiv modal_opened={reviewModuleActive} />
//     )
   

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
            {/* <GlobalStyle modal_opened={reviewModuleActive} menu_opened={menuOpened}/>
            <LargeScreenView />
            <GridContainer is_hidden={reviewModuleActive} menu_opened={menuOpened}>
                {listView}
            </GridContainer> */}
            <GlobalStyle />
            <div style={{color: "white"}}>
                Home
            </div>
        </>
    );
};

export default Home;