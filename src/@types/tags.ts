


export interface Tags {
    _id: string;
    value: string;
    hidden: boolean;
    views: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error'
}

export interface TagsState {
    tags: Tags[];
    status: Status;
}