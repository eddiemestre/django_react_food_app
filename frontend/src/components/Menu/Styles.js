import styled from "styled-components"
import { animated } from '@react-spring/web';

export const Container = styled(animated.div)`
    position: absolute;
    display: grid;
    grid-auto-rows: 6% 90% 4%;
    grid-auto-columns: 1fr;
    color: white;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), #121212;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;
    font-family: 'Open Sans', 'sans-serif';
`;


export const Header = styled.div` 
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5%;
    padding-left: 5%;
`;

export const Greeting = styled.div`
    width: auto;
    height: auto;
    box-sizing: border-box;
    font-weight: 700;
`;

export const SvgContainer = styled.svg`
    height: min-content;
    transform: scale(1.8);
    box-sizing: border-box;
    right: 0;
`; 

export const Body = styled.div` 
    color: white;
    width: 100%;
    height: 15%;
    box-sizing: border-box;
    display: grid;
    grid-auto-rows: 1fr 1fr;
    grid-auto-columns: 1fr;
    font-weight: 700;
`;

export const Body2 = styled.div` 
    color: white;
    width: 100%;
    height: 7.5%;
    box-sizing: border-box;
    display: grid;
    grid-auto-rows: 1fr;
    grid-auto-columns: 1fr;
    font-weight: 700;
`

export const Settings = styled.div` 
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const Text = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 40%;
    border: none;
    border-radius: 5px;

    :hover {
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #121212;;
    }

`

export const SignOut = styled.div` 
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const Footer = styled.div` 
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.75em;
    font-style: italic;
`;

export const FooterText = styled.div` 
`;