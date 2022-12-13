
export interface AdminHeaderOptionProps {
    titleOption: string
    value?: string | number
    valueTitle?: string
}

import React from "react";

const AdminHeaderOption: React.FC<AdminHeaderOptionProps> = ({titleOption, value, valueTitle}) => {


  return (
    <div className="admin-sidebar__options-item">
      <div className="d-flex aic jcb">
        <h2>{titleOption}</h2>
        <p>{valueTitle} <span>{value}</span></p>
      </div>
    </div>
  )
}

export default AdminHeaderOption
