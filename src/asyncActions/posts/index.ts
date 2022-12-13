import axios from '../../axios'
import {Post} from "../../@types/posts";
import {useGetCookie} from "../../hooks/useAuth";

export interface fetchPostsProps {
    limit?: string
    offset?: string | string[]
    type?: string | string[]
    author?: string | string[]
    chapter?: string | string[]
    tag?: string | string[]
    search?: string | string[]
}


export type interfacePosts = (arg: fetchPostsProps) => Promise<any>

export const fetchPosts: interfacePosts = async ({limit, offset, tag, author, chapter, type, search}) => {
    try {
        const response = await axios.get(`/posts?${limit ? `limit=${limit}` : ''}${offset ? `&offset=${offset}` : ''}${tag ? `&tag=${tag}` : ''}${author ? `&author=${author}` : ''}${chapter ? `&chapter=${chapter}` : ''}${type ? `&type=${type}` : ''}${search ? `&search=${search}` : ''}`);

        return response.data;
    } catch (e) {
        console.log('fetchPosts', e);
    }
}

export type interfacePost = (id: string | string[] | any) => Promise<Post>

export const fetchPost: interfacePost = async (id) => {
    try {
        const response = await axios.get(`/posts/${id}`);
        return response.data;
    } catch (e) {
        console.log('fetchPost', e);
    }
}

export type interfaceCreatePost = (post: Post) => Promise<Post>

export const createPost: interfaceCreatePost = async (post) => {
    const response = await axios.post('/posts', post);
    return response.data;
}

export type interfaceHidePost = (id: string, hide: boolean) => Promise<Post>

export const hidePost: interfaceHidePost = async (id, hide) => {
    try {
        const response = await axios.post(`/posts/hide`, {id, hide});
        return response.data;
    } catch (e) {
        console.log('hidePost', e);
    }
}


export type interfaceDeletePost = (id: string) => Promise<Post>

export const deletePost: interfaceDeletePost = async (id) => {
    try {
        const response = await axios.delete(`/posts/${id}`);
        return response.data;
    } catch (e) {
        console.log('deletePost', e);
    }
}




export type interfaceUpdatePreview = (file: any) => Promise<string>

export const updatePreview: interfaceUpdatePreview = async (file) => {
    try {

        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`/posts/uploadPreview/`, formData);

        return response.data;
    } catch (e) {
        console.log('updatePreview', e);
    }
}

export type interfaceUpdatePost = (post: Post, postId: string) => Promise<Post>

export const updatePost: interfaceUpdatePost = async (post, postId) => {
    try {
        const response = await axios.patch(`/posts/${postId}`, post);
        return response.data;
    } catch (e) {
        console.log('updatePost', e);
    }
}
