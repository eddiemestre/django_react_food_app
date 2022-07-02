import React from 'react';
import { GlobalStyle, Container } from './Styles';
import { useParams } from 'react-router-dom';

const SingleReviewView = () => {
    const params = useParams();

    return (
        <>
            <GlobalStyle />
            <Container>
                {params.email}
                {params.id}
            </Container>
        </>
    );
}

export default SingleReviewView;