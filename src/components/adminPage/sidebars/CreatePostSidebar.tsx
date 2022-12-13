import MyButton from '../../../UI/buttons/MyButton'
import Add from '../../../assets/iconsComponent/Add'
import React from 'react'
import AdminTagsOption from "../sidebarOptions/AdminTagsOption";
import MyTextArea from "../../../UI/textarea/MyTextArea";
import Edit from "../../../assets/iconsComponent/Edit";
import {Tags} from "../../../@types/tags";

export interface CreatePostSidebarProps {
    tags: {
        text: string
        setValue?: (arg: any) => void
        someContextFunction?: (arg: any) => void
    }[]
    setTags: ((tags: { text: string }[]) => void) | any
    description: string
    setDescription: (description: string) => void
    action?: () => void
    edit?: boolean
    uploadTags?: Tags[]
}

const CreatePostSidebar: React.FC<CreatePostSidebarProps> = ({uploadTags, edit, tags, setTags, description, setDescription, action}) => {

  return (
    <div className="admin-sidebar admin-sidebar__post">
      <div className="admin-sidebar__buttons d-flex jce">
          <div className="posf fdc aie gap20">
              {
                  edit ?
                      <MyButton setValue={action}><Edit/><span>Edit post</span></MyButton>
                      :
                      <>
                          <MyButton to={'/admin?chapter=posts'}><span>← Back to posts page </span></MyButton>
                          <MyButton setValue={action}><Add/><span>Create post</span></MyButton>
                      </>
              }
          </div>
      </div>
        <div className=" d-flex fdc gap20" style={{marginTop: '90px'}}>
            <h3 className="label">Tags</h3>
            <AdminTagsOption uploadTags={uploadTags} tags={tags} setTags={setTags} message="tag"></AdminTagsOption>
        </div>

        <div>
            <h3 className="label">Description</h3>
            <MyTextArea full={true} rows={8} value={description} setValue={setDescription} placeholder="Enter description"></MyTextArea>
        </div>

    </div>
  )
}

export default CreatePostSidebar
