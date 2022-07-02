import { useContext} from "react";
import AuthContext from "../context/AuthProvider.js";

// defines custom hook for auth
const useAuth = () => {
    console.log("inside useAuth")
    return useContext(AuthContext);
}

export default useAuth;