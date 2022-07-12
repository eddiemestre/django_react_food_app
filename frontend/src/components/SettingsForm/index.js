import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {Container, 
        InputTitle, 
        InputText, 
        Error, 
        FieldDetailText, 
        ChoicesContainer, 
        Save, 
        Exit, 
        PasswordText, 
        SvgArrow, 
        PasswordContainer,
        SaveButton } from "./Styles";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const SettingsForm = (props) => {
    const [errorMessages, setErrorMessages] = useState({});
    const [name, setName] = useState(JSON.parse(localStorage.getItem('name')));
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('username')));
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('email')));
    const [orName, setOrName] = useState(JSON.parse(localStorage.getItem('name')));
    const [orUsername, setOrUsername] = useState(JSON.parse(localStorage.getItem('username')));
    const [orEmail, setOrEmail] = useState(JSON.parse(localStorage.getItem('email')));
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const errors = {
        uname: "Invalid username. Should contain only letters and numbers and be 4 - 23 characters long.",
        unameTaken: "Username already taken. Please pick another.",
        name: "Invalid name.",
        email: "Invalid email.",
        emailTaken: "An account with this email already exists. Please use another.",
        server: "No server response.",
        other: "Failed to update user settings. Please try again.",
      };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submit settings change")

        const userCheck = USER_REGEX.test(username);
        const emailCheck = EMAIL_REGEX.test(email);

        var data = {}

        if (orEmail !== email) {
            data['email'] = email
        } 
        if (orName !== name) {
            data['name'] = name
        }
        if (orUsername !== username) {
            data['username'] = username
        }

        try {
            const response = await axiosPrivate.patch(`auth/update_profile/${JSON.parse(localStorage.getItem('user_id'))}/`,
              JSON.stringify(data),
              {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
              }
            );
  
            // set localStorage variables
            localStorage.setItem('email', JSON.stringify(email));
            localStorage.setItem('username', JSON.stringify(username));
            localStorage.setItem('name', JSON.stringify(name));

            // set notice prop
            props.setUpdatedSettings(true)

        } catch (err) {
            if (!err?.response) {
              setErrorMessages({name: "server", message: errors.server});
            } else if (err.response?.status === 400) {
              
              // username must be unique backend check
              if (err.response.data['username']) {
                const usernameError = err.response.data['username'];
                const errorCheck = usernameError.at(0);
                if (errorCheck === "This field must be unique.") { 
                    setErrorMessages({name: "unameTaken", message: errors.unameTaken}); 
                }
              } 
              // 
              else if (err.response.data['email']) {
                const emailError = err.response.data['email'];
                const errorCheck = emailError.at(0);
                if (errorCheck === "This field must be unique.") { setErrorMessages({name: "emailTaken", message: errors.emailTaken}); }
              }
            } else {
              setErrorMessages({name: "other", message: errors.other})
            }
        }

    }

    const OnNameChange = (event) => {
        setName(event.target.value)
    }

    const OnUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const OnEmailChange = (event) => {
        setEmail(event.target.value)
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

    return (
        <Container>
        <form onSubmit={handleSubmit}>
            
                <InputTitle>Full Name</InputTitle>
                <InputText placeholder="name i.e. &quot;John&quot;..." value={name} type="text" name="name" onChange={(e) => OnNameChange(e)} />
                {renderErrorMessage("name")}
                <InputTitle>Username</InputTitle>
                <InputText placeholder="username i.e. &quot;johnsmith89&quot;..." value={username} type="text" name="uname" onChange={(e) => OnUsernameChange(e)} />
                {renderErrorMessage("uname")}
                {renderErrorMessage("unameTaken")}
                <InputTitle>Email</InputTitle>
                <InputText placeholder="email..." value={email} type="text" name="email" onChange={(e) => OnEmailChange(e)} />
                {renderErrorMessage("email")}
                {renderErrorMessage("emailTaken")}    
                <InputTitle>Password</InputTitle>
                <PasswordContainer onClick={() => navigate(`/update-password/`)}>
                    <PasswordText value="change password" type="text" readOnly />
                    {RightArrow}
                </PasswordContainer>
                
                <FieldDetailText>Password saved separately</FieldDetailText>
                <br />
                <ChoicesContainer>
                    <Save><SaveButton>Save</SaveButton></Save>
                    <Exit onClick={() => navigate(`/user/${JSON.parse(localStorage.getItem('username'))}/`)}>Exit</Exit>
                </ChoicesContainer>
        </form>
        </Container>
    )
}

export default SettingsForm;