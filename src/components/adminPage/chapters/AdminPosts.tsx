import MyInput from '../../../UI/inputs/MyInput'
import iconSearch from '../../../assets/img/search.svg'
import PostsSidebar from '../sidebars/PostsSidebar'
import AdminCard from '../AdminCard'
import {postsData} from "../../../redux/posts/slice";
import React, {useMemo, useState} from "react";
import ScrollWrap from "../../ScrollWrap";
import MyButton from "../../../UI/buttons/MyButton";
import Add from "../../../assets/iconsComponent/Add";
import {useSelector} from "react-redux";
import {Post} from "../../../@types/posts";


const AdminPosts: React.FC = () => {


  const {posts} = useSelector(postsData)

  const [searchValue, setSearchValue] = useState('')

  const postsItems = useMemo(() => {
    return posts.map((post: Post, i: number) => {
      return {
        ...post,
        link: `/posts/${post?._id}`,
        image: post?.imageUrl,
        date: post?.createdAt,
      }
    }).filter((post: Post) => post?.title?.toLowerCase().includes(searchValue.toLowerCase()))
  }, [posts, searchValue])

  const setSearchPosts = (e: any) => {
    setSearchValue(e.target.value)
  }

  const [currentPostId, setCurrentPostId] = useState(postsItems[0]?._id)
  const currentPosts = useMemo(() => {
    return postsItems.find((post: Post) => post._id === currentPostId)
  }, [ currentPostId])

  const changeCurrentPostId = (e: any, value: any) => {
    setCurrentPostId(value)
  }

  return (

    <div className="admin-content__wrap mobile-reverse">
      <div className="admin-content full">
        <h1 className="label">Posts</h1>
        <div className="admin-list__wrap">
          <div className="admin-list__header d-flex jcb aic">
            <div className="admin-list__count">Count: <span>{postsItems.length}</span></div>
            <MyInput placeholder={'Search posts'} iconUrl={iconSearch} setValue={setSearchPosts} value={searchValue}/>
          </div>
            <ScrollWrap>

               <div className="admin-list" style={{marginBottom: '40px'}}>
                {
                   postsItems && postsItems.map((item: Post) =>
                       <AdminCard key={item.title} cardData={item} setValue={changeCurrentPostId} value={item._id}/>
                    )
                }
              </div>
            </ScrollWrap>
        </div>
      </div>
      {
        currentPosts?._id
            ?
            <PostsSidebar currentPostId={currentPosts?._id}/>
            :
            <div className="admin-sidebar">
                <div className="admin-sidebar__content d-flex jce">
                    <MyButton to="/admin?chapter=create_post"><Add/><span>Add post</span></MyButton>
                </div>
            </div>
            }
    </div>
  )
}

export default AdminPosts
