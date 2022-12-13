
export interface Pages {
    _id?: string;
    value: string;
    description: string;
    content: string;
    route: string;
    hidden?: boolean;
}

export interface PagesState {
    pages: Pages[];
    status: Status;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error'
}