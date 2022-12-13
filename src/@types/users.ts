
export type Login = {
    username: string;
    password: string;
}

export type Roles = {
    _id: string;
    value: string;
    description: string;
}


export type Users = {
    _id: string;
    username: string;
    password: string;
    imageUrl: string;
    roles: Roles[];
    ban: boolean;
    createdAt?: string;
}

export interface FormData {
    token: string;
    user: Users;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error'
}

export interface UsersState {
    users: Users[];
    status: Status;
    user: Users | null;
}