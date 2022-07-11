import React, { useEffect, useState } from "react"
import { useTransition, animated } from '@react-spring/web';
import { Test2, Container, GlobalStyle } from './Styles.js';
import ReviewModule from "../../components/ReviewModule/index.js";
import { useOutletContext, useLocation } from "react-router-dom";

const CreateReview = () => {
    // const [reviewModuleActive, setReviewModuleActive] = useState(false)
    // const [reviewSaved, setReviewSaved] = useState(false)
    // const [inputHasChanged, setInputHasChanged] = useState(false)
    const location = useLocation();
    const [toggleReviewOff, setReviewSaved, reviewModuleActive, setReviewModuleActive, setInputHasChanged, inputHasChanged ] = useOutletContext();
    const context = useOutletContext();

    useEffect(() => {
        setReviewModuleActive(true)


        return () => {
            setReviewModuleActive(false)
        }
    }, [])





    const slideAnimation = useTransition(reviewModuleActive,  {
        from: {y: 1000},
        enter: {y: 0},
        leave: {y: 1000},
    });

    return (
        // {slideAnimation((style, item) => 
        //     item ? <Test2 style={style}><ReviewModule setToggle={toggleReviewOff} setSaved={setReviewSaved} setModuleActive={setReviewModuleActive} hasChanged={setInputHasChanged}></ReviewModule></Test2> : ''
        // )}
        <>
            <GlobalStyle />
            <Container>
                <ReviewModule setToggle={toggleReviewOff} setSaved={setReviewSaved} setModuleActive={setReviewModuleActive} hasChanged={setInputHasChanged} changed={inputHasChanged}/>
            </Container>
        </>
    )

}

export default CreateReview;