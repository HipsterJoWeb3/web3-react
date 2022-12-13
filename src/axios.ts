import axios from 'axios'
import {useGetCookie} from "./hooks/useAuth";
import {baseUrl} from "./utils/main";

const instance = axios.create({
    baseURL: baseUrl,
})

instance.interceptors.request.use(config => {
    const token = useGetCookie('token')

    if (token) {
        // @ts-ignore
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default instance
