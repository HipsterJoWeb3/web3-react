import MySelect from '../../../UI/selects/MySelect'
import ReorderWrap from '../ReorderWrap'
import { Reorder } from 'framer-motion'
import DragAndDrop from '../../../assets/iconsComponent/DragAndDrop'
import React from "react";

export interface AdminSelectOptionProps {
    titleOption: string
    selectData: {
        title: string
        callback: () => void
        active: boolean
    }[]
    dragAndDrop?: boolean
    setSelectOrder?: any
}

const AdminSelectOption: React.FC<AdminSelectOptionProps> = ({ titleOption, selectData, dragAndDrop, setSelectOrder}) => {


  return (
    <div className="admin-sidebar__options-item">
      <h3>{titleOption}</h3>

        {
          dragAndDrop
          ?
          <Reorder.Group className="d-flex admin-sidebar__options-select__list" as="ul" axis="y" values={selectData} onReorder={setSelectOrder}>
            {
              selectData.map(item =>
                <ReorderWrap className="d-flex aic jcs dragAndDrop" value={item} key={item.title} >
                  <DragAndDrop />
                  <div className="admin-sidebar__options-select d-flex jcb aic">

                    <p>{item.title}</p>
                    <MySelect callback={item.callback}/>
                  </div>
                </ReorderWrap>

              )
            }
          </Reorder.Group>
          :
          <div className="d-flex admin-sidebar__options-select__list">
            {
              selectData.map(item =>
                  <div key={item.title} className="admin-sidebar__options-select d-flex jcb aic">
                    <p>{item.title}</p>
                    <MySelect callback={item.callback} active={item.active}/>
                  </div>
              )
            }
          </div>


        }
    </div>
  )
}

export default AdminSelectOption
