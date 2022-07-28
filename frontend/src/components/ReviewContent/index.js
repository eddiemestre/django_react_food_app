import React from "react";
import { DetailsContainer, Container, Head, AddSpot, Done, Content, InsideContainer, Title } from './Styles.js';

const ReviewContent = (props) => {

    const getInputValue = (event) => {
        props.setReview(event.target.value)
        // console.log(props.review)
    }
    return (
        <DetailsContainer>
            <Container>
                <Head>
                    <AddSpot>My Thoughts</AddSpot>
                    <Done onClick={() => props.saveReview()}>Done</Done>
                </Head>
                <InsideContainer>
                    <Content placeholder= "add review..." type="text" name="review" onChange={getInputValue} value={props.review}></Content>
                </InsideContainer>
            </Container>
        </DetailsContainer>
    );
};

export default ReviewContent;