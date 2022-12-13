import React from "react";

export interface AdminTitleOptionProps {
    value: string | any
    setValue: (value: string) => void,
    title: string
}


const AdminTitleOption: React.FC<AdminTitleOptionProps> = ({value, setValue, title}) => {
    return (
        <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={title}
            className="admin-content__post-title"
        />
    )
}

export default AdminTitleOption