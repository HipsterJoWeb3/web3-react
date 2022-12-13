import React from 'react'

interface IProps {
    children: React.ReactNode,
    style?: React.CSSProperties,
    className?: string,
    active?: boolean,
}

const Menu: React.FC<IProps> = ({children, style, className}) => {

  return (

      <div style={style} className={`menu-popup ${className}`}>
        {children}
      </div>

  )
}


export default Menu
