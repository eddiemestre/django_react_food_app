import React from "react";
import { WrapperDiv } from "./Styles";

const AbsoluteWrapper = ( { children }) => {
    return (
        <WrapperDiv>
            {children}
        </WrapperDiv>
    );
}

export default AbsoluteWrapper;