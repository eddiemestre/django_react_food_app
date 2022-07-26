import React from "react";
import { Container, GlobalStyle, Content, Numbers, Text } from './Styles.js';
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