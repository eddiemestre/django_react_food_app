import React from "react"
import { Container, GlobalStyle } from './Styles.js';
import CreateReviewModule from "../../components/CreateReviewModule/index.js";
import { useOutletContext } from "react-router-dom";

const CreateReview = () => {
    const { toggleReviewOff,
            setReviewModuleActive,
            setInputHasChanged,
            inputHasChanged } = useOutletContext();

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