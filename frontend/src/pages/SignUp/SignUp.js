import React, { useEffect, useState } from "react";
import {PageTitle, 
        GlobalStyle,
        LogContainer } from '../Login/Styles';
        
import { GridContainer } from "./Styles";
import LargeScreenView from "../../components/LargeScreen/LargeSCreenView.js";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";
import SignUpForm from "../../components/SignUpForm/index.js";
import AbsoluteWrapper from "../../components/Wrapper/index.js";
import { useTransition, animated } from '@react-spring/web';
import {motion} from "framer-motion";  

const SignUp = (props) => {


    return (
        <>

            <GlobalStyle />
            <LargeScreenView />

            <GridContainer>
                <SignUpForm signedUp={props.setSignUp} />
            </GridContainer>
        </>

    );
};

export default SignUp;