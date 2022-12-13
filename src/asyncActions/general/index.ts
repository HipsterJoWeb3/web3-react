
import axios from "../../axios";
import {General} from "../../@types/general";

export type interfaceFetchGeneral = (arg: void) => Promise<General>

export const fetchGeneral: interfaceFetchGeneral = async () => {
    try {
        const response = await axios.get('/general');
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export type interfaceUpdateGeneral = (arg: General) => Promise<General>

export const updateGeneral: interfaceUpdateGeneral = async (general) => {
    try {

        const response = await axios.patch('/general', general);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}
