import React, { useEffect, useState } from "react"
import { useTransition, animated } from '@react-spring/web';
import { GlobalStyle, Container, MyReviews, ReviewContainer, NoticeContainer, NoticeText} from './Styles.js';
import SettingsForm from "../../components/SettingsForm/index.js";
import { useOutletContext } from "react-router-dom";

const Settings = () => {
    const [updatedPassword, setUpdatedPassword] = useOutletContext();
    const [updatedSettings, setUpdatedSettings] = useState(false);
    // const [updatedPassword, setUpdatedPassword] = useState(true);
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

    useEffect(() => {

    }, [updatedSettings])

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
            <ReviewContainer>
                <MyReviews>Settings</MyReviews>
                <Container>
                    <SettingsForm setUpdatedSettings={setUpdatedSettings} />
                </Container>
            </ReviewContainer>
        </>
    )

}

export default Settings;