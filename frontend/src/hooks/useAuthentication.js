import { useContext} from "react";
import AuthenticatedContext from "../context/AuthContext";

// defines custom hook for auth
const useAuthentication = () => {
    // console.log("inside useAuth")
    return useContext(AuthenticatedContext);
}

export default useAuthentication;