import React from "react";
import LazyLoader from "../../LazyLoader";

export interface AdminAvatarOptionProps {
    titleOption?: string
    avatarUrl?: string
    username?: string
}

const AdminAvatarOption: React.FC<AdminAvatarOptionProps> = ({titleOption, avatarUrl, username}) => {


  return (
    <div className="admin-sidebar__options-item">
        <h3>{titleOption}</h3>
        <div className="d-flex aic gap20">
            <div className="admin-sidebar__options-item__avatar">
                <LazyLoader image={{
                    src: avatarUrl,
                    alt: username
                }}/>
                <p className="admin-sidebar__options-username">{username}</p>
            </div>
        </div>
    </div>
  )
}

export default AdminAvatarOption
