import React from "react";
import {GlobalStyle,
        GridContainer,
        PhoneContainer,
        WelcomeContainer,
        TopDiv,
        WelcomeText,
        RegisterButton } from './Styles.js'

import { useTransition } from '@react-spring/web'
import Footer from "../../components/Footer/index.js";
// import Phone from '../../static/iPhone12Pro-Reviews.png';
// import Phone from '../../static/phone-slice.png';
import Phone from '../../static/reviews_iphone-2.png';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const phoneAppear = useTransition(true, {
        config: {mass:1, friction:40},
        from: { opacity: 0, transform: "translateY(-10px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        delay: 100
    });

    const TextAppear = useTransition(true, {
        config: {mass:1, friction:40},
        from: { opacity: 0, transform: "translateY(10px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        delay: 100
    });


    return (
        
        <>
            <GlobalStyle />
            <GridContainer>
              <WelcomeContainer>

                {phoneAppear((style, item) =>
                    item 
                    ? <PhoneContainer style={style} src={Phone} />
                    : ''
                )}
                <TopDiv />
                {TextAppear((style, item) =>
                    item 
                    ? <WelcomeText style={style}>Track you're favorite restaurants and tell your friends what's tasty.</WelcomeText>
                    : ''
                )}
                <RegisterButton onClick={() => navigate('/register')}>Sign Up</RegisterButton>
              </WelcomeContainer>
            </GridContainer>
            <Footer />
        </>
    );
};

export default Home;