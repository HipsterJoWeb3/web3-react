import MyInput from '../../../UI/inputs/MyInput'
import React from "react";

export interface AdminInputOptionProps {
    titleOption?: string
    value?: string
    setValue?: ((e: React.ChangeEvent<HTMLInputElement>) => void )| any
    placeholder?: string
    type?: 'text' | 'password'
    validRegister?: any,
    error?: any,
    small?: boolean
}

const AdminInputOption: React.FC<AdminInputOptionProps> = ({small, titleOption, value, setValue, placeholder, type, validRegister, error}) => {


  return (
    <div className="admin-sidebar__options-item login-form__item">
        {
            titleOption &&
            <h3>{titleOption}</h3>
        }
        {error?.message && <span className="login-form__alert">{error?.message}</span>}
      <MyInput small={small} value={value} error={error?.message} setValue={setValue} placeholder={placeholder} type={type} validRegister={validRegister}/>
    </div>
  )
}

export default AdminInputOption
