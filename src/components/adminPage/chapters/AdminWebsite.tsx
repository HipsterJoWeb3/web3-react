import React, { useState} from 'react'
import {generalData, updateGeneralSlice} from "../../../redux/general/slice";
import MyButton from "../../../UI/buttons/MyButton";
import Update from "../../../assets/iconsComponent/Update";
import AdminCard from "../AdminCard";

import {
    keywords,
    socialLinks, updateSeoInfo
} from "../../../hooks/useGeneral";
import AdminInputOption from "../sidebarOptions/AdminInputOption";
import AdminTextareaOption from "../sidebarOptions/AdminTextareaOption";
import AdminTagsOption from "../sidebarOptions/AdminTagsOption";
import {ToastContainer} from "react-toastify";
import AdminAnimation from "./AdminAnimation";
import AdminSocialLinks from "./AdminSocialLinks";
import {useDispatch, useSelector} from "react-redux";




const AdminWebsite = () => {
  const dispatch = useDispatch()
  const { general } = useSelector(generalData)

  const generalState = {...general}
  const metaKeywords = keywords(generalState)
  const [title, setTitle] = useState(generalState.title)

  const [subtitle, setSubtitle] = useState(generalState.subtitle)
  const [keywordsData, setKeywordsData] = useState([])


  const seoUpdate = async () => {
      const data = await updateSeoInfo(generalState, title, subtitle, keywordsData)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
  }




  return (

    <>
        <div className="admin-content__wrap double">
            <div>
                <h1 className="label">Website info</h1>
            </div>

        </div>
        <div className="admin-content__wrap double">
            <AdminAnimation />
            <AdminSocialLinks />
            <div className="admin-content__block">

                <AdminInputOption
                    titleOption="Title"
                    value={title}
                    setValue={(e) => setTitle(e.target.value)}
                    small
                />
            </div>
            <div className="admin-content__block">
                <AdminTextareaOption
                    titleOption="Description"
                    placeholder="Enter description info"
                    value={subtitle}
                    setValue={(value: any) => setSubtitle(value)}
                />
            </div>

            <div className="admin-content__block">
                <h1 className="label">
                    Keywords
                </h1>
                <AdminTagsOption
                    tags={keywordsData}
                    setTags={setKeywordsData}
                    uploadTags={metaKeywords}
                    message="keywords"
                />
            </div>



            <div className="admin-content__block start">
                <MyButton setValue={seoUpdate}><Update/><span>Update info</span></MyButton>
            </div>






        </div>

        <ToastContainer closeButton={true} />
    </>

  )
}

export default AdminWebsite
