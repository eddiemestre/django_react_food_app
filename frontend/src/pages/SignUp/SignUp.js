import React  from "react";
import {PageTitle, 
        GlobalStyle,
        GridContainer} from './Styles.js'

import LargeScreenView from "../../components/LargeScreen/LargeSCreenView.js";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";
import SignUpForm from "../../components/SignUpForm/index.js";

const SignUp = () => {
    return (
        <>
            <GlobalStyle />
            <LargeScreenView />
            <GridContainer>
                <Header />
                <SignUpForm />
                <Footer />
            </GridContainer>
        </>
    );
};

export default SignUp;