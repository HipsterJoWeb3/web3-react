

export type Links = {
    value: string;
    url: string;
    _id: string;
}

export type PagesOrder = {
    _id: string;
    value: string;
    description: string;
    content: string;
    route: string;
    hidden: boolean;
    index: number;
}

export type SomeInformation = {
    title: string;
    subtitle: string;
    imageUrl: string;
    hidden: boolean;
    _id: string;
}

export type AnimationText = {
    label: string;
    text: string;
    duration: number;
    hidden: boolean;
    _id: string;
}

export type General = {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    keywords: string[];
    links: Links[];
    pagesOrder: PagesOrder[] | any;
    animationLinks: Links[]
    someInformation: SomeInformation[]
    animationText: AnimationText[]
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error'
}

export interface GeneralsState {
    general: General | null;
    status: Status;
}