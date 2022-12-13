

import AdminHeaderOption from '../sidebarOptions/AdminHeaderOption'
import AdminActionsOption from '../sidebarOptions/AdminActionsOption'
import AdminSelectOption from '../sidebarOptions/AdminSelectOption'
import AdminInputOption from '../sidebarOptions/AdminInputOption'



import React, { useState } from 'react'
import AdminTextareaOption from "../sidebarOptions/AdminTextareaOption";

export interface ChapterSidebarProps {
    inputValue: string
    setInputValue: (value: string) => void
    textAreaValue: string
    setTextAreaValue: (value: string) => void
    numberPosts: string
    setNumberPosts: (value: string) => void
    selectData: any
    buttonData: any
    sidebarTitle: string
}

const ChapterSidebar: React.FC<ChapterSidebarProps> = ({sidebarTitle, inputValue, setTextAreaValue, textAreaValue, setInputValue, selectData, buttonData, setNumberPosts, numberPosts}) => {



  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__options">
        <AdminHeaderOption titleOption={sidebarTitle}/>
        <AdminInputOption
            titleOption="Chapter name"
            placeholder="Enter chapter name"
            value={inputValue}
            setValue={(e) => setInputValue(e.target.value)}
        />
        <AdminTextareaOption
            titleOption="Chapter description"
            placeholder="Enter chapter description"
            value={textAreaValue}
            setValue={setTextAreaValue}
        />
        <AdminSelectOption titleOption="Show on home page" selectData={selectData} />
        <AdminInputOption titleOption="Number of posts per page" value={numberPosts} setValue={(e) => setNumberPosts(e.target.value)} placeholder="Enter number posts"/>
        <AdminActionsOption buttonData={buttonData} titleOption="Actions with the chapter"/>
      </div>
    </div>
  )
}

export default ChapterSidebar
