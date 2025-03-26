import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "../constants/contexts.ts";

type UserProviderProps = {
    children: ReactNode
}

// Provides username | The username is for UI display only and is not used for authentication / logic
function UserProvider({ children }: UserProviderProps) {
    const [username, setUsername] = useState<string>();

    // Invokes by log in overlay
    function storeUsername(s: string) {
        setUsername(s);
        localStorage.setItem("username", s);
    }

    // Invokes by log out overlay
    function clearUsername() {
        setUsername(undefined);
        localStorage.removeItem("username");
    }

    useEffect(() => {
        // Retrieve username from local storage
        setUsername(localStorage.getItem("username") || undefined);
    }, []);

    return (
        <UserContext.Provider value={{
            username: username,
            storeUsername: storeUsername,
            clearUsername: clearUsername
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
