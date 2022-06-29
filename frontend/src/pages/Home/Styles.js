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
        margin-top: 12%;
    
    }
`

export const GridContainer = styled.div`
    display: flex;
    ${'' /* grid-template-rows: 6% 94%; */}
    ${'' /* height: 100%; */}
    position: relative;
    padding: 0% 5%;
    padding-bottom: 20px;
`

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

export const Add = styled.div`
    ${'' /* transform: scale(2em); */}
    position: fixed;
    width: 100px;
    height: 100px;
    right: 0px;
    bottom: -5%;
    ${'' /* margin-top: -30%; */}
    ${'' /* margin-left: 75%; */}
    color: #03DAC6;
    transform: rotate(45deg);
    ${'' /* transform-origin: center; */}
    z-index: 15;
`

export const ReContainer = styled.div`
    display: grid;
    grid-template-rows: 6% 94%;
    height: 100%;
    poisition: relative;

`

export const Test1 = styled.div`
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    ${'' /* overflow: ${props => props.is_hidden ? "auto" : "visible"} */}

    ${'' /* &.hide {
        overflow: ${(props) => props.is_hidden ? "auto" : "visible"};
    } */}

`;

// export const Test1 = styled(animated.div)`
//     grid-row: 2 / 3,
//     grid-column: 1 / 2,
//     overflow: hidden,
//     overflow: ${props => props.is_hidden ? "hidden" : "visible"},
// `;

// export const Test2 = styled.div`
//     ${'' /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212; */}
//     background: blue;
//     border: none;
//     border-radius: 10px 10px 0px 0px;
//     margin 0 -5%;
//     grid-row: 2 / 3;
//     grid-column: 1 / 2;
//     z-index: 10;
// `;

export const Test2 = styled(animated.div)`
    ${'' /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212; */}
    background: blue;
    position: fixed;
    top: 6%;
    height: 100%;
    width: 100%;
    border: none;
    border-radius: 10px 10px 0px 0px;
    z-index: 10;
`;

export const Trans = styled.div`
    height: 10%;
    width: 10%;
    background: purple
`;

export const SvgTest = styled.svg`
    position: fixed;
    z-index: 15;
    right: 2%;
    bottom: 5%;
    height: 100px;
    width: 100px;
    transform: ${props => props.isActive ? "rotate(45deg)" : "rotate(0deg)"};
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
    ${'' /* animation-name: shrink;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-play-state: paused;

    :hover:active {
        animation-play-state: running;
    }

    @keyframes shrink {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(0.9);
        }
    } */}

`;

export const FaderDiv = styled(animated.div)`
    position: relative;
    height: 100%;
    width: 100vw;
    opacity: 0;
    background: black;
    z-index: 5;
    bottom: 105%;
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

// export const CloseModalContainer = styled.div`
//     position: absolute;
//     height: 20%;
//     width: 90%;
//     bottom: 0;
//     top: 50%;
//     left: 50%;
//     -webkit-transform: translate(-50%, -50%);
//     transform: translate(-50%, -50%);
//     z-index: 6000;
// `;


export const Test3 = styled(animated.div)`
    ${'' /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212; */}
    position: fixed;
    height: 100%;
    top: 0;
    width: 100%;
    border: none;
    border-radius: 10px;
    z-index: 20000;
`;

// export const MenuContainer = styled(animated.div)`
//     ${'' /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212; */}
//     position: fixed;
//     background: white;
//     height: 100%;
//     top: 0;
//     right: 0;
//     width: 75%;
//     border: none;
//     border-radius: 5px 0px 0px 5px;
//     z-index: 20000;
// `;

// export const MenuBackground = styled(animated.div)`
//     position: fixed;
//     height: 100vh;
//     bottom: 0;
//     right: 0;
//     width: 100vw;
//     background: rgba(0, 0, 0, 0.8);
//     z-index: 5000;
// `;