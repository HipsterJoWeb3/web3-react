
import axios from "../../axios";
import {Pages} from "../../@types/pages";

export type interfacePages = (arg: void) => Promise<Pages[]>

export const fetchPages: interfacePages = async () => {
    try {
        const response = await axios.get('/pages');
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export type interfaceUpdatePages = (id: string, data: Pages) => Promise<Pages>

export const updatePage: interfaceUpdatePages = async (id, data) => {
    try {
        const response = await axios.patch(`/pages/${id}`, data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export type interfaceCreatePages = (data: Pages) => Promise<Pages>

export const createPage: interfaceCreatePages = async (data) => {
    try {
        const {_id, ...value} = data
        const response = await axios.post('/pages', value);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export type interfaceDeletePages = (id: string) => Promise<Pages>

export const deletePage: interfaceDeletePages = async (id) => {
    try {
        const res = await axios.delete(`/pages/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export const hiddenPage = async (id: string, hidden: boolean) => {

    try {
        const response = await axios.post(`/pages/hidden`, {id, hidden});
        return response.data;
    } catch (e) {
        console.log(e);
    }
}