import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {Container, InputTitle, InputText, Error, FieldDetailText, ChoicesContainer, Save, Exit, PasswordText, SvgArrow, ChangeButton, PasswordContainer} from "./Styles";
import PasswordValidator from '../PasswordValidator';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;


const PasswordUpdate = (props) => {
    const [oldPass, setOldPass] = useState('');
    const [passNew, setPassNew] = useState('');
    const [passNewConfirm, setPassNewConfirm] = useState('');
    const [errorMessages, setErrorMessages] = useState({});
    const [isEightChar, setIsEightChar] = useState(false);
    const [hasNum, setHasNum] = useState(false);
    const [hasSym, setHasSym] = useState(false);
    const [isPassSame, setIsPassSame] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const errors = {
        incorrectOld: "Please enter correct password.",
        pass: "Invalid password.",
        pass2: "Passwords do not match.",
        server: "No server response.",
        other: "Failed to update password. Please try again.",
      };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submit password change")
        const passCheck = PASSWORD_REGEX.test(passNew);

        try {
            const response = await axiosPrivate.put(`/auth/change_password/${JSON.parse(localStorage.getItem('user_id'))}/`,
              JSON.stringify({old_password: oldPass, password: passNew, password2: passNewConfirm}),
              {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
              }
            );
  
            // clear input fields, set state back to empty strings
            setOldPass('');
            setPassNew('');
            setPassNewConfirm('');

            props.setUpdatedPassword(true)
            navigate('/settings')
  
        } catch (err) {
            if (!err?.response) {
              setErrorMessages({name: "server", message: errors.server});
            } else if (err.response?.status === 400) {
              if (err.response.data['old_password']) {
                console.log(err.response.data)
                const PasswordError = err.response.data['old_password'];
                //const errorCheck = PasswordError.at(0);
                console.log(errors.incorrectOld)
                setErrorMessages({name: "incorrectOld", message: errors.incorrectOld});
                console.log(errorMessages)
              }
            } else {
              setErrorMessages({name: "other", message: errors.other})
            }
        }
    }

    const onChangeNew = (event) => {
        setPassNew(event.target.value);
    }

    const onChangeNewConfirm = (event) => {
        setPassNewConfirm(event.target.value);
    }

    const onChangeOld = (event) => {
        setOldPass(event.target.value);
    }
    

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <Error>{errorMessages.message}</Error>
        );

    const RightArrow = (
        <SvgArrow
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="none"
            viewBox="0 0 30 30"
        >
            <path
                fill="#fff"
                d="M10.737 20.738L16.462 15l-5.725-5.738L12.5 7.5 20 15l-7.5 7.5-1.763-1.762z"
            ></path>
        </SvgArrow>
    )

    const ChangePassword = () => {

    }

    // check for valid password
    useEffect(() => {
        // characters
        if (passNew.length >= 8) {
            setIsEightChar(true);
        } else {
            setIsEightChar(false);
        }

        // numbers
        if (/[0-9]/.test(passNew)) {
            setHasNum(true);
        } else {
            setHasNum(false);
        }

        // symbols
        if (/(?=.*[!@#$%^&*])/.test(passNew)) {
            setHasSym(true);
        } else {
            setHasSym(false);
        }

        // match
        if (passNew === passNewConfirm && passNew && passNewConfirm) {
            setIsPassSame(true);
        } else {
            setIsPassSame(false);
        }

        if (isEightChar && hasNum && hasSym && isPassSame) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }


    }, [passNew, passNewConfirm, isEightChar, hasNum, hasSym, isPassSame]);

    return (
        <Container>
        <form onSubmit={handleSubmit}>
                <InputTitle>Current Password</InputTitle>
                <InputText placeholder="enter current password..." type="password" name="pass" autoComplete="new-password" value={oldPass} onChange={onChangeOld} required />
                {renderErrorMessage("incorrectOld")}  
                <InputTitle>New Pasword</InputTitle>   
                <InputText placeholder="new password..." type="password" name="pass" autoComplete="new-password" value={passNew} onChange={onChangeNew} required />
                {/* {renderErrorMessage("pass")} */}
                <InputTitle>Confirm New Pasword</InputTitle> 
                <InputText placeholder="confirm password..." type="password" name="pass2" autoComplete="new-password" value={passNewConfirm} onChange={onChangeNewConfirm} required />
                {/* {renderErrorMessage("pass2")} */}
                {renderErrorMessage("server")}
                {renderErrorMessage("other")}
                <PasswordValidator pass_length_valid={isEightChar} pass_num_valid={hasNum} pass_sym_valid={hasSym} pass_same={isPassSame}></PasswordValidator>
                <br />
                <ChoicesContainer>
                    <Save><ChangeButton>Change Password</ChangeButton></Save>
                    <Exit onClick={() => navigate(`/settings/`)}>Cancel</Exit>
                </ChoicesContainer>
        </form>
        </Container>
    )
}

export default PasswordUpdate;