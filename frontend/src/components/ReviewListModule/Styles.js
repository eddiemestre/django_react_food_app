import styled from "styled-components"

export const ReviewModule = styled.div`
    color: white;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212;
    border: none;
    border-radius: 5px;
    padding: 0.3em 0;
`;

export const ReviewTitle = styled.div`
    color: white;
    font-weight: 700;
    padding: 0.2em 0.6em;
    font-size: 0.9em;
`;

export const ReviewDate = styled.div`
    color: white;
    font-weight: 400;
    padding: 0.2em 0.6em;
    font-size: 0.9em;
`;

export const ReviewPreview = styled.div`
    color: white;
    font-weight: 400;
    padding: 0.2em 0.6em;
    font-size: 0.9em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
   -webkit-line-clamp: 3; /* number of lines to show */
           line-clamp: 3; 
   -webkit-box-orient: vertical;
`;