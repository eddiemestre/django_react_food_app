import styled from "styled-components"
import { animated } from '@react-spring/web';

export const HeadContainer = styled.div`
    display: flex;
    height: 50px;
    width: 100%;
    position: fixed;
    color: white;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    background-color: #121212;
    z-index: 10;
    top: 0;
    padding-left: 5%;
    padding-right: 5%;

    :before {
        content : "";
        position: absolute;
        left: 5%;
        bottom: -1px;
        height: 1px;
        width: 90%;
        border-bottom:1px solid white;
    }
`;

export const AppName = styled.div`
    color: white;
    font-weight: 700;
    font-size: 1em;
`;

export const SvgContainer = styled.svg`
    height: min-content;
    transform: scale(1.3);
    box-sizing: border-box;
`;

export const MenuContainer = styled(animated.div)`
    position: fixed;
    background: white;
    height: 100%;
    top: 0;
    right: 0;
    width: 75%;
    border: none;
    border-radius: 5px 0px 0px 5px;
    z-index: 20000;
`;

export const MenuBackground = styled(animated.div)`
    position: fixed;
    height: 100vh;
    bottom: 0;
    right: 0;
    width: 100vw;
    background: rgba(0, 0, 0, 0.8);
    z-index: 5000;
`;