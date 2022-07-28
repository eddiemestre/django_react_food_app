import styled from "styled-components"


export const ReviewContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;
    padding-bottom: 1.5em;
    padding-left: 5%;
    padding-right: 5%;
    ${'' /* height: 100%; */}
    width: 100%;
    ${'' /* overflow: auto; */}
    ${'' /* background: green; */}
    box-sizing: border-box;
`;

export const UserReviewsTitle = styled.div`
    min-height: 60px;
    width: 100%;
    ${'' /* background: orange; */}
    display: flex;
    align-items: center;
`;

export const MyReviews = styled.div`
    color: white;
    align-items: left;
    font-weight: 700;
    font-size: 1.5em;
`;

export const ReviewFeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7em; 
    height: 100%;
    width: 100%;
    padding-bottom: 75px;
    ${'' /* background: red; */}
`;

export const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export const AddText = styled.div`
    color: white;
    font-size: 16px;
    font-weight: 400;
    font-style: italic;
    text-align: center;
`;

