
import React, {useMemo, useState} from 'react'

import AdminHeaderOption from "../sidebarOptions/AdminHeaderOption";

import AdminInputOption, {AdminInputOptionProps} from "../sidebarOptions/AdminInputOption";

import AdminTextareaOption from "../sidebarOptions/AdminTextareaOption";
import Delete from "../../../assets/iconsComponent/Delete";
import Hide from "../../../assets/iconsComponent/Hide";
import AdminActionsOption from "../sidebarOptions/AdminActionsOption";
import Add from "../../../assets/iconsComponent/Add";

export interface AnimationSidebarProps {
    inputValue: string
    setInputValue: any
    textareaValue: string
    setTextareaValue: any
    buttonData: {
        title: string,
        Icon?: any,
        to?: string,
        callback?: (e: React.MouseEvent<HTMLButtonElement>) => void
    }[]
    sidebarTitle: string
}

const AnimationSidebar: React.FC<AnimationSidebarProps> = ({sidebarTitle, inputValue, setInputValue, setTextareaValue, textareaValue, buttonData}) => {




    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar__options">
                <AdminHeaderOption titleOption={sidebarTitle} />
                <AdminInputOption
                    titleOption="Label"
                    small
                    placeholder="Enter label"
                    value={inputValue}
                    setValue={(e) => setInputValue(e.target.value)}
                />
                <AdminTextareaOption
                    titleOption="Animation content"
                    placeholder="Enter animation content"
                    value={textareaValue}
                    setValue={setTextareaValue}
                />
                <AdminActionsOption buttonData={buttonData} titleOption="Actions with the animation item"/>
            </div>
        </div>
    )
}

export default AnimationSidebar