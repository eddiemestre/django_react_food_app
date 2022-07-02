import React, { useEffect, useState } from "react"
import { useTransition, animated } from '@react-spring/web';
import { Test2, Container, GlobalStyle } from './Styles.js';
import ReviewModule from "../../components/ReviewModule/index.js";
import { useOutletContext } from "react-router-dom";

const CreateReview = () => {
    // const [reviewModuleActive, setReviewModuleActive] = useState(false)
    // const [reviewSaved, setReviewSaved] = useState(false)
    // const [inputHasChanged, setInputHasChanged] = useState(false)
    const [toggleReviewOff, setReviewSaved, reviewModuleActive, setReviewModuleActive, setInputHasChanged ] = useOutletContext();

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
                <ReviewModule SetToggle={toggleReviewOff} setSaved={setReviewSaved} setModuleActive={setReviewModuleActive} hasChanged={setInputHasChanged}/>
            </Container>
        </>
    )

}

export default CreateReview;