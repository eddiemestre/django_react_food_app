import React from "react";
import { GlobalStyle, GridContainer } from "./Styles";
import SignUpForm from "../../components/SignUpForm/index.js";

const SignUp = () => {

    return (
        <>
            <GlobalStyle />
            <GridContainer>
                <SignUpForm />
            </GridContainer>
        </>

    );
};

export default SignUp;