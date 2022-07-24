import React from "react"
// import { useTransition, animated } from '@react-spring/web';
import { Container, GlobalStyle } from './Styles.js';
import CreateReviewModule from "../../components/CreateReviewModule/index.js";
import { useOutletContext } from "react-router-dom";

const CreateReview = () => {
    const { toggleReviewOff,
            setReviewModuleActive,
            setInputHasChanged,
            inputHasChanged } = useOutletContext();

//     const slideAnimation = useTransition(reviewModuleActive,  {
//         from: {y: 1000},
//         enter: {y: 0},
//         leave: {y: 1000},
//     });

    return (
        <>
           <GlobalStyle />
           <Container>
               <CreateReviewModule    
                    toggleReviewOff={toggleReviewOff} 
                    setReviewModuleActive={setReviewModuleActive} 
                    setInputHasChanged={setInputHasChanged} 
                    inputHasChanged={inputHasChanged}
                />
             </Container>
        </>
    )

}

export default CreateReview;