import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #121212;
        font-family: 'Open Sans', sans-serif;
        position: fixed;
        overflow: hidden;
        width: 100%;
    }
`;

export const Container = styled.div`
    margin-top: 50px;
    box-sizing: border-box;
    width: 100%;
    min-height: calc(100% - 50px);
    overflow: scroll;
    ${'' /* background: pink; */}
    display: flex;
    align-items: center;
`;

export const Content = styled.div` 
    color: white;
    width: 100%;
    height: 30%;
    box-sizing: border-box;
    display: grid;
    grid-auto-rows: 1fr 1fr;
    grid-auto-columns: 1fr;
    font-weight: 700;
    ${'' /* background: green; */}
`;

export const Numbers = styled.div` 
    ${'' /* background: orange; */}
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 40px;
    padding-top: 5%;
`;

export const Text = styled.div` 
    ${'' /* background: pink; */}
    color: #BEBEBE;
    font-weight: 400;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 5%;
    font-style: italic;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 16px;
`;