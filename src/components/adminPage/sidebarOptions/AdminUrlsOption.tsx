import MyButton from '../../../UI/buttons/MyButton'
import MyInput from '../../../UI/inputs/MyInput'
import Add from '../../../assets/iconsComponent/Add'
import Delete from '../../../assets/iconsComponent/Delete'
import Edit from '../../../assets/iconsComponent/Edit'
import GroupButtons from '../../GroupButtons'
import MenuPopup from '../../MenuPopup'

import { motion  } from 'framer-motion'

export interface AdminUrlsOptionProps {
    titleOption: string
    buttonData?: {
      text: string
      href: string
      active: boolean
    }[]
    setButtonValue?: (arg: any) => void
    removeItem?: (url: string) => void
}

import React, { useState, useEffect, useRef } from 'react'
import {useHandleClick} from "../../../hooks/useHandleClick";


const AdminUrlsOption: React.FC<AdminUrlsOptionProps> = ({titleOption, buttonData, setButtonValue}) => {


  const [index, setIndex] = useState(-1)
  const [inputTitle, setInputTitle] = useState('')
  const [inputUrl, setInputUrl] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')
  const [emptyTitle, setEmptyTitle] = useState(false)
  const [popupChange, setPopupChange] = useState(false)
  const [popupLinkAction, setPopupLinkAction] = useState(false)
  const [popupPosition, setPopupPosition] = useState({
    x: 0,
    y: 0
  })

  const linksRef = useRef()

  useEffect(() => {
    useHandleClick(linksRef, () => {
      setPopupChange(false)
    })
  }, [buttonData])



  const showPopupLink = (e) => {
    setPopupChange(false)
    setPopupLinkAction(false)
    setPopupChange(true)
    setPopupPosition({x: e.pageX, y: e.pageY})
  }

  const someContextFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.textContent)
    setPopupChange(true)
    setPopupPosition({x: e.pageX, y: e.pageY})
  }

  const addLinks = () => {
    if(!inputTitle.trim().length) {
      setEmptyTitle(true)
      return false
    }

    setButtonValue([...buttonData, {text: inputTitle, href: inputUrl, someContextFunction }])
    setPopupChange(false)
    setEmptyTitle(false)
  }




  const [linkAction, setLinkAction] = useState('menu')


  const changeLinkAction = (_, value) => {
    setLinkAction(value)
  }

  const changeInputTitle = (e) => {
    setInputTitle(e.target.value)
  }

  const changeInputUrl = (e) => {
    setInputUrl(e.target.value)
  }

  const removeLinkAction = (_, value) => {
    console.log('removeLinkAction', value)
  }



  return (
    <div ref={linksRef} className="admin-sidebar__options-item admin-sidebar__options-links__wrap">
      <MyButton setValue={showPopupLink}><Add /><span>add link</span></MyButton>
      <p>{currentUrl}</p>
      <div className="admin-sidebar__options-links">
        <GroupButtons groupButtonData={buttonData} />
      </div>
      {
        popupChange &&
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          dragConstraints={{ left: popupPosition.x, top: popupPosition.y }}
          animate={{ opacity: 1, scale: 1, left: popupPosition.x + 120 + 'px', top: popupPosition.y - 40  + 'px', position: 'absolute'}}
          transition={{ duration: 0.2 }}
        >
          <MenuPopup active={popupChange} >
            <MyInput white={true} placeholder={'Title link'} value={inputTitle} setValue={changeInputTitle}/>
            <MyInput white={true} placeholder={'URL link'} value={inputUrl} setValue={changeInputUrl}/>
            <MyButton setValue={addLinks} white={true} active={true}><Add /><span>{emptyTitle ? 'Enter title' : 'Add link'}</span></MyButton>
          </MenuPopup>
        </motion.div>

      }
      {
        popupLinkAction &&
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          dragConstraints={{ left: popupPosition.x, top: popupPosition.y }}
          animate={{ opacity: 1, scale: 1, left: popupPosition.x + 120 + 'px', top: popupPosition.y  + 'px', position: 'absolute'}}
          transition={{ duration: 0.2 }}
        >

          <MenuPopup active={popupChange}>
            <span style={{color: 'white'}}>{buttonData[index]?.text} edit</span>
            <MyButton setValue={changeLinkAction} value={'edit'} white={true} active={true}><Edit /><span>Edit link</span></MyButton>
            <MyButton setValue={removeLinkAction} value={'delete'} white={true} active={true}><Delete /><span>Delete link</span></MyButton>
          </MenuPopup>
        </motion.div>

      }
    </div>
  )
}

export default AdminUrlsOption
