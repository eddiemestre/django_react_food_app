import React, { useEffect, useState } from "react";
import { Container, Header, Body, Body2, Footer, SvgContainer, Settings, SignOut, Text, Greeting } from './Styles.js';
import { CredentialConfirmation } from "../LoginForm/Styles.js";
import useLogout from "../../hooks/useLogout.js";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const MenuModal = (props) => {
    const logout = useLogout();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [signedIn, setSignedIn] = useState(false)


    useEffect(() => {
        if (auth.accessToken) {
            setSignedIn(true)
        }
    }, [])
    const closeMenu = () => {
        props.onClick(false)
    }

    const signOut = async () => {
        
        closeMenu();
        await logout();
        navigate('/login', { replace: true });
    };

    const signUp = async () => {
        closeMenu();
        navigate('/register')
    }

    const openSettings = async () => {
        closeMenu();
        navigate('/settings')
    }

    return (
        <Container>
            <Header>
                {signedIn
                ? <Greeting>Hey, {JSON.parse(localStorage.getItem('name'))}!</Greeting>
                : <Greeting></Greeting>}
                <SvgContainer onClick={closeMenu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(255,255,255,1)"/></SvgContainer>
            </Header>
            
                {signedIn 
                    ?   <Body>
                            <Settings><Text onClick={openSettings}>Settings</Text></Settings>
                            <SignOut><Text onClick={signOut}>Sign Out</Text></SignOut>
                        </Body>
                    : 
                        <Body2>
                            <SignOut><Text onClick={signUp}>Sign Up</Text></SignOut>
                        </Body2>
                }
                
            <Footer>© The Food App, Inc. 2022</Footer>
        </Container>
    );
};

export default MenuModal;