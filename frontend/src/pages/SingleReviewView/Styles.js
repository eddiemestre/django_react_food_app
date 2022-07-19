import styled, { createGlobalStyle, css } from "styled-components";
import { animated } from '@react-spring/web';

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #121212;
        font-family: 'Open Sans', sans-serif;
        background-color: #121212;
        font-family: 'Open Sans', sans-serif;
        position: fixed;
        overflow: hidden;
        width: 100%;
    }
`;

export const OuterContainer = styled.div`
    margin-top: 50px;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 50px);
    ${'' /* background: pink; */}
    display: flex;
    align-items: center;
`;


export const Container = styled.div`
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

export const TitleContainer = styled.div` 
    height: 100%;
    width: 100%;
    ${'' /* background: orange; */}
    display: flex;
    align-items: center;
`;

export const Title = styled.div` 
    color: white;
    align-items: left;
    font-weight: 700;
    font-size: 1.5em;
    ${'' /* padding-top: 2%; */}
`;

export const ContentContainer = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 0.7em; 
    height: 100%;
    width: 100%;
    ${'' /* background: red; */}
`;

export const Name = styled.div` 
    color: white;
    align-items: left;
    font-size: 16px;
    font-weight: 700;
`;

export const Date = styled.div` 
    color: white;
    align-items: left;
    font-size: 16px;
    font-weight: 300;
`;

export const Content = styled.div` 
    ${'' /* padding-top: 5%; */}
    color: white;
    padding-bottom: 5%;
    white-space: pre-line;
`;

export const LastEdited = styled.div`
    color: #BEBEBE;
    font-style: italic;
    font-size: 12px;
`


export const ButtonContainer = styled(animated.div)` 
    position: fixed;
    z-index: 15;
    right: 2%;
    bottom: 5%;
    height: 100px;
    width: 100px;
`;

export const BackContainer = styled(animated.div)`
    position: fixed;
    z-index: 15;
    left: 2%;
    bottom: 5%;
    height: 100px;
    width: 100px;
`

export const ButtonPosition = styled.svg`
    position: fixed;
    z-index: 15;
    ${'' /* right: 0;
    bottom: 0; */}
    height: 100px;
    width: 100px;
    transform: scale(0.74);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
`;



export const Head = styled.div`
    display: flex;
    border-bottom: 1px solid white;
    align-items: center;
    justify-content: center;
    font-family: 'Open Sans', sans-serif;
    width: 100%;
`;

export const AddSpot = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: white;
    background: orange;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const Done = styled.div`
    right: 2%;
    padding: 2% 3%;
    display: flex;
    font-size: 16px;
    position: absolute;
    color: #03DAC6;
    font-weight: 700;
    font-family: 'Open Sans', sans-serif;
    border: none;
    border-radius: 5px;
    
    :hover {
        background: #363636;
    }
`;



