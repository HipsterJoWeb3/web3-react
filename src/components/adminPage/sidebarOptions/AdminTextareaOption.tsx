import MyTextArea from "../../../UI/textarea/MyTextArea";
import React, {useState} from "react";

export interface AdminTextareaOptionProps {
    titleOption: string
    value?: string
    setValue?: any
    placeholder?: string
    type?: 'text' | 'password'
    validRegister?: any,
    error?: any
}

const AdminTextareaOption: React.FC<AdminTextareaOptionProps> = ({titleOption, value, setValue, placeholder, type, validRegister, error}) => {


    return (
        <div className="admin-sidebar__options-item login-form__item">
            <h3>{titleOption}</h3>
            <MyTextArea value={value} setValue={setValue} placeholder={placeholder} rows={4}></MyTextArea>
        </div>
    )
}

export default AdminTextareaOption