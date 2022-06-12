import React from "react";
import { Container, Head, AddSpot, Done, Content, InsideContainer, Title } from './Styles.js';
import { InputTitle } from "../ReviewModule/Styles.js";

const ReviewContent = (props) => {

    // const editTitle = (event) => {
    //     props.editTitle(event.target.value);
    //     console.log(props.title)
    // }

    const getInputValue = (event) => {
        props.setReview(event.target.value)
        console.log(props.review)
    }
    return (
        <Container>
            <Head>
                <AddSpot>My Thoughts</AddSpot>
                <Done onClick={() => props.saveReview()}>Done</Done>
            </Head>
            <InsideContainer>
                <Content placeholder= "add review..." type="text" name="review" onChange={getInputValue} value={props.review}></Content>
            </InsideContainer>
        </Container>
    );
};

export default ReviewContent;