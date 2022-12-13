
import MyButton from '../UI/buttons/MyButton'
import React from "react";

export interface GroupButtonsProps {
    groupButtonData: {
        text: string
        to?: string
        href?: string
        Icon?: any
        active?: boolean
        setValue?: (arg: any) => void
        someContextFunction?: (arg: any) => void
        valueRef?: any
    }[]
}

const GroupButtons: React.FC<GroupButtonsProps> = ({groupButtonData}) => {



  return (
    <ul className="group-button">
      {
        groupButtonData && groupButtonData?.map(({valueRef, someContextFunction, text, to, href, Icon, active, setValue}) =>
          <li key={text}><MyButton valueRef={valueRef} someContextFunction={someContextFunction} active={active} href={href} to={to} setValue={setValue}>{Icon && <Icon/>}<span>{text}</span></MyButton></li>
        )
      }
    </ul>
  )
}

export default GroupButtons
