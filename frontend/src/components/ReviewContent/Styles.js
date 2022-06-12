import styled from "styled-components"



export const Container = styled.div`
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    display: grid;
    height: 100vh;
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
`;

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

export const Done = styled.div`
    right: 4%;
    padding: 1% 1%;
    
    display: flex;
    font-size: 16px;
    position: absolute;
    color: #03DAC6;
    font-weight: 700;
    font-family: 'Open Sans', sans-serif;
    border: none;
    border-radius: 5px;
    
    :hover {
        background: #363636;
    }
`;

export const Content = styled.textarea`
    padding-top: 1%;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.5em;
    border: none;
    border-radius: 5px;
    outline: none;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    padding-bottom: 50%;
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

// export const Title = styled.input` 
//     padding-top: 1%;
//     height: 2.5em;
//     width: 100%;
//     border: none;
//     box-sizing: border-box;
//     border-radius: 5px;
//     background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), #121212;
//     color: white;
//     padding-left: 0.5em;
//     font-size: 16px;
//     font-family: 'Open Sans', sans-serif;
//     outline: none;
//     ::placeholder {
//         color: #bebebe;
//         font-style: italic;
//     }
// `;

export const InsideContainer = styled.div`
    ${'' /* background: pink; */}
    padding-top: 2%;
    overflow: scroll;
    padding-bottom: 30%;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    ::-webkit-scrollbar {
        display: none;
    }
`;