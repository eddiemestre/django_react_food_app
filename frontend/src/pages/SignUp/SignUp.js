import React  from "react";
import {PageTitle, 
        GlobalStyle,
        GridContainer} from '../Login/Styles';

import LargeScreenView from "../../components/LargeScreen/LargeSCreenView.js";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";
import SignUpForm from "../../components/SignUpForm/index.js";
import AbsoluteWrapper from "../../components/Wrapper/index.js";

const SignUp = (props) => {
    return (
        <AbsoluteWrapper>
            <GlobalStyle />
            <LargeScreenView />
            {/* <GridContainer> */}
                {/* <Header /> */}
                <SignUpForm signedUp={props.setSignUp} />
                {/* <Footer /> */}
            {/* </GridContainer> */}
        </AbsoluteWrapper>
    );
};

export default SignUp;