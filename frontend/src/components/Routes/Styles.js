import styled, { css } from "styled-components";
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

export const NoticeText = styled.div` 
`;