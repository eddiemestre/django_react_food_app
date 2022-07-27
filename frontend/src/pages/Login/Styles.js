import styled, { createGlobalStyle } from "styled-components";
import { animated } from '@react-spring/web';

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #121212;
        font-family: 'Open Sans', sans-serif;
        position: fixed;
        overflow: hidden;
        width: 100%;
    }
`;

// export const GridContainer = styled.div`
//     height: 100%;
//     ${'' /* background: orange; */}
//     display: flex;
//     justify-content: center;
// `

export const GridContainer = styled.div`
    margin-top: 50px;
    box-sizing: border-box;
    width: 100%;
    min-height: calc(90% - 50px);
    overflow: scroll;
    ${'' /* background: pink; */}
    display: flex;
    align-items: center;
`;

export const PageTitle = styled.h1`
    display: none

    @media screen and (max-width: 600px) {
        PageTitle {
            font-family: 'Open Sans', sans-serif;
            color: pink;
            display: block;
        }
    }
`

export const NoticeContainer = styled(animated.div)` 
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    left: 10%;
    margin-top: 30%;
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


export const LogContainer = styled(animated.div)` 
`;