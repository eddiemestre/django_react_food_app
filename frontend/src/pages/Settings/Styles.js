import styled, { createGlobalStyle } from "styled-components";
import { animated } from '@react-spring/web';

export const GlobalStyle = createGlobalStyle`
    
    body {
        background-color: #121212;
        font-family: 'Open Sans', sans-serif;
        position: relative;
    }
`;

export const ReviewContainer = styled.div`
    ${'' /* border-top: 1px solid white; */}
    display: flex;
    gap: 0.7em;
    ${'' /* height: 100%; */}
    ${'' /* background: green; */}
    margin-top: 10%;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
    padding-left: 5%;
    padding-right: 5%;
`;

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ${'' /* background: blue; */}
`;

export const MyReviews = styled.div`
    color: white;
    align-items: left;
    font-weight: 700;
    font-size: 1.5em;
`;

export const NoticeContainer = styled(animated.div)` 
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    left: 10%;
    margin-top: 15%;
    background: #03DAC6;
    color: black;
    z-index: 6000;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
`;

export const NoticeText = styled.div` 
`;
