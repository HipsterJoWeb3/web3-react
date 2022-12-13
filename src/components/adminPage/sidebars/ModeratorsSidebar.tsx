import MyButton from '../../../UI/buttons/MyButton'
import Add from '../../../assets/iconsComponent/Add'


import AdminSimpleOption from '../sidebarOptions/AdminSimpleOption'
import AdminActionsOption from '../sidebarOptions/AdminActionsOption'
import AdminAvatarOption from '../sidebarOptions/AdminAvatarOption'
import AdminButtonListOption from '../sidebarOptions/AdminButtonListOption'
import React, {useMemo, useState} from 'react'

import Ban from '../../../assets/iconsComponent/Ban'
import {postsData} from "../../../redux/posts/slice";
import {banUserInnerSLice, updateUser, userData} from "../../../redux/users/slice";
import {getFormattedDate} from "../../../hooks/useDate";
import {toast, ToastContainer} from "react-toastify";
import {addAdmin, banUser} from "../../../asyncActions/users";
import {useDispatch, useSelector} from "react-redux";
import {Post} from "../../../@types/posts";
import {Users} from "../../../@types/users";
import {toastSuccess} from "../../../hooks/useModalAndAlert";

export interface moderatorsSidebarProps {
  userId: string | any
}

const ModeratorsSidebar: React.FC<moderatorsSidebarProps> = ({userId}) => {

  const dispatch = useDispatch()

  const {posts} = useSelector(postsData)
  const {users} = useSelector(userData)



  const groupButton = posts.filter((post: Post) => post?.userId === userId).map((post: Post, i: number) => {
    return {
      text: post.title.length > 18 ? post.title.slice(0, 18) + '...' : post.title,
      to: `/posts/${post._id}`
    }
  })

  const user = useMemo(() => {
    return users.find((user: Users) => user._id === userId)
  }, [users, userId])





  const buttonData = useMemo(() => [
    {title: user?.ban ? 'Unbanned' : 'Banned' , Icon: Ban, callback: async () => user?.ban ? unbannedUser() : bannedUser()},
    {title: 'Create Admin', Icon: Add, callback: () => addAdminModer()},
  ], [ user])

  const addAdminModer = async () => {
    const userData = await addAdmin(user._id)

    await dispatch(updateUser(userData))
    await toastSuccess(`The user ${user.username} is admin.`)
  }

  const bannedUser = async () => {

    const {username} = await banUser({_id: userId, ban: true})
    await dispatch(banUserInnerSLice({_id: userId, ban: true}))

    await toastSuccess(`The user ${username} is banned.`)

  }

  const unbannedUser = async () => {


    const {username} = await banUser({_id: userId, ban: false})
    await dispatch(banUserInnerSLice({_id: userId, ban: false}))
    await toastSuccess(`The user ${username} is unbanned.`)

  }

  return (
    <>
      <div className="admin-sidebar">
        <div className="admin-sidebar__buttons d-flex jce">
          <MyButton to={'/admin?chapter=add_moderator'}><Add/><span>Add new moderator</span></MyButton>
        </div>
        <div className="admin-sidebar__options">

          <AdminAvatarOption titleOption={'Moderator info'} username={user?.username} avatarUrl={user?.imageUrl}/>
          <AdminSimpleOption titleOption={'Was created'} text={getFormattedDate(user?.createdAt)}/>
          <AdminButtonListOption titleOption={'Posts created and moderated'} emptyMessage="Posts not created" buttonData={groupButton} />
          <AdminActionsOption buttonData={buttonData} titleOption={'Actions with the moderator'}/>


        </div>
      </div>

      <ToastContainer closeButton={true} />
    </>
  )
}

export default ModeratorsSidebar
