//importing from react-----------------------------------------------------------------------------------------------
import { createContext, useContext, useState } from 'react';
//creating the context-----------------------------------------------------------------------------------------------
const AuthContext = createContext();
//implementing the custom hook by the context------------------------------------------------------------------------
function useAuthenticate() {
    const value = useContext(AuthContext);
    return value;
}
//the context provider----------------------------------------------------------------------------------------------
function AuthContextProvider({ children }){
    const [userAuthentication, setUserAuthentication] = useState(false);
    const [userID, setUserID] = useState('');

    const toggleUserAuthentication = () => {
        setUserAuthentication(!userAuthentication);
    };

    return(
        <AuthContext.Provider
        value={{userAuthentication, setUserAuthentication, toggleUserAuthentication, userID, setUserID}}>
            {children}
        </AuthContext.Provider>
    );
}
//exporting the context---------------------------------------------------------------------------------------------
export { useAuthenticate };
export default AuthContextProvider;