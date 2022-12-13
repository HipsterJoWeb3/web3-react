


export type Chapter = {
    _id: string;
    value: string;
    description: string;
    hidden: boolean;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error'
}

export interface ChaptersState {
    chapters: Chapter[];
    status: Status;
}