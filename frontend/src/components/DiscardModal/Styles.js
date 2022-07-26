import styled from "styled-components"
import { animated } from '@react-spring/web';

export const CloseModalContainer = styled(animated.div)`
    position: absolute;
    display: grid;
    height: 25%;
    width: 90%;
    grid-auto-rows: 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    top: 50%;
    left: 50%;
    font-family: 'Open Sans', 'sans-serif';
    font-weight: 700;
    font-size: 16px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #121212;
    border-radius: 10px;
    z-index: 6000;
    justify-content: center;
    align-items: center;
`;

export const Discard = styled.div` 
    color: white;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Yes = styled.div`
    width: 100%;
    height: 100%;
    color: #B00020;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        background: #393939;
    }
`;

export const No = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 0px 0px 10px 10px;

    :hover {
        background: #393939;
    }
`;