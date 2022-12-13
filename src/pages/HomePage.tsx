

import ArticlesWrap from "../components/ArticlesWrap";
import latest from '../assets/img/latest.svg'
import popular from '../assets/img/popular.svg'
import React, {useMemo} from "react";


import Animation from '../components/Animation'
import {useSelector} from "react-redux";
import {postsData} from "../redux/posts/slice";
import {generalData} from "../redux/general/slice";
import {chaptersData} from "../redux/chapters/slice";



const Home:React.FC = () => {
    const {posts} = useSelector(postsData)
    const {general} = useSelector(generalData)
    const {chapters} = useSelector(chaptersData)

    const items = useMemo(() => posts, [posts])



    const metaSeo = useMemo(() => {
        return {
            title: general?.title,
            description: general?.description,
            keywords: general?.keywords,
        }
    }, [general])




    const recentChapters = useMemo(() => chapters?.filter((el: any) => el.showRecent), [chapters])
    const popularChapters = useMemo(() => chapters?.filter((el: any) => el.showPopular), [chapters])





    return (
        <>

            <Animation
                label="v3v"
                subtitle="web 3 is the future"
            />


            {
                recentChapters?.map((el: any, index: number) =>
                    (items && <ArticlesWrap
                        items={items.filter((item: any) => item.chapter === el?._id)?.sort((a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())?.splice(0, 6)}
                        title={`Recent ${el?.value}`}
                        iconUrl={latest}
                        orientationType={'grid'}
                        key={index}
                        url={`/posts?type=recent&chapter=${el?.value}`}/>)

                )
            }

            {
                popularChapters?.map((el: any, index: number) =>
                    (items && <ArticlesWrap
                        items={items.filter((item: any) => item.chapter === el?._id)?.sort((a: any, b: any) => b.views - a.views)?.splice(0, 6)}
                        title={`Popular ${el?.value}`}
                        iconUrl={popular}
                        orientationType={'grid'}
                        key={index}
                        url={`/posts?type=popular&chapter=${el?.value}`}
                    />)
                )
            }

        </>

    )
}





export default Home

