import React, {useState} from 'react'


import Animation from '../components/Animation'

import TextArticle from "../components/articlePage/TextArticle";
import {userData} from "../redux/users/slice";
import MyButton from "../UI/buttons/MyButton";
import Edit from "../assets/iconsComponent/Edit";
import AdminPagesAdd from "../components/adminPage/chapters/AdminPagesAdd";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {pagesData} from "../redux/pages/slice";

const CustomPage: React.FC = () => {

    const {pages} = useSelector(pagesData)

    const navigate = useNavigate()
    const {search} = useLocation()

    const {page} = useParams()


    const type = new URLSearchParams(search).get('type')

    const currentPage = pages.find((item: any) => item.route === `/${page}`)
    const {user} = useSelector(userData)


    return (
        <>

            {
                currentPage && currentPage.content
                    ?
                    <>
                        {
                            type === 'edit'
                                ?
                                <div className="page-container">
                                    <AdminPagesAdd
                                        id={currentPage._id}
                                        edit
                                        titleProp={currentPage.value}
                                        descriptionProp={currentPage.description}
                                        contentProp={currentPage.content}
                                        routeProp={currentPage.route}
                                    />
                                </div>

                                :
                                <>
                                    <div className="gap20 fdc page-container article-content__text">
                                        <h2 className="label">{currentPage.value}</h2>
                                        <TextArticle text={currentPage.content} />
                                        {
                                            user?._id &&
                                            <MyButton setValue={() => navigate(`${currentPage.route}?type=edit`)}><Edit /><span>Edit</span></MyButton>
                                        }
                                    </div>
                                </>
                        }
                    </>
                    :
                    <div className="d-flex jcc aic">
                        <Animation
                            label="404"
                            subtitle={`Page ${'test'} not found`}
                            link={{url: '/', text: 'Go to home page'}}
                        />
                    </div>
            }


        </>
    )
}






export default CustomPage