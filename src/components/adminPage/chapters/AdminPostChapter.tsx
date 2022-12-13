
import AdminCard from '../AdminCard'
import ChapterSidebar from '../sidebars/ChapterSidebar'
import MyButton from "../../../UI/buttons/MyButton";
import Add from "../../../assets/iconsComponent/Add";
import React, {useMemo, useState} from "react";
import {chaptersData} from "../../../redux/chapters/slice";
import {
    actionChapter, deleteChapterAction,
    getChapters, hideChapter,
} from "../../../hooks/useChapters";
import Delete from "../../../assets/iconsComponent/Delete";
import Hide from "../../../assets/iconsComponent/Hide";
import Edit from "../../../assets/iconsComponent/Edit";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";


const AdminPostChapter: React.FC = () => {


  const {chapters} = useSelector(chaptersData)
  const chapterData = getChapters(chapters)


  const [chapterList, setChapterList] = useState(chapterData)
  const [currentChapterId, setCurrentChapterId] = useState(chapterData[0]._id)
  const [inputValue, setInputValue] = useState(chapterData[0]?.title)
  const [textAreaValue, setTextAreaValue] = useState(chapterData[0]?.text)
  const [addMode, setAddMode] = useState(false)
  const [chapterSidebarTitle, setChapterSidebarTitle] = useState('Edit chapter')
  const [showRecent, setShowRecent] = useState(chapterData[0].showRecent)
  const [showPopular, setShowPopular] = useState(chapterData[0].showRecent)
  const [numberPosts, setNumberPosts] = useState(String(chapterData[0]?.count))
  const buttonData = [
      {title: 'Delete', Icon: Delete, callback: () => deleteChapterAction(chapterList, currentChapterId, setChapterList, setCurrentChapterId, setInputValue, setTextAreaValue, setShowRecent, setShowPopular, setNumberPosts )},
      {title: chapterList.find((el: any) => el?._id === currentChapterId)?.hidden ? 'Show' : 'Hide', Icon: Hide, callback: () => hideChapter(chapterList, setChapterList, currentChapterId, !chapterList.find((el: any) => el?._id === currentChapterId)?.hidden)},
      {title: addMode ? 'Add item' : 'Edit item', Icon: addMode ? Add : Edit , callback: () => {
          actionChapter(inputValue, textAreaValue, numberPosts, addMode, chapterList, setChapterList, setAddMode, setChapterSidebarTitle, {
             _id: addMode ?  null : currentChapterId,
             value: inputValue,
             description: textAreaValue,
             count: numberPosts,
             hidden: addMode ? false : chapterList.find((el: any) => el?._id === currentChapterId)?.hidden,
             showRecent,
             showPopular
          })
      }},
  ]




  const selectData = useMemo(() => {
      return [
          {
              title: 'Popular post',
              callback: (value: any) => setShowPopular(value),
              active: showPopular
          },
          {
              title: 'Recent post',
              callback: (value: any) => setShowRecent(value),
              active: showRecent
          },
      ]
  }, [chapterList, currentChapterId, showPopular, showRecent])


  const changeChapter = (_: any, item: any) => {
      setCurrentChapterId(item)
      const chapter = chapterList.find((el: any) => el?._id === item)
      setInputValue(chapter?.title)
      setTextAreaValue(chapter?.text)
      setAddMode(false)
      setShowRecent(chapter?.showRecent)
      setShowPopular(chapter?.showPopular)
      setChapterSidebarTitle('Edit chapter')
  }


  const addChapterItem = () => {
      setAddMode(true)
      setInputValue('')
      setTextAreaValue('')
      setChapterSidebarTitle('Add chapter')
      setCurrentChapterId('')
      setNumberPosts('0')

  }




  return (
      <>
          <div className="admin-content__wrap double">

              <div className="admin-content__block">
                  <h1 className="label">
                      Chapters
                  </h1>
                  <div className="admin-list__wrap ">
                      <div className="admin-list">
                          {
                              chapterList.map((item: any) =>
                                  <AdminCard key={item.title} value={item?._id} focus={item?._id === currentChapterId} cardData={item} setValue={changeChapter}/>
                              )
                          }
                          <MyButton active={addMode} setValue={addChapterItem}><Add/><span>Add item</span></MyButton>
                      </div>

                  </div>
              </div>

              <div className="admin-content__block">
                  <h1 className="label">
                      Chapter info
                  </h1>
                  <ChapterSidebar
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                      textAreaValue={textAreaValue}
                      setTextAreaValue={setTextAreaValue}
                      numberPosts={numberPosts}
                      setNumberPosts={setNumberPosts}
                      selectData={selectData}
                      buttonData={buttonData}
                      sidebarTitle={chapterSidebarTitle}
                  />
              </div>



          </div>
          <ToastContainer closeButton={true} />
      </>

  )
}

export default AdminPostChapter
