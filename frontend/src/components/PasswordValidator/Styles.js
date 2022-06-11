import styled from "styled-components"


export const Info = styled.div`
    display: grid;
    place-content: center;
    position: relative;
    padding: 2% 0%;
    color: #bebebe;
    
`;

export const Item = styled.div`
    display: flex;
    font-size: 0.8em;
    font-weight: 400;
    font-style: italic;
    padding: 0.4em; 0%;
    gap: 0.5em;
    font-family: 'Open Sans', sans-serif;
    align-items: center;

    &.characters {
        color: ${(props) => props.is_valid ? "#03DAC6" : "bebebe"};
    }

    &.numbers {
        color: ${(props) => props.is_valid ? "#03DAC6" : "bebebe"};
    }

    &.symbols {
        color: ${(props) => props.is_valid ? "#03DAC6" : "bebebe"};
    }

    &.match {
        color: ${(props) => props.is_valid ? "#03DAC6" : "bebebe"};
    }
`;