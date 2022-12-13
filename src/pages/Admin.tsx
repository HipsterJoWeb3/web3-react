
import AdminNavigation from '../components/adminPage/AdminNavigation'
import React, {useMemo, useEffect, useState} from 'react'

import {tabLinksAdmin} from "../router";
import AdminWebsite from "../components/adminPage/chapters/AdminWebsite";

import {tabLinks} from "../hooks/useCustomRoutes";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {userData} from "../redux/users/slice";






const AdminPage:React.FC  = () => {
    const navigate = useNavigate()


    const {user} = useSelector(userData)
    const {search} = useLocation()

    const chapter = new URLSearchParams(search).get('chapter')

    const showAdminPage = user?._id

    useEffect(() => {

        if(!showAdminPage) {
            navigate('/login')
        }
    }, [])

    const adminNavigation = tabLinks(user).filter(link => link.name !== 'Logout')




    const [indexNavigation, setIndexNavigation] = useState(0)


    const CurrentComponent = useMemo(() => {

        const currentChapter = tabLinksAdmin.filter(item => item.link.split('=')[1] === chapter)[0]

        setIndexNavigation(adminNavigation.findIndex(item => currentChapter?.name === item.name))
        return !currentChapter ? AdminWebsite : currentChapter.Component
    }, [chapter])


    return (

        <div className="admin-wrap">
            {
                showAdminPage &&
                <>
                    <AdminNavigation chapterList={adminNavigation} indexNavigation={indexNavigation}/>
                    <CurrentComponent />
                </>
            }

        </div>
    )
}




export default AdminPage
