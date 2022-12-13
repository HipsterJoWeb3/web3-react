import React from "react";
import AdminHeaderOption from "../sidebarOptions/AdminHeaderOption";
import AdminInputOption from "../sidebarOptions/AdminInputOption";
import AdminActionsOption from "../sidebarOptions/AdminActionsOption";

export interface SocialLinksSidebarProps {
    socialTitle: string
    setSocialTitle: (arg: any) => void
    socialUrl: string,
    setSocialUrl: (arg: any) => void
    buttonDataSocial?: any
}

const SocialLinksSidebar: React.FC<SocialLinksSidebarProps> = ({buttonDataSocial, socialTitle, setSocialTitle, socialUrl, setSocialUrl}) => {


    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar__options">
                <AdminInputOption titleOption="Social link title" value={socialTitle} setValue={e => setSocialTitle(e.target.value)} placeholder="Enter social link title"/>
                <AdminInputOption titleOption="Social link url" value={socialUrl} setValue={e => setSocialUrl(e.target.value)} placeholder="Enter social link url"/>
                <AdminActionsOption buttonData={buttonDataSocial} titleOption="Actions with the social link"/>
            </div>

        </div>
    )
}


export default SocialLinksSidebar