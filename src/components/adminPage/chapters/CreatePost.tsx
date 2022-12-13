import React, {useState, useMemo, useCallback, useEffect} from 'react'
import AdminTitleOption from "../sidebarOptions/AdminTitleOption";
import {chaptersData} from "../../../redux/chapters/slice";
import AdminDropDownList from "../sidebarOptions/AdminDropDownList";
import PreviewPost from "../createPost/PreviewPost";
import {updatePreview} from "../../../asyncActions/posts";
import {toast, ToastContainer} from "react-toastify";
import CreatePostSidebar from "../sidebars/CreatePostSidebar";
import {userData} from "../../../redux/users/slice";
import {createPostHandler, updatePostHandler} from "../../../hooks/usePosts";
import {Post} from "../../../@types/posts";
import {updatePostSlice} from "../../../redux/posts/slice";
import {toastSuccess} from "../../../hooks/useModalAndAlert";
import EditorJs from "../createPost/Editor";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export interface CreatePostProps {
    edit?: boolean,
    post?: Post
}


const CreatePost: React.FC<CreatePostProps> = ({edit, post}) => {
  const dispatch = useDispatch()
    // @ts-ignore
  const [dropdownTitle, setDropdownTitle] = useState('Enter type ↓')
  const [title, setTitle] = useState<string>('')
  const {chapters} = useSelector(chaptersData)
  const [postImageUrl, setPostImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState<any>(null)
  const [tags, setTags] = useState( [])
  const postId = edit ? post?._id : ''
  const {user} = useSelector(userData)
  const navigate = useNavigate()
  const [updateEditor, setUpdateEditor] = useState(false)

  useEffect(() => {
      if(post?._id && edit) {
          // @ts-ignore
          setDropdownTitle(`${post.chapter.value} ↓`)
          setTitle(post.title)
          setPostImageUrl(post.imageUrl)
          setDescription(post.description)
          setContent(post.text)
          setUpdateEditor(true)
      }
  }, [post, edit])


  const dropdownData = useMemo(() => {
    return chapters.map((category: any) => {
      return {
        name: category.value,
      }

    })
  }, [chapters])

  const uploadPreview = async (e: any) => {
    const file = e.target.files[0]
    const url = await updatePreview(file)
    setPostImageUrl(url)
    toastSuccess(`Preview uploaded`)
  }

  const setUrl = (url: any) => {
    setPostImageUrl(url)
    toastSuccess(`Preview uploaded`)
  }

  const postData = useMemo(() => {
    return {
        title,
        description,
        text: content,
        imageUrl: postImageUrl,
        // @ts-ignore
        tags: tags.map(tag => tag?.text),
        userId: user?._id,
        chapter: dropdownTitle.split(' ')[0],
    }
  }, [title, dropdownTitle, postImageUrl, description, content, tags, user, postId])


  const editPost = useCallback(async() => {
    const post = await updatePostHandler(postData, postId)
    if (post) {
        await dispatch(updatePostSlice(post))
        await navigate(`/posts/${post._id}`)

    }

  }, [postData])

  const addPost = useCallback(async() => {

    const post = await createPostHandler(postData)
    if (post) {
        await navigate(`/posts/${post._id}`)
    }
  }, [postData])


  return (
    <>

        <div className="admin-content__wrap admin-content__wrap-post">
            <div className="admin-content post">
              <h1 className="label">Create Post</h1>
              <div className="d-flex jcb aic gap20">
                <AdminTitleOption value={title} setValue={setTitle} title="Enter title"/>
                <AdminDropDownList buttonTitle={dropdownTitle} items={dropdownData} dropdownindex={-1} setDropdownTitle={setDropdownTitle}/>
              </div>

              <PreviewPost uploadPreview={uploadPreview} url={postImageUrl} setUrl={setUrl}/>

              <div>
                <h1 className="label">Content</h1>
                  {
                        updateEditor && <EditorJs text={content} setText={setContent}/>
                  }
              </div>
            </div>
            <CreatePostSidebar
                setTags={setTags}
                tags={tags}
                description={description}
                setDescription={setDescription}
                action={() => edit ? editPost() : addPost()}
                edit={edit}
                uploadTags={post?.tags}
            />


        </div>

        <ToastContainer closeButton={true} />

    </>
  )
}

export default CreatePost
