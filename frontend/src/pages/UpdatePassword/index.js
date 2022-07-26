import React from "react"
import { useTransition, animated } from '@react-spring/web';
import {    GlobalStyle,
            OuterContainer,
            SettingsContainer,
            PageTitle,
            Container, 
            MyReviews } from './Styles.js';
import PasswordUpdate from "../../components/PasswordUpdate/index.js";
import { useOutletContext } from "react-router-dom";

const UpdatePassword = () => {
    const { setUpdatedPassword } = useOutletContext();
    return (
        <>
            <GlobalStyle />
            <OuterContainer>
                <SettingsContainer>
                    <PageTitle>
                        <MyReviews>Settings</MyReviews>
                    </PageTitle>
                    <Container>
                        <PasswordUpdate setUpdatedPassword={setUpdatedPassword} />
                    </Container>
                </SettingsContainer>
            </OuterContainer>
        </>
    )

}

export default UpdatePassword;