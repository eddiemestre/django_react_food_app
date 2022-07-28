import React, { useState, useEffect, useContext } from "react";
import axios from '../../api/axios';
import { App, LogForm, Title, InputContainer, Error, ButtonContainer, InputText, SubmitButton } from '../LoginForm/Styles.js';
import { useNavigate } from "react-router-dom";
import PasswordValidator from "../PasswordValidator/index.js";
import RegistrationContext from "../../context/RegistrationContext.js";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;
const REGISTER_URL = '/auth/register/';


const SignUpForm = () => {
    // hooks
    const navigate = useNavigate();
    const { setJustSignedUp } = useContext(RegistrationContext);

    const [errorMessages, setErrorMessages] = useState({});

    const [pass_one, setPassOne] = useState('');
    const [pass_two, setPassTwo] = useState('');

    const [isEightChar, setIsEightChar] = useState(false);
    const [hasNum, setHasNum] = useState(false);
    const [hasSym, setHasSym] = useState(false);
    const [isPassSame, setIsPassSame] = useState(false);

    const [username, setUsername] = useState('');

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const delay = ms => new Promise(res => setTimeout(res, ms));

//     // TO DO: add accessibility features for screen readers
    const errors = {
      uname: "Invalid username. Should contain only letters and numbers and be 4 - 23 characters long.",
      unameTaken: "Username already taken. Please pick another.",
      name: "Invalid name. Name must be less than 50 characters.",
      email: "Invalid email. Please try again.",
      emailTaken: "An account with this email already exists. Please use another.",
      pass: "Invalid password.",
      pass2: "Passwords do not match.",
      server: "No server response.",
      other: "Registration Failed. Please try again.",
    };
  
    const errorExpiration = async () => {
      await delay(5000);
      setErrorMessages({})
    };

    useEffect(() => {
      // console.log("in errorMessages use effect")
      if (Object.keys(errorMessages).length > 0) {
          // console.log("has error messages")
          errorExpiration()
      }
    }, [errorMessages])
    

    const handleSubmit = async (event) => {
      //Prevent page reload
      event.preventDefault();
      
      // recheck validation
      const userCheck = USER_REGEX.test(username);
      const passCheck = PASSWORD_REGEX.test(pass_one);
      const emailCheck = EMAIL_REGEX.test(email)

      // catch common registration errors before pinging backend
      if (!userCheck) {
        setErrorMessages({name: "uname", message: errors.uname});
        return;
      } else if (!emailCheck) {
        setErrorMessages({name: "email", message: errors.email})
        return
      } else if (!passCheck) {
        return // errors below handle this
      }

      try {
          await axios.post(REGISTER_URL,
            JSON.stringify({email, username, name, password1: pass_one, password2: pass_two}),
            {
              headers: {'Content-Type': 'application/json'},
              withCredentials: true
            }
          );

          // // console.log(JSON.stringify(response?.data));

          // clear input fields, set state back to empty strings
          setName('');
          setUsername('');
          setEmail('');
          setPassOne('');
          setPassTwo('');
          setJustSignedUp(true)
          navigate('/login')

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
              if (errorCheck === "This field must be unique.") { 
                setErrorMessages({name: "emailTaken", message: errors.emailTaken}); 
              }
            }
            else if (err.response.data['name']) {
              const nameError = err.response.data['name'];
              const errorCheck = nameError.at(0);
              // console.log(errorCheck)
              if (errorCheck) { 
                  setErrorMessages({name: "name", message: errors.name}); 
              }
            }
          } else {
            setErrorMessages({name: "other", message: errors.other})
          }
      }
      
    };

//     // Generate JSX code for error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <Error>{errorMessages.message}</Error>
      );

//     // for password show/hide
//     const showHide = () => {
//         const input = document.querySelector('password')
//         showHide.addEventListener('click', ()=> {
//             if (!isShown) {
//                 if (input.type === 'password') {
//                     input.type = 'text';
//                     isShown = true;
//                 }
//             } else {
//                 input.type = 'password';
//                 isShown = false;
//             }
//         })
//     }

    const onChangeOne = (event) => {
        setPassOne(event.target.value);
    }

    const onChangeTwo = (event) => {
        setPassTwo(event.target.value);
    }
    

    // check for valid password
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
        if (/(?=.*[!@#$%^&*])/.test(pass_one)) {
            setHasSym(true);
        } else {
            setHasSym(false);
        }

        // match
        if (pass_one === pass_two && pass_one && pass_two) {
            setIsPassSame(true);
        } else {
            setIsPassSame(false);
        }


    }, [pass_one, pass_two, isEightChar, hasNum, hasSym, isPassSame]);
  
    // JSX code for login form
    const renderForm = (
      <div>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <InputText placeholder="name i.e. &quot;John&quot;..." type="text" name="name" autoComplete="on" onChange={(e) => setName(e.target.value)} required/>
            {renderErrorMessage("name")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="username i.e. &quot;johnsmith89&quot;..." type="text" name="uname" autoComplete="on" onChange={(e) => setUsername(e.target.value)}required />
            {renderErrorMessage("uname")}
            {renderErrorMessage("unameTaken")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="email..." type="text" name="email" autoComplete="on" onChange={(e) => setEmail(e.target.value)} required />
            {renderErrorMessage("email")}
            {renderErrorMessage("emailTaken")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="password..." type="password" name="pass" autoComplete="new-password" value={pass_one} onChange={onChangeOne} required />
            {renderErrorMessage("pass")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="confirm password..." type="password" name="pass2" autoComplete="new-password" value={pass_two} onChange={onChangeTwo} required />
            {renderErrorMessage("pass2")}
            {renderErrorMessage("server")}
            {renderErrorMessage("other")}
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
          {renderForm}
        </LogForm>
      </App>
    );
  };
  

export default SignUpForm;