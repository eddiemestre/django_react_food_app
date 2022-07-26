import styled from "styled-components";
import { animated } from '@react-spring/web';
import DatePicker from 'react-datepicker';

export const DetailsContainer = styled(animated.div)`
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    border-radius: 10px 10px 0px 0px;
    font-family: 'Open Sans', sans-serif;
    z-index: 10;
    height: 100%;
`;

export const GridContainer = styled.div` 
    display: grid;
    grid-template-rows: 7% auto;
    font-family: 'Open Sans', sans-serif;
    padding-left: 5%;
    padding-right: 5%;
    box-size: border-box;
    height: 100%;
    position: fixed;
    width: 90%;
`;


// should this be flex but the outer be grid so it scrolls?
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
`

export const Save = styled.button`
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
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;

    :hover {
        background: #363636;
    }
`;

export const InsideContainer = styled.div`
    overflow: scroll;
    position: relative;
    width: 100%;
    ${'' /* padding-bottom: 20%; */}
    ${'' /* height: 100%; */}
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    ::-webkit-scrollbar {
        display: none;
    }
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
    height: 2.5em;
    width: 100%;
    border: none;
    box-sizing: border-box;
    border-radius: 5px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
    color: white;
    padding-left: 0.5em;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    outline: none;
    ::placeholder {
        color: #bebebe;
        font-style: italic;
    }
`;

export const DatePick = styled(DatePicker)`
    border: none;
    border-radius: 5px;
    padding-top: 1%;
    height: 2.5em;
    width: 100%;
    font-family: 'Open Sans', sans-serif;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
    color: white;
    box-sizing: border-box;
    padding-left: 0.5em;
    font-size: 16px;
    outline: none;
    text-align: left;
    ::placeholder {
        color: #bebebe;
        font-style: italic;
    }
`;

export const LargeInputText = styled.textarea`
    padding-top: 1%;
    height: 18em;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.5em;
    padding-bottom: 10%;
    border: none;
    border-radius: 5px;
    outline: none;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    ::placeholder {
        color: #bebebe;
        font-style: italic;
    } 
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const SwitchContainer = styled.div` 
    position: relative;
    display: block;
    width: 100%;
    height: min-content;
`;

export const VisibilityToggle = styled.div` 
    width: 100%;
    color: white;
    font-style: italic;
    font-weight: 400;
    font-size: 12px;
`;

export const ContentContainer = styled(animated.div)`
    width: 100%;
    height: 100%;
    bottom: 0;
    position: absolute;
    border: none;
    border-radius: 10px 10px 0px 0px;
    font-family: 'Open Sans', sans-serif;
    z-index: 6000;
`;