import styled from "styled-components";
import { animated } from '@react-spring/web';
import DatePicker from 'react-datepicker';

export const DetailsContainer = styled(animated.div)`
    ${'' /* background: blue;
    border: none;
    border-radius: 5px 5px 0 0;
    margin: 0 -5%;
     */}
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    display: flex;
    flex-direction: row;
    position: relative;
    ${'' /* top: 6%; */}
    width: 90%;
    padding: 0% 5%;
    flex-wrap: wrap;
    border: none;
    border-radius: 10px 10px 0px 0px;
    font-family: 'Open Sans', sans-serif;
    z-index: 10;
    overflow: auto;
    align-items: center;

`;

// should this be flex but the outer be grid so it scrolls?
export const Head = styled.div`
    display: flex;
    flex: 1 0 100%;
    height: 40px;
    ${'' /* background: purple; */}
    border-bottom: 1px solid white;
    align-items: center;
    justify-content: center;
    font-family: 'Open Sans', sans-serif;
`;

export const AddSpot = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: white;
    font-family: 'Open Sans', sans-serif;

    ${'' /* background: blue; */}
`

export const Save = styled.div`
    height: auto;
    right: 0px;
    padding-right: 5%;
    font-size: 16px;
    position: absolute;
    color: #03DAC6;
    font-weight: 700;
    font-family: 'Open Sans', sans-serif;
`;

export const InputTitle = styled.div`
    color: white;
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    padding-top: 2%;
    ${'' /* background: orange; */}
    font-family: 'Open Sans', sans-serif;
`;

export const InputText = styled.input`
    padding-top: 1%;
    height: 2em;
    width: 100%;
    border: none;
    border-radius: 5px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
    color: white;
    ${'' /* text-indent: 0.2em; */}
    padding-left: 0.5em;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    outline: none;
    ::placeholder {
        color: #bebebe;
        font-style: italic;
    }
`;

export const DateText = styled.input`
    padding-top: 1%;
    height: 2em;
    width: 100%;
    border: none;
    border-radius: 5px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
    color: white;
    outline: none;
    font-family: 'Open Sans', sans-serif;
    ${'' /* text-indent: 0.2em; */}
    padding-left: 0.5em;
    font-size: 16px;
    text-align: left;
    ::placeholder {
        color: #bebebe;
        font-style: italic;
    }
`;

export const LargeInputText = styled.textarea`
    padding-top: 2%;
    height: 18em;
    width: 100%;
    border: none;
    border-radius: 5px;
    outline: none;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
    color: white;
    font-family: 'Open Sans', sans-serif;
    ${'' /* text-indent: 0.2em; */}
    padding-left: 0.75em;
    padding-right: 0.75em;
    font-size: 16px;
    ::placeholder {
        color: #bebebe;
        font-style: italic;
    }
`;

export const FieldDetailText = styled.div`
    width: 100%;
    color: white;
    font-style: italic;
    font-weight: 400;
    font-size: 12px;
`;

export const DatePick = styled(DatePicker)`
    border: none;
    border-radius: 5px;
    padding-top: 1%;
    height: 2.5em;
    box-sizing: border-box;
    width: 100%;
    font-family: 'Open Sans', sans-serif;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
    color: white;
    padding-left: 0.5em;
    font-size: 16px;
    outline: none;
    text-align: left;
    ::placeholder {
        color: #bebebe;
        font-style: italic;
    }

`