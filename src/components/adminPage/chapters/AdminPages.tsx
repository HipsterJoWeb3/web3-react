import React, { useState} from "react";

import {pagesData, removePageSlice, updatePageSlice} from "../../../redux/pages/slice";
import AdminCard from "../AdminCard";
import PagesSidebar from "../sidebars/PagesSidebar";
import MyButton from "../../../UI/buttons/MyButton";

import {ToastContainer} from "react-toastify";
import {deletePageAction, getPages, hiddenPageAction} from "../../../hooks/usePages";
import Delete from "../../../assets/iconsComponent/Delete";
import Hide from "../../../assets/iconsComponent/Hide";
import Add from "../../../assets/iconsComponent/Add";
import Edit from "../../../assets/iconsComponent/Edit";
import {useDispatch, useSelector} from "react-redux";


const AdminPages: React.FC = () => {
    const dispatch = useDispatch()
    const {pages} = useSelector(pagesData)

    const pagesList = getPages(pages)

    const [sidebarTitle, setSidebarTitle] = useState('Page info')
    const [pagesListState, setPagesListState] = useState(pagesList)
    const [currentPageId, setCurrentPageId] = useState(pagesList[0]._id)
    const [pageName, setPageName] = useState(pagesList[0]?.title)
    const [pageDescription, setPageDescription] = useState(pagesList[0]?.text)
    const [pageRoute, setPageRoute] = useState(pagesList[0]?.link)
    const [addMode, setAddMode] = useState(false)
    const buttonData = [
        {title: 'Delete', Icon: Delete, callback: () => deletePageData()},
        {title: pagesListState.find((el: any) => el?._id === currentPageId)?.hidden ? 'Show' : 'Hide', Icon: Hide, callback: () => hidePageData()},
        {title: addMode ? 'Add item' : 'Edit item', Icon: addMode ? Add : Edit , to: `${pagesListState.find((el: any) => el._id === currentPageId)?.link}?type=edit`}
    ]


    const changePage = (_: any, value: any) => {
        const currentPage = pagesListState.find((el: any) => el._id === value)
        setCurrentPageId(value)
        setPageName(currentPage?.title)
        setPageDescription(currentPage?.text)
        setPageRoute(currentPage?.link)
    }

    const hidePageData = async () => {
        const data = await hiddenPageAction(currentPageId, !pagesListState.find((el: any) => el?._id === currentPageId)?.hidden, setPagesListState, pagesListState)
        if (data) {
            dispatch(updatePageSlice(data))
        }
    }

    const deletePageData = async () => {
        const data = await deletePageAction(currentPageId, setPagesListState, pagesListState, setCurrentPageId, setPageName, setPageDescription, setPageRoute)
        if (data) {
            dispatch(removePageSlice(data))
        }
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
                                pagesListState.map((item: any) =>
                                    <AdminCard key={item.title} focus={item?._id === currentPageId} value={item?._id} cardData={item} setValue={changePage} />
                                )
                            }
                        </div>

                    </div>
                </div>

                <div className="admin-content__block gap20 d-flex fdc">
                    <div className="admin-sidebar__buttons d-flex jce">
                        <MyButton to={'/admin?chapter=add_page'}><Add/><span>Add new page</span></MyButton>
                    </div>
                    <PagesSidebar
                        sidebarTitle={sidebarTitle}
                        pageDescription={pageDescription}
                        pageName={pageName}
                        pageRoute={pageRoute}
                        buttonData={buttonData}
                    />
                </div>



            </div>
            <ToastContainer closeButton={true} />
        </>
    )
}

export default AdminPages