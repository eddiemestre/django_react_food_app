import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    
    body {
        background-color: #121212;
        font-family: 'Open Sans', sans-serif;
        position: relative;
        
    }
`

export const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const InsideContainer = styled.div`
    color: white;
    box-sizing: border-box;
    padding-left: 25%;
    padding-right: 25%;
    height: 100%;
    display: grid;
    place-content: center;
    text-align: center;
`;
