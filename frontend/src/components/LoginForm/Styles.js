import styled from "styled-components"

export const App = styled.div`
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

export const LogForm = styled.div`
  width: 80%;
`;

export const Title = styled.div`
  font-size: 1.2em;
  margin-bottom: 0.2em;
  color: white;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5em;
`;

export const NoAccount = styled.div`
    margin-bottom: 10%;
    font-size: 0.8em;
    font-style: italic;
    font-weight: 400;
    color: white;
    a {
        color: white;
    }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1% 0%;
`

export const InputText = styled.input`
    height: 2.5em;
    border: none;
    border-radius: 5px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    color: white;
    text-indent: 1em;
    font-size: 16px;
    ::placeholder {
        color: #bebebe;
        font-style: italic;
    }
`;

export const SubmitButton = styled.button`
    background: #03DAC6;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 700;
    color: black;
    padding: 3%;
    width: 40%;
    &:hover {
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #03DAC6;
    }
`;

export const Error = styled.div`
  color: #B00020;
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
`

export const CredentialConfirmation = styled.div`
    height: 5em;
    font-family: 'Open Sans', sans-serif;
    padding: 20px;
    border: none;
    border: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    color: white;
    font-size: 1.2em;

`;