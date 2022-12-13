import MyButton from '../../UI/buttons/MyButton'
import Add from '../../assets/iconsComponent/Add'

import AdminOptionsSidebar from './AdminOptionsSidebar'
import AdminSimpleOption from './sidebarOptions/AdminSimpleOption'
import AdminPreviewOption from './sidebarOptions/AdminPreviewOption'
import AdminHeaderOption from './sidebarOptions/AdminHeaderOption'
import AdminActionsOption from './sidebarOptions/AdminActionsOption'
import AdminInputOption from './sidebarOptions/AdminInputOption'
import AdminAvatarOption from './sidebarOptions/AdminAvatarOption'
import AdminButtonListOption from './sidebarOptions/AdminButtonListOption'
import AdminSelectOption from './sidebarOptions/AdminSelectOption'
import AdminUrlsOption from './sidebarOptions/AdminUrlsOption'

import Delete from '../../assets/iconsComponent/Delete'
import Ban from '../../assets/iconsComponent/Ban'

const imageUrl = 'https://img10.reactor.cc/pics/post/MiakanaYuri-Kitagawa-Marin-Sono-Bisque-Doll-wa-Koi-wo-Suru-Anime-7478419.jpeg'
const imageUrl2 = 'https://img10.reactor.cc/pics/post/Megumin-KonoSuba-Anime-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-7582022.jpeg'
const avatarUrl = 'https://images.unsplash.com/flagged/photo-1562599838-8cc871c241a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'


import React, { useState } from 'react'


const AdminSidebar: React.FC = () => {

  const buttonData = [
    {title: 'Banned', Icon: Ban, callback: (action) => {console.log(action)}},
    {title: 'Delete', Icon: Delete, callback: (action) => {console.log(action)}},
  ]

  const groupButton = [...new Array(12)].map((_, i) => {
    return {
      text: `Post# ${i}`,
      to: `/posts/${i}`
    }
  })

  const [input, setInput] = useState()

  const selectData = [
    {title: 'Popular post', callback: (value) => console.log(value)},
    {title: 'Recent post', callback: (value) => console.log(value)},
  ]


  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__buttons d-flex jce">
        <MyButton><Add/><span>Add new moderator</span></MyButton>
      </div>
      <div className="admin-sidebar__options">
        <AdminUrlsOption titleOption={'Links'} />
        <AdminSelectOption titleOption={'Show on home page'} selectData={selectData} />
        <AdminButtonListOption titleOption={'Posts created and moderated'} buttonData={groupButton} />
        <AdminAvatarOption titleOption={'Moderator info'} username={'User 1'} avatarUrl={avatarUrl}/>
        <AdminInputOption titleOption={'Title'} value={input} setValue={setInput} placeholder={'Enter title'}/>
        <AdminHeaderOption titleOption={'Post info'} value={13} valueTitle={'views:'}/>
        <AdminActionsOption buttonData={buttonData} titleOption={'Actions with the moderator'}/>
        
        <AdminSimpleOption titleOption={'Was created  props'} text={'Jun 22, 2022'}/>
      </div>
    </div>
  )
}

export default AdminSidebar
