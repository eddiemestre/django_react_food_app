import styled, { createGlobalStyle, css } from "styled-components";
import { animated } from '@react-spring/web';


export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #121212;
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
    background: #121212; 
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

export const SvgTest = styled.svg`
    position: fixed;
    z-index: 15;
    ${'' /* right: 2%;
    bottom: 5%; */}
    height: 100px;
    width: 100px;
    transform-box: center;
    transform-origin: center;
    transform: ${props => props.isActive ? "rotate(45deg) scale(0.75)" : "rotate(0deg) scale(0.75)"};
    animiation-delay: 0s;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    transition: transform 0.3s linear; /* vendorless fallback */
    -o-transition: transform 0.3s linear; /* opera */
    -ms-transition: transform 0.3s linear; /* IE 10 */
    -moz-transition: transform 0.3s linear; /* Firefox */
    -webkit-transition: transform 0.3s linear; /*safari and chrome */
`;


export const ButtonContainer = styled(animated.div)` 
    position: fixed;
    z-index: 5000;
    right: 2%;
    bottom: 5%;
    height: 100px;
    width: 100px;
`;

export const FaderDivClose = styled(animated.div)`
    position: absolute;
    height: 100vh;
    bottom: 0;
    width: 100vw;
    opacity: 0;
    background: rgba(0, 0, 0, 0.8);;
    z-index: 5000;
`;

export const ModalContainer = styled(animated.div)`
    ${'' /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212; */}
    position: fixed;
    height: 100%;
    top: 0;
    width: 100%;
    border: none;
    border-radius: 10px;
    z-index: 20000;
`;