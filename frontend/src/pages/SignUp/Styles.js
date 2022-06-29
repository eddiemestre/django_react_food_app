import styled, { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
    
    body {
        background-color: #121212;
        font-family: 'Open Sans', sans-serif;
        position: relative;
    }
`

export const GridContainer = styled.div`
    height: 100%;
    background: gray;
    position: relative;
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