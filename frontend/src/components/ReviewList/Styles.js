import styled from "styled-components"


export const ReviewContainer = styled.div`
    ${'' /* border-top: 1px solid white; */}
    ${'' /* display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 0.7em; */}
    display: grid;
    grid-template-rows: 8% auto;
    ${'' /* height: 100%; */}
    padding-bottom: 1.5em;
    padding-left: 5%;
    padding-right: 5%;
    height: 100%;
    width: 100%;
    overflow: auto;
    background: green;
    box-sizing: border-box;
`;

export const MyReviews = styled.div`
    color: white;
    align-items: left;
    font-weight: 700;
    font-size: 1.5em;
`;


export const UserReviewsTitle = styled.div` 
    height: 100%;
    width: 100%;
    background: orange;
    display: flex;
    align-items: center;
`;

export const ReviewFeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7em; 
    height: 100%;
    width: 100%;
    background: red;
`;

export const AddText = styled.div`
    color: white;
    font-size: 16px;
    font-weight: 400;
    font-style: italic;
    text-align: center;
`;

export const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-bottom: 5%;
    background: blue;
    ${'' /* padding-top: 60%; */}
`;