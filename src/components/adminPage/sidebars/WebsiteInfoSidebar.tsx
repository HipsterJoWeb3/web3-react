import MyButton from '../../../UI/buttons/MyButton'
import Update from '../../../assets/iconsComponent/Update'
import AdminInputOption from '../sidebarOptions/AdminInputOption'
import AdminUrlsOption from '../sidebarOptions/AdminUrlsOption'
import React, {useMemo, useState} from 'react'

import {generalData} from "../../../redux/general/slice";
import {useSelector} from "react-redux";


const WebsiteInfoSidebar = () => {



  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')

  const {general} = useSelector(generalData)

  const buttonData = useMemo(() => {
      return general.links.map((link: any) => {
        return {
          text: link.value,
          href: link.url,
          active: true
        }
      })
  }, [general])



  return (
    <>
        <div className="admin-sidebar">
            <div className="admin-sidebar__buttons d-flex jce">
                <MyButton to={'/'}><span>← Back to posts page </span></MyButton>
                <MyButton><Update/><span>Update info</span></MyButton>

            </div>
            <div className="admin-sidebar__options">
                <AdminInputOption titleOption={'Title'} value={title} setValue={setTitle} placeholder={'Enter title'}/>
                <AdminInputOption titleOption={'Subtitle'} value={subtitle} setValue={setSubtitle} placeholder={'Enter subtitle'}/>
                <AdminUrlsOption buttonData={buttonData} titleOption={'Links'}/>
            </div>
        </div>

    </>
  )
}

export default WebsiteInfoSidebar
