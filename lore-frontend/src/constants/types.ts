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

export type Post = {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    community: Community,
    author: {
        username: string
    },
    commentIds: string[],
    commentCount: number,
    score: number
}

type User = {
    username: string
}

export type Comment = {
    id: string,
    content: string,
    createdAt: string,
    author: User,
    score: number,
    link: string,
    commentIds: string[]
}
