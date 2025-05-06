import { createContext, Dispatch, SetStateAction } from "react";
import { Community, OverlayType } from "./types.ts";

export const OverlayContext = createContext<{
    overlayType: OverlayType,
    setOverlayType: Dispatch<SetStateAction<OverlayType>>
}>({
    overlayType: OverlayType.None,
    setOverlayType: () => {
    }
});

export const PopupContext = createContext({
    showPopup: (text: string) => {
        void text;
    }
});

export const UserContext = createContext<{
    isLoggedIn: boolean,
    username: string | undefined,
    storeLogInData: (s: string) => void,
    clearLogInData: () => void,
}>({
    isLoggedIn: false,
    username: undefined,
    storeLogInData: () => {
    },
    clearLogInData: () => {
    }
});

export const CommunityContext = createContext<{
    community: Community | undefined,
    refreshCommunity: () => void,
    page: number,
    setPage: Dispatch<SetStateAction<number>>
}>({
    community: undefined,
    refreshCommunity: () => {
    },
    page: 0,
    setPage: () => {
    }
});

export const CommunitiesContext = createContext<{
    communities: Community[],
    updateCommunities: () => void,
    allCommunities: Community[],
    updateAllCommunities: () => void,
}>({
    communities: [],
    updateCommunities: () => {
    },
    allCommunities: [],
    updateAllCommunities: () => {
    }
});

export const CommentInputContext = createContext<{
    onComment: (() => void) | null
}>({
    onComment: null
});

export const DeleteButtonContext = createContext<{
    onDeleteFromContext: (() => void) | null
}>({
    onDeleteFromContext: null
});
