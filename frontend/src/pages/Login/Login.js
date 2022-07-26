import React, { useContext } from "react";
import {GlobalStyle,
        GridContainer,
        NoticeContainer,
        NoticeText } from './Styles.js'
import { useTransition } from '@react-spring/web'
import LoginForm from "../../components/LoginForm/index.js";
import RegistrationContext from "../../context/RegistrationContext.js";

const Login = () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const { justSignedUp, setJustSignedUp } = useContext(RegistrationContext);

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
  

    return (
        
        <>
            <GlobalStyle />
            {successAppear((style, item) =>
                item 
                ? 
                    <NoticeContainer style={style}>
                        <NoticeText>Account created successfully!</NoticeText>
                    </NoticeContainer>
                : ''
            )}  
           <GridContainer>
               <LoginForm />
            </GridContainer>
        </>
    );
};

export default Login;