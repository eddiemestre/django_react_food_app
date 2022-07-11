import styled, { createGlobalStyle, css } from "styled-components";
import { animated } from '@react-spring/web';


export const GlobalStyle = createGlobalStyle`
    body {
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
        font-family: 'Open Sans', sans-serif;
        position: ${props => props.modal_opened || props.menu_opened ? "fixed" : ""};
        overflow: ${props => props.modal_opened || props.menu_opened ? "hidden" : "scroll"};
        top: ${props => props.modal_opened || props.menu_opened ? `-${window.scrollY}px` : ""};
        ${'' /* height: 100%;
        width: 100%; */}
        ${'' /* margin-top: 10%; */}
        ${'' /* height: 100vh; */}
    }
`;

export const Container = styled.div`
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    position: fixed;
    top: 6%;
    ${'' /* height: 100%; */}
    ${'' /* width: 100%; */}
    ${'' /* border: none; */}
    ${'' /* border-radius: 10px 10px 0px 0px; */}
    z-index: 10;
    display: flex;
    width: 100%;
    flex-direction: column;
    ${'' /* bottom: 0; */}
    ${'' /* display: grid;
    grid-template-rows: 100%; */}

    
    ${'' /* grid-template-rows: 6% 94%; */}
    ${'' /* height: 100%; */}
    ${'' /* display: flex;
    position: fixed;
    padding-bottom: 20px;
    margin-top: 10%;
    background: blue; */}
`;
