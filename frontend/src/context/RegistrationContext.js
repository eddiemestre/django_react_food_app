import { createContext, useState } from 'react';

const RegistrationContext = createContext({});

export const RegistrationProvider = ({ children }) => {
    const [justSignedUp, setJustSignedUp] = useState(false)

    return (
        <RegistrationContext.Provider value={{
            justSignedUp, setJustSignedUp
        }}>
            { children }
        </RegistrationContext.Provider>
    )
}

export default RegistrationContext;
