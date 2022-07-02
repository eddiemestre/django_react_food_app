import React, {useRef, useEffect, useState, useContext } from "react";
import { App, LogForm, Title, InputContainer, Error, ButtonContainer, InputText, SubmitButton, NoAccount, CredentialConfirmation } from './Styles.js';
import useAuth from "../../hooks/useAuth.js";
import axios from '../../api/axios';
import { Link, useNavigate, useLocation} from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import useInput from "../../hooks/useInput.js";
import useAxiosPrivate  from "../../hooks/useAxiosPrivate";
// import AuthContext from "../../context/AuthProvider.js";

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
    const from =  `/profile/${JSON.parse(localStorage.getItem('email'))}`; // || location.state?.from?.pathname

    

    const [errorMessages, setErrorMessages] = useState({});
    // const [isSubmitted, setIsSubmitted] = useState(false);

    const [email, resetEmail, emailAttribs] =  useInput('email', '') // useLocalStorage('email', '') //useState('');
    const [password, setPassword] = useState('');
  
    useEffect(() => {
      setErrorMessages({});
    }, [email, password])

    // useEffect(() => {

    // }, [auth])


    // useEffect(() => {
    //   const loggedInUser = localStorage.getItem("user")
  
    //   console.log("logged in?", loggedInUser);
    
    //   if (loggedInUser) {
    //     // window.location.href = `/profile/${JSON.parse(localStorage.getItem('email'))}`;
    //     navigate(`/profile/${JSON.parse(localStorage.getItem('email'))}`)
    //     // GoHome();
    //   }
    // }, [])

    // const GoHome = () => {
    //   navigate(`/profile/${JSON.parse(localStorage.getItem('email'))}`)
    // }

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

    
    // const getUserData = async () => {
    //   console.log("inside getUser Data a loginform")
    //   try {
    //       const response = await axiosPrivate.get('/auth/get_user/')
  
    //       // console.log("in get user response", response?.data[0]);
    //       // console.log("email", response?.data[0]?.email)

    //       localStorage.setItem('email', JSON.stringify(response?.data[0]?.email))
    //       localStorage.setItem('user_id', JSON.stringify(response?.data[0]?.id))
    //       localStorage.setItem('username', JSON.stringify(response?.data[0]?.username))
    //       localStorage.setItem('name', JSON.stringify(response?.data[0]?.name))
          
  
    //     } catch (err) {
    //       console.log(err);
    //     }
    // }

    // const getLogin = async () => {
    //   try {
    //     const response = await axios.post('http://localhost:8000/auth/login/', 
    //         JSON.stringify({email, password}),
    //         {
    //           headers: {'Content-Type': 'application/json'},
    //           withCredentials: true,
    //         }
    //     );

    //     console.log("data:", response.data)

    //     const accessToken = response?.data?.access;
    //     const refreshToken = response?.data?.refresh;

    //     // console.log("refresh:", refreshToken);
          
    //     console.log("from", from);
    //     // console.log("login retrieved data", email, accessToken, refreshToken);
    //     setAuth({email: email, accessToken: accessToken, refreshToken: refreshToken});
    //     // myContext.setAuth({test: "chutney", here: "here"})
    //     // console.log("access token", auth.test);
    //     //console.log("access token", auth.accessToken);
    //     // console.log("check auth in getLogin", auth)
    //     //setEmail('');
    //     resetEmail();
    //     setPassword('');
    //     localStorage.setItem("user", JSON.stringify({email, accessToken, refreshToken}))
    //     // console.log("check local storage", JSON.parse(localStorage.getItem('user')));

    //     // // send them back to the from value if they tried to access deeper part of the site
    //     // // otherwise sent to home
    //     // if (from) {
    //     // navigate(from, { replace: true });
    //     // } else{
          
    //     // }


    //   } catch (err) {
    //       if(!err?.response) {
    //         setErrorMessages({name: "server", message: errors.server});
    //       } else if (err.response?.status === 400) {
    //         setErrorMessages({name: "missing", message: errors.missing});
    //       } else if (err.response?.status === 401) {
    //         setErrorMessages({name: "emailPass", message: errors.emailPass});
    //       } else {
    //         setErrorMessages({name: "failed", message: errors.failed});
    //       }

    //       // set focus for screen readers
    //   }
    // }
  
    const handleSubmit = async (event) => {
      //Prevent page reload
      event.preventDefault();

      // try {
        
      //   await getLogin();
      //   // await getUserData();

      //   // send them back to the from value if they tried to access deeper part of the site
      //   // otherwise sent to home
      //   if (from) {
      //   navigate(from, { replace: true });
      //   } else{
          
      //   }
      // } catch (err) {
      //   console.log(err)
      // }

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
        setAuth({email, accessToken});
        //setEmail('');
        resetEmail();
        setPassword('');
        localStorage.setItem("refresh", refreshToken)
        // localStorage.setItem("access", accessToken)
        // localStorage.setItem("user", JSON.stringify({email, accessToken, refreshToken}))

        // send them back to the from value if they tried to access deeper part of the site
        // otherwise sent to home
        if (from) {
        navigate(from, { replace: true });
        } else{
        navigate(`/profile/${JSON.parse(localStorage.getItem('email'))}`)
        }

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
    };
  
    // Generate JSX code for error message
    const renderErrorMessage = (name) => {
      if (name === errorMessages.name) {
        return(<Error>{errorMessages.message}</Error>);
      }
    }

    // const sendToHome = (
    //     <Navigate push to="/home"/>
    // )

    // const redirect = () => {
    //     setTimeout(() => {
    //         window.location.href = '/home';
    //     }, 1000);

    //     return(
    //         <CredentialConfirmation>Logged In! Redirecting to home...</CredentialConfirmation>
    //     );
    // };
  
  
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
          {/* {isSubmitted ? redirect() : renderForm} */}
          {renderForm}
        </LogForm>
      </App>
    );
  }
  

export default LoginForm;