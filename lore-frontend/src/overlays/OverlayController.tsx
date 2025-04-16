import { JSX, ReactNode, useState } from "react";
import CreateCommunity from "./CreateCommunity.tsx";
import LogIn from "./LogIn.tsx";
import SignUp from "./SignUp.tsx";
import { OverlayType } from "../constants/types.ts";
import { OverlayContext } from "../constants/contexts.ts";

type OverlayControllerProps = {
    children: ReactNode
}

const overlayMap = new Map<OverlayType, JSX.Element>()
    .set(OverlayType.CreateCommunity, <CreateCommunity/>)
    .set(OverlayType.LogIn, <LogIn/>)
    .set(OverlayType.SignUp, <SignUp/>)
;

function OverlayController({ children }: OverlayControllerProps) {
    const [overlayType, setOverlayType] = useState(OverlayType.None);

    return (
        <OverlayContext.Provider
            value={{
                overlayType: overlayType,
                setOverlayType: setOverlayType
            }}
        >
            {children}
            {
                overlayType !== OverlayType.None &&
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-1">
                    {overlayMap.get(overlayType)}
                </div>
            }
        </OverlayContext.Provider>
    );
}

export default OverlayController;
