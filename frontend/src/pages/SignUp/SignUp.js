import React from "react";
import { GlobalStyle, GridContainer } from "./Styles";
import SignUpForm from "../../components/SignUpForm/index.js";
import Footer from "../../components/Footer";

const SignUp = () => {

    return (
        <>
            <GlobalStyle />
            <GridContainer>
                <SignUpForm />
            </GridContainer>
            <Footer />
        </>

    );
};

export default SignUp;