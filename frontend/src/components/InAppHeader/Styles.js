import styled from "styled-components"

export const HeadContainer = styled.div`
    display: flex;
    color: white;
    align-items: center;
    justify-content: space-between;
`;

export const AppName = styled.div`
    color: white;
    font-weight: 700;
    font-size: 1em;
`;

export const Icon = styled.div`
    transform: scale(1.8);
    transform-origin: center;
    padding-right: 1%;
    padding-top: 1%;

`;

export const SvgContainer = styled.svg`
    height: min-content;
    transform: scale(1.3);
    box-sizing: border-box;
`;