import styled from "styled-components";

export const Container = styled.div` 
    box-sizing: border-box;
    ${'' /* background: orange; */}
    width: 100%;
    height: 105%;
    display: flex;
    margin-top: 5%;
    flex-direction: column;
    justify-content: center;
    ${'' /* padding-left: 5%;
    padding-right: 5%; */}
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

export const PasswordText = styled.input`
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
    :hover {
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), #121212;
    }
`;


export const Error = styled.div`
  color: #B00020;
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
`

export const FieldDetailText = styled.div`
    ${'' /* margin-top: -0.5em; */}
    width: 100%;
    color: white;
    font-style: italic;
    font-weight: 400;
    font-size: 12px;
`;

export const ChoicesContainer = styled.div` 
    height: 100px;
    width: 100%;
    ${'' /* background: orange; */}
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Save = styled.div` 
    width: 50%;
    height: 50%;
    ${'' /* background: pink; */}
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    color: #03DAC6;
    font-weight: 700;
    font-size: 16px;

    :hover {
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
    }
`;

export const ChangeButton = styled.button` 
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`;

export const Exit = styled.div` 
    width: 50%;
    height: 50%;
    ${'' /* background: red; */}
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: 700;
    font-size: 16px;

    :hover {
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
    }
`;

export const PasswordContainer = styled.div` 
    position: relative;
`

export const SvgArrow = styled.svg`
    position: absolute;
    z-index: 15;
    right: 0;
    ${'' /* background: blue; */}
    ${'' /* right: 2%;
    bottom: 5%; */}
    height: 100%;
    width: 10%;
    transform: scale(.75);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
`;