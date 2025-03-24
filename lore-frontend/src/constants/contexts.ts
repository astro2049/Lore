import { createContext, Dispatch, SetStateAction } from "react";
import { Community, OverlayType } from "./types.ts";

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
    setUsername: Dispatch<SetStateAction<string | undefined>>
} | null>(null);

export const CommunityContext = createContext<{
    community: Community,
    isMember: boolean,
    setIsMember: Dispatch<SetStateAction<boolean>>
} | null>(null);

export const CommunitiesContext = createContext<{
    communities: Community[],
    updateCommunities: () => void,
    allCommunities: Community[],
    updateAllCommunities: () => void,
} | null>(null);
