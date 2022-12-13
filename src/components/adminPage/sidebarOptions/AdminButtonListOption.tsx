import GroupButtons from '../../GroupButtons'
import React from "react";

export interface AdminButtonListOptionProps {
    titleOption: string
    buttonData: {
        text: string
        to: string
    }[]
    emptyMessage?: string
}

const AdminButtonListOption: React.FC<AdminButtonListOptionProps> = ({titleOption, buttonData, emptyMessage}) => {


  return (
    <div className="admin-sidebar__options-item">
      <h3>{titleOption}</h3>
        {
            buttonData.length > 0
            ?
            <GroupButtons groupButtonData={buttonData}/>
            :
            <div className="admin-sidebar__options-item__inner">
                <p>{emptyMessage}</p>
            </div>
        }
    </div>
  )
}


export default AdminButtonListOption
