import {Post} from "../@types/posts";
import {Chapter} from "../@types/chapters";
import {toastError, toastSuccess} from "./useModalAndAlert";
import {createPost, updatePost} from "../asyncActions/posts";



export interface fetchPostsProps {
    limit?: string
    offset?: string | string[]
    type?: string | string[]
    author?: string | string[]
    chapter?: string | string[]
    tag?: string | string[]
    posts: Post[]
    chapters?: Chapter[]
    searchValue?: string
}

export type getPostsByParamsProps = (arg: fetchPostsProps) => Post[] | undefined

export const getPostsByParams: getPostsByParamsProps = ({limit, offset, type, author, chapter, tag, posts,  searchValue}) => {

    try {


        if(type === 'popular') {
            if(chapter) {

                const chapterPosts = posts.filter(post => post?.chapter === chapter)
                return chapterPosts.sort((a: any, b: any) => b?.views - a?.views)
            }

            if(tag) {
                const tagPosts = posts.filter(post => post.tags.find(tagItem => tagItem.value === tag))
                return tagPosts.sort((a: any, b: any) => b?.views - a?.views)
            }

            if(searchValue) {

                const value = posts.filter(post => {
                    const title = post.title.toLowerCase().includes(searchValue.toLowerCase())
                    const tags = post.tags.some(tag => tag.value.toLowerCase().includes(searchValue.toLowerCase()))
                    return title || tags
                })
                return value.sort((a: any, b: any) => b?.views - a?.views)
            }

            if(author) {
                const authorPosts = posts.filter(post => post?.author?.username === author)
                return authorPosts.sort((a: any, b: any) => b?.views - a?.views)
            }

            if(limit && offset) {
                return posts.sort((a: any, b: any) => b?.views - a?.views).slice(+offset, +offset + +limit)
            }
        }


        if(type === 'recent') {

            if(chapter) {

                const chapterPosts = posts.filter(post => post?.chapter === chapter)
                return chapterPosts.sort((a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())
            }

            if(tag) {

                const tagPosts = posts.filter(post => post.tags.find(tagItem => tagItem.value === tag))
                return tagPosts.sort((a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())
            }


            if(searchValue) {

                const value = posts.filter(post => {
                    const title = post.title.toLowerCase().includes(searchValue.toLowerCase())
                    const tags = post.tags.some(tag => tag.value.toLowerCase().includes(searchValue.toLowerCase()))
                    return title || tags
                })
                return value.sort((a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())
            }

            if(author) {
                const authorPosts = posts.filter(post => post?.author?.username === author)
                return authorPosts.sort((a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())
            }

            if(limit && offset) {
                return posts.sort((a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()).slice(+offset, +offset + +limit)
            }
        }

        if(tag) {
            const data = posts.filter(post => post.tags.find(tagItem => tagItem.value === tag))
            return data
        }


        if(author) return posts.filter(post => post?.author?.username === author)

        if(searchValue) {

            const value = posts.filter(post => {
                const title = post.title.toLowerCase().includes(searchValue.toLowerCase())
                const tags = post.tags.some(tag => tag.value.toLowerCase().includes(searchValue.toLowerCase()))
                return title || tags
            })
            return value
        }

        if(chapter) {
            return posts.filter(post => post?.chapter === chapter)
        }






    } catch (e) {
        console.log('getPostsByParams', e);
    }
}


export type createPostProps = (data: any) => Promise<Post | undefined>

export const createPostHandler: createPostProps = async (data) => {
    try {
        console.log('createPostHandler', data);
        if(data.title.trim().length === 0) {
            toastError('Title is required')
            return
        }
        if(data.description.trim().length === 0) {
            toastError('Description is required')
            return
        }
        if(!data?.text?.time) {
            toastError('Content is required')
            return
        }

        if(data.tags.length === 0) {
            toastError('Tag is required')
            return
        }

        if(data.chapter === 'Enter') {
            toastError('Chapter is required')
            return
        }

        const res = await createPost(data)
        await toastSuccess('Post created successfully')
        return res
    } catch (e) {
        console.log('createPostHandler', e);
        toastError('Error while creating post')
    }

}

export type updatePostProps = (data: Post, postId: string | any) => Promise<Post | undefined>

export const updatePostHandler: updatePostProps = async (data, postId) => {
    try {

        const res = await updatePost(data, postId)
        toastSuccess('Post updated successfully')
        return res
    } catch (e) {
        console.log('updatePostHandler', e);
        toastError('Error while updating post')
    }
}