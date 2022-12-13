import MyButton from '../../../UI/buttons/MyButton'
import Add from '../../../assets/iconsComponent/Add'


import AdminHeaderOption from '../sidebarOptions/AdminHeaderOption'
import AdminSimpleOption from '../sidebarOptions/AdminSimpleOption'
import AdminPreviewOption from '../sidebarOptions/AdminPreviewOption'
import AdminActionsOption from '../sidebarOptions/AdminActionsOption'
import AdminButtonListOption from '../sidebarOptions/AdminButtonListOption'


import Delete from '../../../assets/iconsComponent/Delete'
import Edit from '../../../assets/iconsComponent/Edit'
import Hide from '../../../assets/iconsComponent/Hide'


import React, {useMemo} from 'react'
import {getFormattedDate} from "../../../hooks/useDate";
import {deletePostSlice, getPostById, setHidePost, updatePostSlice} from "../../../redux/posts/slice";
import {deletePost, fetchPost, hidePost, updatePost, updatePreview} from "../../../asyncActions/posts";
import { ToastContainer} from "react-toastify";
import {getTitleLessThan} from "../../../hooks/useTitle";
import {toastError, toastSuccess} from "../../../hooks/useModalAndAlert";
import {useDispatch, useSelector} from "react-redux";

export interface PostsSidebarProps {
  currentPostId: string
}

const PostsSidebar: React.FC<PostsSidebarProps> = ({currentPostId}) => {

  const dispatch = useDispatch()

  const currentPost = useSelector(state => getPostById(state, currentPostId))



  const buttonData = [
    {title: 'Edit', Icon: Edit, to: `/posts/${currentPost?._id}?type=edit`},
    {title: 'Delete', Icon: Delete, callback: () => removePost()},
    {title: currentPost?.hidden ? 'Show post' : 'Hide post', Icon: Hide, callback: () => currentPost?.hidden ? unHiddenPost() : hiddenPost()},
  ]

  const removePost = async () => {
    try {
      dispatch(deletePostSlice(currentPost._id))
      await deletePost(currentPost._id)

      toastSuccess(`The post ${getTitleLessThan(currentPost.title, 5)} is hidden.`)
    } catch (e) {
      toastError(`The post ${getTitleLessThan(currentPost.title, 5)} is hidden.`)
    }
  }

  const hiddenPost = async () => {
    await hidePost(currentPost._id, true)
    await dispatch(setHidePost({id: currentPost._id, hide: true}))

    toastSuccess(`The post ${getTitleLessThan(currentPost.title, 5)} is hidden.`)
  }

  const unHiddenPost = async () => {
    await hidePost(currentPost._id, false)
    await dispatch(setHidePost({id: currentPost._id, hide: false}))

    toastSuccess(`The post ${getTitleLessThan(currentPost.title, 5)} is open to everyone again.`)
  }

  const changePreview = async (e: any) => {
    try {
      const file = e.target.files[0];


      const url = await updatePreview(file)
      const post = await fetchPost(currentPost._id)

      const postUpdated = await updatePost({...post, imageUrl: url}, currentPost._id)

      await dispatch(updatePostSlice(postUpdated))

      toastSuccess(`Preview changed`)
    } catch (e) {
      toastError(`Preview not changed`)
    }


  }


  const groupButton = useMemo(() => {
    return currentPost?.tags?.map((tag: any) => {
      return {
        text: tag.value,
        to: `/posts?tags=${tag.value}`,
      }
    })
  }, [currentPost])


  return (
    <>
      {
        currentPost ?
            <div className="admin-sidebar">
              <div className="admin-sidebar__buttons d-flex jce">
                <MyButton to={'/admin?chapter=create_post'}><Add/><span>Add new post</span></MyButton>
              </div>
              <div className="admin-sidebar__options">
                <AdminHeaderOption titleOption={'Post info'} value={currentPost?.views} valueTitle={'views:'}/>

                <AdminPreviewOption url={currentPost?.imageUrl} changePreview={changePreview}/>
                <AdminSimpleOption titleOption="Title" text={currentPost?.title}/>
                <AdminSimpleOption titleOption="Description" text={currentPost?.description}/>
                <AdminSimpleOption titleOption="Created" text={getFormattedDate(currentPost?.createdAt)}/>
                {groupButton && <AdminButtonListOption titleOption="Tags" buttonData={groupButton}/>}
                <AdminActionsOption buttonData={buttonData} titleOption="Actions with the post"/>
              </div>
            </div>
            :
            <div className="admin-sidebar">
                <div className="admin-sidebar__buttons d-flex jce">
                    <MyButton to={'/admin?chapter=create_post'}><Add/><span>Add new post</span></MyButton>
                </div>
              <div className="admin-sidebar__options">
                <AdminSimpleOption titleOption="Post info" text="Post not found"/>
              </div>
            </div>

      }
      <ToastContainer closeButton={true} />
    </>
  )
}

export default PostsSidebar
