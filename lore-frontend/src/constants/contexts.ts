import { createContext, Dispatch, SetStateAction } from "react";
import { OverlayType } from "./types.ts";
import * as React from "react";

export const OverlayContext = createContext<[
    OverlayType,
    Dispatch<SetStateAction<OverlayType>>
] | null>(null);

export const PopupContext = createContext({
    showPopup: (text: string) => {
        void text;
    }
});

export const AuthContext = createContext<{
    username: string | undefined,
    setUsername: React.Dispatch<React.SetStateAction<string | undefined>>
} | null>(null);
