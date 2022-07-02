import React from "react";
import { Container, Header, Body, Footer, SvgContainer, Settings, SignOut, Text, Greeting } from './Styles.js';
import { CredentialConfirmation } from "../LoginForm/Styles.js";
import useLogout from "../../hooks/useLogout.js";
import { Navigate, useNavigate } from "react-router-dom";

const MenuModal = (props) => {
    const logout = useLogout();
    const navigate = useNavigate();

    const closeMenu = () => {
        props.onClick(false)
    }

    const signOut = async () => {
        
        closeMenu();
        await logout();
        navigate('/login', { replace: true });
    };

    return (
        <Container>
            <Header>
                <Greeting>Hey, {JSON.parse(localStorage.getItem('name'))}!</Greeting>
                <SvgContainer onClick={closeMenu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(255,255,255,1)"/></SvgContainer>
            </Header>
            <Body>
                <Settings><Text>Settings</Text></Settings>
                <SignOut><Text onClick={signOut}>Sign Out</Text></SignOut>
            </Body>
            <Footer>© The Food App, Inc. 2022</Footer>
        </Container>
    );
};

export default MenuModal;