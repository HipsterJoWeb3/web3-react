import React, {useEffect, useState} from "react";
import AdminCard from "../AdminCard";
import MyButton from "../../../UI/buttons/MyButton";
import Add from "../../../assets/iconsComponent/Add";
import SocialLinksSidebar from "../sidebars/SocialLinksSidebar";
import {generalData, updateGeneralSlice} from "../../../redux/general/slice";
import {
    addSocialLink,
    deleteSocialLink,
    socialLinks,
    updateSocialLink
} from "../../../hooks/useGeneral";
import Delete from "../../../assets/iconsComponent/Delete";
import Edit from "../../../assets/iconsComponent/Edit";
import {useDispatch, useSelector} from "react-redux";


const AdminSocialLinks: React.FC = () => {
    const dispatch = useDispatch()
    const { general } = useSelector(generalData)


    const social = socialLinks(general)
    const [linksData, setLinksData] = useState([])
    const [addMode, setAddMode] = useState(false)




    // social links state
    const [currentSocialId, seCurrentSocialId] = useState<any>(null)
    const [socialTitle, setSocialTitle] = useState<any>('')
    const [socialUrl, setSocialUrl] = useState<any>('')
    const buttonDataSocial = [
          {title: 'Delete', Icon: Delete, callback: () => deleteSocialLinkData()},
          {title: addMode ? 'Add item' : 'Edit item', Icon: addMode ? Add : Edit , callback: () => {
              addMode ? addSocialLinkData() : updateSocialLinkData()
          }},
    ]

    useEffect(() => {
        if(social) {
            setLinksData(social)
            seCurrentSocialId(social[0]?._id)
            setSocialTitle(social[0]?.title)
            setSocialUrl(social[0]?.href)
            setAddMode(false)
        }
    }, [social])

    const changeSocialLinks = (_: any, item: any) => {
        seCurrentSocialId(item)
        // @ts-ignore
        setSocialTitle(linksData.find((el: any) => el?._id === item)?.title)
        // @ts-ignore
        setSocialUrl(linksData.find((el: any) => el?._id === item)?.href)
        setAddMode(false)
    }

    const addAnimItem = () => {
        setAddMode(true)
        seCurrentSocialId('')
        setSocialTitle('')
        setSocialUrl('')
    }

    const deleteSocialLinkData = async () => {
        const data = await deleteSocialLink(setLinksData, general,linksData, currentSocialId, setSocialTitle, setSocialUrl)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }

    const addSocialLinkData = async () => {
        const data = await addSocialLink(socialTitle, socialUrl, setLinksData, general)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }

    const updateSocialLinkData = async () => {
        const data = await updateSocialLink(socialTitle, socialUrl, setLinksData, linksData, general, currentSocialId)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }



    return (
        <>
            <div className="admin-content__block">
                <h1 className="label">
                    Sociable links
                </h1>
                <div className="admin-list__wrap">
                    <div className="admin-list">
                        {
                            linksData.map((item: any, i: number) =>
                                <AdminCard key={item.title} cardData={item} focus={item._id === currentSocialId}  value={item._id} setValue={changeSocialLinks}  />
                            )
                        }
                        <MyButton active={addMode} setValue={addAnimItem}><Add/><span>Add link</span></MyButton>
                    </div>
                </div>

            </div>

            <div className="admin-content__block">
                <h1 className="label">
                    Social links
                </h1>
                <SocialLinksSidebar
                    socialTitle={socialTitle}
                    setSocialTitle={setSocialTitle}
                    socialUrl={socialUrl}
                    setSocialUrl={setSocialUrl}
                    buttonDataSocial={buttonDataSocial}
                />
            </div>
        </>
    )
}

export default AdminSocialLinks