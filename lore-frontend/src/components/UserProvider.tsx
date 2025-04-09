import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "../constants/contexts.ts";

type UserProviderProps = {
    children: ReactNode
}

function UserProvider({ children }: UserProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string>();

    // Log In; calls by log in overlay
    function storeLogInData(username_: string) {
        setIsLoggedIn(true);
        sessionStorage.setItem("loggedIn", "");
        setUsername(username_);
        sessionStorage.setItem("username", username_);
    }

    // Log out; calls by log out overlay
    function clearLogInData() {
        setIsLoggedIn(false);
        sessionStorage.removeItem("loggedIn");
        setUsername(undefined);
        sessionStorage.removeItem("username");
    }

    // Retrieve log in status and username from session storage
    function retrieveLogInData() {
        setIsLoggedIn(sessionStorage.getItem("loggedIn") !== null);
        setUsername(sessionStorage.getItem("username") || undefined);
    }

    // When page refreshes
    useEffect(() => {
        retrieveLogInData();
    }, []);

    return (
        <UserContext.Provider value={{
            isLoggedIn: isLoggedIn,
            username: username,
            storeLogInData: storeLogInData,
            clearLogInData: clearLogInData
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
