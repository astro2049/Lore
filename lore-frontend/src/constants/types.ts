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
    creator: User | null,
    isMember: boolean,
    memberCount: number,
    pages: number
}

export type Post = {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    community: Community,
    author: User | null,
    commentIds?: string[],
    commentCount: number,
    score: number,
    coverUrl?: string,
    vote: 1 | 0 | -1 | undefined
}

export type User = {
    username: string
}

export type Comment = {
    id: string,
    content: string,
    createdAt: string,
    author: User | null,
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
