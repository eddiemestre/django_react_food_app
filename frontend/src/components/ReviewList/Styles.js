import styled from "styled-components"


export const ReviewContainer = styled.div`
    ${'' /* border-top: 1px solid white; */}
    display: flex;
    gap: 0.7em;
    ${'' /* height: 100%; */}
    flex-direction: column;
    padding-bottom: 2em;
    justify-content: center;
`;

export const MyReviews = styled.div`
    color: white;
    align-items: left;
    font-weight: 700;
    font-size: 1.5em;
    padding-top: 2%;
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
    height: 60%;
    padding-top: 60%;
`;