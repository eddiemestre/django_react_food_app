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
    ${'' /* height: 100%; */}
    ${'' /* overflow: auto; */}
    ${'' /* top: 6%; */}
    ${'' /* background: blue;
    display: grid;

    grid-template-rows: 6% 100px;
    border: none; */}
    border-radius: 10px 10px 0px 0px;
    font-family: 'Open Sans', sans-serif;
    z-index: 10;
    ${'' /* box-size: border-box; */}
    height: 100vh;
    ${'' /* position: fixed; */}
`;

export const GridContainer = styled.div` 
    ${'' /* background: blue; */}
    display: grid;
    ${'' /* height: 100%; */}
    ${'' /* overflow: auto; */}
    ${'' /* top: 6%; */}
    grid-template-rows: 6% auto;
    border: none;
    border-radius: 10px 10px 0px 0px;
    font-family: 'Open Sans', sans-serif;
    z-index: 10;
    padding-left: 5%;
    padding-right: 5%;
    box-size: border-box;
    height: 100vh;
    position: fixed;
    width: 90%;
`


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

export const SaveContent = styled.div`
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

// export const DateText = styled.input`
//     padding-top: 1%;
//     height: 2em;
//     width: 100%;
//     border: none;
//     border-radius: 5px;
//     background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
//     color: white;
//     outline: none;
//     font-family: 'Open Sans', sans-serif;
//     ${'' /* text-indent: 0.2em; */}
//     ${'' /* padding-left: 0.5em;
//     font-size: 16px;
//     text-align: left;
//     ::placeholder {
//         color: #bebebe;
//         font-style: italic;
//     } */}
// `;

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

export const FieldDetailText = styled.div`
    margin-top: -0.5em;
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

`

export const InsideContainer = styled.div`
    overflow: scroll;
    position: relative;
    width: 100%;
    padding-bottom: 20%;
    ${'' /* height: 100%; */}
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    ::-webkit-scrollbar {
        display: none;
    }
    ${'' /* height: 1300%; */}
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
    ${'' /* display: grid; */}
    width: 100%;
    height: 100%;
    bottom: 0;
    position: absolute;
    ${'' /* margin-left: -5%;
    margin-right: -5%; */}
    ${'' /* overflow: auto; */}
    ${'' /* top: 6%; */}
     ${'' /* grid-template-rows: 6% auto; */}
    border: none;
    border-radius: 10px 10px 0px 0px;
    font-family: 'Open Sans', sans-serif;
    z-index: 6000;
`;

export const FadeText = styled.div` 
    background: white;
    height: 10%;
    width: 100%;
    z-index: 10000;
    top: 0;
`

export const DeleteReview = styled.div` 
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    color: #B00020;
    font-size: 12px;
    font-weight: 700;
    width: max-content;
    ${'' /* height: 5%; */}
    text-align: left;
    ${'' /* margin-left: -3%; */}
    ${'' /* position: absolute;
    top: 85%; */}
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    border: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */

    :hover {
        color: #C56679;
    }
`