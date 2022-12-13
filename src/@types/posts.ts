import {Users} from "./users";


export type Tag = {
    _id: string
    value: string
    hidden: boolean
    views: number
}

export type Post = {
    _id?: string
    title: string
    description: string
    text: object
    imageUrl: string
    views?: number
    userId: string
    tags: Tag[]
    chapter: {
        _id: string
        value: string
    } | string
    hidden?: boolean
    createdAt?: string
    updatedAt?: string
    author?: Users
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}

export interface PostsState {
    posts: Post[]
    status: Status
}
