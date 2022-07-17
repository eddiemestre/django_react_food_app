import React from "react";
import { GlobalStyle, GridContainer } from "./Styles";
import LargeScreenView from "../../components/LargeScreen/LargeSCreenView.js";
import SignUpForm from "../../components/SignUpForm/index.js";

// import AbsoluteWrapper from "../../components/Wrapper/index.js";
// import { useTransition, animated } from '@react-spring/web';
// import {motion} from "framer-motion";  

const SignUp = () => {


    return (
        <>

            <GlobalStyle />
            <LargeScreenView />

            <GridContainer>
                <SignUpForm />
            </GridContainer>
        </>

    );
};

export default SignUp;