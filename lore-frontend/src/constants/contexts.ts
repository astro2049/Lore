import { createContext, Dispatch, SetStateAction } from "react";
import { OverlayType } from "./types.ts";

export const OverlayContext = createContext<[
    OverlayType,
    Dispatch<SetStateAction<OverlayType>>
] | null>(null);

export const PopupContext = createContext({
    showPopup: (text: string) => {
        void text;
    }
});
