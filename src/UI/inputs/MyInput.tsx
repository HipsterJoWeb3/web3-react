import styles from './MyInput.module.scss'
import React from 'react'

interface IProps {
    type?: 'text' | 'password' | 'email'
    value?: string
    setValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
    white?: boolean
    placeholder?: string
    iconUrl?: any
    error?: any
    validRegister?: any
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    small?: boolean
}

const MyInput: React.FC<IProps> = ({small, onKeyPress, type, value, setValue, white, placeholder, iconUrl, error, validRegister}) => {



    return (
    <div className={styles.inputWrap}>
      <input
        value={value}
        onChange={setValue}
        className={iconUrl ? styles.inputWithIcon : `${styles.input} ${error ? styles.input__error : ''} ${white ? styles.inputWhite : ''}`}
        {...validRegister}
        placeholder={placeholder}
        type={type}
        onKeyPress={onKeyPress}
        style={{width: small ? '300px !important' : '100%'}}
      />
      {
        iconUrl && <img src={iconUrl} alt="input"/>
      }
    </div>


  )
}

export default MyInput
