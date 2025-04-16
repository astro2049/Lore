import { MouseEvent, useContext } from "react";
import { OverlayContext, UserContext } from "../constants/contexts.ts";
import { OverlayType } from "../constants/types.ts";

function useLogInRequiredAction(callback?: () => void): (e?: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void {
    const { isLoggedIn } = useContext(UserContext)!;
    const { setOverlayType } = useContext(OverlayContext);

    return (e?: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        if (!isLoggedIn) {
            if (e) {
                e.preventDefault();
            }
            setOverlayType(OverlayType.LogIn);
        } else {
            if (callback) {
                callback();
            }
        }
    }
}

export default useLogInRequiredAction;
