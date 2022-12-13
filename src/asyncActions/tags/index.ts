
import axios from "../../axios";
import {Tags} from "../../@types/tags";

export type interfaceFetchTags = (limit?: number) => Promise<Tags[]>;

export const fetchTags: interfaceFetchTags = async (limit) => {
    try {
        const response = await axios.get(`/tags?limit=${limit}`);
        return response.data;
    } catch (e) {
        const response = await axios.get(`/tags?limit=${limit}`);
        return response.data;
    }
}
