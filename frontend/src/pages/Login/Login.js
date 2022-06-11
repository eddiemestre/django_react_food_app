import React  from "react";
import {PageTitle, 
        GlobalStyle,
        GridContainer} from './Styles.js'

import LargeScreenView from "../../components/LargeScreen/LargeSCreenView.js";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";
import LoginForm from "../../components/LoginForm/index.js";


const Login = () => {
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