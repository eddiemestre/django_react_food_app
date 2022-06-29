import React, {useRef, useState, useEffect} from "react";
import { updateLanguageServiceSourceFile } from "typescript";
import axios from '../../api/axios';
import { App, LogForm, Title, InputContainer, Error, ButtonContainer, InputText, SubmitButton, CredentialConfirmation, NoAccount } from '../LoginForm/Styles.js';
import { Link, useNavigate } from "react-router-dom";
import PasswordValidator from "../PasswordValidator/index.js";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;
const REGISTER_URL = '/auth/register/';


const SignUpForm = (props) => {
    // Refs
    const userRef = useRef();
    const navigate = useNavigate();
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
    const [validPassword, setValidPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState('');


    // // User Login info
    // const database = [
    //   {
    //     username: "User1",
    //     name: "User",
    //     email: "User@email.com",
    //     password: "hello!23",
    //   },
    //   {
    //     username: "User2",
    //     name: "User",
    //     email: "User2@email.com",
    //     password: "hello!23"
    //   }
    // ];
  
    // TO DO: add accessibility features for screen readers
    const errors = {
      uname: "Invalid username. Should contain only letters and numbers and be 4 - 23 characters long.",
      unameTaken: "Username already taken. Please pick another.",
      name: "Invalid name.",
      email: "Invalid email.",
      emailTaken: "An account with this email already exists. Please use another.",
      pass: "Invalid password.",
      pass2: "Passwords do not match.",
      server: "No server response.",
      other: "Registration Failed. Please try again.",
    };
  
    

    const handleSubmit = async (event) => {
      //Prevent page reload
      event.preventDefault();
      
      // recheck validation
      const userCheck = USER_REGEX.test(username);
      const passCheck = PASSWORD_REGEX.test(pass_one);
      const emailCheck = EMAIL_REGEX.test(email)

      console.log("usercheck", userCheck);
      console.log("passCheck", passCheck);
      console.log("emailcheck", emailCheck);

      if (!userCheck || !passCheck || !emailCheck) {
        console.log("invalid data");
        return;
      } else {
        console.log("valid data submitted");
      }

      try {
          const response = await axios.post(REGISTER_URL,
            JSON.stringify({email, username, name, password1: pass_one, password2: pass_two}),
            {
              headers: {'Content-Type': 'application/json'},
              withCredentials: true
            }
          );
          // console.log("successfully created user")
          // console.log(response.data);
          // console.log(JSON.stringify(response))
          setIsSubmitted(true);

          // clear input fields, set state back to empty strings
          setName('');
          setUsername('');
          setEmail('');
          setPassOne('');
          setPassTwo('');
          try {
            console.log("setting signedup to true")
            props.signedUp(true)
          } catch (err) {
            console.log(err)
          }
          navigate('/login', { replace: true })

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
      
      
      // var { name, uname, email, pass, pass2 } = document.forms[0];

      // // Find user login info
      // const userData = database.find((user) => user.username === uname.value);
  
      // // Compare user info
      // if (userData) {
      //   if (userData.name !== name.value) {
      //       setErrorMessages({ name: "name", message: errors.name })
      //   }
      //   if (userData.email !== email.value) {
      //       setErrorMessages({ email: "email", message: errors.email })
      //   }
      //   if (userData.password !== pass.value) {
      //     // Invalid password
      //     setErrorMessages({ name: "pass", message: errors.pass });
      //   }
      //   if (userData.password !== pass2.value) {
      //       // Invalid password
      //       setErrorMessages({ name: "pass2", message: errors.pass2 });
      //     } else {
      //       setIsSubmitted(true);
      //     }
      // } else {
      //   // Username not found
      //   setErrorMessages({ name: "uname", message: errors.uname });
      // }
    };

    // const redirect = () => {
    //   console.log("in redirect, woo!")
    //     setTimeout(() => {
    //         navigate("/login", { replace: true });
    //     }, 2500);

    //     return(
    //         <CredentialConfirmation>Thanks for registering! Redirecting to login...</CredentialConfirmation>
    //     );
    // };
  
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
    
    // focus user input field
    useEffect(() => {
        // userRef.current.focus();
    }, [username])

    // check for valid username
    useEffect(() => {
      const result = USER_REGEX.test(username);
      console.log(result);
      console.log(username);
      setValidUsername(result);
    }, [username])

    // check for valid email
    useEffect(() => {
      const result = EMAIL_REGEX.test(email);
      console.log(result);
      console.log(email);
      setValidEmail(result);
    }, [email])

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

        if (isEightChar && hasNum && hasSym && isPassSame) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }


    }, [pass_one, pass_two, isEightChar, hasNum, hasSym, isPassSame]);

    useEffect(() => {
      setErrorMessages({});
      console.log(validUsername, validEmail, validPassword )
    }, [username, name, pass_one, pass_two, email, validEmail, validPassword, validUsername])
  
    // JSX code for login form
    const renderForm = (
      <div>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <InputText placeholder="name i.e. &quot;John Smith&quot;..." type="text" name="name" onChange={(e) => setName(e.target.value)} required/>
            {renderErrorMessage("name")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="username i.e. &quot;johnsmith89&quot;..." type="text" name="uname" onChange={(e) => setUsername(e.target.value)}required />
            {renderErrorMessage("uname")}
            {renderErrorMessage("unameTaken")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="email..." type="text" name="email" onChange={(e) => setEmail(e.target.value)} required />
            {renderErrorMessage("email")}
            {renderErrorMessage("emailTaken")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="password..." type="password" name="pass" value={pass_one} onChange={onChangeOne} required />
            {renderErrorMessage("pass")}
          </InputContainer>
          <InputContainer>
            <InputText placeholder="confirm password..." type="password" name="pass2" value={pass_two} onChange={onChangeTwo} required />
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