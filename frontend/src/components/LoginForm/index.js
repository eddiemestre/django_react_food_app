import React, {useEffect, useState } from "react";
import { App, 
        LogForm, 
        Title, 
        InputContainer, 
        Error, 
        ButtonContainer, 
        InputText, 
        SubmitButton, 
        NoAccount } from './Styles.js';

import useInput from "../../hooks/useInput.js";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import axios, { axiosPrivate } from '../../api/axios';

const LOGIN_URL = '/auth/login/';

const LoginForm = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});
    const [email, resetEmail, emailAttribs] =  useInput('email', '')
    const [password, setPassword] = useState('');
    const delay = ms => new Promise(res => setTimeout(res, ms));
  
    useEffect(() => {
      setErrorMessages({});
    }, [email, password])

    
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

    const errors = {
      emailPass: "Invalid email or password. Try again or create an account.",
      missing: "Missing email or password. Please try again.",
      server: "Unable to connect to server. Please try again.",
      failed: "Login failed. Please try again."
    };

    const PostLogin = async () => {


      const lowerEmail = email.toLowerCase()

      try {
        const response = await axios.post(LOGIN_URL, 
            JSON.stringify({email: lowerEmail, password}),
            {
              headers: {'Content-Type': 'application/json'},
              withCredentials: true,
            }
        );

        // console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.access;

        setAuth({email: email, accessToken: accessToken});

        setPassword('');

        return accessToken;

      } catch (err) {
        // console.log(err)
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
    }

    const GetAuthedUser = async (access) => {
      try {
        const response = await axiosPrivate.get('/auth/get_user/', {
          headers: {
            'Authorization': `Bearer ${access}`
          }
        })
       
        const username = response?.data[0]?.username

        // set in AuthContext
        setAuth(prevState => ({
          ...prevState,
          "username": response?.data[0]?.username,
          "user_id": response?.data[0]?.id,
          "name": response?.data[0]?.name
        }))

        localStorage.setItem('user_id', JSON.stringify(response?.data[0]?.id))
        localStorage.setItem('username', JSON.stringify(response?.data[0]?.username))
        localStorage.setItem('name', JSON.stringify(response?.data[0]?.name))
        
        // return username

        navigate(`/user/${username}/`);

      } catch (err) {
        // console.log(err);
      }
    }

  
    const handleSubmit = async (event) => {
      //Prevent page reload
      event.preventDefault();

      // sign in and get accessToken
      const accessToken = await PostLogin();

      // // use the accessToken to get user details
      const username = await GetAuthedUser(accessToken);

      // navigate(`/user/${username}/`);

      
    };
  
    // Generate JSX code for error message
    const renderErrorMessage = (name) => {
      if (name === errorMessages.name) {
        return(<Error>{errorMessages.message}</Error>);
      }
    }
  
  
//     // JSX code for login form
    const renderForm = (
      <div>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <InputText 
                placeholder="email..." 
                type="text"
                name="email" 
                autoComplete="email"
                {...emailAttribs}
                required />
          </InputContainer>
          <InputContainer>
            <InputText 
                placeholder="password..." 
                type="password" 
                name="pass" 
                value={password} 
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)} 
                required />
            {renderErrorMessage("emailPass")}
            {renderErrorMessage("server")}
            {renderErrorMessage("missing")}
            {renderErrorMessage("failed")}
          </InputContainer>
          <NoAccount>Don't have an account? Sign up <Link to="/register">here.</Link></NoAccount>
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
          {renderForm}
        </LogForm>
      </App>
    );
  }
  

export default LoginForm;