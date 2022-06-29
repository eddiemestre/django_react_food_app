import styled, { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
    
    body {
        background-color: #121212;
        font-family: 'Open Sans', sans-serif;
        position: relative;
        
    }
`

export const GridContainer = styled.div`
    ${'' /* display: flex;
    flex-direction: column;
    justify-content: center; */}
    ${'' /* background: orange; */}
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

export const NoticeContainer = styled.div` 
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    left: 10%;
    margin-top: -110%;
    background: #03DAC6;
    color: black;
    z-index: 6000;
    border: none;
    border-radius: 5px;
    font-size: 16px;
`

export const NoticeText = styled.div` 
`;