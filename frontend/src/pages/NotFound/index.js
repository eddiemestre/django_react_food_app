import React, { useEffect, useState } from "react"
import { useTransition, animated } from '@react-spring/web';
import { Test2, Container, GlobalStyle, Content, Numbers, Text } from './Styles.js';
import ReviewModule from "../../components/ReviewModule/index.js";
import { useOutletContext, useLocation } from "react-router-dom";
import Header from "../../components/Header/index.js";
import Footer from "../../components/Footer/index.js";

const NotFound = () => {
    
    return (
        <>
            <GlobalStyle />
            <Header />
            <Container>
                <Content>
                    <Numbers>
                        404
                    </Numbers>
                    <Text>
                        Uh oh! Not sure how we ended up here. Perhaps you don't have permissions or this content has been removed.
                    </Text>
                </Content>
            </Container>
            <Footer />
        </>
    )

}

export default NotFound;