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
    },
    isMember: boolean,
    memberCount: number
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
    commentIds?: string[],
    commentCount: number,
    score: number,
    coverUrl?: string,
    vote: 1 | 0 | -1 | undefined
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
    commentIds: string[],
    vote: 1 | 0 | -1 | undefined
}

export enum VoteType {
    Post = "post",
    Comment = "comment",
}

export enum CommentInputMode {
    Post,
    Comment,
    CommunityDescription
}
