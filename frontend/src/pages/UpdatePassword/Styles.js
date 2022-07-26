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
`

export const OuterContainer = styled.div`
    margin-top: 50px;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 50px);
    ${'' /* background: pink; */}
    display: flex;
    align-items: center;
`;

export const SettingsContainer = styled.div`
    display: grid;
    grid-template-rows: 8% auto;
    ${'' /* height: 100%; */}
    padding-bottom: 1.5em;
    padding-left: 5%;
    padding-right: 5%;
    height: 100%;
    width: 100%;
    overflow: auto;
    ${'' /* background: green; */}
    box-sizing: border-box;
`;

export const PageTitle = styled.div` 
    height: 100%;
    width: 100%;
    ${'' /* background: orange; */}
    display: flex;
    align-items: center;
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
