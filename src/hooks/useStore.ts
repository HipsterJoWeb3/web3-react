import {checkUser, fetchUsers} from "../asyncActions/users";
import {getTestChapters} from "../asyncActions/chapters";
import {fetchPosts} from "../asyncActions/posts";
import {fetchTags} from "../asyncActions/tags";
import {fetchGeneral} from "../asyncActions/general";
import {fetchPages} from "../asyncActions/pages";
import {setPosts} from "../redux/posts/slice";
import {setUser, setUsers} from "../redux/users/slice";
import {setChapters} from "../redux/chapters/slice";
import {setTags} from "../redux/tags/slice";
import {setGeneral} from "../redux/general/slice";
import {setPages} from "../redux/pages/slice";
import {Post} from "../@types/posts";
import {Chapter} from "../@types/chapters";
import {Tags} from "../@types/tags";
import {Pages} from "../@types/pages";
import {General} from "../@types/general";
import {Users} from "../@types/users";
import {useDestroyCookie} from "./useAuth";



export type  initialStateData = (store: any, token: string) => void


export const setInitialStateData: initialStateData = async (store, token) => {
    try {


        const chapters = await getTestChapters()
        const tags = await fetchTags(30)
        const general = await fetchGeneral()
        const pages = await fetchPages()
        const users = await fetchUsers()
        const user = await checkUser(token)


        await store.dispatch(setChapters(chapters))
        await store.dispatch(setTags(tags))
        await store.dispatch(setGeneral(general))
        await store.dispatch(setPages(pages))
        await store.dispatch(setUsers(users))
        await store.dispatch(setUser(user._id ? user : null))
    } catch (error) {
        console.error('setInitialStateData', error)
    }
}

export type checkStoreData = {
    chapters: Chapter[]
    tags: Tags[]
    pages: Pages[]
    general: General
    users: Users[]
}

export type checkStore = (store: any) => Promise<checkStoreData | boolean>

export const useCheckStore: checkStore = async (store: any) => {
    try {

        const {chapters} = await store.getState().chapters
        const {tags} = await store.getState().tags
        const {pages} = await store.getState().pages
        const {general} = await store.getState().general
        const {users} = await store.getState().users




        if( !chapters.length || !tags.length || !pages.length || !general || !users.length) return false



        return {chapters, tags, pages, general, users}

    } catch (error) {
        console.error('useCheckStore', error)
    }
}

export type uploadStore = (store: any, token: string) => Promise<void>

export const useUploadStore = async (store, token) => {
    try {

        const check = await useCheckStore(store)


        if(!check) {
            await setInitialStateData(store, token)
            return useCheckStore(store)
        } else {
            return check
        }

    } catch (error) {
        console.error('useUploadStore', error)
    }
}

export type logout = (store: any) => void

export const useLogout: logout = async (store) => {
    try {
        await useDestroyCookie('token')
        await store.dispatch(setUser(null))
    } catch (error) {
        console.error('useLogout', error)
    }
}

