import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_ADDRESS as string,
    withCredentials: true
});

export function getPrefixedCommunityName(community: string): string {
    return `c/${community}`;
}

export function getPrefixedUsername(username: string): string {
    return `u/${username}`;
}
