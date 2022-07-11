import React, { useEffect, useState } from "react"
import { useTransition, animated } from '@react-spring/web';
import { GlobalStyle, Container, MyReviews, ReviewContainer} from './Styles.js';
import PasswordUpdate from "../../components/PasswordUpdate/index.js";
import { useOutletContext } from "react-router-dom";

const UpdatePassword = () => {
    const [updatedPassword, setUpdatedPassword] = useOutletContext();
    return (
        <>
            <GlobalStyle />
            <ReviewContainer>
                <MyReviews>Settings</MyReviews>
                <Container>
                    <PasswordUpdate setUpdatedPassword={setUpdatedPassword} />
                </Container>
            </ReviewContainer>
        </>
    )

}

export default UpdatePassword;