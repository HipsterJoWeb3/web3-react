import React, {useState} from "react";
import AdminTitleOption from "../sidebarOptions/AdminTitleOption";
import EditorJs from "../createPost/Editor";
import {ToastContainer} from "react-toastify";
import MyTextArea from "../../../UI/textarea/MyTextArea";
import AdminInputOption from "../sidebarOptions/AdminInputOption";
import MyButton from "../../../UI/buttons/MyButton";
import {addPageAction, updatePagesAction} from "../../../hooks/usePages";
import {addPageSlice, updatePageSlice} from "../../../redux/pages/slice";
import {useDispatch} from "react-redux";


export interface AdminPagesAddProps {
    id?: string,
    edit?: boolean,
    titleProp?: string,
    contentProp?: string,
    descriptionProp?: string
    routeProp?: string
}

const AdminPagesAdd: React.FC<AdminPagesAddProps> = ({id, edit, routeProp, titleProp, contentProp, descriptionProp}) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState(edit ? titleProp : '')
    const [content, setContent] = useState<any>(edit ? contentProp : [])
    const [description, setDescription] = useState(edit ? descriptionProp : '')
    const [route, setRoute] = useState(edit ? routeProp : '')

    const updatePageData = async () => {
        const data = await updatePagesAction(id, title, description, content, route)
        if(data) {
            dispatch(updatePageSlice(data))
        }
    }

    const addPageData = async () => {
        const data = await addPageAction(title, content, description, route)
        if(data) {
            dispatch(addPageSlice(data))
        }
    }

    return (

        <>

            <div className="admin-content__wrap admin-content__wrap-post">
                <div className={`admin-content post ${edit ? 'edit' : ''}`}>
                    <h1 className="label">Create Page</h1>
                    <div className="d-flex jcb fdc gap20">
                        <AdminTitleOption value={title} setValue={setTitle} title="Enter page name"/>
                        <h1 className="label">Description</h1>
                        <MyTextArea full={true} rows={8} value={description} setValue={setDescription} placeholder="Enter description"></MyTextArea>
                        <h1 className="label">Route</h1>
                        <AdminInputOption value={route} setValue={(e: any) => setRoute(e.target.value)} small placeholder="Enter route page [/page]"/>
                    </div>





                    <div>
                        <h1 className="label">Content</h1>
                        <EditorJs setText={setContent} text={content} tools={true}/>
                    </div>

                    <div className="d-flex gap20">
                        <MyButton to={edit ? route : '/admin?chapter=pages'}><span>{edit ? `← Back to page ${title}` : '← Back to pages'} </span></MyButton>
                        <MyButton setValue={() => {
                            edit ? updatePageData() : addPageData()

                        }}><span>{edit ? 'Edit' : 'Create'} page</span></MyButton>
                    </div>
                </div>



            </div>



            <ToastContainer closeButton={true} />

        </>
    )
}

export default AdminPagesAdd