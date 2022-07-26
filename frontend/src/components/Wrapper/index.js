import React from "react";
import { WrapperDiv } from "./Styles";

// potentially useful for animations
const AbsoluteWrapper = ( { children }) => {
    return (
        <WrapperDiv>
            {children}
        </WrapperDiv>
    );
}

export default AbsoluteWrapper;