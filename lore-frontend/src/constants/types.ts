export enum OverlayType {
    None,
    CreateCommunity,
    LogIn,
    SignUp
}

export type Community = {
    name: string,
    description: string,
    createdAt: string,
    creator: {
        username: string
    }
}
