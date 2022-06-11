import React, {useState, useEffect} from "react";
import { App, LogForm, Title, InputContainer, Error, ButtonContainer, InputText, SubmitButton, CredentialConfirmation } from '../LoginForm/Styles.js';

import PasswordValidator from "../PasswordValidator/index.js";

const SignUpForm = () => {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isShown, setShown] = useState(false);
    const [pass_one, setPassOne] = useState('');
    const [pass_two, setPassTwo] = useState('');
    const [isEightChar, setIsEightChar] = useState(false);
    const [hasNum, setHasNum] = useState(false);
    const [hasSym, setHasSym] = useState(false);
    const [isPassSame, setIsPassSame] = useState(false);

    // User Login info
    const database = [
      {
        username: "User1",
        name: "User",
        email: "User@email.com",
        password: "hello!23",
      },
      {
        username: "User2",
        name: "User",
        email: "User2@email.com",
        password: "hello!23"
      }
    ];
  
    const errors = {
      uname: "invalid username",
      name: "invalid name",
      email: "invalid email",
      pass: "invalid password",
      pass2: "passwords do not match"
    };
  
    

    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();
    
      var { name, uname, email, pass, pass2 } = document.forms[0];

      // Find user login info
      const userData = database.find((user) => user.username === uname.value);
  
      // Compare user info
      if (userData) {
        if (userData.name !== name.value) {
            setErrorMessages({ name: "name", message: errors.name })
        }
        if (userData.email !== email.value) {
            setErrorMessages({ email: "email", message: errors.email })
        }
        if (userData.password !== pass.value) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
        }
        if (userData.password !== pass2.value) {
            // Invalid password
            setErrorMessages({ name: "pass2", message: errors.pass2 });
          } else {
            setIsSubmitted(true);
          }
      } else {
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    };

    const redirect = () => {
        setTimeout(() => {
            window.location.href = '/login';
        }, 2500);

        return(
            <CredentialConfirmation>Thanks for registering! Redirecting to login...</CredentialConfirmation>
        );
    };
  
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <Error>{errorMessages.message}</Error>
      );

    // for password show/hide
    const showHide = () => {
        const input = document.querySelector('password')
        showHide.addEventListener('click', ()=> {
            if (!isShown) {
                if (input.type === 'password') {
                    input.type = 'text';
                    isShown = true;
                }
            } else {
                input.type = 'password';
                isShown = false;
            }
        })
    }

    const onChangeOne = (event) => {
        setPassOne(event.target.value);
    }

    const onChangeTwo = (event) => {
        setPassTwo(event.target.value);
    }

    useEffect(() => {
        // characters
        if (pass_one.length >= 8) {
            setIsEightChar(true);
        } else {
            setIsEightChar(false);
        }

        // numbers
        if (/[0-9]/.test(pass_one)) {
            setHasNum(true);
        } else {
            setHasNum(false);
        }

        // symbols
        if (/[^A-Za-z0-9]/.test(pass_one)) {
            setHasSym(true);
        } else {
            setHasSym(false);
        }

        // match
        if (pass_one === pass_two && pass_one !== '' && pass_two !== '') {
            setIsPassSame(true);
        } else {
            setIsPassSame(false);
        }

    }, [pass_one, pass_two]);

  
    // JSX code for login form
    const renderForm = (
      <div>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <InputText placeholder="name i.e. &quot;John Smith&quot;..." type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="username i.e. &quot;johnsmith89&quot;..." type="text" name="name" required />
            {renderErrorMessage("name")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="email..." type="text" name="email" required />
            {renderErrorMessage("email")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="password..." type="password" name="pass" value={pass_one} onChange={onChangeOne} required />
            {renderErrorMessage("pass")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="confirm password..." type="password" name="pass2" value={pass_two} onChange={onChangeTwo} required />
            {renderErrorMessage("pass2")}
          </InputContainer>
          <PasswordValidator pass_length_valid={isEightChar} pass_num_valid={hasNum} pass_sym_valid={hasSym} pass_same={isPassSame}></PasswordValidator>
          <ButtonContainer>
            <SubmitButton>Sign Up</SubmitButton>
          </ButtonContainer>
        </form>
      </div>
    );
  
    return (
      <App>
        <LogForm>
          <Title>Sign Up</Title>
          {isSubmitted ? redirect() : renderForm}
        </LogForm>
      </App>
    );
  };
  

export default SignUpForm;