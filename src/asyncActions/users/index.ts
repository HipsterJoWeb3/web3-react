import {FormData, Users} from "../../@types/users";
import axios from "../../axios";


export type interfaceUsers = (arg: void) => Promise<Users[]>
export type interfaceCheckUser = (arg: void) => Promise<Users>
export type interfaceLoginUser = (arg: { username: string, password: string }) => Promise<FormData>
export type interfaceRegisterUser = (arg: { username: string, password: string, token: string }) => Promise<FormData>
export type interfaceDeleteUser = (arg: {_id: string, ban: boolean}) => Promise<Users>
export type interfaceAddAdmin = (id: string) => Promise<Users>

export const fetchUsers: interfaceUsers = async () => {
    try {
        const response = await axios.get('/users');
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const checkUser: interfaceCheckUser = async () => {
    try {
        const response = await axios.get('/auth/refresh');
        return response.data;
    } catch (e) {
        // @ts-ignore
        return e.response.data;
    }
}

export const loginUser: interfaceLoginUser = async ({username, password}) => {
    try {
        const response = await axios.post('/auth/login', {username, password});
        return response.data;
    } catch (e) {
        // @ts-ignore
        return e.response.data;
    }
}

export const registerUser: interfaceRegisterUser = async ({username, password, token}) => {
    try {
        const response = await axios.post('/auth/registration', {
            username,
            password
        });
        return response.data;
    } catch (e) {
        // @ts-ignore
        return e.response.data;
    }
}

export const banUser: interfaceDeleteUser = async ({_id, ban}) => {
    try {
        const response = await axios.post(`/users/${ban ? 'ban' : 'unban'}`, {
            id: _id
        })
        return response.data;
    } catch (e) {
        // @ts-ignore
        return e.response.data;
    }
}

export const addAdmin:interfaceAddAdmin  = async (id) => {
    try {
        const response = await axios.post(`/users/add-admin`, {
            id
        })
        return response.data;
    } catch (e) {
        // @ts-ignore
        return e.response.data;
    }
}
