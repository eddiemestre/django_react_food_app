import React, { useState, useEffect } from "react"
import { useTransition, animated } from '@react-spring/web';
import {    GlobalStyle, 
            Container, 
            MyReviews, 
            OuterContainer, 
            PageTitle, 
            SettingsContainer, 
            NoticeContainer, 
            NoticeText} from './Styles.js';
import SettingsForm from "../../components/SettingsForm/index.js";
import { useOutletContext } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const Settings = () => {
    const { auth } = useAuth();
    const {updatedPassword, setUpdatedPassword} = useOutletContext();
    const [updatedSettings, setUpdatedSettings] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (auth?.accessToken) {
            setIsLoading(false)
        }
    }, [auth])
    
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const PausePasswordAnimation = async () => {
        await delay(5000);
        setUpdatedPassword(false)
      }
      const PasswordSuccessAppear = useTransition(updatedPassword, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
        reverse: updatedPassword,
        delay: 500,
        onRest: () => PausePasswordAnimation(),
    });

    const PauseSettingsAnimation = async () => {
        await delay(5000);
        setUpdatedSettings(false)
      }
      const SettingsSuccessAppear = useTransition(updatedSettings, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
        reverse: updatedSettings,
        delay: 500,
        onRest: () => PauseSettingsAnimation(),
    });

    return (
        <>
            <GlobalStyle />
            {PasswordSuccessAppear((style, item) =>
            item ? 
            <NoticeContainer style={style}>
                <NoticeText>Password saved successfully!</NoticeText>
            </NoticeContainer>
            : ''
            )}
            {SettingsSuccessAppear((style, item) =>
            item ? 
            <NoticeContainer style={style}>
                <NoticeText>Settings updated successfully!</NoticeText>
            </NoticeContainer>
            : ''
            )} 
            <OuterContainer>
                <SettingsContainer>
                    <PageTitle>
                        <MyReviews>Settings</MyReviews>
                    </PageTitle>
                    <Container>
                        { !isLoading && <SettingsForm setUpdatedSettings={setUpdatedSettings} />}
                    </Container>
                </SettingsContainer>
            </OuterContainer>
        </>
    )

}

export default Settings;