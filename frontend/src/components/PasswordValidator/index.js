import React from "react";
import { Info, Item } from './Styles.js';

const PasswordValidator = (props) => {

    return(
        <Info>
            <Item className="characters" is_valid={props.pass_length_valid}>
                <i className="ri-checkbox-circle-fill"></i>
                Has at least 8 characters.
            </Item>
            <Item className="numbers"  is_valid={props.pass_num_valid}>
                <i className="ri-checkbox-circle-fill"></i>
                Contains at least one number.
            </Item>
            <Item className="symbols" is_valid={props.pass_sym_valid}>
                <i className="ri-checkbox-circle-fill"></i>
                Contains at least one symbol.
            </Item>
            <Item className="match" is_valid={props.pass_same}>
                <i className="ri-checkbox-circle-fill"></i>
                Passwords must match.
            </Item>
        </Info>
    );
}

export default PasswordValidator;