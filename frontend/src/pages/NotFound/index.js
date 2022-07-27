import React from "react";
import { Container, GlobalStyle, Content, Numbers, Text } from './Styles.js';

const NotFound = () => {
    
    return (
        <>
            <GlobalStyle />
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
        </>
    )

}

export default NotFound;