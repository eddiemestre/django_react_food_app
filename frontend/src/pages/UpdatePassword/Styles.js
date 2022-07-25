import styled, { createGlobalStyle } from "styled-components";
import { animated } from '@react-spring/web';

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #121212;
        font-family: 'Open Sans', sans-serif;
        position: fixed;
        overflow: hidden;
        width: 100%;
        ${'' /* position: ${props => props.modal_opened || props.menu_opened ? "fixed" : ""};
        overflow: ${props => props.modal_opened || props.menu_opened ? "hidden" : "scroll"};
        top: ${props => props.modal_opened || props.menu_opened ? `-${window.scrollY}px` : ""}; */}
        ${'' /* height: 100%;
        width: 100%; */}
        ${'' /* margin-top: 12%; */}
    
    }
`

export const OuterContainer = styled.div`
    ${'' /* grid-template-rows: 6% 94%; */}
    ${'' /* height: 100%; */}
    ${'' /* position: fixed; */}
    ${'' /* padding: 0% 5%; */}
    margin-top: 50px;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 50px);
    ${'' /* background: pink; */}
    display: flex;
    align-items: center;
`;

export const SettingsContainer = styled.div`
    ${'' /* border-top: 1px solid white; */}
    ${'' /* display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 0.7em; */}
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
