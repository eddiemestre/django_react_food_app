import styled, { createGlobalStyle } from "styled-components";
import { animated } from '@react-spring/web';


export const GlobalStyle = createGlobalStyle`
    body {
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
        font-family: 'Open Sans', sans-serif;
    }
`;

export const Container = styled.div`
    background: #121212;

    position: fixed;
    z-index: 10;
    margin-top: 50px;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
`;



