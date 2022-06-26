import React, {useRef, useEffect, useState, useContext } from "react";
import { Navigate } from 'react-router-dom';
import { App, LogForm, Title, InputContainer, Error, ButtonContainer, InputText, SubmitButton, NoAccount, CredentialConfirmation } from './Styles.js';
import useAuth from "../../hooks/useAuth.js";
import axios from '../../api/axios';
import { Link, useNavigate, useLocation} from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import useInput from "../../hooks/useInput.js";
import useAxiosPrivate  from "../../hooks/useAxiosPrivate";

/////////
// error message for special characters in username
/////////
const LOGIN_URL = '/auth/login/';

const LoginForm = () => {
    // React States
    const { auth, setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();

    // get where user is coming from 
    const from = location.state?.from?.pathname || "/home";

    

    const [errorMessages, setErrorMessages] = useState({});
    // const [isSubmitted, setIsSubmitted] = useState(false);

    const [email, resetEmail, emailAttribs] =  useInput('email', '') // useLocalStorage('email', '') //useState('');
    const [password, setPassword] = useState('');
  
    useEffect(() => {
      setErrorMessages({});
    }, [email, password])


    useEffect(() => {
      const loggedInUser = localStorage.getItem("user")
  
      console.log(loggedInUser);
    
      if (loggedInUser) {
        window.location.href = '/home';
      }
    }, [])

    // User Login info
    // const database = [
    //   {
    //     username: "User1",
    //     password: "hello!23"
    //   },
    //   {
    //     username: "User2",
    //     password: "hello!23"
    //   }
    // ];
  
    const errors = {
      emailPass: "Invalid email or password. Try again or create an account.",
      missing: "Missing email or password. Please try again.",
      server: "Unable to connect to server. Please try again.",
      failed: "Login failed. Please try again."
    };
  
    const handleSubmit = async (event) => {
      //Prevent page reload
      event.preventDefault();

      try {
        const response = await axios.post('http://localhost:8000/auth/login/', 
            JSON.stringify({email, password}),
            {
              headers: {'Content-Type': 'application/json'},
              withCredentials: true,
            }
        );

        console.log("data:", response.data)

        const accessToken = response?.data?.access;
        const refreshToken = response?.data?.refresh;

        // console.log("refresh:", refreshToken);
          
        console.log("from", from);
        console.log(email, accessToken, refreshToken);
        setAuth({email, accessToken, refreshToken});
        //setEmail('');
        resetEmail();
        setPassword('');
        localStorage.setItem("user", JSON.stringify({email, accessToken, refreshToken}))

        // send them back to the from value if they tried to access deeper part of the site
        // otherwise sent to home
        navigate(from, { replace: true });

      } catch (err) {
          if(!err?.response) {
            setErrorMessages({name: "server", message: errors.server});
          } else if (err.response?.status === 400) {
            setErrorMessages({name: "missing", message: errors.missing});
          } else if (err.response?.status === 401) {
            setErrorMessages({name: "emailPass", message: errors.emailPass});
          } else {
            setErrorMessages({name: "failed", message: errors.failed});
          }

          // set focus for screen readers
      }

      // set localStorage info
      // email, username, name, id
     
      
      

  
      // var { uname, pass } = document.forms[0];
  
      // // Find user login info
      // const userData = database.find((user) => user.username === uname.value);
  
      // // Compare user info
      // if (userData) {
      //   if (userData.password !== pass.value) {
      //     // Invalid password
      //     setErrorMessages({ name: "pass", message: errors.pass });
      //     setShowErrorMessage(true)
      //   } else {
      //     setIsSubmitted(true);
      //   }
      // } else {
      //   // Username not found
      //   setErrorMessages({ name: "email", message: errors.uname });
      //   setShowErrorMessage(true)
      // }
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

    const redirect = () => {
        setTimeout(() => {
            window.location.href = '/home';
        }, 1000);

        return(
            <CredentialConfirmation>Logged In! Redirecting to home...</CredentialConfirmation>
        );
    };
  
  
    // JSX code for login form
    const renderForm = (
      <div>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            {/* <label>Username</label> */}
            <InputText 
                placeholder="email..." 
                type="text"
                name="email" 
                {...emailAttribs}
                required />
            {/* {renderErrorMessage("email")} */}
          </InputContainer>
          <InputContainer>
            {/* <label>Password </label> */}
            <InputText 
                placeholder="password..." 
                type="password" 
                name="pass" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required />
            {/* {renderErrorMessage("pass")} */}
            {renderErrorMessage("emailPass")}
            {renderErrorMessage("server")}
            {renderErrorMessage("missing")}
            {renderErrorMessage("failed")}
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
          {/* {isSubmitted ? redirect() : renderForm} */}
          {renderForm}
        </LogForm>
      </App>
    );
  }
  

export default LoginForm;