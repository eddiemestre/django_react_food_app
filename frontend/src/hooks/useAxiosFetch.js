import {useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "./useAxiosPrivate";
// import {axios as axiosAPI} from "axios";
import useAuth from "./useAuth";
import DataContext from "../context/DataContext";
import { useParams } from "react-router-dom";

const useAxiosFetchReviews = (username) => {
    const [data, setData] = useState([]) 
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const { auth, setAuth, setAnonUser } = useAuth();
    const { isLoggedIn, setIsLoggedIn } = useContext(DataContext)
    const params = useParams();

    const hasLocalStorage = () => {
        return  localStorage.getItem('email') && 
                localStorage.getItem('username') && 
                localStorage.getItem('user_id') && 
                localStorage.getItem('name')
    } 

    useEffect(() => {
        console.log("in axiosfetchreviews use effect")
        let isMounted = true;
        // const source = axiosAPI.CancelToken.source();
        setIsLoading(true)

        const fetchAuthData = async () => {
            setIsLoading(true)

            try {
                const response = await axiosPrivate.get('/reviews/auth_reviews/', {
                    // cancelToken: source.token
                });

                console.log(response)
                if (isMounted) {
                    console.log("mounted set Data")
                    setData(response.data);
                    setFetchError(null);
                }
            }  catch (err) {
                if (isMounted)
                console.log("failed")
                setFetchError(err.message)
                setData([])
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        const GetAuthedUser = async () => {
            try {
              const response = await axiosPrivate.get('/auth/get_user/')
      
              // set in AuthContext
              setAuth(prevState => ({
                ...prevState,
                "username": response?.data[0]?.username,
                "user_id": response?.data[0]?.id,
                "name": response?.data[0]?.name,
                "email": response?.data[0]?.email
              }))
      
              // set in localStorage
              localStorage.setItem('user_id', JSON.stringify(response?.data[0]?.id))
              localStorage.setItem('username', JSON.stringify(response?.data[0]?.username))
              localStorage.setItem('name', JSON.stringify(response?.data[0]?.name))
              localStorage.setItem('email', JSON.stringify(response?.data[0]?.email))
              
              return true
            } catch (err) {
              console.log(err);
              return false
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        const getAnonUser = async (username) => {
            console.log("username", username)
            try {
                const response = await axios.get(`/auth/get_other_user/${username}/`);

                console.log("user data", response?.data);
                isMounted && setAnonUser(response?.data)
                 
            } catch (err) {
                console.error(err);
                if (err?.response?.status === 404) {
                    console.log("404 getting anon user details")
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        const fetchAnonData = async (username) => {
            try {
                const response = await axios.post('/reviews/account_public_reviews/', 
                JSON.stringify({username: username}), 
                {
                    headers: {'Content-Type': 'application/json'},
                });
                console.log("list data in review list", response?.data);
                isMounted && setData(response?.data)

            } catch (err) {
                console.log(err);
                if (err?.response?.status === 404) {
                    console.log("no public reviews found")
                }
            } finally {
                setIsLoading(false)
            }
        }

        const PullData = async (username) => {
            if (auth?.accessToken && hasLocalStorage()) {
                console.log("has auth")
                fetchAuthData()
            } else if (hasLocalStorage()) {
                console.log("has localStorage")
                setAuth(prevState => ({
                    ...prevState, 
                    name: JSON.parse(localStorage.getItem('name')),
                    username: JSON.parse(localStorage.getItem('username')),
                    user_id: JSON.parse(localStorage.getItem('user_id')),
                    email: JSON.parse(localStorage.getItem('email'))
                }))
                fetchAuthData()
            } else {
                console.log("no local storage")
                const authSuccess = await GetAuthedUser();
                if (authSuccess) {
                    console.log("get authed user success")
                    fetchAuthData()
                } else {
                    console.log("anonymous user")
                    setAuth({})
                    if (username) {
                        console.log("get user details")
                        getAnonUser(username);
                        fetchAnonData(username)
                    }
                }
            }
        }

        PullData(username)
        
        const cleanUp = () => {
            isMounted = false;
            console.log("cancelled?")
            // source.cancel();
        }

        return cleanUp;

    }, [isLoggedIn])



    return { data, fetchError, isLoading };
}

export default useAxiosFetchReviews;