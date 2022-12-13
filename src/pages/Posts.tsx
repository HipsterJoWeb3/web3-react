

import ArticlesFilter from '../components/ArticlesFilter'
import Articles from '../components/Articles'
import Options from '../components/Options'

import React, {useCallback, useEffect, useMemo, useState} from 'react'



import {ToastContainer} from "react-toastify";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {postsData} from "../redux/posts/slice";
import {getPostsByParams} from "../hooks/usePosts";
import {chaptersData} from "../redux/chapters/slice";


const PostsPage: React.FC = () => {

    const [orientation, setOrientation] = useState('grid')

    const {search} = useLocation()

    const getQueryParams = useCallback((param: string) => {
        return new URLSearchParams(search).get(param)
    }, [search])

    const [chapter, setChapter] = useState('')
    const [author, setAuthor] = useState('')
    const [tags, setTags] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [type, setType] = useState('')



    const setPostsOrientation = (_: any, value: any) => setOrientation(value)
    const { posts } = useSelector(postsData)
    const { chapters } = useSelector(chaptersData)

    const currentPosts = useMemo(() => {
        return getPostsByParams({posts, chapter, author, tag: tags, searchValue, type})
    }, [posts, chapter, author, tags, searchValue, type, search])

    useEffect(() => {
        setAuthor(getQueryParams('author') || '')
        setTags(getQueryParams('tags') || '')
        setSearchValue(getQueryParams('search') || '')
        setType(getQueryParams('type') || 'recent')
        setChapter(chapters.find((el: any) => el.value === getQueryParams('chapter'))?._id || '')
    }, [search])

    return (
        <>
            <h1 className="label">
                {
                    author ? `Posts by ${author}` :
                        tags ? `Posts by tag ${tags}` :
                            chapter ? `Posts by chapter ${getQueryParams('chapter')}` :
                                searchValue ? `Posts by search ${searchValue}` :
                                    'Posts'

                }
            </h1>
            <ArticlesFilter />
            <div className={`articles`}>
                {
                    currentPosts?.length
                        ?
                        <Articles orientation={orientation} items={currentPosts} />


                        :
                        <div className="d-flex jcc aic gap20">
                            <h2 className="label">Posts not founded.</h2>
                        </div>
                }
                <Options orientation={orientation} setOrientation={setPostsOrientation}/>
            </div>
            <ToastContainer closeButton={true} />
        </>
    )
}



export default PostsPage
