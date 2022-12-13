
import {Chapter} from "../../@types/chapters";
import axios from "../../axios";

export type interfaceChapters = (arg: void) => Promise<Chapter[]>

export const getChapters: interfaceChapters = async () => {
    try {
        const response = await axios.get('/chapters');
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export type interfaceUpdateChapters = (id: string, data: Chapter) => Promise<Chapter>

export const updateChapter: interfaceUpdateChapters = async (id, data) => {
    try {
        const response = await axios.patch(`/chapters/${id}`, data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export type interfaceCreateChapters = (data: Chapter) => Promise<Chapter>

export const createChapter: interfaceCreateChapters = async (data) => {
    try {
        const {_id, ...value} = data
        const response = await axios.post('/chapters', value);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export type interfaceDeleteChapters = (id: string) => Promise<void>

export const deleteChapter: interfaceDeleteChapters = async (id) => {
    try {
        await axios.delete(`/chapters/${id}`);
    } catch (e) {
        console.log(e);
    }
}

export const hiddenChapter = async (id: string, hidden: boolean) => {
    try {
        const response = await axios.post(`/chapters/hidden`, {id, hidden});
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getCountChapters = async (id: string) => {
    try {
        const response = await axios.get(`/posts/chapter/${id}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}


