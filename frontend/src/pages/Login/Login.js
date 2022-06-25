import React, { useEffect, useState } from "react";
import {PageTitle, 
        GlobalStyle,
        GridContainer} from './Styles.js'
import useAuth from "../../hooks/useAuth.js";
import { Navigate } from "react-router-dom";

import LargeScreenView from "../../components/LargeScreen/LargeSCreenView.js";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";
import LoginForm from "../../components/LoginForm/index.js";


const Login = () => {
    // // const { auth, setAuth } = useAuth();
    // const [sendHome, setSendHome] = useState(false)

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


    return (
        <>
            <GlobalStyle />
            <LargeScreenView />
            <GridContainer>
                <Header />
                <LoginForm />
                <Footer />
            </GridContainer>
        </>
    );
};

export default Login;