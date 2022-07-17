// import React, { useEffect, useState } from "react"
// import { useTransition, animated } from '@react-spring/web';
// import { Test2, Container, GlobalStyle } from './Styles.js';
// import ReviewModule from "../../components/ReviewModule/index.js";
// import { useOutletContext, useLocation } from "react-router-dom";

// const CreateReview = () => {

//     const slideAnimation = useTransition(reviewModuleActive,  {
//         from: {y: 1000},
//         enter: {y: 0},
//         leave: {y: 1000},
//     });

//     return (
//         <>
//             <GlobalStyle />
//             <Container>
//                 <ReviewModule setToggle={toggleReviewOff} setSaved={setReviewSaved} setModuleActive={setReviewModuleActive} hasChanged={setInputHasChanged} changed={inputHasChanged}/>
//             </Container>
//         </>
//     )

// }

// export default CreateReview;