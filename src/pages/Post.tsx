import React, {useCallback, useEffect, useRef, useState} from 'react'

import ArticleAuthor from "../components/articlePage/ArticleAuthor";
import {getFormattedDate} from "../hooks/useDate";
import ArticleShare from "../components/articlePage/ArticleShare";

import CreatePost from "../components/adminPage/chapters/CreatePost";
import TextArticle from "../components/articlePage/TextArticle";
import ArticleAnchor from "../components/articlePage/ArticleAnchor";
import {fetchPost} from "../asyncActions/posts";
import ScrollToTop from "../components/ScrollToTop";
import {useLocation, useParams} from "react-router-dom";
import Loading from "../components/Loading";
import LazyLoader from "../components/LazyLoader";


const Post: React.FC = () => {


    const [indexAnchor, setIndexAnchor] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [updateAnchor, setUpdateAnchor] = useState(false)
    const {search} = useLocation()

    const type = new URLSearchParams(search).get('type')

    const [anchor, setAnchor] = useState<any>(null)
    const {id} = useParams()



    const [post, setPost] = useState<any>({
        _id: undefined,
        title: '',
        description: '',
        content: ''
    })

    const getPost = async () => {
        const article = await fetchPost(id)

        setPost(article)
    }

    let articleRef = useRef<any>(null)


    // useEffect(() => {
    //
    //     if(type !== 'edit' && post.text?.blocks?.length > 0) {
    //         const articleAnchor = document?.querySelector('#post-content')
    //         console.log(articleAnchor)
    //
    //         // @ts-ignore
    //         const heading = Array?.from(articleAnchor?.getElementsByTagName('h2', 'h1'))?.map(el => { return {el, name: el['innerText']} })
    //         setAnchor(heading)
    //
    //
    //         const observer = new IntersectionObserver((entries) => {
    //             entries.forEach(entry => {
    //                 if (entry.isIntersecting) {
    //                     // @ts-ignore
    //                     setIndexAnchor(heading?.findIndex(el => el.name == entry.target['innerText']))
    //                 }
    //             })
    //         })
    //
    //         const targets = articleAnchor?.querySelectorAll('h2, h3, h4, h5, h6')
    //         targets.forEach((target: any) => {
    //             observer.observe(target)
    //
    //         })
    //
    //
    //         return () => observer.disconnect();
    //     }
    //
    //     if(post._id) {
    //         setLoading(false)
    //     }
    //
    //
    //
    // }, [post.text?.blocks?.length, type])

    useEffect(() => {
            if(post._id) {
                setLoading(false)
            }

    }, [post])

    useEffect(() => {
        getPost()

    }, [type])


    return (
        loading
        ?
        <Loading message="Loading post"/>
        :
        <>
            <ScrollToTop />
            {type === 'edit' ?
                <CreatePost edit={true} post={post}></CreatePost>
                :
                <>
                    {post && <div className="article-wrap">
                        <h1 className="article-label label">{post.title}</h1>
                        <div className="article">
                            <div className="article-content">
                                <ArticleAuthor author={post.author} date={getFormattedDate(post.createdAt)}/>

                                <div className="article-content__post">
                                    {
                                        post?.imageUrl &&
                                        <div className="article-content__post-image">
                                            <LazyLoader
                                                image={{
                                                    src: post.imageUrl,
                                                    alt: post.title
                                                }}
                                            />
                                        </div>
                                    }
                                    <div
                                        className="article-content__text"
                                        id="post-content"
                                    >
                                        <TextArticle  text={post.text}/>
                                    </div>
                                </div>

                            </div>
                            <div className="article-content__sidebar">
                                <div className="article-content__sidebar-inner">
                                    {/*<ArticleAnchor anchor={anchor} index={indexAnchor}/>*/}
                                    <ArticleShare id={post?._id} tags={post?.tags}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </>
            }

        </>
    )
}




export default Post