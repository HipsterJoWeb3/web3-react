import MyButton from '../../../UI/buttons/MyButton'
import MenuPopup from '../../MenuPopup'
import ButtonList from '../../ButtonList'

import React, { useState, useEffect, useRef } from 'react'

export interface AdminDropDownListProps {
    titleOption?: string
    buttonTitle?: string
    items: Array<{name: string}>
    setDropdownTitle?: ((value: string) => void) | any
    dropdownindex?: number | 0

}

const AdminDropDownList: React.FC<AdminDropDownListProps> = ({dropdownindex, titleOption, buttonTitle, items, setDropdownTitle}) => {

  const [visibleDropdown, setVisibleDropdown] = useState(false)
  const [index, setIndex] = useState(dropdownindex)

  const showDropdown = () => {
    setVisibleDropdown(true)
  }

  const changeDropdown = (item: any, i: number, e: any) => {
    setIndex(i)
    setDropdownTitle(`${item.name} ↓`)
    setVisibleDropdown(false)
  }

  const dropdownRef = useRef<any>()


  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if(!e.path.includes(dropdownRef.current)) {
        setVisibleDropdown(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])



  return (
    <div className="admin-sidebar__options-item">
      {titleOption && <h3>{titleOption}</h3>}
      <div className="admin-sidebar__options-item__dropdown" ref={dropdownRef}>
        <MyButton setValue={showDropdown}><span>{buttonTitle}</span></MyButton>

        {
          visibleDropdown &&
          <MenuPopup>
            <ButtonList color='white' items={items} index={index} setValue={changeDropdown}/>
          </MenuPopup>
        }
      </div>

    </div>
  )
}

export default AdminDropDownList
