import styles from './MyButton.module.scss'
import {Link} from "react-router-dom";
import React from 'react'

interface IProps {
    children: React.ReactNode
    type?: 'button' | 'submit' | 'reset'
    white?: boolean
    active?: boolean
    to?: string
    href?: string
    setValue?: ((e?: React.MouseEvent<HTMLButtonElement>, value?: string, i?: number) => void) | any
    value?: any,
    valueRef?: any,
    someContextFunction?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const MyButton: React.FC<IProps> = ({someContextFunction, children, type, white, active, to, href, setValue = () => {}, value, valueRef}) => {
  const onContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    someContextFunction && someContextFunction(e)
  }

  return (
    <>
      {
          to &&
          <Link
              to={to}
              className={`${active ? styles.buttonActive : styles.button} 
              ${white ? styles.white : ''} `}
          >
              {children}
          </Link>}
      {
          href &&
          <a
              href={href}
              className={`${active ? styles.buttonActive : styles.button} ${white ? styles.white  : ''} `}
              target="_blank"
          >{children}</a>}
      {
          (!to && !href) &&
          <button
              type={type}
              className={`${active ? styles.buttonActive : styles.button} ${white ? styles.white  : ''} `}
              onClick={e => valueRef ? valueRef.current.click() : setValue(e, value)}
              onContextMenu={onContextMenu}
          >{children}</button>}
    </>
  )
}



export default MyButton
