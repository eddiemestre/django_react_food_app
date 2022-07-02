import React, { useEffect, useState } from "react";
import {PageTitle, 
        GlobalStyle,
        GridContainer,
        NoticeContainer,
        NoticeText,
        LogContainer } from './Styles.js'
import useAuth from "../../hooks/useAuth.js";
import { Navigate, useNavigate } from "react-router-dom";
import { useTransition, animated } from '@react-spring/web';

import LargeScreenView from "../../components/LargeScreen/LargeSCreenView.js";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";
import LoginForm from "../../components/LoginForm/index.js";
import AbsoluteWrapper from "../../components/Wrapper/index.js";
import {motion} from "framer-motion";  

const Login = (props) => {
    const { auth, setAuth } = useAuth();
    // const [sendHome, setSendHome] = useState(false)
    const [justSignedUp, setJustSignedUp] = useState(props.signUpSuccess)
    const [isMounted, setIsMounted] = useState(false)
    // const [justSignedUp, setJustSignedUp] = useState(true)
    const [test, setTest] = useState(true)
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const navigate = useNavigate();
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

    useEffect(() => {
        // check auth?
      const loggedInUser = localStorage.getItem("refresh")
  
      console.log("logged in?", loggedInUser);
    
      if (loggedInUser) {
        // window.location.href = `/profile/${JSON.parse(localStorage.getItem('email'))}`;
        navigate(`/profile/${JSON.parse(localStorage.getItem('email'))}`)
        // GoHome();
      }


    }, [])

    // useEffect(() => {
    //     setIsMounted(true);

    //     return function cleanup() {
    //         setIsMounted(false)
    //     }
    // }, [])

    const PauseAnimation = async () => {
        await delay(5000);
        setJustSignedUp(false)
      }
      const successAppear = useTransition(justSignedUp, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
        reverse: justSignedUp,
        delay: 500,
        onRest: () => PauseAnimation(),
    });
  
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


    // const successAppear = useTransition(test, {
    //     from: { opacity: 0, transform: "translateY(-20px)" },
    //     enter: { opacity: 1, transform: "translateY(0px)" },
    //     leave: { opacity: 0, transform: "translateY(-20px)" },
    //     config: {duration: 5000},
    // });

    // const showSuccess = (
    //     <>    
    //     {/* {successAppear((style, item) =>
    //         item ? 
    //         <NoticeContainer style={style}>
    //             <NoticeText>Account created successfully!</NoticeText>
    //         </NoticeContainer>
    //         : ''
    //         )}     */}
    //     {console.log("signup success", props.signUpSuccess)}

    //     </>
    // )

    return (
        
        // <AbsoluteWrapper>
        <>
            <GlobalStyle />
            <LargeScreenView />
            {/* <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            > */}
            {/* {props.signUpSuccess && showSuccess()} */}
            {successAppear((style, item) =>
            item ? 
            <NoticeContainer style={style}>
                <NoticeText>Account created successfully!</NoticeText>
            </NoticeContainer>
            : ''
            )}  
            <GridContainer>
                <LoginForm />
            </GridContainer>


            {/* <GridContainer> */}
                {/* <Header /> */}
                {/* {transitions((style, item) =>
                item ?
                <LogContainer style={style}><LoginForm/></LogContainer>
                : '')} */}

            
                {/* <Footer /> */}
            {/* </GridContainer> */}
            {/* </motion.div> */}
        {/* </AbsoluteWrapper> */}
        </>
    );
};

export default Login;