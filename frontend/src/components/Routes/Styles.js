import styled from "styled-components";
import { animated } from '@react-spring/web';

export const Container = styled(animated.div)`
    width: 100%;
    ${'' /* background: blue; */}
    height: 100%;
`;

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

`

export const SvgComponent = styled.svg`
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

export const ButtonContainer = styled(animated.div)` 
    position: fixed;
    z-index: 15;
    right: 2%;
    bottom: 5%;
    height: 100px;
    width: 100px;
`;