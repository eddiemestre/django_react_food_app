import React, { useEffect, useState } from "react";
import {PageTitle, 
        GlobalStyle,
        GridContainer,
        LogContainer } from '../Login/Styles';

import LargeScreenView from "../../components/LargeScreen/LargeSCreenView.js";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";
import SignUpForm from "../../components/SignUpForm/index.js";
import AbsoluteWrapper from "../../components/Wrapper/index.js";
import { useTransition, animated } from '@react-spring/web';
import {motion} from "framer-motion";  

const SignUp = (props) => {
    // const [isMounted, setIsMounted] = useState(false)

    // useEffect(() => {
    //     setIsMounted(true);

    //     return function cleanup() {
    //         setIsMounted(false)
    //     }
    // }, [])

    // const transitions = useTransition(isMounted, {
    //     from: {opacity: 0, transform: "translate(100%, 0)"},
    //     enter: {opacity: 1, transform: "translate(0%, 0)"},
    //     leave: {opacity: 0, transform: "translate(-50%, 0)"}
    //   })

    //   const pageTransition = {
    //     initial: {opacity: 0, transform: "translate(100%, 0)"},
    //     animate: {opacity: 1, transform: "translate(0%, 0)"},
    //     exit: {opacity: 0, transform: "translate(-50%, 0)"}
    //   }

    return (
        <>
        {/* <AbsoluteWrapper> */}
            <GlobalStyle />
            <LargeScreenView />
            {/* <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            > */}
            {/* <GridContainer> */}
                {/* <Header /> */}

                {/* {transitions((style, item) =>
                item ?
                <LogContainer style={style}><SignUpForm signedUp={props.setSignUp} /></LogContainer>
                : '')} */}
            <GridContainer>
                <SignUpForm signedUp={props.setSignUp} />
            </GridContainer>
                {/* <Footer /> */}
            {/* </GridContainer> */}
            {/* </motion.div> */}
        {/* </AbsoluteWrapper> */}
        </>

    );
};

export default SignUp;