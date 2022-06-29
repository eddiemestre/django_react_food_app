import React, { useEffect, useState } from "react";
import {PageTitle, 
        GlobalStyle,
        GridContainer,
        NoticeContainer,
        NoticeText,
        } from './Styles.js'
import useAuth from "../../hooks/useAuth.js";
import { Navigate } from "react-router-dom";
import { useTransition, animated } from '@react-spring/web';

import LargeScreenView from "../../components/LargeScreen/LargeSCreenView.js";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";
import LoginForm from "../../components/LoginForm/index.js";
import AbsoluteWrapper from "../../components/Wrapper/index.js";

const Login = (props) => {
    // // const { auth, setAuth } = useAuth();
    // const [sendHome, setSendHome] = useState(false)
    const [justSignedUp, setJustSignedUp] = useState(props.signUpSuccess)
    const [test, setTest] = useState(true)

    // useEffect(() => {
    //     // const loggedInUser = localStorage.getItem("user")

    //     // console.log(loggedInUser);
    
    //     // if (loggedInUser) {
    //     //     Navigate('/home');
    //     // }
    //     console.log("hello")
    //     const loggedInUser = localStorage.getItem("user");
    //     console.log(loggedInUser);

    //     if (loggedInUser) {
    //         setSendHome(true)
    //     }
    // }, [sendHome])

    // if (sendHome) {
    //     Navigate('/home');
    // }


    const successAppear = useTransition(test, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
        config: {duration: 5000},
    });

    const showSuccess = (
        <>    
        {/* {successAppear((style, item) =>
            item ? 
            <NoticeContainer style={style}>
                <NoticeText>Account created successfully!</NoticeText>
            </NoticeContainer>
            : ''
            )}     */}
        {console.log("signup success", props.signUpSuccess)}

        </>

    )

    return (
        
        <AbsoluteWrapper>
            <GlobalStyle />
            <LargeScreenView />
            {/* {props.signUpSuccess && showSuccess()} */}
            {showSuccess}
            {/* <GridContainer> */}
                {/* <Header /> */}
                <LoginForm />
                {/* <Footer /> */}
            {/* </GridContainer> */}
        </AbsoluteWrapper>
    );
};

export default Login;