import styled, { createGlobalStyle } from "styled-components";
import { animated } from '@react-spring/web';

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
    justify-content: center;
    background: orange; */}
    height: 100%;
    ${'' /* background: orange; */}
    display: flex;
    justify-content: center;
    ${'' /* margin-top: 20%; */}
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


export const LogContainer = styled(animated.div)` 
`;