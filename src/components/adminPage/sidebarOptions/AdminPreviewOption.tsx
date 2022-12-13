import MyButton from '../../../UI/buttons/MyButton'
import React, {useRef} from "react";

export interface AdminPreviewOptionProps {
    url: string | any
    changePreview: (() => void) | any
}

const AdminPreviewOption: React.FC<AdminPreviewOptionProps> = ({url, changePreview}) => {

  const inputRef = useRef<HTMLInputElement>(null)


  return (
    <div className="admin-sidebar__options-item admin-sidebar__options-preview">
      <img src={url} alt="preview"/>
      <div className="admin-sidebar__options-change">
        <div className="admin-sidebar__options-change__inner">
          <input type="file" hidden ref={inputRef} onChange={changePreview}/>
          <MyButton valueRef={inputRef}>Change preview</MyButton>
        </div>

      </div>
    </div>
  )
}

export default AdminPreviewOption
