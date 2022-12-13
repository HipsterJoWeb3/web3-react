import MyButton from '../../../UI/buttons/MyButton'
import React from 'react'

export interface AdminActionsOptionProps {
    titleOption: string,
    buttonData: {
        title: string,
        Icon?: any,
        to?: string,
        callback?: (e: React.MouseEvent<HTMLButtonElement>) => void
    }[]
}


const AdminActionsOption: React.FC<AdminActionsOptionProps> = ({titleOption, buttonData}) => {


  return (
    <div className="admin-sidebar__options-item">
      <h3 className="admin-sidebar__options-label">{titleOption}</h3>
      <div className="d-flex gap20 admin-sidebar__options-item__inner">
        {
          buttonData.map(({title, Icon, callback, to}) =>
            <MyButton key={title} value={title} setValue={callback} to={to}><Icon/><span>{title}</span></MyButton>
          )
        }

      </div>
    </div>
  )
}

export default AdminActionsOption
