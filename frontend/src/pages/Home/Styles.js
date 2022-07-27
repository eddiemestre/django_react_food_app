import styled, { createGlobalStyle } from "styled-components";
import { animated } from '@react-spring/web';

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #121212;
        font-family: 'Open Sans', sans-serif;
        position: fixed;
        overflow: scroll;
        width: 100%;
    }
`;

export const GridContainer = styled.div`
    margin-top: 50px;
    box-sizing: border-box;
    width: 100%;
    min-height: calc(90% - 50px);
    max-height: calc(90% - 50px);
    overflow: scroll;
    ${'' /* background: pink; */}
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const WelcomeContainer = styled.div`
    box-sizing: border-box;
    width: 60%;
    min-height: 450px;
    position: relative;
    ${'' /* background: blue; */}
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PhoneContainer = styled(animated.img)`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const TopDiv = styled.div` 
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, transparent 0%, 50%, #121212 68%);
    position: absolute;
    z-index: 50;
`;

export const WelcomeText= styled(animated.div)`
    display: flex;
    text-align: center;
    justify-content: center;
    height: 35%;
    width: 100%;
    bottom: 0;
    ${'' /* background: blue; */}
    position: absolute;
    z-index: 60;
    color: white;
    font-weight: 700;
`;

export const RegisterButton = styled.button`
    background: #03DAC6;
    border: none;
    bottom: 0;
    position: absolute;
    z-index: 60;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 700;
    color: black;
    padding: 3%;
    height: 45px;
    width: 125px;
    &:hover {
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #03DAC6;
    }
`;