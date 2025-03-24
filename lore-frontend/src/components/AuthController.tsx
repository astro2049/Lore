import { ReactNode, useState } from "react";
import { AuthContext } from "../constants/contexts.ts";

type AuthControllerProps = {
    children: ReactNode
}

function AuthController({ children }: AuthControllerProps) {
    const [username, setUsername] = useState<string>();

    return (
        <AuthContext.Provider value={{ username, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthController;
