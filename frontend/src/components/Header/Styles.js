import styled from "styled-components"

export const HeadContainer = styled.div`
    display: flex;
    height: 10%;
    width: 100%;
    position: absolute;
    color: white;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    z-index: 5000;
    top: 0;
    ${'' /* background: pink; */}
    padding-left: 5%;
    padding-right: 5%;

    :before {
        ${'' /* content : "";
        position: absolute;
        left: 5%;
        bottom: -1px;
        height: 1px;
        width: 90%;
        border-bottom:1px solid white; */}
    }
`;

export const AppHead = styled.div`
    color: white;
    font-size: 1.5em;
    font-weight: 700;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;