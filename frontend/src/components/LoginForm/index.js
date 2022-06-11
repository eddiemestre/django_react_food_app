import React, {useState} from "react";
import { Navigate } from 'react-router-dom';
import { App, LogForm, Title, InputContainer, Error, ButtonContainer, InputText, SubmitButton, NoAccount, CredentialConfirmation } from './Styles.js';



const LoginForm = () => {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    // User Login info
    const database = [
      {
        username: "User1",
        password: "hello!23"
      },
      {
        username: "User2",
        password: "hello!23"
      }
    ];
  
    const errors = {
      uname: "invalid username",
      pass: "invalid password"
    };
  
    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();
  
      var { uname, pass } = document.forms[0];
  
      // Find user login info
      const userData = database.find((user) => user.username === uname.value);
  
      // Compare user info
      if (userData) {
        if (userData.password !== pass.value) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          setIsSubmitted(true);
        }
      } else {
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    };
  
    // Generate JSX code for error message
    const renderErrorMessage = (name) => {
      if (name === errorMessages.name) {
        return(<Error>{errorMessages.message}</Error>);
      }
    }

    const sendToHome = (
        <Navigate push to="/home"/>
    )
  
    // JSX code for login form
    const renderForm = (
      <div>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            {/* <label>Username</label> */}
            <InputText placeholder="username..." type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </InputContainer>
          <InputContainer>
            {/* <label>Password </label> */}
            <InputText placeholder="password..." type="password" name="pass" required />
            {renderErrorMessage("pass")}
          </InputContainer>
          <NoAccount>Don't have an account? Sign up <a href='/register'>here.</a></NoAccount>
          <ButtonContainer>
            <SubmitButton>Sign In</SubmitButton>
          </ButtonContainer>
        </form>
      </div>
    );
  
    return (
      <App>
        <LogForm>
          <Title>Log In</Title>
          {isSubmitted ? sendToHome : renderForm}
        </LogForm>
      </App>
    );
  }
  

export default LoginForm;