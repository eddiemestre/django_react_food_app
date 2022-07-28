import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [anonUser, setAnonUser] = useState({})
    // // console.log("inide AuthProvider. Auth value:", auth);

    return (
        <AuthContext.Provider value={{ 
            auth, setAuth, anonUser, setAnonUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;